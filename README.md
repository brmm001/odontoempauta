# Odonto em Pauta

Portal editorial digital sobre ciência, pesquisa, normas sanitárias e tecnologia odontológica. Projeto independente na infraestrutura: não compartilha código, conteúdo nem SEO com outros sites.

## Executar

```bash
npm install
npm run dev
npm run build
```

Vercel: conectado ao GitHub `brmm001/odontoempauta` na branch `main`. O endereço canônico vem de `NEXT_PUBLIC_SITE_URL`.

## Princípios editoriais
- Sem duplicar pautas e artigos de sites comerciais relacionados; auditoria inicial em títulos e slugs do repositório Benavera.
- Não publicar notícias inventadas nem resumir fontes sem contribuição editorial.
- Artigos com tópicos claros, síntese, fontes primárias e FAQ visível.
- Publicação e revisão com datas reais; nenhuma credencial fictícia.
- Conteúdo informativo, sem diagnóstico clínico nem parecer jurídico.

## SEO e descoberta por IA
- Next.js com HTML no servidor e artigos estáticos.
- Metadata individual e canonical; sitemap e RSS.
- Article, BreadcrumbList, WebSite e Organization em JSON-LD.
- OAI-SearchBot e GPTBot permitidos em robots.txt.
- llms.txt é opcional e não confere autoridade nem garante treinamento.
- Imagens editoriais vetoriais próprias; sem fotos de terceiros ou ativos protegidos.

## Próximas etapas editoriais
Validar indexação em Search Console e Bing Webmaster Tools, configurar domínio e contato; revisar conteúdo com especialistas identificáveis para matérias técnicas, estabelecer agenda de apuração original.


## Glossário diário (lotes editoriais)
- A fonte dos verbetes é `content/glossary.json`; sem banco de dados ou credenciais no navegador.
- Cada entrada precisa ter `slug`, `term`, `category`, `definition`, `context`, `source:{title,url}`, `publishedAt`.
- A página `/glossario` tem pesquisa e paginação de 24 verbetes; todas as definições aparecem em HTML no servidor.
- `npm run audit:glossary` bloqueia duplicatas, descrições rasas, URLs inválidas e lotes incompletos para as dez datas de 15 a 24 de novembro de 2026.
- Planejamento editorial: até 100 verbetes originais por dia nas dez datas, condicionados a fontes verificáveis e à aprovação do build. Não criar entradas artificiais para completar uma meta.
- O projeto de automação fica no agendador da conta ChatGPT e **não** no repositório. Sem chaves de API ou tokens.
