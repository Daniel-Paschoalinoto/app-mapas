# app-mapas


## O que é

App Vue 3 + Vite (`app-mapas/`) que carrega os arquivos de `src/data/*.json` (um por site/ATS —
GUPY, Solides, Infojobs, etc.) via `import.meta.glob`, e renderiza cada "mapa" em seções fixas:
`root`, `titulo`, `descricao`, `cidade`, `estado`, `tipo`, `url_detalhe`, `salario`, `paginacao`,
`total_vagas`, `total_vagas_site`, `total_anuncios_site`.

Cada seção pode ter `xpath`, `comentario` e uma lista de `processadores` (regex/eval aplicados no
valor extraído — ex.: `RegexReplace`, `Eval`). Alguns nomes de processador (`padraoTitulo`,
`padraoDescricao`, `padraoTipo`) são placeholders que o front expande para um conjunto padrão de
regras, definido em `MapDetails.vue` (`processadoresPadrao`).

## Bug corrigido (2026-09-16)

Ao trocar de mapa no menu, processadores de um mapa apareciam vazando em outro. Causa: em
`MapDetails.vue`, `processadoresMapped` é um `ref({})` único compartilhado entre todos os mapas, e
`mapProcessadores()` só fazia `processadoresMapped.value[key] = ...` para seções que tinham
`processadores` no mapa atual — nunca limpava chaves de mapas anteriores. Seções sem
`processadores` no mapa novo continuavam exibindo o valor do mapa anterior (lido direto via
`processadoresMapped.cidade`, etc., em cada componente de seção).

**Fix:** resetar `processadoresMapped.value = {}` no início de `mapProcessadores()`, antes de
remapear as chaves do mapa atual.

**How to apply:** qualquer estado derivado de `props.map` que seja acumulado num `ref`/objeto
mutável (em vez de recalculado do zero ou via `computed`) é candidato ao mesmo tipo de bug ao
trocar de mapa — vale checar se há outros acumuladores parecidos nesse componente.
