<script setup>
import { ref } from 'vue'

const profile = {
  name: 'Julia Chan',
  alias: 'julichaan',
  location: 'Madrid, España',
  email: 'julichaan@proton.me',
  github: 'github.com/julichaan',
  linkedin: 'linkedin.com/in/julichaan',
  bio: 'Soy un ingeniero de ciberseguridad de 27 años apasionado por mi trabajo, especializado en Red Team y Pentesting. Mi objetivo es proteger la integridad y la confidencialidad de los sistemas de información mediante análisis proactivos y simulaciones de ataques.',
  skills: [
    'Red Team',
    'Pentesting',
    'Bug Bounty',
    'Análisis de Vulnerabilidades',
    'Respuesta a Incidentes',
    'CTF'
  ]
}
</script>

<template>
  <div class="min-h-screen bg-black">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Sobre Mí
        </h1>
        <p class="text-gray-400 text-lg">{{ profile.alias }} · {{ profile.name }}</p>
      </div>

      <!-- Profile Card -->
      <div class="relative mb-12">
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-10 blur"></div>
        <div class="relative bg-gray-900 border border-cyan-500/30 p-8 rounded-lg">
          <h2 class="text-2xl font-bold text-cyan-400 mb-4">👋 ¡Hola!</h2>
          <p class="text-gray-300 leading-relaxed mb-6">
            {{ profile.bio }}
          </p>
          <p class="text-gray-400 leading-relaxed">
            Con una sólida formación académica y diversas certificaciones reconocidas por la industria,
            me dedico a identificar y mitigar vulnerabilidades antes de que puedan ser explotadas.
          </p>
        </div>
      </div>

      <!-- Skills Grid -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-cyan-400 mb-6">🔧 Especialidades</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div
            v-for="skill in profile.skills"
            :key="skill"
            class="relative group"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
            <div class="relative bg-gray-900 border border-cyan-500/30 group-hover:border-cyan-500 p-4 rounded-lg transition-all text-center">
              <p class="text-gray-300 font-medium">{{ skill }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-cyan-400 mb-6">📫 Contacto</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Email -->
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
            <div class="relative bg-gray-900 border border-cyan-500/30 group-hover:border-cyan-500 p-6 rounded-lg transition-all">
              <div class="text-3xl mb-3">✉️</div>
              <h3 class="text-cyan-400 font-bold mb-2">Email</h3>
              <a :href="'mailto:' + profile.email" class="text-gray-400 hover:text-cyan-400 transition-colors">
                {{ profile.email }}
              </a>
            </div>
          </div>

          <!-- Location -->
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
            <div class="relative bg-gray-900 border border-cyan-500/30 group-hover:border-cyan-500 p-6 rounded-lg transition-all">
              <div class="text-3xl mb-3">📍</div>
              <h3 class="text-cyan-400 font-bold mb-2">Ubicación</h3>
              <p class="text-gray-400">{{ profile.location }}</p>
            </div>
          </div>

          <!-- GitHub -->
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
            <div class="relative bg-gray-900 border border-cyan-500/30 group-hover:border-cyan-500 p-6 rounded-lg transition-all">
              <div class="text-3xl mb-3">💻</div>
              <h3 class="text-cyan-400 font-bold mb-2">GitHub</h3>
              <a :href="'https://' + profile.github" target="_blank" rel="noopener" class="text-gray-400 hover:text-cyan-400 transition-colors">
                {{ profile.github }}
              </a>
            </div>
          </div>

          <!-- LinkedIn -->
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
            <div class="relative bg-gray-900 border border-cyan-500/30 group-hover:border-cyan-500 p-6 rounded-lg transition-all">
              <div class="text-3xl mb-3">💼</div>
              <h3 class="text-cyan-400 font-bold mb-2">LinkedIn</h3>
              <a :href="'https://' + profile.linkedin" target="_blank" rel="noopener" class="text-gray-400 hover:text-cyan-400 transition-colors">
                {{ profile.linkedin }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Fun Fact -->
      <div class="relative">
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-10 blur"></div>
        <div class="relative bg-gray-900 border border-cyan-500/30 p-6 rounded-lg text-center">
          <p class="text-gray-400">
            💡 <span class="text-cyan-400 font-medium">Fun fact:</span> En mi tiempo libre, disfruto resolviendo retos CTF (Capture The Flag)
            y aprendiendo constantemente sobre nuevas vulnerabilidades. La ciberseguridad no es solo mi profesión; es mi pasión.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
