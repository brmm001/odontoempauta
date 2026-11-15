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
