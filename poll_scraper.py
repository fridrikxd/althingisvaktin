#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import sys
import json
from datetime import datetime
from pathlib import Path

import requests
import pandas as pd
from bs4 import BeautifulSoup

GALLUP_URL = "https://www.gallup.is/data/geytenbr/sso/"
MASKINA_URL = "https://maskina.is/fylgi-flokka-a-althingi/"

OUT_DIR = Path(".")
LATEST_CSV = OUT_DIR / "latest_poll_summary.csv"
HISTORY_CSV = OUT_DIR / "poll_history.csv"
POLLS_JSON = OUT_DIR / "polls.json"
DEBUG_DIR = OUT_DIR / "debug_html"
DEBUG_DIR.mkdir(exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; poll-scraper/1.0; +https://example.local)"
}

# Samræming flokkaheita
PARTY_MAP = {
    "samfylking": "Samfylking",
    "s": "Samfylking",

    "sjálfstæðisflokkur": "Sjálfstæðisflokkur",
    "sjalfstaedisflokkur": "Sjálfstæðisflokkur",
    "sjálfstæðisfl.": "Sjálfstæðisflokkur",
    "d": "Sjálfstæðisflokkur",

    "viðreisn": "Viðreisn",
    "vidreisn": "Viðreisn",
    "c": "Viðreisn",

    "flokkur fólksins": "Flokkur fólksins",
    "flokkur folksins": "Flokkur fólksins",
    "f": "Flokkur fólksins",

    "miðflokkur": "Miðflokkur",
    "midflokkur": "Miðflokkur",
    "m": "Miðflokkur",

    "framsókn": "Framsókn",
    "framsokn": "Framsókn",
    "b": "Framsókn",

    "píratar": "Píratar",
    "piratar": "Píratar",
    "p": "Píratar",

    "vinstri græn": "Vinstri græn",
    "vinstri-graen": "Vinstri græn",
    "vinstri grænir": "Vinstri græn",
    "vg": "Vinstri græn",
    "v": "Vinstri græn",

    "sósíalistaflokkur": "Sósíalistar",
    "sosialistaflokkur": "Sósíalistar",
    "sósíalistar": "Sósíalistar",
    "j": "Sósíalistar",

    "lýðræðisflokkurinn": "Lýðræðisflokkur",
    "lydraedisflokkurinn": "Lýðræðisflokkur",
    "lýðræðisflokkur": "Lýðræðisflokkur",
}

EXPECTED_PARTIES = [
    "Samfylking",
    "Sjálfstæðisflokkur",
    "Viðreisn",
    "Flokkur fólksins",
    "Miðflokkur",
    "Framsókn",
    "Píratar",
    "Vinstri græn",
    "Sósíalistar",
    "Lýðræðisflokkur",
]

def normalize_text(s: str) -> str:
    s = str(s).strip().lower()
    s = s.replace("\xa0", " ")
    s = re.sub(r"\s+", " ", s)
    return s

def clean_percent(val):
    if pd.isna(val):
        return None
    s = str(val).strip()
    s = s.replace("%", "").replace(",", ".")
    m = re.search(r"-?\d+(?:\.\d+)?", s)
    if not m:
        return None
    try:
        return float(m.group(0))
    except ValueError:
        return None

def standardize_party_name(name: str):
    key = normalize_text(name)
    return PARTY_MAP.get(key, name.strip())

def fetch_html(url: str, tag: str) -> str:
    r = requests.get(url, headers=HEADERS, timeout=30)
    r.raise_for_status()
    html = r.text
    (DEBUG_DIR / f"{tag}.html").write_text(html, encoding="utf-8")
    return html

def extract_tables(html: str):
    # Fyrst prófum pandas.read_html
    tables = []
    try:
        raw_tables = pd.read_html(html)
        tables.extend(raw_tables)
    except Exception:
        pass

    # Fallback: BeautifulSoup ef pandas finnur ekkert
    if not tables:
        soup = BeautifulSoup(html, "html.parser")
        for table in soup.find_all("table"):
            try:
                df = pd.read_html(str(table))[0]
                tables.append(df)
            except Exception:
                continue

    return tables

def score_table(df: pd.DataFrame) -> int:
    score = 0
    cols = [normalize_text(c) for c in df.columns]
    sample = " ".join(cols)

    keywords = [
        "fylgi", "flokkur", "party", "samfylking", "sjálfstæðis",
        "viðreisn", "framsókn", "píratar", "maskina", "gallup"
    ]
    for kw in keywords:
        if kw in sample:
            score += 2

    # Skoðum líka gildi
    try:
        flat_vals = " ".join(
            normalize_text(x)
            for x in df.astype(str).head(10).fillna("").values.flatten().tolist()
        )
        for kw in keywords:
            if kw in flat_vals:
                score += 1
    except Exception:
        pass

    return score

def choose_best_table(tables):
    if not tables:
        return None
    ranked = sorted(tables, key=score_table, reverse=True)
    return ranked[0]

def parse_poll_table(df: pd.DataFrame, source: str) -> dict:
    """
    Reynir að umbreyta töflu í:
    {
      'source': 'Gallup',
      'date': '2026-03-11',
      'Samfylking': 23.1,
      ...
    }
    """
    result = {
        "source": source,
        "scraped_at": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "date": None
    }

    # Reynum fyrst að finna dagsetningu í dálkaheitum eða efstu línum
    joined = " ".join([str(c) for c in df.columns])
    joined += " " + " ".join(df.astype(str).head(5).fillna("").values.flatten())
    date_match = re.search(r"(\d{1,2}[./-]\d{1,2}[./-]\d{2,4})", joined)
    if date_match:
        result["date"] = date_match.group(1)

    # Tilvik A: töfluform með flokkur + fylgi
    # t.d. dálkar "Flokkur" og "Fylgi"
    colmap = {normalize_text(c): c for c in df.columns}
    party_col = None
    value_col = None

    for c_norm, c_orig in colmap.items():
        if c_norm in {"flokkur", "framboð", "party"}:
            party_col = c_orig
        if c_norm in {"fylgi", "hlutfall", "prósenta", "percent", "%"}:
            value_col = c_orig

    if party_col and value_col:
        for _, row in df.iterrows():
            party = standardize_party_name(row[party_col])
            value = clean_percent(row[value_col])
            if party in EXPECTED_PARTIES and value is not None:
                result[party] = value
        return result

    # Tilvik B: flokkar sem dálkaheiti, ein lína með tölum
    standardized_cols = {}
    for c in df.columns:
        std = standardize_party_name(str(c))
        standardized_cols[c] = std

    renamed = df.rename(columns=standardized_cols)
    matching_cols = [c for c in renamed.columns if c in EXPECTED_PARTIES]

    if matching_cols:
        # finnum fyrstu röð sem inniheldur tölur í einhverjum flokksdálkum
        for _, row in renamed.iterrows():
            row_vals = {c: clean_percent(row[c]) for c in matching_cols}
            if any(v is not None for v in row_vals.values()):
                for party, value in row_vals.items():
                    if value is not None:
                        result[party] = value
                return result

    # Tilvik C: tveggja dálka tafla þar sem nöfn flokka eru í fyrstu súlu
    if df.shape[1] >= 2:
        first_col = df.columns[0]
        second_col = df.columns[1]
        for _, row in df.iterrows():
            party = standardize_party_name(row[first_col])
            value = clean_percent(row[second_col])
            if party in EXPECTED_PARTIES and value is not None:
                result[party] = value

        if any(k in result for k in EXPECTED_PARTIES):
            return result

    return result

def scrape_source(url: str, source_name: str) -> dict:
    html = fetch_html(url, source_name.lower())
    tables = extract_tables(html)
    if not tables:
        raise RuntimeError(f"Engar töflur fundust fyrir {source_name}")

    best = choose_best_table(tables)
    parsed = parse_poll_table(best, source_name)

    # Ef ekkert fannst í bestu töflu, prófum allar
    if not any(p in parsed for p in EXPECTED_PARTIES):
        for table in tables:
            parsed = parse_poll_table(table, source_name)
            if any(p in parsed for p in EXPECTED_PARTIES):
                break

    if not any(p in parsed for p in EXPECTED_PARTIES):
        raise RuntimeError(
            f"Tókst ekki að lesa fylgistölur fyrir {source_name}. "
            f"Skoðaðu debug_html/{source_name.lower()}.html og lagaðu parse_poll_table()."
        )

    return parsed

def combine_results(rows: list[dict]) -> pd.DataFrame:
    df = pd.DataFrame(rows)

    for party in EXPECTED_PARTIES:
        if party not in df.columns:
            df[party] = None

    ordered_cols = ["source", "date", "scraped_at"] + EXPECTED_PARTIES
    return df[ordered_cols]

def build_worker_payload(rows: list[dict]) -> dict:
    polls = []

    for row in rows:
        parties = []
        for party in EXPECTED_PARTIES:
            value = row.get(party)
            if value is not None:
                parties.append({
                    "party": party,
                    "percentage": float(value)
                })

        parties.sort(key=lambda item: item["percentage"], reverse=True)
        polls.append({
            "source": row.get("source"),
            "sourceUrl": GALLUP_URL if row.get("source") == "Gallup" else MASKINA_URL,
            "status": "Tengt" if parties else "No structured poll found",
            "fetchedAt": row.get("scraped_at"),
            "publishedAt": row.get("date"),
            "parties": parties
        })

    averages = []
    for party in EXPECTED_PARTIES:
        values = [row.get(party) for row in rows if row.get(party) is not None]
        if values:
            averages.append({
                "party": party,
                "percentage": round(sum(values) / len(values), 1)
            })

    averages.sort(key=lambda item: item["percentage"], reverse=True)

    total = sum(item["percentage"] for item in averages) or 1
    seat_projection = [
        {
            "party": item["party"],
            "seats": round((item["percentage"] / total) * 63)
        }
        for item in averages
    ]

    forecast_timeline = [
        {
            "source": poll["source"],
            "publishedAt": poll["publishedAt"],
            "leader": poll["parties"][0]["party"] if poll["parties"] else "",
            "leaderValue": poll["parties"][0]["percentage"] if poll["parties"] else 0
        }
        for poll in polls
    ]

    return {
        "updatedAt": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "polls": polls,
        "pollAverage": averages,
        "forecastTimeline": forecast_timeline,
        "seatProjection": seat_projection
    }

def write_outputs(df: pd.DataFrame):
    df.to_csv(LATEST_CSV, index=False, encoding="utf-8-sig")

    if HISTORY_CSV.exists():
        old = pd.read_csv(HISTORY_CSV)
        history = pd.concat([old, df], ignore_index=True)
        history = history.drop_duplicates(subset=["source", "date", "scraped_at"], keep="last")
    else:
        history = df.copy()

    history.to_csv(HISTORY_CSV, index=False, encoding="utf-8-sig")

def write_json_payload(rows: list[dict]):
    payload = build_worker_payload(rows)
    POLLS_JSON.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

def main():
    rows = []
    errors = []

    for url, source_name in [
        (GALLUP_URL, "Gallup"),
        (MASKINA_URL, "Maskína"),
    ]:
        try:
            row = scrape_source(url, source_name)
            rows.append(row)
        except Exception as e:
            errors.append(f"{source_name}: {e}")

    if not rows:
        print("Mistókst að sækja gögn frá báðum síðum.", file=sys.stderr)
        for err in errors:
            print(err, file=sys.stderr)
        sys.exit(1)

    df = combine_results(rows)
    write_outputs(df)
    write_json_payload(rows)

    print("\nNýjasta samantekt:")
    print(df.to_string(index=False))

    if errors:
        print("\nAðvaranir:")
        for err in errors:
            print("-", err)

if __name__ == "__main__":
    main()
