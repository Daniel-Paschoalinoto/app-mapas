<template>
    <div v-if="hasValueInMap" id="total_anuncios_site"
        :class="{ 'bg-gray-800 text-white': map.total_anuncios_site.posclick, 'section-class': true }">
        <h1 class="font-semibold text-lg mb-1">Total_anuncios_site:</h1>
        <p v-if="map.total_anuncios_site.comentario">{{
            map.total_anuncios_site.comentario
            }}</p>
        <span v-if="map.total_anuncios_site.xpath">{{ map.total_anuncios_site.xpath }}</span>
        <button v-if="map.total_anuncios_site.xpath" class="button-custom" data-type="xpath"
            @click="emitCopyContent(map.total_anuncios_site.xpath, $event.target)">
            XPath
        </button>
        <div v-for="processador in processadoresMapped.total_anuncios_site" :key="processador.nome">
            <strong>{{ processador.tipo }}</strong>
            <template v-if="processador.de && processador.para">
                <button class="button-custom" @click="emitCopyContent(processador.de, $event.target)">
                    {{ processador.de }}
                </button>
                <span> ⇄ </span>
                <button class="button-custom" @click="emitCopyContent(processador.para, $event.target)">
                    {{ processador.para }}
                </button>
            </template>
            <template v-else>
                <button v-if="processador.de" class="button-custom"
                    @click="emitCopyContent(processador.de, $event.target)">
                    {{ processador.de }}
                </button>
                <button v-if="processador.para" class="button-custom"
                    @click="emitCopyContent(processador.para, $event.target)">
                    {{ processador.para }}
                </button>
            </template>
        </div>
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
    },
    processadoresMapped: {
        type: [Array, Object],
        required: true
    }
});

function emitCopyContent(path, target) {
    emit("copyContent", path, target);
}
</script>