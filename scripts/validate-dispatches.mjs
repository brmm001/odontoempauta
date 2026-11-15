import fs from 'node:fs';
import path from 'node:path';
const pathToContent=path.join(process.cwd(),'content','dispatches.json');
const content=JSON.parse(fs.readFileSync(pathToContent,'utf8'));
if(!Array.isArray(content))throw new Error('Dispatches must be an array');
const allowed=new Set(['Regulação','Saúde pública','Biossegurança','Radiologia','Tecnologia','Pesquisa']);
const art=new Set(['regulation','data','safety','imaging','scan','printing']);
const link=(u)=>{try {return new URL(u).protocol==='https:'} catch {return false}};
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const titles=new Set(),slugs=new Set();
for (const row of content) {
 if(typeof row.slug!=='string'||!(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).test(row.slug))throw new Error('Invalid slug');
 if(slugs.has(row.slug))throw new Error('Duplicate slug '+row.slug);slugs.add(row.slug);
 if(typeof row.title!=='string'||row.title.length<38||row.title.length>125)throw new Error('Title length out of bounds: '+row.slug);
 if(titles.has(norm(row.title)))throw new Error('Duplicate title '+row.slug);titles.add(norm(row.title));
 if(!allowed.has(row.category)||!art.has(row.art))throw new Error('Unapproved category/art for '+row.slug);
 if(typeof row.deck!=='string'||row.deck.length<85||row.deck.length>350)throw new Error('Deck must contextualize the story '+row.slug);
 if(!/^20\d\d-\d\d-\d\d$/.test(row.publishedAt)||row.publishedAt>new Date().toLocaleDateString('en-CA',{timeZone:'America/Sao_Paulo'}))throw new Error('Invalid or future publication date '+row.slug);
 if(!Array.isArray(row.insights)||row.insights.length<3||row.insights.some(x=>typeof x!=='string'||x.length<45))throw new Error('Need three substantive insights '+row.slug);
 if(!Array.isArray(row.sections)||row.sections.length<5||row.sections.some(s=>!s.id||!s.title||!Array.isArray(s.paragraphs)||s.paragraphs.length<2||s.paragraphs.some(p=>typeof p!=='string'||p.length<140)))throw new Error('Need >=5 substantive sections '+row.slug);
 if(new Set(row.sections.map(s=>s.id)).size!==row.sections.length)throw new Error('Section ids duplicated '+row.slug);
 if(!Array.isArray(row.faq)||row.faq.length<3||row.faq.some(x=>typeof x.question!=='string'||typeof x.answer!=='string'||x.answer.length<35))throw new Error('FAQ too short '+row.slug);
 if(!Array.isArray(row.sources)||row.sources.length<2||row.sources.some(s=>!s.title||!s.organization||!link(s.url)))throw new Error('At least 2 verifiable https source links required '+row.slug);
 const body=[row.title,row.deck,...row.insights,...row.sections.flatMap(s=>s.paragraphs),...row.faq.map(f=>f.answer)].join(' ');
 if(/benavera|capim|dr\.cash/i.test(body))throw new Error('Commercial competitors not within this editorial domain '+row.slug);
 if(body.split(/\s+/).length<900)throw new Error('Insufficient editorial depth (min 900 words) '+row.slug);
}
console.log('Dispatch editorial checks passed:',content.length,'new articles validated');
