import type {Metadata} from 'next';
import Link from 'next/link';
import {glossaryEntries,glossaryCategories,normalizeTerm,GLOSSARY_PAGE_SIZE} from '@/lib/glossary';
import {SITE_URL} from '@/lib/site';
type Search={q?:string;categoria?:string;pagina?:string};
type Props={searchParams:Promise<Search>};
function pageNumber(raw:string|undefined){const n=Number(raw||1);return Number.isSafeInteger(n)&&n>0?n:1}
export async function generateMetadata({searchParams}:Props):Promise<Metadata>{
 const p=await searchParams;const page=pageNumber(p.pagina);
 const faceted=Boolean(p.q||p.categoria);
 return {title:page===1?'Glossário de odontologia, pesquisa e biossegurança':`Glossário odontológico — página ${page}`,description:'Definições originais, contexto e fontes de referência sobre odontologia, saúde pública, pesquisa, radiologia e biossegurança.',alternates:{canonical:page===1?'/glossario':`/glossario?pagina=${page}`},robots:faceted?{index:false,follow:true}:{index:true,follow:true}}
}
export default async function Glossario({searchParams}:Props){
 const params=await searchParams;
 const q=(params.q||'').trim().slice(0,130);
 const categoria=(params.categoria||'').trim();
 const filter=normalizeTerm(q);
 const filtered=glossaryEntries.filter(t=>(!categoria||t.category===categoria)&&(!filter||normalizeTerm(t.term+' '+t.definition+' '+t.context).includes(filter)));
 const pages=Math.max(1,Math.ceil(filtered.length/GLOSSARY_PAGE_SIZE));
 const current=Math.min(pageNumber(params.pagina),pages);
 const entries=filtered.slice((current-1)*GLOSSARY_PAGE_SIZE,current*GLOSSARY_PAGE_SIZE);
 const makeUrl=(page:number)=>{const query=new URLSearchParams();if(q)query.set('q',q);if(categoria)query.set('categoria',categoria);if(page>1)query.set('pagina',String(page));const s=query.toString();return '/glossario'+(s?'?'+s:'')};
 const firstVisible=(current-1)*GLOSSARY_PAGE_SIZE+1;
 const pageLinks=Array.from(new Set([1,current-2,current-1,current,current+1,current+2,pages].filter(n=>n>=1&&n<=pages))).sort((a,b)=>a-b);
 const schema={'@context':'https://schema.org','@type':'DefinedTermSet','@id':SITE_URL+'/glossario#glossary',name:'Glossário Odonto em Pauta',inLanguage:'pt-BR',url:SITE_URL+'/glossario',description:'Termos técnicos de odontologia explicados em linguagem acessível com contexto e fontes.',hasDefinedTerm:entries.map(e=>({'@type':'DefinedTerm',name:e.term,description:e.definition,url:SITE_URL+makeUrl(current)+'#'+e.slug}))};
 return <main className="page-container inside-page oe-glossary">
  <div className="page-topline"><span>REFERÊNCIA / GLOSSÁRIO</span><span>DEFINIÇÕES CONTEXTUALIZADAS</span></div>
  <div className="inside-header oe-glossary-intro">
   <span className="eyebrow">VOCABULÁRIO DA ODONTOLOGIA</span>
   <h1>Um universo de<br/><em>significados.</em></h1>
   <p>Termos científicos e profissionais explicados sem enrolação. Cada verbete apresenta definição, contexto e fonte consultável — não substitui protocolos técnicos ou diagnóstico.</p>
   <div className="oe-glossary-stats"><div><strong>{glossaryEntries.length.toLocaleString('pt-BR')}</strong><span>TERMOS DISPONÍVEIS</span></div><div><strong>{glossaryCategories.length-1}</strong><span>ÁREAS DO CONHECIMENTO</span></div><div><strong>01</strong><span>BIBLIOTECA EM EXPANSÃO</span></div></div>
  </div>
  <section aria-label="Pesquisar o glossário" className="oe-glossary-search">
   <form method="GET" action="/glossario">
    <label htmlFor="g-search">PESQUISAR UM CONCEITO</label>
    <div className="oe-glossary-search-row">
     <input id="g-search" type="search" name="q" defaultValue={q} placeholder="Ex.: CBCT, biossegurança, epidemiologia…" maxLength={130}/>
     <label htmlFor="g-category" className="visually-hidden">Área do conhecimento</label>
     <select id="g-category" name="categoria" defaultValue={categoria}><option value="">Todas as áreas</option>{glossaryCategories.filter(c=>c!=='Todos').map(cat=><option value={cat} key={cat}>{cat}</option>)}</select>
     <button type="submit">PESQUISAR <span aria-hidden="true">↗</span></button>
    </div>
   </form>
   <div className="oe-glossary-subline"><span>{filtered.length.toLocaleString('pt-BR')} {filtered.length===1?'resultado':'resultados'}{filtered.length>0&&` · exibindo ${firstVisible}–${Math.min(current*GLOSSARY_PAGE_SIZE,filtered.length)}`}</span>{q||categoria?<Link href="/glossario">Limpar filtros ×</Link>:<span>EXPLORAR CONCEITOS DE A A Z</span>}</div>
  </section>
  {entries.length===0?<div className="oe-glossary-empty"><h2>Nenhum verbete encontrado.</h2><p>Tente uma palavra relacionada ou retire os filtros.</p><Link href="/glossario">Ver todos os verbetes ↗</Link></div>:<section aria-label="Verbetes encontrados" className="oe-glossary-list">{entries.map((e,i)=><article className="oe-term" id={e.slug} key={e.slug}><div className="oe-term-marker">{String(firstVisible+i).padStart(3,'0')} <span aria-hidden="true">↗</span></div><div className="oe-term-content"><div className="oe-term-tag">{e.category}</div><h2>{e.term}</h2><p className="oe-term-definition">{e.definition}</p><p className="oe-term-context">{e.context}</p><div className="oe-term-source"><span>FONTE DE REFERÊNCIA</span><a href={e.source.url} target="_blank" rel="noopener noreferrer">{e.source.title} ↗</a></div></div></article>)}</section>}
  {pages>1&&<nav aria-label="Navegar pelas páginas do glossário" className="oe-glossary-pagination">
   <div>{current>1?<Link href={makeUrl(current-1)}>← Anterior</Link>:<span>← Anterior</span>}</div>
   <div className="oe-glossary-page-links">{pageLinks.map((p,i)=><span key={p}>{i>0&&p-pageLinks[i-1]>1&&<span className="oe-glossary-ellipsis">…</span>}<Link href={makeUrl(p)} aria-current={p===current?'page':undefined}>{p}</Link></span>)}</div>
   <div>{current<pages?<Link href={makeUrl(current+1)}>Próxima →</Link>:<span>Próxima →</span>}</div>
  </nav>}
  <div className="oe-glossary-disclaimer"><strong>Como usar esta página</strong><p>As definições apresentam conceitos gerais em linguagem acessível. Para decisões clínicas, verifique diretrizes, estudos primários e avaliação de profissionais habilitados. Referências externas não representam aprovação das interpretações editoriais.</p><Link href="/metodologia">Entenda nosso método editorial ↗</Link></div>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
 </main>
}