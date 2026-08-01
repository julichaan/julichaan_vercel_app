<script setup>
import { ref, onMounted } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const data = ref(null)
const error = ref(null)
const rawError = ref(null)
const loading = ref(true)
const { isSpanish } = useLanguage()

onMounted(async () => {
  try {
    const res = await fetch('/api/htb')
    const json = await res.json()
    if (json.error) {
      error.value = json.error
      rawError.value = json.raw ?? null
      return
    }
    // Normalizar estructura — HTB puede devolver { profile: {...} } o directo
    data.value = json.profile ?? json
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-black p-6 lg:p-12 font-mono">

    <!-- Header -->
    <div class="max-w-4xl mx-auto mb-8 flex items-center justify-between">
      <div>
        <span class="text-xs text-gray-600 tracking-widest">HACKTHEBOX</span>
        <h1 class="text-2xl font-black tracking-widest" style="color:#ff003c">{{ isSpanish ? 'PANEL DE ESTADÍSTICAS' : 'STATS DASHBOARD' }}</h1>
      </div>
      <a href="/" class="text-xs tracking-widest" style="color:#ff003c">{{ isSpanish ? '← inicio' : '← home' }}</a>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="max-w-4xl mx-auto text-center py-20">
      <span class="text-gray-500 text-sm animate-pulse">{{ isSpanish ? 'cargando estadísticas...' : 'loading stats...' }}</span>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="max-w-4xl mx-auto py-10 space-y-4">
      <p class="text-sm" style="color:#ff003c">{{ isSpanish ? 'error:' : 'error:' }} {{ error }}</p>
      <p v-if="rawError" class="text-xs text-gray-600 font-mono">{{ rawError }}</p>
      <!-- Badge oficial siempre disponible -->
      <div class="flex flex-col items-center gap-2 pt-6">
        <p class="text-xs text-gray-600 tracking-widest">{{ isSpanish ? 'BADGE OFICIAL (siempre disponible)' : 'OFFICIAL BADGE (always available)' }}</p>
        <img
          src="https://www.hackthebox.com/badge/image/114171"
          alt="HTB Badge"
          class="max-w-xs rounded"
          style="border:1px solid #ff003c33"
        />
      </div>
    </div>

    <!-- Dashboard -->
    <div v-else-if="data" class="max-w-4xl mx-auto space-y-6">

      <!-- Perfil -->
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-lg"
        style="border:1px solid #ff003c33; background:#0a0a0a">
        <img
          v-if="data.avatar"
          :src="`https://www.hackthebox.com${data.avatar}`"
          class="w-20 h-20 rounded-full"
          style="border:2px solid #ff003c"
        />
        <div class="text-center sm:text-left space-y-1">
          <p class="text-xl font-black text-white">{{ data.name }}</p>
          <p class="text-sm" :style="{ color: rankColor(data.rank) }">{{ data.rank }}</p>
          <p class="text-xs text-gray-500">{{ data.country?.name ?? '—' }}</p>
        </div>
        <div class="sm:ml-auto text-center sm:text-right space-y-1">
          <p class="text-3xl font-black text-white">{{ data.points ?? 0 }}</p>
          <p class="text-xs text-gray-500 tracking-widest">{{ isSpanish ? 'PUNTOS' : 'POINTS' }}</p>
          <p class="text-lg font-bold" style="color:#ff003c">#{{ data.ranking ?? '—' }}</p>
          <p class="text-xs text-gray-500 tracking-widest">{{ isSpanish ? 'RANKING GLOBAL' : 'GLOBAL RANKING' }}</p>
        </div>
      </div>

      <!-- Owns + challenges + respects -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="stat in [
          { label: isSpanish ? 'USUARIOS' : 'USER OWNS',  value: data.user_owns      ?? 0 },
          { label: isSpanish ? 'ROOTS' : 'ROOT OWNS',     value: data.system_owns    ?? 0 },
          { label: isSpanish ? 'DESAFÍOS' : 'CHALLENGES', value: data.challenge_owns ?? 0 },
          { label: isSpanish ? 'RESPECTOS' : 'RESPECTS',  value: data.respects       ?? 0 },
        ]" :key="stat.label"
          class="p-4 rounded-lg text-center"
          style="border:1px solid #ff003c22; background:#0a0a0a"
        >
          <p class="text-2xl font-black" style="color:#ff003c">{{ stat.value }}</p>
          <p class="text-xs text-gray-600 tracking-widest mt-1">{{ stat.label }}</p>
        </div>
      </div>

      <!-- Máquinas por dificultad -->
      <div class="p-6 rounded-lg" style="border:1px solid #ff003c22; background:#0a0a0a">
        <p class="text-xs text-gray-600 tracking-widest mb-4">{{ isSpanish ? 'MÁQUINAS POR DIFICULTAD' : 'MACHINES BY DIFFICULTY' }}</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="d in [
            { label: 'EASY',   value: data.easy_owns   ?? 0, color: '#9fef00' },
            { label: 'MEDIUM', value: data.medium_owns ?? 0, color: '#ffaf00' },
            { label: 'HARD',   value: data.hard_owns   ?? 0, color: '#ff6b00' },
            { label: 'INSANE', value: data.insane_owns ?? 0, color: '#ff003c' },
          ]" :key="d.label" class="text-center">
            <p class="text-xl font-black" :style="{ color: d.color }">{{ d.value }}</p>
            <p class="text-xs text-gray-600 tracking-widest mt-1">{{ d.label }}</p>
          </div>
        </div>
      </div>

      <!-- Bloods -->
      <div class="grid grid-cols-2 gap-4">
        <div class="p-4 rounded-lg text-center" style="border:1px solid #ff003c22; background:#0a0a0a">
          <p class="text-2xl font-black" style="color:#ff003c">{{ data.user_bloods ?? 0 }}</p>
          <p class="text-xs text-gray-600 tracking-widest mt-1">{{ isSpanish ? 'BLOODS DE USUARIO' : 'USER BLOODS' }}</p>
        </div>
        <div class="p-4 rounded-lg text-center" style="border:1px solid #ff003c22; background:#0a0a0a">
          <p class="text-2xl font-black" style="color:#ff003c">{{ data.system_bloods ?? 0 }}</p>
          <p class="text-xs text-gray-600 tracking-widest mt-1">{{ isSpanish ? 'BLOODS DE ROOT' : 'ROOT BLOODS' }}</p>
        </div>
      </div>

      <!-- Badge oficial -->
      <div class="flex flex-col items-center gap-2 pt-4">
        <p class="text-xs text-gray-600 tracking-widest">{{ isSpanish ? 'BADGE OFICIAL' : 'OFFICIAL BADGE' }}</p>
        <img
          src="https://www.hackthebox.com/badge/image/114171"
          alt="HTB Badge"
          class="max-w-xs rounded"
          style="border:1px solid #ff003c33"
        />
      </div>

    </div>
  </div>
</template>

<style scoped>
div::-webkit-scrollbar { width: 4px; }
div::-webkit-scrollbar-track { background: #000; }
div::-webkit-scrollbar-thumb { background: #ff003c44; border-radius: 2px; }
</style>
