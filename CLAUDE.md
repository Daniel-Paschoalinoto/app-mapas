# app-mapas

Este arquivo descreve COMO O APP FUNCIONA HOJE, para localizar rápido o que ler. Não é lista de
correções. Tudo aqui foi verificado no código e nos JSONs (2026-10-06).

## Propósito
SPA Vue 3 + Vite 5 + Tailwind 3 (JavaScript puro) que exibe "mapas" de raspagem de vagas: um mapa por
site/ATS (Gupy, Solides, Infojobs…). Cada mapa descreve, por campo da vaga (título, descrição, cidade…),
o XPath e os processadores de texto a aplicar. A tela mostra isso e cada valor tem um botão que COPIA o
texto para a área de transferência (para colar na ferramenta de configuração do robô de captura).
Somente leitura: não edita, não salva, não chama API. Sem backend, rotas, store, testes, lint ou TS.
Autor: Daniel Paschoalinoto.

Futuro (proposta Orion 2, 2026-10-06, em `DEV/Orion/proposta`): este app será **absorvido pelo Orion**. Os JSONs de
`src/data/` viram templates versionados por ATS (com parâmetros, diff e rollback), e os placeholders de
`processadoresPadrao` viram processadores nomeados do catálogo. Até lá, o app continua sendo a referência dos mapas;
nesse contexto, só se atualiza este `CLAUDE.md` (ver "Relação com os mapas reais do Orion").

## Comandos, build e deploy
- `npm run dev` · `npm run build` (saída em `dist/`, ignorada pelo git) · `npm run preview`.
- Alias `@` = `src/` (vite.config.js e jsconfig.json). `base: '/app-mapas/'` em vite.config.js.
- `.github/workflows/deploy.yml`: push em `main` → `npm install` + `npm run build` (Node 22) → publica
  `dist/` na branch `gh-pages` (peaceiris/actions-gh-pages). `gh-pages` está em devDependencies mas nenhum
  script o usa.
- Remote `origin`: https://github.com/Daniel-Paschoalinoto/app-mapas.git (GitHub).
- Versão em `package.json` → exibida no Header (importada de lá) e listada em `README.md` ("Updates",
  só histórico de versões 1.0.0–1.6.0).
- Dependências runtime: só `vue`. Dev: vite, @vitejs/plugin-vue, tailwindcss, postcss, autoprefixer, gh-pages.
- `.vscode/extensions.json` e `public/favicon-empregos-160x160.webp` (favicon referenciado no index.html).
  `index.html` não tem `<title>`; o título da aba vem do `App.vue`.

## Mapa de arquivos
| Arquivo | Papel |
|---|---|
| `src/main.js` | `createApp(App).mount('#app')` + importa `assets/tailwind.css` (só as 3 diretivas `@tailwind`) |
| `src/App.vue` | estado global, carga dos mapas, layout, aviso do menu, `document.title` |
| `src/components/Menu.vue` | menu lateral deslizante com a lista de mapas |
| `src/components/Header.vue` | barra fixa no topo: nome do mapa + "Versão x.y.z" |
| `src/components/MapDetails.vue` | orquestra as 12 seções; guarda `processadoresPadrao`, `descricaoPadrao`, `hasValueInMap`, cópia/tooltip; CSS GLOBAL (não scoped) |
| `src/components/sections/*.vue` | 1 componente por seção (lista abaixo) |
| `src/components/Spinner.vue` | spinner CSS exibido até `isLoaded` |
| `src/data/*.json` | os mapas: 53 arquivos = 52 sites + `padrao.json` |

Componentes de seção (`sections/`): `Root`, `Titulo`, `Descricao`, `Cidade`, `Estado`, `Tipo`,
`Url_Detalhe`, `Salario`, `Paginacao`, `Total_Vagas`, `Total_Vagas_Site`, `Total_Anuncios_Site`.

## App.vue: carga e seleção
- `import.meta.glob('@/data/*.json')` (lazy). Cada caminho vira `{nome, loader, loaded:false}`; `nome` = nome
  do arquivo sem `.json` (é o texto do menu, do Header e do título da aba). Não há registro manual.
- `loadInitialData` (no `onMounted`): monta `mapsList`, seleciona o primeiro (ordem do glob) e liga
  `isLoaded`. Antes disso renderiza só o `Spinner`.
- `selectMap(map)`: se `!loaded`, executa `loader()`, cria `{...map, ...mapData, loaded:true}`, atribui a
  `selectedMap` e substitui a entrada correspondente em `mapsList` (cache). Se já carregado, só atribui.
- `watch(selectedMap)`: `document.title = nome`.
- `menuOpened` (false até o menu abrir pela 1ª vez) controla o aviso piscante `.top-notice`
  ("Interaja com a lateral esquerda da página para acessar o menu").
- Template: `Header` + `.content` (padding-top 40px) com aviso, `Menu` (`@select-map`, `@menu-open`) e
  `MapDetails :map="selectedMap"`. CSS scoped: `user-select: none` e `overflow-x: hidden` em `*`,
  rolagem vertical sem barra visível no contêiner.

## Menu.vue
- Painel `fixed` de 200px; `menuOffset` -210 (recolhido) ↔ -20 (aberto), via `translateX`.
  `mouseenter` abre e emite `menu-open`; `mouseleave` recolhe.
- Um botão por mapa (`v-for` em `mapsList`, key = `nome`); clique emite `select-map` com o objeto.
  Não há destaque do item selecionado (só estilos de hover/focus).
- Lista inclui `padrao` (o modelo em branco), pois o glob pega todo `*.json`.

## MapDetails.vue
- Ordem de renderização: Root, Titulo, Descricao, Cidade, Estado, Tipo, Url_Detalhe, Salario, Paginacao,
  Total_Vagas, Total_Vagas_Site, Total_Anuncios_Site. Antes delas, um `<div class="tooltip">` único.
- Props para cada seção: `map`, `hasValueInMap` (= `hasValueInMap(map.<chave>)`), evento `copyContent`.
  Extras: `processadoresMapped` (todas, exceto `Root`, `Url_Detalhe`, `Paginacao`); `Descricao` também
  recebe `descricaoPadrao`.
- `hasValueInMap(obj)`: true se algum valor, recursivamente, é diferente de `undefined/null/''`.
  Consequências: seção totalmente vazia não aparece; `posclick: true` isolado já a mostra; lista de
  processadores só com strings vazias não conta.
- `descricaoPadrao`: constante de texto ("Atuará nas atividades internas e demais funções pertinentes ao
  cargo. Necessário conhecimento na área de atuação.").
- `processadoresPadrao`: tabela de regras indexada pelos nomes-placeholder:
  `padraoTitulo` (1 RegexReplace: currículo/talento → "Não Aplicável"),
  `padraoDescricao` (6 RegexReplace de limpeza/pontuação), `padraoTipo` (1 `Eval` que devolve
  `hibrido`/`homeoffice`/`presencial` conforme o texto do nó).
- `processadoresMapped` (`ref({})` único) é recalculado por `mapProcessadores()` no `onMounted` e em
  `watch(() => props.map, …, {deep:true})`. A função zera o objeto e, para cada chave de `props.map` com
  `processadores`, grava `processadoresMapped[chave]`: cada processador cujo `nome` existe em
  `processadoresPadrao` é expandido em N entradas (`{...processador, nome, tipo, de, para}` com os campos
  da regra padrão); os demais passam inalterados. Seção sem `processadores` não gera chave, e o
  `v-for` da seção sobre `undefined` não renderiza nada.
- Cópia: `copyToClipboard(texto, botão)` → `navigator.clipboard.writeText` → `exibirNotificacao`: escreve
  "Copiado" no `.tooltip`, posiciona (fixed) à direita do botão, 20px acima, e esconde após 500 ms.
- CSS global definido aqui (afeta todas as seções): `.section-class` (cartão), `.bg-gray-800` (fundo
  escuro, sobrescreve a classe do Tailwind), `.button-custom` (botão roxo `#727cf5`) e variante
  `[data-type="xpath"]` (amarelo), `.tooltip` (verde).

## Anatomia de uma seção (padrão repetido nos componentes)
Contêiner `div#<chave>.section-class` com `v-if="hasValueInMap"` e, nas seções com `posclick`,
`:class="{'bg-gray-800 text-white': map.<chave>.posclick}"`. Dentro, na ordem:
1. `h1` com o rótulo (`Título:`, `Descrição:`, `Cidade:`, `Estado:`, `Tipo:`, `Salário:`, `Root:`,
   `Total_vagas:`, `Total_vagas_site:`, `Total_anuncios_site:`; `URL_detalhe: (<tipo>)`;
   `Paginação: (<tipo>)` quando há tipo).
2. `comentario` (se houver).
3. `xpath` como texto + botão amarelo "XPath" que copia o xpath (se houver).
4. Para cada item de `processadoresMapped.<chave>`: `<strong>tipo</strong>`; se tem `de` E `para`,
   dois botões separados por ` ⇄ `; senão, um botão para cada campo preenchido. O botão mostra o próprio
   texto copiado.

Particularidades por componente:
- `Descricao`: se `xpath === 'descricaoPadrao'`, exibe e copia a constante `descricaoPadrao` em vez de um
  XPath. Mostra o botão "XPath" mesmo sem xpath (ramo `v-else`).
- `Tipo`: no ramo com só `de` (sem `para`), o botão exibe o texto fixo "Processador tipo" (e copia `de`).
- `Root`: só comentario + xpath (sem `posclick`, sem processadores).
- `Url_Detalhe`: comentario + xpath; título traz `tipo`.
- `Paginacao`: comentario + blocos "Parâmetro", "Url de Paginação ou Rota principal (StartsWith) Exemplo"
  e "Script" (cada valor é um botão que copia); título traz `tipo`. Sem `posclick`.
- `Total_Anuncios_Site`: igual às demais, mas monta a classe como `{'bg-gray-800 text-white': posclick,
  'section-class': true}`.
- Os componentes de seção são cópias quase idênticas entre si (não há componente genérico).

## Esquema dos JSONs (conferido por script nos 53 arquivos)
Todo arquivo tem as mesmas 12 chaves de topo e os mesmos campos:
- `root`: `comentario`, `xpath`.
- `titulo`, `descricao`, `cidade`, `estado`, `tipo`, `salario`, `total_vagas`, `total_vagas_site`,
  `total_anuncios_site`: `posclick`, `comentario`, `xpath`, `processadores[]`.
- `url_detalhe`: `tipo`, `comentario`, `xpath`.
- `paginacao`: `tipo`, `comentario`, `parametro`, `rota_principal`, `script`.
- Processador: `{nome, tipo, de, para}`.
  - `nome`: preenchido apenas com os placeholders `padraoTitulo` (53 arquivos), `padraoDescricao` (50),
    `padraoTipo` (20); nos demais é `""`.
  - `tipo` visto nos dados: `Replace`, `SplitFirst`, `SplitLast`, `RegexReplace`, `RegexMatch` ou vazio.
    `Eval` aparece só dentro de `processadoresPadrao` (código).
- `posclick`: `""` ou `true` (`true` = seção em fundo escuro; no código não há significado de negócio; nos mapas reais = campo da página de detalhe, ver "Relação com os mapas reais do Orion").
- Valores de `url_detalhe.tipo`: `href`, `click`, vazio. De `paginacao.tipo`: vazio, `eval`,
  `intercept`/`Intercept`.
- `descricao.xpath == "descricaoPadrao"` é sentinela (ver `Descricao`).
- `padrao.json`: modelo em branco (`descricao.xpath` já é `descricaoPadrao`; títulos/descrição/tipo já
  com o processador-placeholder; cidade/estado/etc. com processadores vazios).
- Nomes de arquivo têm espaços e acentos (ex.: `Pandapé.json`, `Burh 1.json`); mapas de um mesmo site
  são separados em arquivos numerados (`Infojobs 1/2`, `Kretos 1/2`, `Menvie 1/2/3`, etc.).

## Conceito: mapas e templates (visão para integração futura em outra aplicação)
Este app é hoje um VISUALIZADOR do conceito; o que importa levar adiante é o contrato de dados.
- **Mapa** = um JSON de `src/data/` com o roteiro de captura de um site: onde está cada campo (`xpath`),
  o que fazer com o texto extraído (`processadores`), como paginar (`paginacao`), como chegar ao detalhe
  (`url_detalhe`) e anotações livres (`comentario`). Identidade do mapa = nome do arquivo (não existe
  campo `nome`/`id` dentro do JSON; o app injeta `nome` ao carregar).
- **Template** = `src/data/padrao.json` (esqueleto com as 12 chaves) + os processadores-placeholder
  (`padraoTitulo`, `padraoDescricao`, `padraoTipo`) + a constante `descricaoPadrao`. Os placeholders
  ficam gravados nos JSONs só pelo nome; as regras reais vivem em `processadoresPadrao`
  (`MapDetails.vue`), ou seja, NÃO estão nos JSONs. Quem consumir os JSONs fora deste app precisa
  reproduzir essa expansão (e o sentinela `xpath: "descricaoPadrao"`).
- Semântica dos campos que o código mostra mas não define: `posclick` (`true` = fundo escuro), valores de
  `url_detalhe.tipo` e `paginacao.tipo`, o significado de cada `tipo` de processador e de `de`/`para`
  (o app só exibe e copia; quem interpreta é a ferramenta onde o texto é colado).
- Os mapas não têm versão nem esquema formal (sem JSON Schema); todos compartilham as mesmas chaves
  (verificado), o que sugere partirem do `padrao.json`.

## Relação com os mapas reais do Orion (comparado com `Orion/baseOrion.json` de 05/10/2026)
- Seções → `target` do Orion: `root`→`root`, `titulo`→`vaga_titulo`, `descricao`→`vaga_descricao`, `cidade`→`vaga_cidade`,
  `estado`→`vaga_estado_sigla`, `tipo`→`vaga_tipo`, `salario`→`vaga_salario`, `url_detalhe`→`url_vaga_detalhe`,
  `paginacao`→`paginacao`, `total_*`→mesmo nome.
- `posclick: true` = campo lido na página de detalhe (no Orion fica no 2º item do `pipeline`, com `referrer`); conferido
  no Solides (descrição e tipo no detalhe, o resto na listagem).
- Processador: `tipo` ↔ `typeProcessor` (`EnumTypeProcessor`: Replace 1, RegexMatch 2, RegexReplace 3, Prefix 4, Sufix 5,
  SplitFirst 6, SplitLast 7, Split 8, ImageSequence 9, Eval 10 = expressão C# DynamicExpresso, Dll 11); `de` ↔ `value1`,
  `para` ↔ `value2`.
- `"Nome da Empresa"` dentro do XPath (Trabajo Org, Catho Busca, BNE Busca, Jobijoba) é placeholder: o mapa real leva o nome
  da empresa em minúsculas/sem acento (ver `comentario`).
- Aderência (mapas ativos com root, título, cidade e descrição iguais ao JSON): Solides 454/457, Infojobs 275/289,
  Pandapé 160/263 (101 usam o root antigo `//*[@id="VacancyList"]/a`; o JSON usa `//a`), Selecty 54/78, Jobs Recrutei 19/67.
  No total, 1.117 de 2.150 ativos de ATS que têm JSON aqui.

## Lições e armadilhas (particularidades atuais, úteis para quem for ler ou reaproveitar)
- Estado derivado de `props.map` é zerado a cada recálculo em `mapProcessadores()`; o `processadoresMapped`
  é um único objeto compartilhado entre mapas (houve vazamento entre mapas antes de o reset existir,
  commit 2e752a3, 2026-09-16).
- `Tipo.vue` mostra o texto fixo "Processador tipo" no ramo só-`de`; os outros componentes mostram o `de`.
- Dados com variações de grafia (convivem com o app sem efeito na tela): `posclick: "treu"` em WEBCV 2
  (truthy), `tipo: "SpliFirst"` em Glassdoor e Trabajo Org, `nome: ","` em Zoho Recruit,
  `paginacao.tipo` `intercept` vs `Intercept`. Um consumidor estrito destes JSONs verá essas variações.
- `Glassdoor`, `Izi RH` e `Trabajo Org` não usam o placeholder `padraoDescricao`.
- `padrao.json` aparece no menu como um mapa a mais ("padrao").
- `:key="processador.nome"` nos `v-for` de processadores, e `nome` é `""` na maioria.
- Nomes de arquivo com acentos/espaços (`Pandapé.json`); `git ls-files` os exibe escapados.
- Ambiente: `~/.claude/referencias/` ainda não existe (ambiente da máquina não documentado).

## Onde olhar para…
| Dúvida | Onde |
|---|---|
| Como um mapa vira tela | `App.vue` (carga) → `MapDetails.vue` (seções) → `sections/<X>.vue` |
| Regras dos processadores padrão | `MapDetails.vue`, `processadoresPadrao` |
| Por que uma seção não aparece | `hasValueInMap` em `MapDetails.vue` + valores no JSON |
| Aparência de cartões/botões/tooltip | bloco `<style>` global de `MapDetails.vue` |
| Menu, hover, lista | `Menu.vue` |
| Conteúdo de um site específico | `src/data/<Site>.json` |
| Versão exibida | `package.json` → `Header.vue` |
| Publicação | `.github/workflows/deploy.yml`, `vite.config.js` (`base`) |

## Regras de trabalho deste repo
- Adicionar mapa = criar `src/data/<Nome>.json` (sem mudar código); adicionar seção exige JSON + componente
  em `sections/` + import/uso em `MapDetails.vue`.
- Push em `main` publica o site; git só quando o usuário pedir (regra global).
