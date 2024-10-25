<template>
  <div class="bg-white w-screen h-screen p-4" v-if="isLoaded">
    <Menu :mapsList="mapsList" @select-map="selectMap" />
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
</style>
