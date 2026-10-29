import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {runInNewContext} from 'node:vm';
export const NINJA_RELEASE_ENABLED = true;
export const TARGET = 'compare-voxy-noah.html';

// Evaluates only our local comparison rendering code. No third-party code executes.
export async function renderComparison(root) {
 let source=readFileSync(resolve(root,'src/comparison-page.js'),'utf8');
 const affiliate=structuredClone((await import(pathToFileURL(resolve(root,'src/affiliate.js')).href)).affiliateDestinations);
 if(affiliate.usedCarSearch?.url||affiliate.usedCarSearch?.label)throw Error('Existing affiliate CTA requires placement review');
 const context={affiliateDestinations:affiliate,document:null};
 for(const match of source.matchAll(/^import (\w+) from '(\.\/cars\/[^']+)'/gm)) {
  context[match[1]]=structuredClone((await import(pathToFileURL(resolve(root,'src',match[2])).href)).default);
 }
 source=source.slice(0,source.indexOf('\nasync function copyUrl')).replace(/^import .*$/gm,'');
 let html='';
 const more='<a class="comparison-more" href="/#all-cars">';
 const node={hasAttribute:()=>false,set innerHTML(value){html=value;},insertAdjacentHTML(position,value){
  if(position==='beforebegin') {if(!html.includes(more))throw Error('Missing more');html=html.replace(more,value+more);}
  else if(position==='afterend'){const start=html.indexOf(more),end=html.indexOf('</a>',start)+4;if(start<0||end<4)throw Error('Missing more end');html=html.slice(0,end)+value+html.slice(end);}
  else throw Error('Unsupported position');
 }};
 context.document={documentElement:{dataset:{comparison:'voxy-noah'}},querySelector(selector){
  if(selector==='.comparison-grid')return {insertAdjacentHTML(position,value){if(position!=='beforebegin')throw Error('grid position');html=html.replace('<section class="comparison-grid"',value+'<section class="comparison-grid"');}};
  if(selector==='#comparison-page'||selector==='.comparison-more')return node;
  throw Error('Unexpected selector: '+selector);
 }};
 runInNewContext(source,context,{timeout:1000});
 return html;
}

export function insertOfficialTag(body,tag) {
 const marker='<a class="comparison-more"';
 if((body.match(/class="comparison-next"/g)||[]).length!==1||(body.match(/class="comparison-more"/g)||[]).length!==1)throw Error('Ambiguous placement');
 if(/data-commercial-slot|admax-ads|adm\.shinobi\.jp|googlesyndication\.com|adsbygoogle/.test(body))throw Error('Existing ad');
 // Git may check the unchanged official tag out with CRLF on Windows and LF on
 // Linux. Validate a newline-normalized copy, but inject the original bytes.
 const normalizedTag=tag.replace(/\r\n/g,'\n').trim();
 if(normalizedTag!=='<!-- admax -->\n<script src="https://adm.shinobi.jp/o/7715cbec85d744324b7fe2302020e023"></script>\n<!-- admax -->')throw Error('Official tag mismatch');
 const wrapper='<aside data-commercial-slot="ninja-carvista" aria-label="広告" style="box-sizing:border-box;width:302px;max-width:calc(100% - 32px);min-height:284px;margin:24px auto;border:1px solid #64748b;border-radius:8px;background:#f8fafc;color:#475569"><p style="box-sizing:border-box;height:32px;margin:0;padding:6px 12px;font:12px/20px system-ui">PR・広告</p><div style="width:300px;height:250px">'+tag+'</div></aside>';
 const at=body.indexOf(marker),related=body.indexOf('class="comparison-next"');
 if(related>at||!body.slice(related,at).trimEnd().endsWith('</section>'))throw Error('Related placement mismatch');
 return body.replace(marker,wrapper+marker);
}

export function ninjaParserPlugin(root) {
 return {name:'ninja-one-page-parser',apply:'build',enforce:'post',async generateBundle(_,bundle){
  if(!NINJA_RELEASE_ENABLED)return;
  const target=bundle[TARGET];if(!target||target.type!=='asset')throw Error('Missing target HTML');
  const html=String(target.source);
  if(/adm\.shinobi\.jp|googlesyndication\.com|adsbygoogle|data-commercial-slot/.test(html))throw Error('Existing ad in target');
  if((html.match(/<main id="comparison-page">/g)||[]).length!==1)throw Error('Missing unique main');
  const body=await renderComparison(root);
  const tag=readFileSync(resolve(root,'scripts/ninja-official-switch.tag.txt'),'utf8');
  target.source=html.replace(/<main id="comparison-page">[\s\S]*?<\/main>/,'<main id="comparison-page" data-ninja-prerendered="true">'+insertOfficialTag(body,tag)+'</main>');
 }};
}
