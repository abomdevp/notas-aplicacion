<template>
  <div class="app-container">
    <ListaNotas />
    <EditorNota />
    <VistaPrevia />
  </div>
</template>

<script setup>
import ListaNotas from './componentes/ListaNotas.vue'
import EditorNota from './componentes/EditorNota.vue'
import VistaPrevia from './componentes/VistaPrevia.vue'
import './estilos.css'
</script>
