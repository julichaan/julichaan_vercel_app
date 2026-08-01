<script setup>
import { useLanguage } from '../composables/useLanguage'

const { isSpanish } = useLanguage()
</script>

<template>
  <div class="min-h-screen bg-black flex items-center justify-center font-mono">
    <div class="text-center">
      <p class="text-xs tracking-widest mb-3" style="color:#ff003c44">{{ isSpanish ? '// en construcción' : '// under construction' }}</p>
      <h1 class="text-3xl font-black tracking-widest" style="color:#ff003c">BUG BOUNTY</h1>
      <p class="text-gray-600 text-sm mt-4">{{ isSpanish ? 'Próximamente...' : 'Coming soon...' }}</p>
    </div>
  </div>
</template>
