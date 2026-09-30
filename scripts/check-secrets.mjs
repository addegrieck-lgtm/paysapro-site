// Vérifie qu'aucune clé secrète ne se trouve dans le code source ni dans le build.
// Échoue (code 1) si un motif suspect est trouvé. Lancé en CI après le build.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const TARGETS = ['src', 'public', 'dist', 'index.html', '.env.example', 'vercel.json'];
const EXT = new Set(['.ts', '.tsx', '.js', '.mjs', '.json', '.html', '.css', '.md', '.txt', '.xml', '.webmanifest', '.example', '']);

const PATTERNS = [
  [/sk_(live|test)_[0-9a-zA-Z]{10,}/, 'Clé secrète Stripe'],
  [/rk_(live|test)_[0-9a-zA-Z]{10,}/, 'Clé restreinte Stripe'],
  [/whsec_[0-9a-zA-Z]{10,}/, 'Secret de webhook Stripe'],
  [/service_role/i, 'Mention de clé Supabase service_role'],
  [/sb_secret_[A-Za-z0-9_-]{8,}/, 'Clé secrète Supabase'],
  [/eyJ[a-zA-Z0-9_-]{10,}\.eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}/, 'Jeton JWT'],
  [/re_[A-Za-z0-9]{8,}_[A-Za-z0-9]{8,}/, 'Clé API Resend'],
  [/xkeysib-[a-f0-9]{20,}/, 'Clé API Brevo'],
  [/AKIA[0-9A-Z]{16}/, 'Clé AWS'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'Clé privée'],
  [/sk-ant-[a-zA-Z0-9-]{10,}/, 'Clé API Anthropic'],
  [/sk-[a-zA-Z0-9]{32,}/, 'Clé API (type OpenAI)'],
];

function* walk(p) {
  if (!existsSync(p)) return;
  const st = statSync(p);
  if (st.isDirectory()) for (const f of readdirSync(p)) yield* walk(join(p, f));
  else if (EXT.has(extname(p)) && st.size < 5_000_000) yield p;
}

const self = fileURLToPath(import.meta.url);
let problems = 0;
let scanned = 0;
for (const t of TARGETS) {
  for (const file of walk(join(root, t))) {
    if (file === self) continue;
    scanned++;
    const content = readFileSync(file, 'utf8');
    for (const [re, label] of PATTERNS) {
      if (re.test(content)) {
        console.error(`✗ ${label} détecté dans ${file.replace(root, '.')}`);
        problems++;
      }
    }
  }
}

if (problems) {
  console.error(`\n${problems} problème(s) : retirez ces secrets du frontend (ils doivent vivre côté serveur).`);
  process.exit(1);
}
console.log(`✓ Aucune clé secrète détectée (${scanned} fichiers analysés).`);
