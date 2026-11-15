import type {MetadataRoute} from 'next';
import {articles} from '@/lib/articles';
import {glossaryEntries,GLOSSARY_PAGE_SIZE} from '@/lib/glossary';
import {SITE_URL} from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{
 const pages=['','/artigos','/dados','/glossario','/sobre','/metodologia','/politica-editorial','/privacidade','/contato'];
 const updated=glossaryEntries.reduce((d,e)=>e.publishedAt>d?e.publishedAt:d,'2026-11-14');
 const glossaryPages=Array.from({length:Math.max(0,Math.ceil(glossaryEntries.length/GLOSSARY_PAGE_SIZE)-1)},(_,i)=>({
   url:SITE_URL+'/glossario?pagina='+(i+2),lastModified:new Date(updated+'T12:00:00-03:00'),changeFrequency:'weekly' as const,priority:0.55
 }));
 return [
 ...pages.map(p=>({url:SITE_URL+p,changeFrequency:'weekly' as const,priority:p===''?1:p==='/artigos'?0.9:0.6,...(p==='/glossario'?{lastModified:new Date(updated+'T12:00:00-03:00')}:{} )})),
 ...glossaryPages,
 ...articles.map(a=>({url:SITE_URL+'/artigos/'+a.slug,lastModified:new Date((a.updatedAt||a.publishedAt)+'T12:00:00-03:00'),changeFrequency:'monthly' as const,priority:a.featured?0.9:0.75}))
 ];
}
