import Link from 'next/link';
import type {Metadata} from 'next';
import {articles,formatDate,readingMinutes} from '@/lib/articles';
import styles from './home.module.css';

export const metadata:Metadata={
  title:'Odonto em Pauta | A odontologia além do óbvio',
  description:'Revista digital independente sobre ciência, saúde pública, inovação e cultura odontológica. Dossiês aprofundados, dados e fontes verificáveis.',
  alternates:{canonical:'/'}
};

const topics=['SAÚDE PÚBLICA','PESQUISA','TECNOLOGIA','RADIOLOGIA','BIOSSEGURANÇA','REGULAÇÃO'];
const feature=articles[0];
const secondary=articles.slice(1,3);
const other=articles.slice(3,6);

function OutlineTooth(){
  return <svg className={styles.toothSvg} viewBox="0 0 360 430" fill="none" aria-hidden="true">
    <path d="M178 68C125 33 63 58 51 120c-16 78 20 132 47 194 13 31 20 79 43 79 29 0 21-98 48-98 25 0 23 98 48 98 21 0 27-44 43-78 28-62 66-129 39-199C296 57 239 36 178 68Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round"/>
    <path d="M86 115c9-25 25-38 47-43M245 80c24 10 41 29 48 52" stroke="currentColor" strokeWidth="5" opacity=".56" strokeLinecap="round"/>
    <path d="M181 15v400M24 213h312" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 9" opacity=".35"/>
    <circle cx="182" cy="214" r="138" stroke="currentColor" strokeWidth="1" opacity=".2"/>
  </svg>;
}

export default function Home(){
  return <main className={styles.page}>
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.heroMeta}><span>ODONTO EM PAUTA / REVISTA DIGITAL</span><span>CIÊNCIA • CULTURA • CONTEXTO</span></div>
      <div className={styles.heroGrid}>
        <div className={styles.heroText}>
          <span className={styles.kicker}><span className={styles.kickerDot} aria-hidden="true"/> UM NOVO ÂNGULO SOBRE A PROFISSÃO</span>
          <h1 id="home-title">Muito além do <em>consultório.</em></h1>
          <p>O que realmente está mudando a odontologia? Encontramos as perguntas, investigamos as fontes e contamos as histórias que importam.</p>
          <div className={styles.heroActions}>
            <Link href="#edicao" className={styles.primaryButton}>EXPLORAR A EDIÇÃO <span aria-hidden="true">↗</span></Link>
            <Link href="/sobre" className={styles.textButton}>CONHECER A REVISTA <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className={styles.heroArt} aria-hidden="true">
          <div className={styles.artCanvas}>
            <div className={styles.ringOne}/>
            <div className={styles.ringTwo}/>
            <div className={styles.artDisk}><OutlineTooth/></div>
            <div className={styles.orbitDot}/>
            <span className={styles.artMarker}>FIGURA 01 / CAMADAS DO CONHECIMENTO</span>
          </div>
        </div>
      </div>
      <div className={styles.heroBottom}><span>EDIÇÃO EM MOVIMENTO</span><span>LEITURAS PARA OLHAR MAIS LONGE <span aria-hidden="true">↓</span></span></div>
    </section>

    <div className={styles.topicBelt} aria-label="Temas da revista">
      <div className={styles.topicTrack} aria-hidden="true">
        {[...topics,...topics].map((topic,i)=><span key={i}><b>✳</b>{topic}</span>)}
      </div>
    </div>

    <section className={styles.intro} id="edicao" aria-labelledby="intro-title">
      <div className={styles.introLabel}><span className={styles.sectionNum}>01 /</span><span>CARTA A QUEM LÊ</span></div>
      <div className={styles.introText}>
        <h2 id="intro-title">Menos ruído.<br/><em>Mais descoberta.</em></h2>
        <p>Odontologia não se resume à cadeira clínica. Tem pesquisa que desafia certezas, tecnologia que abre perguntas e políticas públicas que afetam milhões de pessoas. É sobre isso que queremos conversar.</p>
        <Link href="/metodologia" className={styles.inlineLink}>COMO PRODUZIMOS OS NOSSOS CONTEÚDOS <span aria-hidden="true">↗</span></Link>
      </div>
      <div className={styles.introSeal} aria-hidden="true"><span>OEP</span><small>REVISTA<br/>DE IDEIAS</small></div>
    </section>

    <section className={styles.cover} aria-labelledby="cover-title">
      <div className={styles.sectionHeading}><span>02 / HISTÓRIA DE CAPA</span><span>UM TEMA PARA ENTENDER A FUNDO</span></div>
      <div className={styles.coverGrid}>
        <div className={styles.coverText}>
          <span className={styles.coverCategory}>{feature.category.toUpperCase()} <i/> {readingMinutes(feature)} MIN DE LEITURA</span>
          <h2 id="cover-title">{feature.title}</h2>
          <p>{feature.deck}</p>
          <Link href={'/artigos/'+feature.slug} className={styles.coverLink}>LER O DOSSIÊ COMPLETO <span aria-hidden="true">↗</span></Link>
        </div>
        <Link href={'/artigos/'+feature.slug} className={styles.coverArtwork} aria-label={'Ler: '+feature.title}>
          <div className={styles.coverPattern} aria-hidden="true"><span>01</span><i/><b>EM PAUTA</b></div>
          <div className={styles.coverArtLabel}>{feature.category.toUpperCase()} / ANÁLISE</div>
        </Link>
      </div>
      <div className={styles.coverFooter}><span>PUBLICADO EM {formatDate(feature.publishedAt).toUpperCase()}</span><span>REFERÊNCIAS E CONTEXTO NA MATÉRIA</span></div>
    </section>

    <section className={styles.editorial} aria-labelledby="editorial-title">
      <div className={styles.editorialHeading}>
        <div><span className={styles.eyebrow}>03 / PARA LER COM CALMA</span><h2 id="editorial-title">O mundo em <em>outras lentes.</em></h2></div>
        <Link href="/artigos" className={styles.indexLink}>VER TODOS OS ARTIGOS <span aria-hidden="true">↗</span></Link>
      </div>
      <div className={styles.editorialGrid}>
        {secondary.map((story,i)=><Link href={'/artigos/'+story.slug} key={story.slug} className={styles.editorialStory}>
          <div className={styles.storyVisual} data-tone={i}><span aria-hidden="true">{i===0?'◎':'✳'}</span><small>{String(i+2).padStart(2,'0')} / PERSPECTIVAS</small></div>
          <div className={styles.storyText}><span className={styles.storyCategory}>{story.category.toUpperCase()} • {readingMinutes(story)} MIN</span><h3>{story.title}</h3><p>{story.deck}</p><div className={styles.storyRead}>CONTINUAR LENDO <span aria-hidden="true">↗</span></div></div>
        </Link>)}
      </div>
    </section>

    <section className={styles.indexSection} aria-labelledby="index-title">
      <div className={styles.indexHeading}><span className={styles.eyebrow}>04 / MAIS PERSPECTIVAS</span><h2 id="index-title">Novos assuntos.<br/><em>Novas conexões.</em></h2></div>
      <div className={styles.indexList}>
        {other.map((story,i)=><Link href={'/artigos/'+story.slug} className={styles.indexRow} key={story.slug}>
          <span className={styles.indexNumber}>{String(i+4).padStart(2,'0')}</span>
          <div><span>{story.category.toUpperCase()}</span><h3>{story.title}</h3><p>{story.deck}</p></div>
          <span className={styles.indexArrow} aria-hidden="true">↗</span>
        </Link>)}
      </div>
    </section>

    <section className={styles.statSection} aria-labelledby="stat-title">
      <div className={styles.statInner}>
        <div className={styles.statCopy}><span className={styles.eyebrow}>05 / OBSERVATÓRIO</span><h2 id="stat-title">A realidade não cabe <em>num número.</em></h2><p>Mas os dados certos podem abrir boas perguntas. No SB Brasil 2023, o índice CPO-D médio aos 12 anos foi 1,67. O contexto está na pesquisa.</p><Link href="/dados" className={styles.statLink}>EXPLORAR O PAINEL DE DADOS <span aria-hidden="true">↗</span></Link></div>
        <div className={styles.statNumber}><span>SB BRASIL 2023</span><strong>1<span>,</span>67</strong><small>CPO-D MÉDIO AOS 12 ANOS<br/>FONTE: MINISTÉRIO DA SAÚDE</small></div>
      </div>
    </section>

    <section className={styles.endNote}><span>MAIS PROFUNDIDADE, MENOS PRESSA.</span><h2>Fique <em>em pauta.</em></h2><Link href="/artigos">EXPLORAR A BIBLIOTECA <span aria-hidden="true">↗</span></Link></section>
  </main>;
}
