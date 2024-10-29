<template>
  <div class="tooltip"></div>

  <Root :map="map" :hasValueInMap="hasValueInMap(map.root)" @copyContent="copyToClipboard" />

  <Titulo :map="map" :hasValueInMap="hasValueInMap(map.titulo)" :processadoresMapped="processadoresMapped"
    @copyContent="copyToClipboard" />

  <Descricao :map="map" :hasValueInMap="hasValueInMap(map.descricao)" :descricaoPadrao="descricaoPadrao"
    :processadoresMapped="processadoresMapped" @copyContent="copyToClipboard" />

  <Cidade :map="map" :hasValueInMap="hasValueInMap(map.cidade)" :processadoresMapped="processadoresMapped"
    @copyContent="copyToClipboard" />

  <Estado :map="map" :hasValueInMap="hasValueInMap(map.estado)" :processadoresMapped="processadoresMapped"
    @copyContent="copyToClipboard" />

  <Tipo :map="map" :hasValueInMap="hasValueInMap(map.tipo)" :processadoresMapped="processadoresMapped"
    @copyContent="copyToClipboard" />

  <Url_Detalhe :map="map" :hasValueInMap="hasValueInMap(map.url_detalhe)" @copyContent="copyToClipboard" />

  <Salario :map="map" :hasValueInMap="hasValueInMap(map.salario)" :processadoresMapped="processadoresMapped"
    @copyContent="copyToClipboard" />

  <Paginacao :map="map" :hasValueInMap="hasValueInMap(map.paginacao)" @copyContent="copyToClipboard" />

  <Total_Vagas :map="map" :hasValueInMap="hasValueInMap(map.total_vagas)" :processadoresMapped="processadoresMapped"
    @copyContent="copyToClipboard" />

  <Total_Vagas_Site :map="map" :hasValueInMap="hasValueInMap(map.total_vagas_site)"
    :processadoresMapped="processadoresMapped" @copyContent="copyToClipboard" />

  <Total_Anuncios_Site :map="map" :hasValueInMap="hasValueInMap(map.total_anuncios_site)"
    :processadoresMapped="processadoresMapped" @copyContent="copyToClipboard" />

</template>


<script setup>

import { ref, onMounted, watch } from 'vue';
import Root from './sections/Root.vue';
import Titulo from './sections/Titulo.vue';
import Descricao from './sections/Descricao.vue';
import Cidade from './sections/Cidade.vue';
import Estado from './sections/Estado.vue';
import Tipo from './sections/Tipo.vue';
import Url_Detalhe from './sections/Url_Detalhe.vue';
import Salario from './sections/Salario.vue';
import Paginacao from './sections/Paginacao.vue';
import Total_Vagas from './sections/Total_Vagas.vue';
import Total_Vagas_Site from './sections/Total_Vagas_Site.vue';
import Total_Anuncios_Site from './sections/Total_Anuncios_Site.vue';


const props = defineProps({
  map: {
    type: Object,
    required: true,
  }
});

const descricaoPadrao = "Atuará nas atividades internas e demais funções pertinentes ao cargo. Necessário conhecimento na área de atuação."

const processadoresPadrao = {
  padraoTitulo: [
    {
      nome: "ProcessadorCurriculos",
      tipo: "RegexReplace",
      de: ".+(curr[ií]culo[s]?|talento[s]?).+",
      para: "Não Aplicável"
    }
  ],
  padraoDescricao: [
    {
      nome: "ProcessadorInicio",
      tipo: "RegexReplace",
      de: "^[\\-\\.\"#@•*'`:!?–]+",
      para: ""
    },
    {
      nome: "RemoverEspacos",
      tipo: "RegexReplace",
      de: "\\s*([.!?;:\\-·*/—•])\\s*",
      para: "$1"
    },
    {
      nome: "RemoverRepeticoes",
      tipo: "RegexReplace",
      de: "([.!?;:\\s-·*•/])\\s*([.!?;:\\s-·*•/])+",
      para: "$1"
    },
    {
      nome: "PontoEspaco",
      tipo: "RegexReplace",
      de: "\\s*[—;|.•](?:\\s*[—;|.•])*\\s*",
      para: ". "
    },
    {
      nome: "IncluirEspaco",
      tipo: "RegexReplace",
      de: "[?!]",
      para: "$& "
    },
    {
      nome: "IncluirPontoFinal",
      tipo: "RegexReplace",
      de: "([^\\.\\s])$",
      para: "$1."
    }
  ],
  padraoTipo: [
    {
      nome: "PadronizaModalidade",
      tipo: "Eval",
      de: "HtmlNode.InnerText.ToLower().Contains(\"hibrido\") || HtmlNode.InnerText.ToLower().Contains(\"híbrido\") ? \"hibrido\" : HtmlNode.InnerText.ToLower().Contains(\"office\") || HtmlNode.InnerText.ToLower().Contains(\"remoto\") || HtmlNode.InnerText.ToLower().Contains(\"remota\") ? \"homeoffice\" : \"presencial\"",
      para: ""
    }
  ]
};

function hasValueInMap(obj) {
  if (!obj || typeof obj !== 'object') return false;

  return Object.values(obj).some(value =>
    value !== undefined && value !== null && value !== '' &&
    (typeof value !== 'object' || hasValueInMap(value))
  );
}

async function copyToClipboard(text, button) {
  await navigator.clipboard.writeText(text);
  await exibirNotificacao(button, 'Copiado');
}

async function exibirNotificacao(button, mensagem) {
  var tooltip = document.querySelector('.tooltip');
  tooltip.innerText = mensagem;
  tooltip.style.display = 'block';

  var rect = button.getBoundingClientRect();
  var x = rect.left + rect.width;
  var y = rect.top - 20;
  tooltip.style.top = y + 'px';
  tooltip.style.left = x + 'px';

  setTimeout(function () {
    tooltip.style.display = 'none';
  }, 500);
}

const processadoresMapped = ref({});

function mapProcessadores() {
  Object.keys(props.map).forEach(key => {
    if (props.map[key].processadores) {
      processadoresMapped.value[key] = props.map[key].processadores.flatMap(processador => {
        const padrao = processadoresPadrao[processador.nome];
        if (padrao) {
          return padrao.map(p => ({
            ...processador,
            nome: p.nome,
            tipo: p.tipo,
            de: p.de,

            para: p.para
          }));
        } else {
          return [processador];
        }
      });
    }
  });
}

onMounted(() => {
  mapProcessadores();
});

watch(() => props.map, () => {
  mapProcessadores();
}, { deep: true });

</script>

<style>
.section-class {
  margin-bottom: 5px;
  padding: 10px;
  border: 1px solid #cac7c7;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.bg-gray-800 {
  background-color: #2a2d32;
  color: white;
}

.button-custom {
  background-color: #727cf5;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin: 1px 5px;
}

.button-custom:hover {
  background-color: #4f65df;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.button-custom:active {
  background-color: #3e53d8;
  box-shadow: none;
}

.tooltip {
  display: none;
  position: fixed;
  background-color: #37a326;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 9999;
}

.button-custom[data-type="xpath"] {
  background-color: #ffcc00;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-custom[data-type="xpath"]:hover {
  background-color: #ffbb00;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.button-custom[data-type="xpath"]:active {
  background-color: #ffaa00;
  box-shadow: none;
}
</style>