import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const read = file => readFileSync(resolve(root, file), 'utf8')
const main = read('src/main.tsx')
const site = read('src/config/site.ts')
const html = read('index.html')

const failures = []
const warnings = []

const ids = new Set()
for (const match of main.matchAll(/id="([^"]+)"/g)) ids.add(match[1])

for (const match of main.matchAll(/href="(#.*?)"/g)) {
  const target = match[1].slice(1)
  if (target && target !== 'top' && !ids.has(target)) failures.push('Broken internal anchor: #' + target)
}

const urls = new Set()
for (const match of site.matchAll(/https?:\/\/[^'"\s]+/g)) urls.add(match[0].replace(/[,;]+$/, ''))
for (const match of html.matchAll(/https?:\/\/[^"'\s>]+/g)) urls.add(match[0].replace(/[,;]+$/, ''))

for (const url of urls) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      headers: { 'user-agent': 'JRH-production-link-audit/1.0' },
      signal: AbortSignal.timeout(10000),
    })
    if (response.status === 404 || response.status === 410) {
      failures.push('Broken external link: ' + url + ' (HTTP ' + response.status + ')')
    } else if (response.status >= 400) {
      warnings.push('External link returned HTTP ' + response.status + ': ' + url)
    }
  } catch (error) {
    warnings.push('External link could not be HEAD-checked: ' + url)
  }
}

for (const warning of warnings) console.warn('WARN: ' + warning)

if (failures.length) {
  console.error('LINK AUDIT FAILED')
  for (const failure of failures) console.error('- ' + failure)
  process.exit(1)
}

console.log('LINK AUDIT PASSED — checked ' + urls.size + ' external URLs and internal anchors.')
