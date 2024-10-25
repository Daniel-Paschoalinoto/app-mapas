<template>
  <div class="bg-white w-screen h-screen p-4">
    <div v-if="loading" class="w-screen h-screen flex justify-center items-center">
      <p class="loading-message">Carregando jsons...</p>
    </div>

    <div v-else>
      <Menu @select-map="selectMap" />
      <MapDetails :map="selectedMap" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import Menu from './components/Menu.vue';
import MapDetails from './components/MapDetails.vue';

const selectedMap = ref({});
const tempo = ref(0);
const loading = ref(true);

function startLoadingTimer() {
  const interval = setInterval(() => {
    if (tempo.value < 3) {
      tempo.value++;
    } else {
      clearInterval(interval);
      loading.value = false;
    }
  }, 1000);
}

onMounted(() => {
  startLoadingTimer();
});

function selectMap(map) {
  selectedMap.value = map;
}

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

.loading-message {
  font-size: 2em;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.bg-white::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
