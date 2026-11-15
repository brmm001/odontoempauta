import {readFileSync} from 'node:fs';
import {join} from 'node:path';
const path=join(process.cwd(),'content','glossary.json');
const rows=JSON.parse(readFileSync(path,'utf8'));
if(!Array.isArray(rows)) throw new Error('Glossary must be a JSON array');
const norm=(v)=>String(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const slugSet=new Set(),termSet=new Set(),perDate=new Map();
const timeZoneDate=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const approvedCategories=new Set(['Radiologia','Saúde pública','Biossegurança','Pesquisa','Tecnologia','Regulação','Anatomia','Materiais','Odontopediatria','Periodontia','Ortodontia','Endodontia','Prótese','Implantodontia','Cirurgia','Patologia','Prevenção','Diagnóstico','História da odontologia','Ética','Farmacologia']);
for(const [i,term] of rows.entries()){
 const error=(message)=>{throw new Error('Verbete '+(i+1)+' ('+String(term?.slug)+'): '+message)};
 if(!term||typeof term!=='object')error('invalid object');
 if(typeof term.slug!=='string'||!(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).test(term.slug))error('slug must be lowercase kebab-case');
 if(typeof term.term!=='string'||term.term.length<3||term.term.length>110)error('missing/invalid term');
 if(!approvedCategories.has(term.category))error('category not approved');
 if(typeof term.definition!=='string'||term.definition.length<80||term.definition.length>1200)error('definition must be between 80 and 1200 chars');
 if(typeof term.context!=='string'||term.context.length<110||term.context.length>1800)error('context must be 110-1800 chars');
 if(!term.source||typeof term.source.title!=='string'||term.source.title.length<12||!term.source.url)error('missing meaningful source');
 let url;try{url=new URL(term.source.url)}catch{error('source URL invalid')}
 if(url.protocol!=='https:'||url.hostname.length<5)error('source must be a valid HTTPS link');
 if(!/^20\d{2}-\d{2}-\d{2}$/.test(term.publishedAt)||Number.isNaN(Date.parse(term.publishedAt))||term.publishedAt>timeZoneDate)error('invalid or future publishedAt');
 if(slugSet.has(term.slug))error('duplicate slug');slugSet.add(term.slug);
 const canonical=norm(term.term);if(termSet.has(canonical))error('duplicate name');termSet.add(canonical);
 if(/benavera|capim|dr\.cash/i.test(term.term+' '+term.definition+' '+term.context))error('commercial content conflict');
 perDate.set(term.publishedAt,(perDate.get(term.publishedAt)||0)+1);
}
for(const [date,count] of perDate.entries()){
 if(date>='2026-11-15'&&date<='2026-11-24'&&count!==1)throw new Error('Daily batch '+date+' contains '+count+' terms (must publish exactly 1 verified term or skip day)');
}
console.log('Glossary validation passed: '+rows.length+' distinct entries; daily batches '+JSON.stringify(Object.fromEntries(perDate)));
