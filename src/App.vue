<template>
  <div class="bg-white w-screen h-screen p-4">
    <Menu @select-map="selectMap" />
    <MapDetails :map="selectedMap" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Menu from './components/Menu.vue';
import MapDetails from './components/MapDetails.vue'; // Importa o novo componente

const selectedMap = ref({});

// Função para selecionar o mapa recebido do Menu
function selectMap(map) {
  selectedMap.value = map;
}

// Watch para atualizar o título da página
watch(selectedMap, (newMap) => {
  if (newMap.nome) {
    document.title = newMap.nome; // Atualiza o título da página
  }
});


</script>

<style scoped>
* {
  user-select: none;
  overflow-x: hidden;
}

.bg-white {
  overflow-y: scroll;
  /* Permite rolagem vertical */
  max-height: 100%;
  /* Altura máxima do contêiner */
}

/* Oculta a barra de rolagem */
.bg-white::-webkit-scrollbar {
  width: 0;
  /* Oculta a largura da barra de rolagem */
  background: transparent;
  /* Define a cor de fundo da barra de rolagem */
}
</style>
