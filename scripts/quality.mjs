import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const failures = []

const files = [
  'index.html',
  'package.json',
  'src/main.tsx',
  'src/index.css',
  'src/future.css',
  'public/site.webmanifest',
  'public/404.html',
  'public/favicon.svg',
  'public/_headers',
]

for (const file of files) {
  if (!existsSync(join(root, file))) failures.push(`Missing required file: ${file}`)
}

const read = file => existsSync(join(root, file)) ? readFileSync(join(root, file), 'utf8') : ''
const source = files.map(read).join('\n')

const forbidden = [
  'linear-gradient(',
  'radial-gradient(',
  '--gradient-dusk-gradient',
  'jrh-theme',
  "prefers-color-scheme: dark",
  "data-theme='dark'",
  'localStorage.getItem',
  'setDark(',
]

for (const token of forbidden) {
  if (source.includes(token)) failures.push(`Forbidden legacy token found: ${token}`)
}

const main = read('src/main.tsx')
if (main.includes("from 'lucide-react'")) {
  const packageJson = JSON.parse(read('package.json'))
  if (!packageJson.dependencies?.['lucide-react']) failures.push('lucide-react is imported but missing from dependencies')
}

const html = read('index.html')
for (const required of [
  'rel="canonical"',
  'rel="icon"',
  'rel="manifest"',
  'property="og:title"',
  'name="twitter:card"',
  'application/ld+json',
]) {
  if (!html.includes(required)) failures.push(`SEO metadata missing: ${required}`)
}

const manifest = read('public/site.webmanifest')
if (manifest && !manifest.includes('"theme_color": "#ffffff"')) failures.push('Manifest theme_color must remain white')
if (manifest && !manifest.includes('"background_color": "#ffffff"')) failures.push('Manifest background_color must remain white')

if (failures.length) {
  console.error('\nJRH QUALITY AUDIT FAILED')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('JRH QUALITY AUDIT PASSED — light-only shell, required assets, and SEO guardrails verified.')
