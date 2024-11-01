<template>
    <header class="header">
        <h1 class="header-title">{{ map.nome }}</h1>
    </header>
</template>

<script setup>
const props = defineProps({
    map: {
        type: Object,
        required: true,
    }
});
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
    border: 1px solid #5f6bef
}

.header-title {
    font-size: 21px;
    letter-spacing: 1px;
}
</style>
