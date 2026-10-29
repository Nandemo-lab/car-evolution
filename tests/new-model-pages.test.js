import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {newModelPages,comparisonModels} from '../src/data/new-model-pages.js';
import {findModels} from '../src/model-finder.js';
import vezel from '../src/cars/vezel.js';
const cars=[{...vezel,slug:'vezel'},...comparisonModels];
test('追加車種は日本語・型式から実在する公開先へ到達できる',()=>{
 for(const [q,slug] of [['ヴェゼル RV5','vezel'],['RAV4 AXAN64','rav4-50-vs-60'],['CX-5 KF2P','cx-5-kf-vs-km'],['ルークス BB2A','roox-b4-vs-bb'],['デリカミニ BA6A','delica-mini-b3-vs-ba']]) {
  const results=findModels(cars,q);assert.ok(results.length,q);assert.ok(results.every(r=>r.car.slug===slug),q);
  for(const {car} of results)assert.ok(existsSync(new URL('../dist'+(car.href||`/cars/${car.slug}.html`),import.meta.url)));
 }
});
test('新規ページの初期HTML・OGP・モデルアンカー・内部画像参照が一致する',()=>{
 for(const [file,meta] of Object.entries(newModelPages)){
  const html=readFileSync(new URL('../dist/'+file,import.meta.url),'utf8');
  assert.ok(html.includes(meta.title),file);assert.ok(html.includes('https://carvista.jp/'+file),file);assert.ok(html.includes(meta.image),file);
  for(const model of meta.models)assert.ok(html.includes(`id="${model.url.split('#')[1]}"`),model.url);
  for(const [,path] of html.matchAll(/(?:src|href)="(\/(?!\/)[^"#?]+)(?:[?#][^"]*)?"/g)){
   const local=path==='/'?'/index.html':path;assert.ok(existsSync(new URL('../dist'+local,import.meta.url)),file+': '+path);
  }
 }
});
