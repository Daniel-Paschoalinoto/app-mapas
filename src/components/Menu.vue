<template>
  <div id="menu" class="fixed transition-transform duration-300 border-l border-gradient"
    :style="{ transform: `translateX(${menuOffset}px)` }" @mouseenter="moveMenuRight" @mouseleave="moveMenuLeft">
    <div class="flex flex-col p-4 h-screen w-[200px] bg-white z-10 overflow-hidden">
      <div class="w-full flex justify-between items-center mb-2">
        <p class="w-full font-semibold text-lg">Lista de mapas</p>
      </div>
      <div class="overflow-y-auto max-h-full hide-scrollbar flex-1" style="padding-bottom: 3rem;">
        <div class="space-y-1">
          <button v-for="map in mapsList" :key="map.nome"
            class="rounded-md py-2 px-4 w-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            @click="selectMap(map)">
            {{ map.nome }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['select-map', 'menu-open']);
const props = defineProps({
  mapsList: {
    type: Array,
    required: true,
  }
});

const menuOffset = ref(-210);
const targetOffset = -20;

function selectMap(map) {
  emit('select-map', map);
}

function moveMenuRight() {
  menuOffset.value = targetOffset;
  emit('menu-open');
}

function moveMenuLeft() {
  menuOffset.value = -210;
}
</script>

<style scoped>
#menu {
  transition: transform 0.2s ease;
  border: 2px solid #6f7aed;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

button {
  font-size: 1rem;
  line-height: 1.5;
}

button:hover {
  background-color: #727cf5;
  color: white;
}

button:focus,
button:focus-visible {
  outline: none;
  box-shadow: none;
}
</style>
