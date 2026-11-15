import fs from 'node:fs';
const src=fs.readFileSync(new URL('../lib/articles.ts',import.meta.url),'utf8');
const chunks=src.split(/\n\{\nslug:'/).slice(1);
if(chunks.length<5)throw new Error('Biblioteca com poucos dossiês: '+chunks.length);
const slugs=new Set(),titles=new Set();
for(const chunk of chunks){const slug=chunk.match(/^([^']+)'/)?.[1];const title=chunk.match(/\ntitle:'([^']+)'/)?.[1];if(!slug||!title)throw new Error('Artigo sem slug ou título');const normalized=title.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();if(slugs.has(slug)||titles.has(normalized))throw new Error('Artigo repetido: '+slug);slugs.add(slug);titles.add(normalized);if(/financia|parcel|credito|boleto|carne|recebiveis|funil-de-vendas|aprovacao-de-orcamentos/i.test(slug))throw new Error('Assunto conflita com o escopo comercial de outros sites: '+slug);const words=(chunk.match(/[A-Za-zÀ-ÿ]{3,}/g)||[]).length;if(words<380)throw new Error('Artigo muito raso: '+slug+' ('+words+' tokens lexicais)');}
console.log('Auditoria editorial inicial aprovada:',slugs.size,'artigos únicos, sem assuntos financeiros comerciais e com profundidade mínima.');
