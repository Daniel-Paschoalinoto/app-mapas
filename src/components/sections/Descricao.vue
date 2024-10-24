<template>
    <div v-if="hasValueInMap" id="descricao" class="section-class"
        :class="{ 'bg-gray-800 text-white': map.descricao.posclick }">
        <h1 class="font-semibold text-lg mb-1">Descrição:</h1>
        <p v-if="map.descricao.comentario" class="mb-2">{{ map.descricao.comentario }}</p>
        <span v-if="map.descricao.xpath === 'descricaoPadrao'">{{ descricaoPadrao }}</span>
        <span v-else>{{ map.descricao.xpath }}</span>
        <button v-if="map.descricao.xpath === 'descricaoPadrao'" class="button-custom" data-type="xpath"
            @click="emitCopyContent(descricaoPadrao, $event.target)">
            XPath
        </button>
        <button v-else class="button-custom" data-type="xpath"
            @click="emitCopyContent(map.descricao.xpath, $event.target)">
            XPath
        </button>
        <div v-for="processador in processadoresMapped.descricao" :key="processador.nome">
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
    },
    descricaoPadrao: {
        type: String
    }
});

function emitCopyContent(path, target) {
    emit("copyContent", path, target);
}
</script>