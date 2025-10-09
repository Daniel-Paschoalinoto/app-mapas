<template>
  <div class="bg-white w-screen h-screen p-4" v-if="isLoaded">
    <Header :map="selectedMap" />
    <div class="content">
      <p v-if="!menuOpened" class="top-notice">
        Interaja com a lateral esquerda da página para acessar o menu
      </p>
      <Menu :mapsList="mapsList" @select-map="selectMap" @menu-open="handleMenuOpen" />
      <MapDetails :map="selectedMap" />
    </div>
  </div>
  <div v-else class="flex justify-center items-center h-screen">
    <Spinner />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import Header from './components/Header.vue';
import Menu from './components/Menu.vue';
import MapDetails from './components/MapDetails.vue';
import Spinner from './components/Spinner.vue';

const selectedMap = ref({});
const mapsList = ref([]);
const isLoaded = ref(false);
const menuOpened = ref(false);

const mapFiles = import.meta.glob('@/data/*.json');

async function loadInitialData() {
  const paths = Object.keys(mapFiles);
  mapsList.value = paths.map(path => {
    const nome = path.split('/').pop().replace('.json', '');
    return { nome: nome, loader: mapFiles[path], loaded: false };
  });

  if (mapsList.value.length > 0) {
    await selectMap(mapsList.value[0]);
  }

  isLoaded.value = true;
}

async function selectMap(map) {
  if (!map.loaded) {
    const mapData = await map.loader();
    const newSelectedMap = { ...map, ...mapData, loaded: true };
    selectedMap.value = newSelectedMap;

    const mapIndex = mapsList.value.findIndex(m => m.nome === map.nome);
    if (mapIndex !== -1) {
      mapsList.value[mapIndex] = newSelectedMap;
    }
  } else {
    selectedMap.value = map;
  }
}

function handleMenuOpen() {
  menuOpened.value = true;
}

onMounted(loadInitialData);

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

.content {
  padding-top: 40px;

}

.top-notice {
  position: absolute;
  top: 10px;
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
  z-index: 10;
  white-space: nowrap;
  overflow: hidden;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
