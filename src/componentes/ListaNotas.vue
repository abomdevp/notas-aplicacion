<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <button @click="store.crearNota" class="btn-crear">+ Nueva Nota</button>
    </div>
    <div class="lista-notas">
      <div 
        v-for="nota in store.notas" 
        :key="nota.id"
        class="nota-item"
        :class="{ activa: store.notaActivaId === nota.id }"
        @click="store.seleccionarNota(nota.id)"
      >
        <div class="nota-info">
          <div class="nota-titulo">{{ nota.titulo }}</div>
          <div class="nota-fecha">{{ formatearFecha(nota.fechaCreacion) }}</div>
        </div>
        <button @click.stop="store.eliminarNota(nota.id)" class="btn-eliminar" title="Eliminar nota">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
      </div>
      <div v-if="store.notas.length === 0" class="mensaje-vacio">
        No hay notas
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNotasStore } from '../almacenes/useNotas'

const store = useNotasStore()

function formatearFecha(fechaStr) {
  const opciones = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(fechaStr).toLocaleDateString('es-ES', opciones)
}
</script>
