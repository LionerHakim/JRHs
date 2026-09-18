import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const failures = []
const files = ['index.html','package.json','src/main.tsx','src/index.css','DESIGN.md','public/site.webmanifest','public/404.html','public/favicon.svg','public/_headers']
for (const file of files) if (!existsSync(join(root, file))) failures.push(`Missing required file: ${file}`)
const read = file => existsSync(join(root, file)) ? readFileSync(join(root, file), 'utf8') : ''
const source = files.map(read).join('\n')
const main = read('src/main.tsx')
const html = read('index.html')
const requiredColors = ['#b00020','#ffc400','#080808','#ffffff']
const forbidden = ['linear-gradient(','radial-gradient(','#007aff','#ff3154','#b9d9ff','jrh-theme','prefers-color-scheme: dark','data-theme="dark"','localStorage.getItem','setDark(','box-shadow:']
for (const token of forbidden) if (source.includes(token)) failures.push(`Forbidden legacy/decorative token found: ${token}`)
for (const color of requiredColors) if (!source.includes(color)) failures.push(`Required brand color missing from source: ${color}`)
const packageJson = JSON.parse(read('package.json'))
if (main.includes("from 'lucide-react'") && !packageJson.dependencies?.['lucide-react']) failures.push('lucide-react is imported but missing from dependencies')
for (const required of ['rel="canonical"','rel="icon"','rel="manifest"','property="og:title"','name="twitter:card"','application/ld+json']) if (!html.includes(required)) failures.push(`SEO metadata missing: ${required}`)
const manifest = read('public/site.webmanifest')
if (manifest && !manifest.includes('"theme_color": "#080808"')) failures.push('Manifest theme_color must remain black')
if (manifest && !manifest.includes('"background_color": "#080808"')) failures.push('Manifest background_color must remain black')
const secretPatterns = [/-----BEGIN [A-Z ]+ PRIVATE KEY-----/,/sk-[A-Za-z0-9]{16,}/,/AIza[0-9A-Za-z_-]{20,}/,/ghp_[A-Za-z0-9]{20,}/]
for (const pattern of secretPatterns) if (pattern.test(source)) failures.push('Potential credential pattern found: ' + pattern)
if ((main.match(/<h1\b/g) || []).length !== 1) failures.push('Expected exactly one h1 in the application')
for (const image of main.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(image[0])) failures.push('Image is missing alt text: ' + image[0].slice(0,120))
if (/console\.log\s*\(/.test(main)) failures.push('console.log found in src/main.tsx')
if (!html.includes('<html lang="id">')) failures.push('Document language must remain id')
if (!/meta name="description" content="[^"]{50,}"/.test(html)) failures.push('Meta description is missing or too short')
if (failures.length) {
  console.error('\nJRH QUALITY AUDIT FAILED')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}
console.log('JRH QUALITY AUDIT PASSED — Redline palette, accessibility, SEO, and production guardrails verified.')
