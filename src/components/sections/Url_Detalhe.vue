<template>
    <div v-if="hasValueInMap" id="url_detalhe" class="section-class">
        <h1 class="font-semibold text-lg mb-1">URL_detalhe: ({{ map.url_detalhe.tipo }})</h1>
        <p v-if="map.url_detalhe.comentario">{{ map.url_detalhe.comentario }}</p>
        <span v-if="map.url_detalhe.xpath">{{ map.url_detalhe.xpath }}</span>
        <button v-if="map.url_detalhe.xpath" class="button-custom" data-type="xpath"
            @click="emitCopyContent(map.url_detalhe.xpath, $event.target)">
            XPath
        </button>
    </div>
</template>

<script setup>
const emit = defineEmits(['copyContent']);

const props = defineProps({
    map: {
        type: Object,
        required: true,
    },
    hasValueInMap: {
        type: Boolean,
        required: true,
    }
});

function emitCopyContent(path, target) {
    emit("copyContent", path, target);
}
</script>