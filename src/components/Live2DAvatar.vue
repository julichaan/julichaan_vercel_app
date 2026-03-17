<script setup>
import { ref } from 'vue'
import hackerHero from '../assets/hacker-hero.png'

const hovered = ref(false)

const NAV_ITEMS = [
  { label: 'About',          path: '/about' },
  { label: 'Certifications', path: '/certificaciones' },
  { label: 'Writeups',       path: '/writeups' },
  { label: 'Blog',           path: '/blog' },
  { label: 'Notes',          path: '/notes' },
]
</script>

<template>
  <div
    class="avatar-container"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- Imagen con efecto TV -->
    <div class="tv-wrapper">
      <img :src="hackerHero" alt="hacker hero" class="tv-image w-[280px] select-none" draggable="false" />
      <div class="scanlines" />
      <div class="tv-flicker" />
    </div>

    <!-- Menú desplegable sobre la imagen -->
    <Transition name="menu">
      <div v-if="hovered" class="nav-overlay">
        <router-link
          v-for="item in NAV_ITEMS"
          :key="item.label"
          :to="item.path"
          class="nav-item"
        >
          <span class="nav-arrow">›</span>
          {{ item.label }}
        </router-link>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.avatar-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

/* ── TV wrapper ── */
.tv-wrapper {
  position: relative;
  display: inline-block;
  filter: contrast(1.1) brightness(0.92);
  transition: filter 0.3s ease;
}

.avatar-container:hover .tv-wrapper {
  filter: contrast(0.6) brightness(0.4);
}

.tv-image {
  display: block;
  image-rendering: auto;
  filter: sepia(0.15) hue-rotate(80deg) saturate(1.2);
}

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

/* ── Menú overlay ── */
.nav-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  pointer-events: all;
}

.nav-item {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ff003c;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.15s, transform 0.15s;
  text-shadow: 0 0 12px #ff003c88;
}

.nav-item:hover {
  color: #fff;
  transform: translateX(6px);
  text-shadow: 0 0 16px #ff003ccc;
}

.nav-arrow {
  color: #ff003c;
  font-size: 1.3rem;
  transition: transform 0.15s;
}

.nav-item:hover .nav-arrow {
  transform: translateX(4px);
}

/* ── Transición ── */
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
