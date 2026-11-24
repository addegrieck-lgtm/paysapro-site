// IndexNow : prévient Bing (et les autres moteurs IndexNow : Yandex, Seznam, Naver…) des pages nouvelles ou modifiées.
// Lancé par .github/workflows/deploy.yml juste après la mise en ligne, ou à la main : npm run indexnow.
//
// Pages envoyées : celles du sitemap EN LIGNE dont la date <lastmod> est d'aujourd'hui ou d'hier (heure de Paris),
// c'est-à-dire les pages modifiées et les articles parus. INDEXNOW_ALL=1 envoie tout le sitemap (premier envoi).
// La clé n'est pas un secret : elle est publiée à la racine du site (public/<clé>.txt), c'est ce qui prouve
// aux moteurs que l'envoi vient bien du propriétaire du site.
const KEY = 'e4e684b1ffb6349e07ebb87a2be4eff1';
const site = (process.env.VITE_SITE_URL || 'https://www.paysapro-ai.fr').replace(/\/+$/, '');
const all = process.env.INDEXNOW_ALL === '1' || process.argv.includes('--all');
const keyLocation = `${site}/${KEY}.txt`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const parisDate = (d) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(d);

/** La mise en ligne peut mettre quelques instants à se propager : on attend que la clé et le sitemap répondent. */
async function fetchText(url, tries = 6) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
      if (res.ok) return await res.text();
      if (i >= tries) throw new Error(`${url} : réponse ${res.status}`);
    } catch (e) {
      if (i >= tries) throw e;
    }
    await sleep(20_000);
  }
}

const key = (await fetchText(keyLocation)).trim();
if (key !== KEY) throw new Error(`La clé publiée sur ${keyLocation} ne correspond pas.`);

const sitemap = await fetchText(`${site}/sitemap.xml`);
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, u]) => ({
  loc: u.match(/<loc>([^<]+)<\/loc>/)?.[1],
  lastmod: u.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
}));
const today = parisDate(new Date());
const yesterday = parisDate(new Date(Date.now() - 86_400_000));
const urlList = entries
  .filter((e) => e.loc?.startsWith(site) && (all || (e.lastmod && e.lastmod.slice(0, 10) >= yesterday)))
  .map((e) => e.loc);

if (urlList.length === 0) {
  console.log(`IndexNow : aucune page modifiée le ${yesterday} ou le ${today}, rien à envoyer.`);
  process.exit(0);
}

const res = await fetch(process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key: KEY, keyLocation, urlList }),
  signal: AbortSignal.timeout(30_000),
});
// 200 : reçu ; 202 : reçu, clé en cours de validation (premier envoi).
if (res.status !== 200 && res.status !== 202) throw new Error(`IndexNow : réponse ${res.status} ${await res.text()}`);
console.log(`✓ IndexNow : ${urlList.length} page(s) envoyée(s) (réponse ${res.status}).`);
for (const u of urlList) console.log(`  ${u}`);
