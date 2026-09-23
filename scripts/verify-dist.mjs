import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('../dist/', import.meta.url).pathname.replace(/\\/$/, '')
const requiredFiles = [
  'index.html',
  'site.webmanifest',
  'robots.txt',
  'assets/images/logo.png',
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
const checks = [
  ['root mount', /<div id="root">/.test(html)],
  ['production JS bundle', /<script[^>]+type="module"[^>]+src="[^"]*\/assets\/[^"]+\.js"/.test(html)],
  ['production CSS bundle', /<link[^>]+rel="stylesheet"[^>]+href="[^"]*\/assets\/[^"]+\.css"/.test(html)],
]

for (const [label, passed] of checks) {
  if (!passed) fail(label)
}

console.log('[verify:dist] PASS: production dist is structurally deployable')
