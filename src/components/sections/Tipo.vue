<template>
    <div v-if="hasValueInMap" id="tipo" class="section-class" :class="{ 'bg-gray-800 text-white': map.tipo.posclick }">
        <h1 class="font-semibold text-lg mb-1">Tipo:</h1>
        <p v-if="map.tipo.comentario">{{ map.tipo.comentario }}</p>
        <span v-if="map.tipo.xpath">{{ map.tipo.xpath }}</span>
        <button v-if="map.tipo.xpath" class="button-custom" data-type="xpath"
            @click="emitCopyContent(map.tipo.xpath, $event.target)">
            XPath
        </button>
        <div v-for="processador in processadoresMapped.tipo" :key="processador.nome">
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
                    Processador tipo
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