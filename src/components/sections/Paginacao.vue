<template>
    <div v-if="hasValueInMap" id="paginacao" class="section-class">
        <h1 v-if="map.paginacao.tipo" class="font-semibold text-lg mb-1">Paginação: ({{ map.paginacao.tipo }})</h1>
        <h1 v-else class="font-semibold text-lg mb-1">Paginação:</h1>
        <p v-if="map.paginacao.comentario">{{ map.paginacao.comentario }}</p>
        <div v-if="map.paginacao.parametro">
            <strong>Parâmetro</strong>
            <button class="button-custom" @click="emitCopyContent(map.paginacao.parametro, $event.target)">
                {{ map.paginacao.parametro }}
            </button>
        </div>
        <div v-if="map.paginacao.rota_principal">
            <strong>Url de Paginação ou Rota principal (StartsWith) Exemplo</strong>
            <button class="button-custom" @click="emitCopyContent(map.paginacao.rota_principal, $event.target)">
                {{ map.paginacao.rota_principal }}
            </button>
        </div>
        <div v-if="map.paginacao.script">
            <strong>Script</strong>
            <button class="button-custom" @click="emitCopyContent(map.paginacao.script, $event.target)">
                {{ map.paginacao.script }}
            </button>
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
    }
});

function emitCopyContent(path, target) {
    emit("copyContent", path, target);
}
</script>