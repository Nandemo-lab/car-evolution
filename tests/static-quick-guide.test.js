import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import tanto from '../src/cars/tanto.js'
import noah from '../src/cars/noah.js'
import voxy from '../src/cars/voxy.js'
import { staticQuickGuide } from '../src/static-quick-guide.js'
test('TANTO early navigation distinguishes facelift from generation change without changing images',()=>{
 assert.match(tanto.quickGuide.intro,/標準タント/)
 assert.match(tanto.quickGuide.intro,/カスタム/)
 assert.equal(tanto.quickGuide.items.length,3)
 assert.deepEqual(tanto.quickGuide.links.map(x=>x.href),['/tanto-la600s-zenki-kouki.html','/tanto-la600s-vs-la650s.html'])
})
for(const car of [noah,voxy,tanto]) test(`${car.vehicleName} quick answer and navigation remain in initial HTML`,()=>{
 const html=staticQuickGuide(car)
 for(const item of car.quickGuide.links.slice(0,2)) {
  assert.ok(html.includes(item.href))
  assert.ok(existsSync(new URL('..'+item.href,import.meta.url)))
 }
 assert.ok(html.includes(car.quickGuide.title))
 assert.doesNotMatch(html,/<img/)
})
test('static guide escapes text and refuses non-local URL schemes',()=>{
 assert.equal(staticQuickGuide({}), '')
 const html=staticQuickGuide({vehicleName:'A',quickGuide:{title:'<unsafe>',items:[{title:'"',text:'<script>'}],links:[{href:'javascript:alert(1)',label:'bad'}]}})
 assert.ok(html.includes('&lt;unsafe&gt;'));assert.doesNotMatch(html,/<script>|javascript:/)
})
