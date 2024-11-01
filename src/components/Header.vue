<template>
    <header class="header">
        <h1 class="header-title">{{ map.nome }}</h1>
        <span class="header-version">Versão {{ version }}</span>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import packageInfo from '@/../package.json';

const props = defineProps({
    map: {
        type: Object,
        required: true,
    }
});

const version = ref(packageInfo.version);
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #616be8, #1b2481);
    color: white;
    padding: 10px 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    border: 1px solid #707aeb;
}

.header-title {
    font-size: 21px;
    letter-spacing: 1px;
}

.header-version {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
}
</style>