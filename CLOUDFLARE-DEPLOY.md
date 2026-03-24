# Cloudflare Wrangler uppsetning

Þetta verkefni er nú tilbúið fyrir `Wrangler` deploy.

## 1. Opna Terminal í verkefnismöppunni

Farðu í:

`C:\Users\fridrik\Documents\ChatGPT Forritun`

## 2. Setja upp Wrangler

Ef þú ert með Node.js:

```powershell
npm install
```

Ef þú vilt bara setja Wrangler upp globally:

```powershell
npm install -g wrangler
```

## 3. Skrá þig inn í Cloudflare

```powershell
npx wrangler login
```

Þá opnast vafri þar sem þú samþykkir aðgang.

## 4. Prófa workerinn locally

```powershell
npx wrangler dev
```

Eða:

```powershell
npm run dev
```

Þá færðu local URL þar sem þú getur prófað API-ið.

## 5. Deploy-a workerinn

```powershell
npx wrangler deploy
```

Eða:

```powershell
npm run deploy
```

## 6. Uppfæra `API_URL` í frontend ef þarf

Í [index.html](C:/Users/fridrik/Documents/ChatGPT%20Forritun/index.html) er API slóðin:

```js
const API_URL = "https://althingisvaktin-api.fridriksi.workers.dev";
```

Ef Cloudflare gefur þér nýja slóð eftir deploy, þá þarftu að setja hana þarna inn.

## 7. Algeng workflow eftir þetta

Þegar þú hefur breytt `worker.js`:

```powershell
npx wrangler deploy
```

Þegar þú hefur bara breytt `index.html`:

- ef síðan er hostuð sér, uppfærirðu þá útgáfu þar
- ef þú vilt, má næst líka setja upp `Cloudflare Pages` fyrir frontendið

## 8. Ef þú vilt tengja custom domain seinna

Í `wrangler.toml` er hægt að bæta við:

```toml
account_id = "YOUR_ACCOUNT_ID"
route = { pattern = "api.your-domain.is/*", zone_name = "your-domain.is" }
```

Ég skildi það eftir óútfyllt þar til þú veist nákvæmlega hvaða domain/zone þú vilt nota.
