<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Live2DAvatar from '../components/Live2DAvatar.vue'
import { useLanguage } from '../composables/useLanguage'

const typingText = ref('')
const { isSpanish, toggleLanguage, language } = useLanguage()
let stopped = false

onMounted(async () => {
  const typeLoop = async () => {
    const message = isSpanish.value ? 'Bienvenido a mi blog' : 'Welcome to my blog'
    for (let i = 0; i <= message.length; i++) {
      if (stopped) return
      typingText.value = message.slice(0, i)
      await new Promise(r => setTimeout(r, 80))
    }
    await new Promise(r => setTimeout(r, 2200))
    if (stopped) return
    for (let i = message.length; i >= 0; i--) {
      if (stopped) return
      typingText.value = message.slice(0, i)
      await new Promise(r => setTimeout(r, 40))
    }
    await new Promise(r => setTimeout(r, 500))
    if (!stopped) typeLoop()
  }
  typeLoop()
})

onUnmounted(() => { stopped = true })

watch(isSpanish, () => {
  typingText.value = ''
})
</script>

<template>
  <div class="min-h-screen bg-black flex flex-col items-center justify-center gap-8 p-6">
    <button class="lang-floating" type="button" @click="toggleLanguage">
      <span>ES</span>
      <span class="dot" :class="{ en: language === 'en' }"></span>
      <span>EN</span>
    </button>

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

    <!-- Avatar con menú hover -->
    <Live2DAvatar />

  </div>
</template>

<style scoped>
.lang-floating {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  gap: 0.45rem;
  align-items: center;
  border: 1px solid #ff003c44;
  color: #777;
  background: #000;
  border-radius: 999px;
  padding: 0.3rem 0.55rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
}
.lang-floating .dot {
  width: 22px;
  height: 12px;
  border-radius: 999px;
  border: 1px solid #ff003c44;
  position: relative;
}
.lang-floating .dot::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff003c;
  transition: transform 0.15s;
}
.lang-floating .dot.en::after {
  transform: translateX(10px);
}

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
