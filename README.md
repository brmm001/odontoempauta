# Odonto em Pauta

Portal editorial independente sobre gestão, finanças e inovação na odontologia.

## Desenvolvimento

```bash
npm install
npm run typecheck
npm run dev
npm run build
```

## Produção

Importe o repositório na Vercel, selecione **Next.js**, configure `NEXT_PUBLIC_SITE_URL` com o endereço final (por exemplo, `https://www.odontoempauta.com.br`) e publique. O domínio é um exemplo, não há confirmação de registro.

## SEO e descoberta por IA

App Router, renderização no servidor, páginas estáticas de artigos, metadados individuais, canonical, schema `WebSite` e `Article`, sitemap, RSS, robots com acesso a OAI-SearchBot e GPTBot e `llms.txt` experimental.

Acessibilidade para rastreadores não significa que IA utilizará o site como fonte, citará o conteúdo ou o incluirá em treinamento.

## Conteúdo e integridade

Edite artigos em `lib/articles.ts`. Não há CMS administrativo nem publicação automatizada nesta versão. Notícias só devem ser inseridas com verificação de fatos, autoria e fontes. Não inventar notícias, clientes, números ou depoimentos. Conteúdos patrocinados e vínculos comerciais relevantes precisam ser identificados.

## Antes do lançamento

Verifique domínio e marca, configure e-mail editorial, revise conteúdo jurídico/financeiro, configure Search Console e Bing Webmaster Tools, realize build e teste em produção.
