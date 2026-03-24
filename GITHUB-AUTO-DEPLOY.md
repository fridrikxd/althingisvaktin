# Sjálfvirkt deploy með GitHub

Þessi verkefnauppsetning deploy-ar nú bæði:

- `worker.js` í Cloudflare Workers
- HTML síðurnar í Cloudflare Pages

við hvert `push` á `main`.

## 1. Búa til GitHub repo

Á GitHub:

1. Búðu til nýtt repository
2. Veldu t.d. nafnið `althingisvaktin-api`
3. Ekki setja README ef þú vilt halda þessu einföldu

## 2. Tengja möppuna við Git

Í terminal í þessari möppu:

```powershell
git init
git branch -M main
git add .
git commit -m "Initial worker setup"
git remote add origin https://github.com/THITT_NAFN/REPO_NAFN.git
git push -u origin main
```

## 3. Sækja Cloudflare Account ID

Þú finnur það í Cloudflare dashboard:

- hægra megin eða í account settings

## 4. Búa til Cloudflare API token

Í Cloudflare:

1. Farðu í `My Profile`
2. `API Tokens`
3. `Create Token`
4. Veldu annaðhvort:
   - `Edit Cloudflare Workers` template
   - eða custom token með Workers deploy permissions

Tokenið þarf að geta deploy-að Workers í þínum account.

## 5. Setja GitHub Secrets

Í GitHub repo:

1. `Settings`
2. `Secrets and variables`
3. `Actions`
4. Bættu við:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## 6. Cloudflare Pages project

Til að Pages workflowið virki þarf Pages projectið að heita:

- `althingisvaktin-pages`

Ef projectið þitt heitir öðru nafni, þarf að uppfæra það í:

- `.github/workflows/deploy-pages.yml`

í línunni með:

```yml
--project-name althingisvaktin-pages
```

## 7. Prófa sjálfvirkt deploy

Gerðu litla breytingu og push-aðu:

```powershell
git add .
git commit -m "Test auto deploy"
git push
```

Þá keyra GitHub Actions workflowin sjálfkrafa og deploy-a:

- workerinum
- frontend síðunum

## 8. Daglegt workflow eftir þetta

Þegar þú eða ég breytum skrám:

```powershell
git add .
git commit -m "Update worker logic"
git push
```

Og þá sér GitHub um deploy-ið á bæði API og frontend.

## 9. Hvað er þegar tilbúið

Þessar skrár eru nú þegar komnar í verkefnið:

- `.github/workflows/deploy-worker.yml`
- `.github/workflows/deploy-pages.yml`
- `.gitignore`

Þannig að þegar repo og secrets eru komin upp, verður þetta sjálfvirkt strax.
