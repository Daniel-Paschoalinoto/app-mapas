<template>
    <div v-if="hasValueInMap" id="cidade" class="section-class"
        :class="{ 'bg-gray-800 text-white': map.cidade.posclick }">
        <h1 class="font-semibold text-lg mb-1">Cidade:</h1>
        <p v-if="map.cidade.comentario">{{ map.cidade.comentario }}</p>
        <span v-if="map.cidade.xpath">{{ map.cidade.xpath }}</span>
        <button v-if="map.cidade.xpath" class="button-custom" data-type="xpath"
            @click="emitCopyContent(map.cidade.xpath, $event.target)">
            XPath
        </button>
        <div v-for="processador in processadoresMapped.cidade" :key="processador.nome">
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