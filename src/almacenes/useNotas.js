import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { marked } from 'marked'

export const useNotasStore = defineStore('notas', () => {
  const notas = ref([])
  const notaActivaId = ref(null)

  // Cargar desde localStorage
  const notasGuardadas = localStorage.getItem('notas-app')
  if (notasGuardadas) {
    notas.value = JSON.parse(notasGuardadas)
  }

  // Guardar en localStorage automáticamente al cambiar
  watch(notas, (nuevasNotas) => {
    localStorage.setItem('notas-app', JSON.stringify(nuevasNotas))
  }, { deep: true })

  function crearNota() {
    const nuevaNota = {
      id: 'nota-' + Date.now(),
      titulo: 'Nueva nota',
      contenido: '# Nueva nota\nEmpieza a escribir aquí...',
      html: '<h1>Nueva nota</h1><p>Empieza a escribir aquí...</p>',
      fechaCreacion: new Date().toISOString(),
      fechaModificacion: new Date().toISOString()
    }
    notas.value.push(nuevaNota)
    notaActivaId.value = nuevaNota.id
  }

  function eliminarNota(id) {
    notas.value = notas.value.filter(n => n.id !== id)
    if (notaActivaId.value === id) {
      notaActivaId.value = null
    }
  }

  function guardarNota(id, nuevoContenido) {
    const nota = notas.value.find(n => n.id === id)
    if (nota) {
      nota.contenido = nuevoContenido
      nota.html = marked.parse(nuevoContenido)
      // Extraer título de la primera línea si es posible, o dejar como "Sin título"
      const lineas = nuevoContenido.trim().split('\n')
      nota.titulo = lineas[0].replace(/#/g, '').trim() || 'Sin título'
      nota.fechaModificacion = new Date().toISOString()
    }
  }

  function seleccionarNota(id) {
    notaActivaId.value = id
  }

  return {
    notas,
    notaActivaId,
    crearNota,
    eliminarNota,
    guardarNota,
    seleccionarNota
  }
})
