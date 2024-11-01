<template>
  <div class="bg-white w-screen h-screen p-4" v-if="isLoaded">
    <p v-if="!menuOpened" class="top-notice">
      Passe o mouse na borda azul à esquerda da página para acessar o menu
    </p>
    <Menu :mapsList="mapsList" @select-map="selectMap" @menu-open="handleMenuOpen" />
    <MapDetails :map="selectedMap" />
  </div>
  <div v-else class="flex justify-center items-center h-screen">
    <Spinner />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import Menu from './components/Menu.vue';
import MapDetails from './components/MapDetails.vue';
import Spinner from './components/Spinner.vue';

const selectedMap = ref({});
const mapsList = ref([]);
const isLoaded = ref(false);
const menuOpened = ref(false); // Estado para rastrear se o menu está aberto

async function loadMaps() {
  const mapFiles = import.meta.glob('@/data/*.json');

  for (const path in mapFiles) {
    const mapData = await mapFiles[path]();
    const map = { nome: path.split('/').pop().replace('.json', ''), ...mapData };
    mapsList.value.push(map);
  }

  if (mapsList.value.length > 0) {
    selectedMap.value = mapsList.value[0];
  }

  isLoaded.value = true;
}

function selectMap(map) {
  selectedMap.value = map;
}

function handleMenuOpen() {
  menuOpened.value = true;
}

onMounted(loadMaps);

watch(selectedMap, (newMap) => {
  if (newMap.nome) {
    document.title = newMap.nome;
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
  max-height: 100%;
}

.bg-white::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

.top-notice {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 5px 10px;
  font-size: 15px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: blinker 2s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
