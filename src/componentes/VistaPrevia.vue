<template>
  <div class="preview-panel">
    <div class="preview-header">Vista Previa HTML</div>
    <div v-if="notaActiva && notaActiva.html" class="preview-content" v-html="notaActiva.html"></div>
    <div v-else-if="notaActiva" class="mensaje-vacio">
      Presiona Guardar para ver la vista previa
    </div>
    <div v-else class="mensaje-vacio">
      Selecciona una nota para verla
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNotasStore } from '../almacenes/useNotas'

const store = useNotasStore()

const notaActiva = computed(() => {
  return store.notas.find(n => n.id === store.notaActivaId)
})
</script>
