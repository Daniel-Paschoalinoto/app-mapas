<template>
  <div class="bg-white w-screen h-screen p-4">
    <div v-if="loading" class="w-screen h-screen flex flex-col justify-center items-center">
      <p class="loading-message">{{ loadingMessages[tempo] }}</p>
      <div class="progress-bar">
        <div :style="{ width: `${progress}%` }" class="progress-fill"></div>
      </div>
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
const progress = ref(0);

const defaultTitle = "Loading...";
document.title = defaultTitle;

const loadingMessages = [
  "Inicializando a aplicação...",
  "Carregando os mapas...",
  "Preparando para exibir..."
];

function startLoadingTimer() {
  const totalTime = loadingMessages.length * 2000;
  const increment = 100 / loadingMessages.length;
  loadingMessages.forEach((message, index) => {
    setTimeout(() => {
      tempo.value = index;
      progress.value += increment;
    }, index * 2000);
  });

  setTimeout(() => {
    loading.value = false;
    progress.value = 100;
  }, totalTime);
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
  margin-bottom: 20px;
}

.progress-bar {
  width: 70%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 20px;
}

.progress-fill {
  height: 100%;
  background-color: #0078d4;
  transition: width 3s ease;
}

.bg-white::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
