import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('2024 gasoline VX equipment is not confused with ZX or GX', () => {
  const source = readFileSync(new URL('../src/land-cruiser-300-vs-250.js', import.meta.url), 'utf8')
  assert.ok(source.includes('ガソリンVXにはSDMと電動リヤデフロックは装備されません'))
  assert.ok(source.includes('SDMはZX、電動リヤデフロックはZX・GXの装備'))
  assert.ok(source.includes('spec/landcruiser250_spec_202406.pdf'))
})
