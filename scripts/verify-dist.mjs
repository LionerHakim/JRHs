import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('../dist/', import.meta.url).pathname.replace(/\/$/, '')
const requiredFiles = [
  'index.html',
  'site.webmanifest',
  'robots.txt',
  'sitemap.xml',
  '_headers',
  'favicon.svg',
  'assets/images/s.jpg',
  'assets/music/123456 Budi Doremi.mp3',
  'assets/music/Akad.mp3',
  'assets/music/Bahtera Mahligai Cinta.mp3',
  'assets/music/Ngertenono Ati.mp3',
  'assets/music/PICA PICA.mp3',
  'assets/music/Tak Ada Ujungnya.mp3',
  'assets/music/Tewas Tertimbun Masa Lalu.mp3',
  'assets/music/Tresno Tekan Mati.mp3',
  'assets/music/Who Knows.mp3',
]

const fail = (message) => {
  console.error(`[verify:dist] FAIL: ${message}`)
  process.exit(1)
}

if (!existsSync(root)) fail('dist/ was not generated')

for (const relative of requiredFiles) {
  const file = join(root, relative)
  if (!existsSync(file)) fail(`missing ${relative}`)
  if (statSync(file).isDirectory()) fail(`expected file, found directory: ${relative}`)
}

const html = readFileSync(join(root, 'index.html'), 'utf8')
const manifest = readFileSync(join(root, 'site.webmanifest'), 'utf8')
const assetsDirectory = join(root, 'assets')
const jsBundle = readdirSync(assetsDirectory)
  .filter((file) => file.endsWith('.js'))
  .map((file) => readFileSync(join(assetsDirectory, file), 'utf8'))
  .join('\n')
const checks = [
  ['root mount', /<div id="root">/.test(html)],
  ['production JS bundle', /<script[^>]+type="module"[^>]+src="[^"]*\/assets\/[^"]+\.js"/.test(html)],
  ['production CSS bundle', /<link[^>]+rel="stylesheet"[^>]+href="[^"]*\/assets\/[^"]+\.css"/.test(html)],
  ['no stale logo reference', !html.includes('/assets/images/logo.png') && !manifest.includes('/assets/images/logo.png')],
  ['light theme metadata', /<meta name="color-scheme" content="light"/.test(html) && !html.includes("dataset.theme = 'dark'")],
  ['light PWA manifest', !manifest.includes('"background_color": "#08090B"') && !manifest.includes('"theme_color": "#08090B"')],
  ['canonical home', html.includes('<link rel="canonical" href="https://jrhsee.my.id/" />')],
  ['contact email', jsBundle.includes('contact@jrhsee.my.id')],
  ['navigation section ids', ['identity', 'projects', 'education', 'media', 'testimonials', 'contact'].every((id) => new RegExp(`\\b${id}\\b`).test(jsBundle))],
  ['synchronized labels', jsBundle.includes('Thoughts') && jsBundle.includes('Experience')],
  ['no obsolete section class', !jsBundle.includes('experience-section')],
  ['no legacy logo reference', !jsBundle.includes('/assets/images/logo.png')],
]

for (const [label, passed] of checks) {
  if (!passed) fail(label)
}

console.log('[verify:dist] PASS: production dist is structurally deployable')
