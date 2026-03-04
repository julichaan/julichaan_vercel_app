<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import hackerHero from '../assets/hacker-hero.png'

const typingText = ref('')
const MSG = 'Welcome to my blog'
let stopped = false

onMounted(async () => {
  const typeLoop = async () => {
    for (let i = 0; i <= MSG.length; i++) {
      if (stopped) return
      typingText.value = MSG.slice(0, i)
      await new Promise(r => setTimeout(r, 80))
    }
    await new Promise(r => setTimeout(r, 2200))
    if (stopped) return
    for (let i = MSG.length; i >= 0; i--) {
      if (stopped) return
      typingText.value = MSG.slice(0, i)
      await new Promise(r => setTimeout(r, 40))
    }
    await new Promise(r => setTimeout(r, 500))
    if (!stopped) typeLoop()
  }
  typeLoop()
})

onUnmounted(() => { stopped = true })
</script>

<template>
  <div class="min-h-screen bg-black flex flex-col items-center justify-center gap-8 p-6">

    <!-- Prompt título de bienvenida -->
    <div class="font-mono flex flex-wrap items-center justify-center gap-0 select-none text-2xl md:text-3xl lg:text-4xl">
      <span style="color:#ff003c">julichaan</span>
      <span class="text-gray-500">@</span>
      <span style="color:#ff003c">blog</span>
      <span class="text-gray-500">:</span>
      <span style="color:#ff003c">~$&nbsp;</span>
      <span class="text-gray-200">{{ typingText }}</span>
      <span class="animate-pulse" style="color:#ff003c">▌</span>
    </div>

    <!-- Imagen con efecto TV -->
    <div class="tv-wrapper">
      <img
        :src="hackerHero"
        alt="Hacker"
        class="tv-image w-56 md:w-72 lg:w-80 object-contain select-none"
        draggable="false"
      />
      <div class="scanlines"></div>
      <div class="tv-flicker"></div>
    </div>

  </div>
</template>

<style scoped>
/* ── Contenedor TV ── */
.tv-wrapper {
  position: relative;
  display: inline-block;
  filter: contrast(1.1) brightness(0.92);
}

/* Imagen base con leve tinte verdoso de fósforo */
.tv-image {
  display: block;
  image-rendering: auto;
  filter: sepia(0.15) hue-rotate(80deg) saturate(1.2);
}

/* Líneas de barrido horizontales */
.scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(0, 0, 0, 0.18) 3px,
    rgba(0, 0, 0, 0.18) 4px
  );
  pointer-events: none;
  border-radius: 4px;
}

/* Parpadeo sutil de pantalla */
.tv-flicker {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.015);
  pointer-events: none;
  animation: flicker 5s infinite;
  border-radius: 4px;
}

@keyframes flicker {
  0%   { opacity: 1; }
  92%  { opacity: 1; }
  93%  { opacity: 0.6; }
  94%  { opacity: 1; }
  96%  { opacity: 0.75; }
  97%  { opacity: 1; }
  100% { opacity: 1; }
}
</style>

