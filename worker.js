const POLL_SNAPSHOT = {
  updatedAt: "2026-03-24T11:44:38Z",
  polls: [
    {
      source: "Gallup",
      sourceUrl: "https://www.gallup.is/data/geytenbr/sso/",
      status: "Handskrad myndsamantekt",
      fetchedAt: "2026-02-26T12:00:00Z",
      publishedAt: "2026-02-26",
      parties: [
        { party: "Samfylkingin", percentage: 28.5 },
        { party: "Midflokkurinn", percentage: 20.3 },
        { party: "Sjalfstaedisflokkurinn", percentage: 18.1 },
        { party: "Vidreisn", percentage: 10.9 },
        { party: "Framsoknarflokkurinn", percentage: 6.6 },
        { party: "Flokkur folksins", percentage: 5.8 },
        { party: "Vinstrihreyfingin - graent frambod", percentage: 4.2 },
        { party: "Piratar", percentage: 2.6 },
        { party: "Sosialistaflokkurinn", percentage: 2.5 }
      ]
    },
    {
      source: "Maskina",
      sourceUrl: "https://maskina.is/samfylkingin-gefur-eftir-i-nyrri-maskinukonnun/",
      status: "Handskrad myndsamantekt",
      fetchedAt: "2026-03-24T11:44:38Z",
      publishedAt: "2026-03-24",
      parties: [
        { party: "Samfylkingin", percentage: 25.5 },
        { party: "Midflokkurinn", percentage: 18.4 },
        { party: "Sjalfstaedisflokkurinn", percentage: 16.1 },
        { party: "Vidreisn", percentage: 14.0 },
        { party: "Framsoknarflokkurinn", percentage: 7.1 },
        { party: "Flokkur folksins", percentage: 5.8 },
        { party: "Piratar", percentage: 5.0 },
        { party: "Vinstrihreyfingin - graent frambod", percentage: 4.4 },
        { party: "Sosialistaflokkurinn", percentage: 3.5 }
      ]
    }
  ],
  pollAverage: [
    { party: "Samfylkingin", percentage: 27.0 },
    { party: "Midflokkurinn", percentage: 19.4 },
    { party: "Sjalfstaedisflokkurinn", percentage: 17.1 },
    { party: "Vidreisn", percentage: 12.5 },
    { party: "Framsoknarflokkurinn", percentage: 6.9 },
    { party: "Flokkur folksins", percentage: 5.8 },
    { party: "Vinstrihreyfingin - graent frambod", percentage: 4.3 },
    { party: "Piratar", percentage: 3.8 },
    { party: "Sosialistaflokkurinn", percentage: 3.0 }
  ],
  forecastTimeline: [
    { source: "Gallup", publishedAt: "2026-02-26", leader: "Samfylkingin", leaderValue: 28.5 },
    { source: "Maskina", publishedAt: "2026-03-24", leader: "Samfylkingin", leaderValue: 25.5 }
  ],
  seatProjection: [
    { party: "Samfylkingin", seats: 19 },
    { party: "Midflokkurinn", seats: 14 },
    { party: "Sjalfstaedisflokkurinn", seats: 12 },
    { party: "Vidreisn", seats: 9 },
    { party: "Framsoknarflokkurinn", seats: 5 },
    { party: "Flokkur folksins", seats: 4 },
    { party: "Vinstrihreyfingin - graent frambod", seats: 0 },
    { party: "Piratar", seats: 0 },
    { party: "Sosialistaflokkurinn", seats: 0 }
  ]
};

const MUNICIPAL_FILTER_TERMS = [
  "sveitarstjornarkosningar",
  "sveitarstjorn",
  "baejarstjorn",
  "oddviti",
  "frambod",
  "frambodslisti",
  "meirihluti",
  "minnihluti",
  "sveitarfelag",
  "reykjavikurborg",
  "kopavogur",
  "hafnarfjordur",
  "mosfellsbaer",
  "reykjanesbaer",
  "akureyri",
  "arborg",
  "vestmannaeyjar",
  "mulathing"
];

const NEWS_FEEDS = [
  { name: "Visir", url: "https://www.visir.is/rss/allt", kind: "rss" },
  { name: "mbl.is", url: "https://www.mbl.is/feeds/innlent/", kind: "rss" },
  { name: "RUV", url: "https://www.ruv.is/rss/frettir", kind: "rss" },
  { name: "DV", url: "https://www.dv.is/feed/", kind: "rss" },
  { name: "Heimildin", url: "https://heimildin.is/rss/", kind: "rss" },
  { name: "Mannlif", url: "https://www.mannlif.is/rss/", kind: "rss" },
  { name: "Baendabladid", url: "https://www.bbl.is/feed/", kind: "rss" },
  { name: "VB", url: "https://vb.is/frettir/", kind: "html" },
  {
    name: "BBC World",
    url: "https://feeds.bbci.co.uk/news/world/rss.xml",
    kind: "rss",
    filterTerms: ["iceland", "reykjavik", "icelandic", "althingi", "independence party", "social democrats", "kristrun", "gudrun hafsteinsdottir"]
  },
  {
    name: "POLITICO Europe",
    url: "https://www.politico.eu/country/iceland/",
    kind: "html",
    filterTerms: ["iceland", "reykjavik", "icelandic", "althingi", "independence party", "social democrats", "kristrun", "gudrun hafsteinsdottir"]
  },
  {
    name: "DFS",
    url: "https://www.dfs.is/frettir/",
    kind: "html",
    filterTerms: MUNICIPAL_FILTER_TERMS
  },
  {
    name: "Sunnlenska",
    url: "https://www.sunnlenska.is/flokkur/frettir",
    kind: "html",
    filterTerms: MUNICIPAL_FILTER_TERMS
  },
  {
    name: "Eyjafrettir",
    url: "https://eyjafrettir.is/",
    kind: "html",
    filterTerms: MUNICIPAL_FILTER_TERMS
  },
  {
    name: "Tigull",
    url: "https://tigull.is/",
    kind: "html",
    filterTerms: MUNICIPAL_FILTER_TERMS
  },
  {
    name: "Vikurfrettir",
    url: "https://www.vf.is/",
    kind: "html",
    filterTerms: MUNICIPAL_FILTER_TERMS
  },
  {
    name: "BB",
    url: "https://bb.is/",
    kind: "html",
    filterTerms: MUNICIPAL_FILTER_TERMS
  },
  {
    name: "Skessuhorn",
    url: "https://skessuhorn.is/",
    kind: "html",
    filterTerms: MUNICIPAL_FILTER_TERMS
  },
  {
    name: "Akureyri.net",
    url: "https://www.akureyri.net/",
    kind: "html",
    filterTerms: MUNICIPAL_FILTER_TERMS
  },
  {
    name: "Austurfrett",
    url: "https://www.austurfrett.is/",
    kind: "html",
    filterTerms: MUNICIPAL_FILTER_TERMS
  }
];

const SOCIAL_SOURCES = [
  {
    name: "Reddit / Iceland",
    platform: "Reddit",
    kind: "reddit",
    url: "https://www.reddit.com/r/Iceland/new.json?limit=20"
  },
  {
    name: "Reddit / Iceland politics search",
    platform: "Reddit",
    kind: "reddit",
    url: "https://www.reddit.com/search.json?q=althingi%20OR%20iceland%20politics%20OR%20sjalfstaedisflokkurinn%20OR%20samfylking&sort=new&limit=20"
  },
  { name: "X / Twitter", platform: "X", kind: "external", status: "Limited", note: "Requires API access or owned data stream." },
  { name: "Facebook", platform: "Facebook", kind: "external", status: "Limited", note: "Requires Graph API access or owned data stream." },
  { name: "TikTok", platform: "TikTok", kind: "external", status: "Limited", note: "Requires approved API or owned data stream." }
];

const POLL_SOURCES = [
  {
    name: "Maskina",
    kind: "html-poll",
    url: "https://maskina.is/fylgi-flokka-a-althingi/",
    public: true
  },
  {
    name: "Gallup",
    kind: "auth-poll",
    url: "https://www.gallup.is/data/geytenbr/sso/",
    public: false,
    note: "Appears to be login protected."
  }
];

const HAGSTOFA_MUNICIPALITY_AGE_TABLE = "https://px.hagstofa.is/pxis/api/v1/is/Ibuar/mannfjoldi/2_byggdir/sveitarfelog/MAN02005.px";
const HAGSTOFA_URBANITY_TABLE = "https://px.hagstofa.is/pxis/api/v1/is/Ibuar/mannfjoldi/2_byggdir/Byggdakjarnarhverfi/MAN03280.px";

const PARTY_ALIASES = {
  "Sjalfstaedisflokkurinn": [
    "sjalfstaedisflokkurinn",
    "sjalfstaedisflokkur",
    "sjalfstaedisflokkinn",
    "sjalfstaedisflokknum",
    "sjalfstaedisflokksins",
    "xd",
    "sjalfstaedismenn",
    "sjalfstaedismonnum",
    "sjalfstaedismanna",
    "gudrun hafsteinsdottir",
    "gudrunu hafsteinsdottur",
    "gudrunar hafsteinsdottur",
    "landsfundur",
    "landsfund",
    "landsfundi",
    "landsfundar",
    "flokksradsfundur",
    "flokksradsfund"
  ],
  "Samfylkingin": [
    "samfylking",
    "samfylkingin",
    "samfylkinguna",
    "samfylkingunni",
    "samfylkingarinnar",
    "samfylkingarfolk",
    "samfylkingarfolki",
    "samfylkingarfolks",
    "kristrun frostadottir",
    "kristrunu frostadottur",
    "kristrunar frostadottur",
    "landsfundur",
    "landsfund",
    "landsfundi",
    "landsfundar"
  ],
  "Vidreisn": [
    "vidreisn",
    "thorgerdur katrin gunnarsdottir",
    "thorgerdur katrin"
  ],
  "Framsoknarflokkurinn": [
    "framsokn",
    "framsoknarflokkurinn",
    "framsoknarflokkur",
    "lilja alfredsdottir"
  ],
  "Flokkur folksins": [
    "flokkur folksins",
    "flokkur folkins",
    "inga saeland"
  ],
  "Midflokkurinn": [
    "midflokkurinn",
    "midflokkur",
    "sigmundur david gunnlaugsson",
    "sigmundur david"
  ],
  "Piratar": [
    "piratar",
    "pirati",
    "oktavia hrund gudrunar jons",
    "oktavia hrund"
  ],
  "Vinstrihreyfingin - graent frambod": [
    "vinstrihreyfingin - graent frambod",
    "vinstrihreyfingin",
    "vinstri graen",
    "rosa bjork brynjolfsdottir",
    "rosa bjork"
  ],
  "Sosialistaflokkurinn": [
    "sosialistaflokkurinn",
    "sosialistar"
  ]
};

const TOPIC_ALIASES = {
  "ESB": ["esb", "evropusamband", "ees", "adild"],
  "Orkumal": ["orka", "orkuskipti", "virkjun", "raforka"],
  "Skattamal": ["skatt", "vsk", "tekjuskattur"],
  "Efnahagsmal": ["hagkerfi", "vextir", "verdbolga", "rikisfjarmal"],
  "Husnaedismal": ["husnaedi", "leiga", "ibud", "fasteign"],
  "Heilbrigdismal": ["heilbrigdi", "sjukrahus", "heilsugaesla", "bidlisti"],
  "Innflytjendamal": ["innflytj", "haelisleit", "utlendinga"],
  "Landbunadur": ["landbunadur", "baendur", "matvaeli"],
  "Menntamal": ["menntamal", "skoli", "kennari", "nam"]
};

function corsHeaders() {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "*",
    "Cache-Control": "no-store"
  };
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: corsHeaders()
  });
}

function stripAccents(str = "") {
  return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function cleanupHtml(text = "") {
  return String(text)
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(block, tagName) {
  const re = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = block.match(re);
  return match ? cleanupHtml(match[1]) : "";
}

function parseRssItems(xmlText) {
  const items = [];
  const rssItems = xmlText.match(/<item\b[\s\S]*?<\/item>/gi) || [];
  for (const block of rssItems) {
    items.push({
      title: extractTag(block, "title"),
      summary: extractTag(block, "description"),
      url: extractTag(block, "link"),
      publishedAt: extractTag(block, "pubDate")
    });
  }
  if (items.length) return items;

  const atomItems = xmlText.match(/<entry\b[\s\S]*?<\/entry>/gi) || [];
  for (const block of atomItems) {
    const linkMatch = block.match(/<link[^>]*href="([^"]+)"/i);
    items.push({
      title: extractTag(block, "title"),
      summary: extractTag(block, "summary") || extractTag(block, "content"),
      url: linkMatch ? linkMatch[1] : "",
      publishedAt: extractTag(block, "updated") || extractTag(block, "published")
    });
  }
  return items;
}

function absolutizeUrl(baseUrl, maybeRelativeUrl = "") {
  try {
    return new URL(maybeRelativeUrl, baseUrl).toString();
  } catch {
    return maybeRelativeUrl || "#";
  }
}

function uniqueBy(items, keyFn) {
  const seen = new Set();
  const output = [];
  for (const item of items) {
    const key = keyFn(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    output.push(item);
  }
  return output;
}

function matchesAnyTerm(text, terms = []) {
  if (!terms.length) return true;
  return terms.some((term) => containsAlias(text, term));
}

function parseHtmlArticles(htmlText, baseUrl) {
  const articles = [];

  const ldJsonBlocks = [...htmlText.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const match of ldJsonBlocks) {
    /*
    if (url.pathname === "/hagstofa/municipality-age-metadata") {
      try {
        const metadata = await fetchHagstofaMunicipalityAgeMetadata();
        return jsonResponse(metadata);
      } catch (error) {
        return jsonResponse(
          {
            error: "Ekki tókst að sækja sveitarfélaga- og aldursmetadata frá Hagstofu.",
            details: String(error?.message || error)
          },
          500
        );
      }
    }

    if (url.pathname === "/hagstofa/municipality-age") {
      const code = url.searchParams.get("code");
      const ageGroup = url.searchParams.get("ageGroup") || "all";
      if (!code) {
        return jsonResponse({ error: "Vantar sveitarfélagakóða." }, 400);
      }
      try {
        const rows = await fetchHagstofaMunicipalityAgeSeries(code, ageGroup);
        return jsonResponse({ code, ageGroup, rows });
      } catch (error) {
        return jsonResponse(
          {
            error: "Ekki tókst að sækja sveitarfélaga- og aldursgögn frá Hagstofu.",
            details: String(error?.message || error)
          },
          500
        );
      }
    }

    if (url.pathname === "/hagstofa/urbanity") {
      const ageGroup = url.searchParams.get("ageGroup") || "all";
      try {
        const rows = await fetchHagstofaUrbanitySeries(ageGroup);
        return jsonResponse({ ageGroup, rows });
      } catch (error) {
        return jsonResponse(
          {
            error: "Ekki tókst að sækja þéttbýlisgögn frá Hagstofu.",
            details: String(error?.message || error)
          },
          500
        );
      }
    }

    if (url.pathname === "/hagstofa/municipality-age-metadata") {
      try {
        const metadata = await fetchHagstofaMunicipalityAgeMetadata();
        return jsonResponse(metadata);
      } catch (error) {
        return jsonResponse(
          {
            error: "Ekki tókst að sækja sveitarfélaga- og aldursmetadata frá Hagstofu.",
            details: String(error?.message || error)
          },
          500
        );
      }
    }

    if (url.pathname === "/hagstofa/municipality-age") {
      const code = url.searchParams.get("code");
      const ageGroup = url.searchParams.get("ageGroup") || "all";
      if (!code) {
        return jsonResponse({ error: "Vantar sveitarfélagakóða." }, 400);
      }
      try {
        const rows = await fetchHagstofaMunicipalityAgeSeries(code, ageGroup);
        return jsonResponse({ code, ageGroup, rows });
      } catch (error) {
        return jsonResponse(
          {
            error: "Ekki tókst að sækja sveitarfélaga- og aldursgögn frá Hagstofu.",
            details: String(error?.message || error)
          },
          500
        );
      }
    }

    if (url.pathname === "/hagstofa/urbanity") {
      const ageGroup = url.searchParams.get("ageGroup") || "all";
      try {
        const rows = await fetchHagstofaUrbanitySeries(ageGroup);
        return jsonResponse({ ageGroup, rows });
      } catch (error) {
        return jsonResponse(
          {
            error: "Ekki tókst að sækja þéttbýlisgögn frá Hagstofu.",
            details: String(error?.message || error)
          },
          500
        );
      }
    }

    */
    /*
    if (url.pathname === "/hagstofa/municipality-age-metadata") {
      try {
        const metadata = await fetchHagstofaMunicipalityAgeMetadata();
        return jsonResponse(metadata);
      } catch (error) {
        return jsonResponse(
          {
            error: "Ekki tókst að sækja sveitarfélaga- og aldursmetadata frá Hagstofu.",
            details: String(error?.message || error)
          },
          500
        );
      }
    }

    if (url.pathname === "/hagstofa/municipality-age") {
      const code = url.searchParams.get("code");
      const ageGroup = url.searchParams.get("ageGroup") || "all";
      if (!code) {
        return jsonResponse({ error: "Vantar sveitarfélagakóða." }, 400);
      }
      try {
        const rows = await fetchHagstofaMunicipalityAgeSeries(code, ageGroup);
        return jsonResponse({ code, ageGroup, rows });
      } catch (error) {
        return jsonResponse(
          {
            error: "Ekki tókst að sækja sveitarfélaga- og aldursgögn frá Hagstofu.",
            details: String(error?.message || error)
          },
          500
        );
      }
    }

    if (url.pathname === "/hagstofa/urbanity") {
      const ageGroup = url.searchParams.get("ageGroup") || "all";
      try {
        const rows = await fetchHagstofaUrbanitySeries(ageGroup);
        return jsonResponse({ ageGroup, rows });
      } catch (error) {
        return jsonResponse(
          {
            error: "Ekki tókst að sækja þéttbýlisgögn frá Hagstofu.",
            details: String(error?.message || error)
          },
          500
        );
      }
    }

    */
    try {
      const payload = JSON.parse(match[1].trim());
      const nodes = Array.isArray(payload) ? payload : payload?.["@graph"] || [payload];
      for (const node of nodes) {
        if (!node) continue;
        const type = Array.isArray(node["@type"]) ? node["@type"].join(" ") : String(node["@type"] || "");
        if (!/NewsArticle|Article/i.test(type)) continue;
        articles.push({
          title: cleanupHtml(node.headline || node.name || ""),
          summary: cleanupHtml(node.description || ""),
          url: absolutizeUrl(baseUrl, node.url || node.mainEntityOfPage || ""),
          publishedAt: node.datePublished || node.dateCreated || ""
        });
      }
    } catch {
      // Ignore malformed JSON-LD blocks.
    }
  }

  const articleLinkMatches = [...htmlText.matchAll(/<a[^>]+href="([^"]*\/frettir\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
  for (const match of articleLinkMatches) {
    const href = absolutizeUrl(baseUrl, match[1]);
    const rawAnchorText = cleanupHtml(match[2] || "");
    if (!rawAnchorText || rawAnchorText.length < 12) continue;
    articles.push({
      title: rawAnchorText,
      summary: "",
      url: href,
      publishedAt: ""
    });
  }

  const articleBlockMatches = [...htmlText.matchAll(/<article\b[\s\S]*?<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/article>/gi)];
  for (const match of articleBlockMatches) {
    const href = absolutizeUrl(baseUrl, match[1]);
    const rawAnchorText = cleanupHtml(match[2] || "");
    if (!rawAnchorText || rawAnchorText.length < 18) continue;
    if (/\/flokkur\/|\/tag\/|\/hofundar\/|\/um-|\#/.test(href)) continue;
    articles.push({
      title: rawAnchorText,
      summary: "",
      url: href,
      publishedAt: ""
    });
  }

  return uniqueBy(articles, (item) => stripAccents(`${item.title}|${item.url}`))
    .filter((item) => item.title)
    .slice(0, 30);
}

function containsAlias(text, alias) {
  const normalizedText = stripAccents(text);
  const normalizedAlias = stripAccents(alias);
  const escaped = normalizedAlias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i");
  if (pattern.test(normalizedText)) return true;
  return normalizedAlias.length >= 4 && normalizedText.includes(normalizedAlias);
}

function detectByAliases(text, aliasMap, fallback) {
  const normalized = stripAccents(text);
  for (const [label, aliases] of Object.entries(aliasMap)) {
    if (aliases.some((alias) => normalized.includes(stripAccents(alias)))) return label;
  }
  return fallback;
}

function detectParty(text) {
  return detectByAliases(text, PARTY_ALIASES, "Oflokkat");
}

function detectTopic(text) {
  return detectByAliases(text, TOPIC_ALIASES, "Annad");
}

function inferSentiment(text) {
  const normalized = stripAccents(text);
  const positiveWords = ["studning", "jakvaett", "fagna", "aukning", "batnar", "traust", "styrkist"];
  const negativeWords = ["gagnryni", "neikvaett", "reidi", "afall", "deila", "vandamal", "oanægja"];
  const hasPositive = positiveWords.some((word) => normalized.includes(word));
  const hasNegative = negativeWords.some((word) => normalized.includes(word));
  if (hasPositive && hasNegative) return "blandad";
  if (hasPositive) return "jakvaed";
  if (hasNegative) return "neikvaed";
  return "hlutlaus";
}

function estimateReach(sourceName, platform, title, summary) {
  const text = `${title} ${summary}`;
  let base = 20;
  if (platform === "Reddit") base = 35;
  if (sourceName === "RUV") base = 90;
  if (sourceName === "mbl.is") base = 75;
  if (sourceName === "Visir") base = 70;
  if (sourceName === "DV") base = 55;
  if (sourceName === "Heimildin") base = 45;
  if (sourceName === "Mannlif") base = 45;
  if (sourceName === "Baendabladid") base = 30;
  if (text.length > 180) base += 10;
  return `${base}k`;
}

function estimateEngagement(sourceName, platform, title) {
  let base = 3;
  if (platform === "Reddit") base = 7;
  if (sourceName === "RUV") base = 8;
  if (sourceName === "mbl.is" || sourceName === "Visir") base = 6;
  if ((title || "").includes("?")) base += 1;
  return `${base}k`;
}

function estimateVelocity(publishedAt) {
  const time = new Date(publishedAt).getTime();
  if (Number.isNaN(time)) return "Midlungs";
  const minutes = (Date.now() - time) / 60000;
  if (minutes < 60) return "Mjog hratt";
  if (minutes < 180) return "Hratt";
  return "Midlungs";
}

function dedupeFeed(feed) {
  const seen = new Set();
  return feed.filter((item) => {
    const key = stripAccents(`${item.title} ${item.url || ""}`);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function retainRecentFeed(feed, maxAgeDays = 14) {
  const maxAgeMs = maxAgeDays * 86400000;
  const now = Date.now();
  return feed.filter((item) => {
    const publishedTime = new Date(item.publishedAt).getTime();
    if (Number.isNaN(publishedTime)) return true;
    return now - publishedTime <= maxAgeMs;
  });
}

function buildParties(feed) {
  const counts = new Map();
  for (const name of Object.keys(PARTY_ALIASES)) counts.set(name, { mentions: 0, positive: 0 });
  for (const item of feed) {
    if (!counts.has(item.party)) continue;
    const entry = counts.get(item.party);
    entry.mentions += 1;
    if (item.sentiment === "jakvaed") entry.positive += 1;
  }
  return [...counts.entries()].map(([name, stats]) => ({
    name,
    mentions: stats.mentions,
    sentiment: stats.mentions ? Math.round((stats.positive / stats.mentions) * 100) : 0,
    trend: stats.mentions > 1 ? "+8%" : "0%"
  }));
}

function buildTopics(feed) {
  const counts = new Map();
  for (const item of feed) counts.set(item.topic, (counts.get(item.topic) || 0) + 1);
  if (!counts.size) return [];
  const max = Math.max(...counts.values());
  return [...counts.entries()]
    .map(([label, count]) => ({ label, value: Math.round((count / max) * 100) }))
    .sort((a, b) => b.value - a.value);
}

function buildKeywords(feed) {
  const keywords = new Set();
  for (const item of feed) {
    if (item.party && item.party !== "Oflokkat") keywords.add(item.party);
    if (item.topic && item.topic !== "Annad") keywords.add(item.topic);
  }
  return [...keywords].slice(0, 16);
}

function buildChannelBreakdown(feed) {
  const counts = new Map();
  for (const item of feed) counts.set(item.source, (counts.get(item.source) || 0) + 1);
  if (!counts.size) return [];
  const max = Math.max(...counts.values());
  return [...counts.entries()]
    .map(([label, count]) => ({ label, value: Math.round((count / max) * 100) }))
    .sort((a, b) => b.value - a.value);
}

function buildAlerts(feed, polls) {
  const alerts = [];
  const socialItem = feed.find((item) => item.platform === "Reddit");
  if (socialItem) alerts.push({ label: "Umræða komin yfir á samfélagsmiðla", party: socialItem.party, severity: "Miðlungs", channel: socialItem.source });
  const negativeItem = feed.find((item) => item.sentiment === "neikvaed");
  if (negativeItem) alerts.push({ label: "Neikvæð umræða mælist í feedi", party: negativeItem.party, severity: "Hátt", channel: negativeItem.source });
  const topPoll = (polls || []).find((entry) => entry.parties?.length);
  if (topPoll) alerts.push({ label: `Ný fylgistala frá ${topPoll.source}`, party: topPoll.parties[0]?.party || "", severity: "Miðlungs", channel: "Kannanir" });
  return alerts.slice(0, 6);
}

function buildStats(feed, rssSources, socialSources, alerts, polls) {
  const totalReach = feed.reduce((sum, item) => sum + (Number(String(item.reach || "0").replace(/[^0-9.]/g, "")) || 0), 0);
  return [
    { label: "Mentions i feedi", value: String(feed.length), delta: "+live" },
    { label: "RSS sources", value: String(rssSources.length), delta: `+${rssSources.filter((s) => s.status === "Tengt").length}` },
    { label: "Social sources", value: String(socialSources.length), delta: `+${socialSources.filter((s) => s.status === "Tengt").length}` },
    { label: "Active alerts", value: String(alerts.length), delta: "+auto" },
    { label: "Tracked polls", value: String((polls || []).filter((poll) => poll.status !== "Unavailable").length), delta: "+polls" },
    { label: "Estimated reach", value: `${totalReach.toFixed(0)}k`, delta: "+estimate" }
  ];
}

function buildTrendSignals(feed) {
  const topicCounts = new Map();
  for (const item of feed) {
    if (!topicCounts.has(item.topic)) topicCounts.set(item.topic, { count: 0, sources: new Set(), velocities: [] });
    const entry = topicCounts.get(item.topic);
    entry.count += 1;
    entry.sources.add(item.source);
    entry.velocities.push(item.velocity);
  }
  return [...topicCounts.entries()].map(([topic, entry]) => {
    const score = Math.min(100, entry.count * 18 + entry.sources.size * 12 + entry.velocities.filter((v) => v === "Mjog hratt").length * 10);
    return { label: topic, score, reason: `${entry.count} item i ${entry.sources.size} rasum` };
  }).sort((a, b) => b.score - a.score).slice(0, 8);
}

function toIsoDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

async function fetchRssFeed(feedDef) {
  const response = await fetch(feedDef.url, {
    headers: { "user-agent": "Althingisvaktin/1.0", "accept": "application/rss+xml, application/xml, text/xml, */*" },
    cf: { cacheTtl: 300, cacheEverything: true }
  });
  if (!response.ok) throw new Error(`${feedDef.name} responded ${response.status}`);
  const xmlText = await response.text();
  return parseRssItems(xmlText).filter((item) => {
    const combined = `${item.title || ""} ${item.summary || ""}`;
    return matchesAnyTerm(combined, feedDef.filterTerms || []);
  }).map((item) => {
    const combined = `${item.title || ""} ${item.summary || ""}`;
    return {
      title: item.title || "An titils",
      summary: item.summary || "",
      source: feedDef.name,
      platform: "News",
      party: detectParty(combined),
      topic: detectTopic(combined),
      sentiment: inferSentiment(combined),
      reach: estimateReach(feedDef.name, "News", item.title || "", item.summary || ""),
      engagements: estimateEngagement(feedDef.name, "News", item.title || ""),
      velocity: estimateVelocity(item.publishedAt),
      publishedAt: toIsoDate(item.publishedAt),
      url: item.url || "#"
    };
  });
}

async function fetchHtmlNewsFeed(feedDef) {
  const response = await fetch(feedDef.url, {
    headers: {
      "user-agent": "Althingisvaktin/1.0",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    },
    cf: { cacheTtl: 300, cacheEverything: true }
  });
  if (!response.ok) throw new Error(`${feedDef.name} responded ${response.status}`);
  const htmlText = await response.text();
  return parseHtmlArticles(htmlText, feedDef.url).filter((item) => {
    const combined = `${item.title || ""} ${item.summary || ""} ${item.url || ""}`;
    return matchesAnyTerm(combined, feedDef.filterTerms || []);
  }).map((item) => {
    const combined = `${item.title || ""} ${item.summary || ""}`;
    return {
      title: item.title || "An titils",
      summary: item.summary || "",
      source: feedDef.name,
      platform: "News",
      party: detectParty(combined),
      topic: detectTopic(combined),
      sentiment: inferSentiment(combined),
      reach: estimateReach(feedDef.name, "News", item.title || "", item.summary || ""),
      engagements: estimateEngagement(feedDef.name, "News", item.title || ""),
      velocity: estimateVelocity(item.publishedAt || new Date().toISOString()),
      publishedAt: item.publishedAt ? toIsoDate(item.publishedAt) : new Date().toISOString(),
      url: item.url || feedDef.url
    };
  });
}

async function fetchRedditFeed(source) {
  const response = await fetch(source.url, {
    headers: { "user-agent": "Althingisvaktin/1.0" },
    cf: { cacheTtl: 180, cacheEverything: true }
  });
  if (!response.ok) throw new Error(`${source.name} responded ${response.status}`);
  const json = await response.json();
  const posts = json?.data?.children || [];
  return posts.map((child) => {
    const post = child.data || {};
    const summary = post.selftext || post.title || "";
    const combined = `${post.title || ""} ${summary}`;
    return {
      title: post.title || "An titils",
      summary,
      source: source.name,
      platform: "Reddit",
      party: detectParty(combined),
      topic: detectTopic(combined),
      sentiment: inferSentiment(combined),
      reach: estimateReach(source.name, "Reddit", post.title || "", summary),
      engagements: String(post.ups || 0),
      velocity: estimateVelocity(post.created_utc ? new Date(post.created_utc * 1000).toISOString() : new Date().toISOString()),
      publishedAt: post.created_utc ? new Date(post.created_utc * 1000).toISOString() : new Date().toISOString(),
      url: post.permalink ? `https://www.reddit.com${post.permalink}` : "#"
    };
  });
}

async function fetchSocialSource(source) {
  if (source.kind === "reddit") return fetchRedditFeed(source);
  return [];
}

function extractPartyPercentages(text) {
  const normalized = stripAccents(text);
  const results = [];
  for (const [party, aliases] of Object.entries(PARTY_ALIASES)) {
    let percentage = null;
    for (const alias of aliases) {
      const escaped = stripAccents(alias).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const patterns = [
        new RegExp(`${escaped}.{0,24}?(\\d{1,2}(?:[\\.,]\\d)?)\\s*%`, "i"),
        new RegExp(`(\\d{1,2}(?:[\\.,]\\d)?)\\s*%.{0,24}?${escaped}`, "i")
      ];
      for (const pattern of patterns) {
        const match = normalized.match(pattern);
        if (match) {
          percentage = Number(match[1].replace(",", "."));
          break;
        }
      }
      if (percentage !== null) break;
    }
    if (percentage !== null) results.push({ party, percentage });
  }
  return results.sort((a, b) => b.percentage - a.percentage);
}

function averagePolls(polls) {
  const buckets = new Map();
  for (const poll of polls || []) {
    for (const row of poll.parties || []) {
      const entry = buckets.get(row.party) || { party: row.party, total: 0, count: 0 };
      entry.total += row.percentage;
      entry.count += 1;
      buckets.set(row.party, entry);
    }
  }
  return [...buckets.values()]
    .map((row) => ({ party: row.party, percentage: Number((row.total / row.count).toFixed(1)) }))
    .sort((a, b) => b.percentage - a.percentage);
}

function buildSeatProjection(pollAverage) {
  const total = pollAverage.reduce((sum, row) => sum + row.percentage, 0) || 1;
  return pollAverage.slice(0, 8).map((row) => ({
    party: row.party,
    seats: Math.round((row.percentage / total) * 63)
  }));
}

function getBundledPollSnapshot() {
  if (!POLL_SNAPSHOT || typeof POLL_SNAPSHOT !== "object") return null;
  const polls = Array.isArray(POLL_SNAPSHOT.polls) ? POLL_SNAPSHOT.polls : [];
  const pollAverage = Array.isArray(POLL_SNAPSHOT.pollAverage) ? POLL_SNAPSHOT.pollAverage : [];
  const forecastTimeline = Array.isArray(POLL_SNAPSHOT.forecastTimeline) ? POLL_SNAPSHOT.forecastTimeline : [];
  const seatProjection = Array.isArray(POLL_SNAPSHOT.seatProjection) ? POLL_SNAPSHOT.seatProjection : [];
  if (!polls.length && !pollAverage.length && !forecastTimeline.length && !seatProjection.length) return null;
  return { polls, pollAverage, forecastTimeline, seatProjection };
}

async function fetchMaskinaPoll(source) {
  const response = await fetch(source.url, {
    headers: { "user-agent": "Althingisvaktin/1.0", "accept": "text/html,application/xhtml+xml" },
    cf: { cacheTtl: 1800, cacheEverything: true }
  });
  if (!response.ok) throw new Error(`${source.name} responded ${response.status}`);
  const html = await response.text();
  const text = cleanupHtml(html);
  const parties = extractPartyPercentages(text);
  const dateMatch = text.match(/(\d{1,2}\.\d{1,2}\.\d{4}|\d{4}-\d{2}-\d{2})/);
  return {
    source: source.name,
    sourceUrl: source.url,
    status: parties.length ? "Tengt" : "No structured poll found",
    fetchedAt: new Date().toISOString(),
    publishedAt: dateMatch ? toIsoDate(dateMatch[1]) : new Date().toISOString(),
    parties
  };
}

async function fetchPollSource(source) {
  if (source.kind === "html-poll") return fetchMaskinaPoll(source);
  if (source.kind === "auth-poll") {
    return {
      source: source.name,
      sourceUrl: source.url,
      status: "Unavailable",
      fetchedAt: new Date().toISOString(),
      publishedAt: null,
      parties: [],
      note: source.note
    };
  }
  return null;
}

async function fetchNewsSource(feedDef) {
  if (feedDef.kind === "rss") return fetchRssFeed(feedDef);
  if (feedDef.kind === "html") return fetchHtmlNewsFeed(feedDef);
  return [];
}

async function fetchHagstofaMetadata() {
  const response = await fetch(HAGSTOFA_POPULATION_TABLE, {
    headers: { "accept": "application/json" },
    cf: { cacheTtl: 3600, cacheEverything: true }
  });
  if (!response.ok) {
    throw new Error(`Hagstofa metadata responded ${response.status}`);
  }
  return response.json();
}

async function fetchHagstofaPopulationSeries(code) {
  const body = {
    query: [
      {
        code: "Ársfjórðungur",
        selection: {
          filter: "top",
          values: ["8"]
        }
      },
      {
        code: "Sveitarfélag",
        selection: {
          filter: "item",
          values: [code]
        }
      },
      {
        code: "Kyn og ríkisfang",
        selection: {
          filter: "item",
          values: ["0"]
        }
      }
    ],
    response: {
      format: "json-stat2"
    }
  };

  const response = await fetch(HAGSTOFA_POPULATION_TABLE, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(body)
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Hagstofa population responded ${response.status}: ${text.slice(0, 180)}`);
  }

  const payload = JSON.parse(text);
  const ids = payload.id || [];
  const size = payload.size || [];
  const values = payload.value || [];
  const dimension = payload.dimension || {};
  const quarterIndex = ids.indexOf("Ársfjórðungur");
  const municipalityIndex = ids.indexOf("Sveitarfélag");
  const quarterCategory = dimension["Ársfjórðungur"]?.category;
  const municipalityCategory = dimension["Sveitarfélag"]?.category;
  const quarterCodes = quarterCategory?.index ? Object.keys(quarterCategory.index) : [];
  const quarterLabels = quarterCategory?.label || {};
  const municipalityCodes = municipalityCategory?.index ? Object.keys(municipalityCategory.index) : [];
  const municipalityLabels = municipalityCategory?.label || {};
  const quarterCount = size[quarterIndex] || quarterCodes.length;
  const municipalityCode = municipalityCodes[0] || code;
  const municipalityLabel = municipalityLabels[municipalityCode] || code;

  const rows = [];
  for (let quarterPos = 0; quarterPos < quarterCount; quarterPos += 1) {
    const quarterCode = quarterCodes[quarterPos];
    const quarterLabel = quarterLabels[quarterCode] || quarterCode;
    const valueIndex = municipalityIndex === 0 ? quarterPos : quarterPos;
    const population = values[valueIndex];
    rows.push({
      code: quarterCode,
      label: quarterLabel,
      municipalityCode,
      municipalityLabel,
      population: Number(population || 0)
    });
  }
  return rows.filter((row) => row.code);
}

function rangeValues(start, endInclusive) {
  const values = [];
  for (let value = start; value <= endInclusive; value += 1) values.push(String(value));
  return values;
}

async function fetchHagstofaMunicipalityAgeMetadata() {
  const response = await fetch(HAGSTOFA_MUNICIPALITY_AGE_TABLE, {
    headers: { "accept": "application/json" },
    cf: { cacheTtl: 3600, cacheEverything: true }
  });
  if (!response.ok) {
    throw new Error(`Hagstofa municipality-age metadata responded ${response.status}`);
  }
  return response.json();
}

async function fetchHagstofaMunicipalityAgeSeries(code, ageGroup = "all") {
  const ageValues = ageGroup === "18plus" ? rangeValues(18, 109) : ["-1"];
  const body = {
    query: [
      {
        code: "Sveitarfélag",
        selection: {
          filter: "item",
          values: [code]
        }
      },
      {
        code: "Aldur",
        selection: {
          filter: "item",
          values: ageValues
        }
      },
      {
        code: "Ár",
        selection: {
          filter: "top",
          values: ["8"]
        }
      },
      {
        code: "Kyn",
        selection: {
          filter: "item",
          values: ["0"]
        }
      }
    ],
    response: {
      format: "json-stat2"
    }
  };

  const response = await fetch(HAGSTOFA_MUNICIPALITY_AGE_TABLE, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(body)
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Hagstofa municipality-age responded ${response.status}: ${text.slice(0, 180)}`);
  }

  const payload = JSON.parse(text);
  const values = payload.value || [];
  const dimension = payload.dimension || {};
  const municipalityCategory = dimension["Sveitarfélag"]?.category;
  const yearCategory = dimension["Ár"]?.category;
  const municipalityCodes = municipalityCategory?.index ? Object.keys(municipalityCategory.index) : [];
  const municipalityLabels = municipalityCategory?.label || {};
  const yearCodes = yearCategory?.index ? Object.keys(yearCategory.index) : [];
  const yearLabels = yearCategory?.label || {};
  const municipalityCode = municipalityCodes[0] || code;
  const municipalityLabel = municipalityLabels[municipalityCode] || code;
  const yearTotals = new Map(yearCodes.map((yearCode) => [yearCode, 0]));

  for (let agePos = 0; agePos < ageValues.length; agePos += 1) {
    for (let yearPos = 0; yearPos < yearCodes.length; yearPos += 1) {
      const valueIndex = agePos * yearCodes.length + yearPos;
      const yearCode = yearCodes[yearPos];
      yearTotals.set(yearCode, (yearTotals.get(yearCode) || 0) + Number(values[valueIndex] || 0));
    }
  }

  return yearCodes.map((yearCode) => ({
    code: yearCode,
    label: yearLabels[yearCode] || yearCode,
    municipalityCode,
    municipalityLabel,
    population: yearTotals.get(yearCode) || 0,
    ageGroup
  })).filter((row) => row.code);
}

async function fetchHagstofaUrbanitySeries(ageGroup = "all") {
  const ageValues = ageGroup === "18plus" ? rangeValues(18, 109) : ["-1"];
  const body = {
    query: [
      {
        code: "Þéttbýli",
        selection: {
          filter: "item",
          values: ["1", "2", "3"]
        }
      },
      {
        code: "Aldur",
        selection: {
          filter: "item",
          values: ageValues
        }
      },
      {
        code: "Ár",
        selection: {
          filter: "top",
          values: ["1"]
        }
      },
      {
        code: "Kyn",
        selection: {
          filter: "item",
          values: ["0"]
        }
      }
    ],
    response: {
      format: "json-stat2"
    }
  };

  const response = await fetch(HAGSTOFA_URBANITY_TABLE, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(body)
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Hagstofa urbanity responded ${response.status}: ${text.slice(0, 180)}`);
  }

  const payload = JSON.parse(text);
  const values = payload.value || [];
  const dimension = payload.dimension || {};
  const urbanityCategory = dimension["Þéttbýli"]?.category;
  const urbanityCodes = urbanityCategory?.index ? Object.keys(urbanityCategory.index) : [];
  const urbanityLabels = urbanityCategory?.label || {};
  const rows = [];

  for (let urbanityPos = 0; urbanityPos < urbanityCodes.length; urbanityPos += 1) {
    const urbanityCode = urbanityCodes[urbanityPos];
    let total = 0;
    for (let agePos = 0; agePos < ageValues.length; agePos += 1) {
      const valueIndex = urbanityPos * ageValues.length + agePos;
      total += Number(values[valueIndex] || 0);
    }
    rows.push({
      code: urbanityCode,
      label: urbanityLabels[urbanityCode] || urbanityCode,
      population: total,
      ageGroup
    });
  }

  return rows;
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders() });

    const url = new URL(request.url);

    if (url.pathname === "/hagstofa/metadata") {
      try {
        const metadata = await fetchHagstofaMetadata();
        return jsonResponse(metadata);
      } catch (error) {
        return jsonResponse(
          {
            error: "Ekki tókst að sækja metadata frá Hagstofu.",
            details: String(error?.message || error)
          },
          500
        );
      }
    }

    if (url.pathname === "/hagstofa/population") {
      const code = url.searchParams.get("code");
      if (!code) {
        return jsonResponse({ error: "Vantar sveitarfélagakóða." }, 400);
      }
      try {
        const rows = await fetchHagstofaPopulationSeries(code);
        return jsonResponse({ code, rows });
      } catch (error) {
        return jsonResponse(
          {
            error: "Ekki tókst að sækja mannfjöldatölur frá Hagstofu.",
            details: String(error?.message || error)
          },
          500
        );
      }
    }

    if (url.pathname === "/hagstofa/municipality-age-metadata") {
      try {
        const metadata = await fetchHagstofaMunicipalityAgeMetadata();
        return jsonResponse(metadata);
      } catch (error) {
        return jsonResponse(
          {
            error: "Ekki tókst að sækja sveitarfélaga- og aldursmetadata frá Hagstofu.",
            details: String(error?.message || error)
          },
          500
        );
      }
    }

    if (url.pathname === "/hagstofa/municipality-age") {
      const code = url.searchParams.get("code");
      const ageGroup = url.searchParams.get("ageGroup") || "all";
      if (!code) {
        return jsonResponse({ error: "Vantar sveitarfélagakóða." }, 400);
      }
      try {
        const rows = await fetchHagstofaMunicipalityAgeSeries(code, ageGroup);
        return jsonResponse({ code, ageGroup, rows });
      } catch (error) {
        return jsonResponse(
          {
            error: "Ekki tókst að sækja sveitarfélaga- og aldursgögn frá Hagstofu.",
            details: String(error?.message || error)
          },
          500
        );
      }
    }

    if (url.pathname === "/hagstofa/urbanity") {
      const ageGroup = url.searchParams.get("ageGroup") || "all";
      try {
        const rows = await fetchHagstofaUrbanitySeries(ageGroup);
        return jsonResponse({ ageGroup, rows });
      } catch (error) {
        return jsonResponse(
          {
            error: "Ekki tókst að sækja þéttbýlisgögn frá Hagstofu.",
            details: String(error?.message || error)
          },
          500
        );
      }
    }

    try {
      const newsResults = await Promise.allSettled(NEWS_FEEDS.map(fetchNewsSource));
      const liveSocialSources = SOCIAL_SOURCES.filter((source) => source.kind === "reddit");
      const socialResults = await Promise.allSettled(liveSocialSources.map(fetchSocialSource));
      const bundledPolls = getBundledPollSnapshot();
      const pollResults = bundledPolls ? [] : await Promise.allSettled(POLL_SOURCES.map(fetchPollSource));

      const newsFeed = newsResults.filter((result) => result.status === "fulfilled").flatMap((result) => result.value);
      const socialFeed = socialResults.filter((result) => result.status === "fulfilled").flatMap((result) => result.value);
      const polls = bundledPolls
        ? bundledPolls.polls
        : pollResults.filter((result) => result.status === "fulfilled" && result.value).map((result) => result.value);

      const feed = retainRecentFeed(
        dedupeFeed([...newsFeed, ...socialFeed]).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)),
        14
      ).slice(0, 1200);
      const rssSources = NEWS_FEEDS.map((source, index) => ({
        name: source.name,
        status: newsResults[index]?.status === "fulfilled" ? "Tengt" : "Villa",
        cadence: "15 min"
      }));
      const socialSources = [
        ...liveSocialSources.map((source, index) => ({
          name: source.name,
          platform: source.platform,
          status: socialResults[index]?.status === "fulfilled" ? "Tengt" : "Villa",
          note: "Public endpoint"
        })),
        ...SOCIAL_SOURCES.filter((source) => source.kind === "external")
      ];

      const pollAverage = bundledPolls ? bundledPolls.pollAverage : averagePolls(polls);
      const seatProjection = bundledPolls ? bundledPolls.seatProjection : buildSeatProjection(pollAverage);
      const forecastTimeline = bundledPolls
        ? bundledPolls.forecastTimeline
        : polls
            .filter((poll) => poll.publishedAt)
            .map((poll) => ({ source: poll.source, publishedAt: poll.publishedAt, leader: poll.parties[0]?.party || "", leaderValue: poll.parties[0]?.percentage || 0 }))
            .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

      const topics = buildTopics(feed);
      const alerts = buildAlerts(feed, polls);
      const parties = buildParties(feed);
      const channelBreakdown = buildChannelBreakdown(feed);
      const keywords = buildKeywords(feed);
      const trendSignals = buildTrendSignals(feed);
      const stats = buildStats(feed, rssSources, socialSources, alerts, polls);

      const payload = {
        feed,
        rssSources,
        socialSources,
        topics,
        alerts,
        parties,
        stats,
        channelBreakdown,
        keywords,
        trendSignals,
        polls,
        pollAverage,
        forecastTimeline,
        seatProjection
      };

      return new Response(JSON.stringify(payload, null, 2), { headers: corsHeaders() });
    } catch (error) {
      return new Response(
        JSON.stringify(
          {
            error: "Ekki tokst ad saekja eda vinna gogn.",
            details: String(error?.message || error)
          },
          null,
          2
        ),
        { status: 500, headers: corsHeaders() }
      );
    }
  }
};
