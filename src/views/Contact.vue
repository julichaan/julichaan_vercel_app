<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitted = ref(false)

const handleSubmit = () => {
  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    formData.value = { name: '', email: '', subject: '', message: '' }
  }, 3000)
}
</script>

<template>
  <div class="min-h-screen bg-black">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Contacto
        </h1>
        <p class="text-gray-400 text-lg">¿Preguntas, sugerencias o colaboración? Me encantaría escucharte.</p>
      </div>

      <!-- Contact Info Cards -->
      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
          <div class="relative bg-gray-900 border border-cyan-500/30 group-hover:border-cyan-500 p-6 rounded-lg transition-all">
            <div class="text-3xl mb-3">✉️</div>
            <h3 class="text-cyan-400 font-bold mb-2">Email</h3>
            <p class="text-gray-400">tu@email.com</p>
          </div>
        </div>

        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
          <div class="relative bg-gray-900 border border-cyan-500/30 group-hover:border-cyan-500 p-6 rounded-lg transition-all">
            <div class="text-3xl mb-3">🐦</div>
            <h3 class="text-cyan-400 font-bold mb-2">Twitter / X</h3>
            <p class="text-gray-400">@tunombre</p>
          </div>
        </div>

        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
          <div class="relative bg-gray-900 border border-cyan-500/30 group-hover:border-cyan-500 p-6 rounded-lg transition-all">
            <div class="text-3xl mb-3">💼</div>
            <h3 class="text-cyan-400 font-bold mb-2">LinkedIn</h3>
            <p class="text-gray-400">/in/tunombre</p>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="relative">
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-10 blur"></div>
        <div class="relative bg-gray-900 border border-cyan-500/30 p-8 rounded-lg">
          <h2 class="text-2xl font-bold text-cyan-400 mb-6">Envíame un Mensaje</h2>

          <!-- Success Message -->
          <div v-if="submitted" class="mb-6 p-4 bg-green-500/20 border border-green-500 text-green-400 rounded-lg">
            ✓ ¡Mensaje enviado con éxito! Te responderé pronto.
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-cyan-400 font-medium mb-2">Nombre</label>
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-4 py-2 bg-gray-800 border border-cyan-500/30 focus:border-cyan-500 rounded-lg text-white focus:outline-none transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label class="block text-cyan-400 font-medium mb-2">Email</label>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-4 py-2 bg-gray-800 border border-cyan-500/30 focus:border-cyan-500 rounded-lg text-white focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label class="block text-cyan-400 font-medium mb-2">Asunto</label>
              <input
                v-model="formData.subject"
                type="text"
                required
                class="w-full px-4 py-2 bg-gray-800 border border-cyan-500/30 focus:border-cyan-500 rounded-lg text-white focus:outline-none transition-colors"
                placeholder="¿De qué se trata?"
              />
            </div>

            <div>
              <label class="block text-cyan-400 font-medium mb-2">Mensaje</label>
              <textarea
                v-model="formData.message"
                required
                rows="6"
                class="w-full px-4 py-2 bg-gray-800 border border-cyan-500/30 focus:border-cyan-500 rounded-lg text-white focus:outline-none transition-colors resize-none"
                placeholder="Tu mensaje aquí..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>