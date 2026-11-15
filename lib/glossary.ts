import glossary from '@/content/glossary.json';
export type GlossaryEntry={slug:string;term:string;category:string;definition:string;context:string;source:{title:string;url:string};publishedAt:string};
export const glossaryEntries=(glossary as GlossaryEntry[]).slice().sort((a,b)=>a.term.localeCompare(b.term,'pt-BR'));
export const glossaryCategories=['Todos',...Array.from(new Set(glossaryEntries.map(e=>e.category))).sort((a,b)=>a.localeCompare(b,'pt-BR'))];
export const GLOSSARY_PAGE_SIZE=24;
export function normalizeTerm(text:string){return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()}
