<template>
  <div class="editor-panel">
    <template v-if="notaActiva">
      <div class="editor-header">
        <div class="editor-fecha">Creada el: {{ formatearFecha(notaActiva.fechaCreacion) }}</div>
        <button @click="guardar" class="btn-guardar">Guardar</button>
      </div>
      <textarea 
        class="editor-textarea" 
        v-model="contenidoLocal"
        placeholder="Escribe tu nota en Markdown..."
        @blur="guardar"
      ></textarea>
    </template>
    <div v-else class="mensaje-vacio">
      Selecciona una nota para editar o crea una nueva
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useNotasStore } from '../almacenes/useNotas'

const store = useNotasStore()

const notaActiva = computed(() => {
  return store.notas.find(n => n.id === store.notaActivaId)
})

const contenidoLocal = ref('')

// Actualizar el contenido local cuando cambia la nota seleccionada
watch(notaActiva, (nuevaNota) => {
  if (nuevaNota) {
    contenidoLocal.value = nuevaNota.contenido
  } else {
    contenidoLocal.value = ''
  }
}, { immediate: true })

function guardar() {
  if (notaActiva.value) {
    store.guardarNota(notaActiva.value.id, contenidoLocal.value)
  }
}

function formatearFecha(fechaStr) {
  const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(fechaStr).toLocaleDateString('es-ES', opciones)
}
</script>
