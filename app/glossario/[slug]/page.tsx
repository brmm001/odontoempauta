import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {glossaryEntries} from '@/lib/glossary';
import {articles} from '@/lib/articles';
import {SITE_NAME,SITE_URL} from '@/lib/site';

type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;

export function generateStaticParams(){
  return glossaryEntries.map(({slug})=>({slug}));
}

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params;
  const entry=glossaryEntries.find(item=>item.slug===slug);
  if(!entry)return {title:'Verbete não encontrado',robots:{index:false,follow:false}};
  const description=(entry.definition.length>158?entry.definition.slice(0,155).trimEnd()+'…':entry.definition);
  const permalink='/glossario/'+entry.slug;
  return {
    title:entry.term+' — significado e contexto',
    description,
    alternates:{canonical:permalink},
    openGraph:{type:'article',title:entry.term+' | '+SITE_NAME,description,url:SITE_URL+permalink,publishedTime:entry.publishedAt},
    robots:{index:true,follow:true}
  };
}

export default async function GlossaryItemPage({params}:Props){
  const {slug}=await params;
  const entry=glossaryEntries.find(item=>item.slug===slug);
  if(!entry)notFound();
  const permalink='/glossario/'+entry.slug;
  const sameCategory=glossaryEntries.filter(item=>item.slug!==entry.slug&&item.category===entry.category);
  const otherCategories=glossaryEntries.filter(item=>item.slug!==entry.slug&&item.category!==entry.category);
  const related=[...sameCategory,...otherCategories].slice(0,5);
  const relatedArticles=articles.filter(article=>article.category===entry.category).slice(0,2);

  const jsonLd={
    '@context':'https://schema.org',
    '@graph':[
      {'@type':'WebPage','@id':SITE_URL+permalink+'#webpage',url:SITE_URL+permalink,name:entry.term+' — glossário odontológico',inLanguage:'pt-BR',datePublished:entry.publishedAt,
       mainEntity:{'@id':SITE_URL+permalink+'#term'},isPartOf:{'@id':SITE_URL+'/glossario#glossary'}},
      {'@type':'DefinedTerm','@id':SITE_URL+permalink+'#term',name:entry.term,description:entry.definition,termCode:entry.slug,
       inDefinedTermSet:{'@type':'DefinedTermSet','@id':SITE_URL+'/glossario#glossary',name:'Glossário Odonto em Pauta',url:SITE_URL+'/glossario'}},
      {'@type':'BreadcrumbList',itemListElement:[
        {'@type':'ListItem',position:1,name:'Início',item:SITE_URL},
        {'@type':'ListItem',position:2,name:'Glossário',item:SITE_URL+'/glossario'},
        {'@type':'ListItem',position:3,name:entry.term,item:SITE_URL+permalink}
      ]}
    ]
  };

  return <main className="page-container oe-term-page">
    <nav className="oe-term-crumbs" aria-label="Caminho de navegação">
      <Link href="/">Início</Link><span aria-hidden="true">/</span>
      <Link href="/glossario">Glossário</Link><span aria-hidden="true">/</span>
      <span aria-current="page">{entry.term}</span>
    </nav>

    <header className="oe-term-hero">
      <div className="oe-term-hero-main">
        <div className="oe-term-kicker"><span>GLOSSÁRIO ODONTOLÓGICO</span><i aria-hidden="true"/> {entry.category.toUpperCase()}</div>
        <h1>{entry.term}</h1>
        <p>{entry.definition}</p>
        <div className="oe-term-hero-foot">
          <span>VERBETE / {entry.category.toUpperCase()}</span>
          <span>PUBLICADO EM {new Intl.DateTimeFormat('pt-BR',{timeZone:'UTC'}).format(new Date(entry.publishedAt+'T12:00:00Z'))}</span>
        </div>
      </div>
      <div className="oe-term-hero-art" aria-hidden="true"><span>o.</span><span className="oe-term-art-circle"/><small>CONHECIMENTO<br/>EM CONTEXTO</small></div>
    </header>

    <div className="oe-term-layout">
      <article className="oe-term-main">
        <section className="oe-term-detail-block" aria-labelledby="definicao">
          <div className="oe-term-section-counter">01 / SIGNIFICADO</div>
          <h2 id="definicao">O que é {entry.term}?</h2>
          <p>{entry.definition}</p>
        </section>
        <section className="oe-term-detail-block" aria-labelledby="contexto">
          <div className="oe-term-section-counter">02 / NA PRÁTICA</div>
          <h2 id="contexto">Como entender esse conceito</h2>
          <p>{entry.context}</p>
          <p className="oe-term-context-note">O uso profissional desse conceito depende de sua aplicação, da evidência disponível e de normas técnicas pertinentes. Esta definição é educativa e não representa diagnóstico ou indicação individual.</p>
        </section>
        <section className="oe-term-reference" aria-labelledby="fonte">
          <div className="oe-term-section-counter">03 / FONTE</div>
          <h2 id="fonte">Onde conferir</h2>
          <p>O verbete foi preparado com base em uma referência identificável. Consulte o documento e confira sua versão e aplicabilidade.</p>
          <a href={entry.source.url} target="_blank" rel="noopener noreferrer">{entry.source.title} <span aria-hidden="true">↗</span></a>
        </section>
        {relatedArticles.length>0&&<section className="oe-term-related-articles" aria-labelledby="artigos-relacionados">
          <div className="oe-term-section-counter">LEITURA COMPLEMENTAR</div>
          <h2 id="artigos-relacionados">Aprofunde o assunto</h2>
          {relatedArticles.map(a=><Link href={'/artigos/'+a.slug} key={a.slug}>{a.title}<span aria-hidden="true">↗</span></Link>)}
        </section>}
      </article>
      <aside className="oe-term-aside" aria-label="Navegação relacionada">
        <div className="oe-term-aside-heading">CONTINUE EXPLORANDO</div>
        <h2>Outros termos<br/><em>em pauta.</em></h2>
        <div>{related.map((item,i)=><Link href={'/glossario/'+item.slug} key={item.slug}><span>{String(i+1).padStart(2,'0')}</span><strong>{item.term}</strong><span aria-hidden="true">↗</span></Link>)}</div>
        <Link href="/glossario" className="oe-term-all-link">VER GLOSSÁRIO COMPLETO <span aria-hidden="true">↗</span></Link>
      </aside>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
  </main>;
}
