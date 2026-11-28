import test from 'node:test'
import assert from 'node:assert/strict'
import { comparisonNextLinks } from '../src/comparison-next-links.js'
test('VOXY next links work without JavaScript and reject external targets', () => {
  const html = comparisonNextLinks({vehicle:'VOXY',links:[{href:'/cars/voxy.html',title:'VOXY一覧'},{href:'https://evil.example',title:'external'}]})
  assert.match(html,/href="\/cars\/voxy.html"/)
  assert.doesNotMatch(html,/evil|<img|onclick/)
})
test('next links do not change unrelated vehicle pages',()=>assert.equal(comparisonNextLinks({vehicle:'RAV4',links:[]}),''))
test('next links escape labels',()=>assert.match(comparisonNextLinks({vehicle:'VOXY',links:[{href:'/cars/voxy.html',title:'<script>'}]}), /&lt;script&gt;/))

import tanto from '../src/data/comparisons/tanto-la600s-zenki-kouki.js'
import { existsSync } from 'node:fs'
test('October TANTO landing page has three existing relevant destinations', () => {
  const html = comparisonNextLinks(tanto)
  assert.equal((html.match(/<a /g) || []).length, 3)
  for (const link of tanto.links) {
    assert.ok(html.includes(`href="${link.href}"`))
    assert.ok(existsSync(new URL(`../${link.href.slice(1)}`, import.meta.url)))
  }
  assert.match(html, /TANTOの次の比較/)
  assert.doesNotMatch(html, /VOXY|<img|script/)
})
test('other TANTO intents remain unchanged', () => assert.equal(comparisonNextLinks({...tanto,intent:'another'}),''))

import noah7080 from '../src/data/comparisons/noah-70-vs-80.js'
import noah8090 from '../src/data/comparisons/noah-80-vs-90.js'
for(const data of [noah7080,noah8090]) test(`NOAH ${data.intent} supports return and onward navigation without new images`,()=>{
 const html=comparisonNextLinks(data)
 assert.ok(html.includes('href="/cars/noah.html"'))
 assert.equal((html.match(/<a /g)||[]).length,Math.min(data.links.length,3))
 assert.doesNotMatch(html,/<img|onclick/)
 for(const link of data.links) assert.ok(existsSync(new URL(`../${link.href.slice(1)}`,import.meta.url)))
})
