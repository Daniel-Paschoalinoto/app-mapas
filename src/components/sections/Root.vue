<template>
    <div v-if="hasValueInMap" id="root" class="section-class">
        <h1 class="font-semibold text-lg mb-1">Root:</h1>
        <p v-if="map.root.comentario">{{ map.root.comentario }}</p>
        <span v-if="map.root.xpath">{{ map.root.xpath }}</span>
        <button v-if="map.root.xpath" class="button-custom w-fit" data-type="xpath"
            @click="emitCopyContent(map.root.xpath, $event.target)">
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