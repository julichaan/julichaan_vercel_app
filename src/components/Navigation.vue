<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <nav class="bg-black border-b border-cyan-500/20 text-white sticky top-0 z-50 shadow-lg shadow-cyan-500/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center gap-2 group">
            <div class="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-sm group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
              🔐
            </div>
            <span class="font-black text-xl hidden sm:inline bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">CyberPort</span>
          </router-link>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex gap-8">
          <router-link to="/" class="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Inicio</router-link>
          <router-link to="/blog" class="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Blog</router-link>
          <router-link to="/about" class="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Sobre Mí</router-link>
          <router-link to="/contact" class="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Contacto</router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg hover:bg-gray-900 hover:border hover:border-cyan-500/30 transition-all"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden pb-4 flex flex-col gap-2 border-t border-cyan-500/20">
        <router-link
          to="/"
          @click="closeMenu"
          class="block px-4 py-2 rounded-lg hover:bg-gray-900 hover:border-l-2 hover:border-cyan-500 transition-all text-gray-300 hover:text-cyan-400"
        >
          Inicio
        </router-link>
        <router-link
          to="/blog"
          @click="closeMenu"
          class="block px-4 py-2 rounded-lg hover:bg-gray-900 hover:border-l-2 hover:border-cyan-500 transition-all text-gray-300 hover:text-cyan-400"
        >
          Blog
        </router-link>
        <router-link
          to="/about"
          @click="closeMenu"
          class="block px-4 py-2 rounded-lg hover:bg-gray-900 hover:border-l-2 hover:border-cyan-500 transition-all text-gray-300 hover:text-cyan-400"
        >
          Sobre Mí
        </router-link>
        <router-link
          to="/contact"
          @click="closeMenu"
          class="block px-4 py-2 rounded-lg hover:bg-gray-900 hover:border-l-2 hover:border-cyan-500 transition-all text-gray-300 hover:text-cyan-400"
        >
          Contacto
        </router-link>
      </div>
    </div>
  </nav>
</template>
