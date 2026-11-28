import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
for (const file of ['car-page.css','comparison-page.css']) test(`${file} retains mobile readability above the 430px browser boundary`,()=>{
 const css=readFileSync(new URL('../src/'+file,import.meta.url),'utf8')
 assert.match(css,/@media \(max-width: 480px\)/)
 assert.match(css,/min-height:\s*48px/)
 assert.match(css,/font-size:\s*16px/)
})
