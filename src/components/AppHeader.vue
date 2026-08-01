<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLanguage } from '../composables/useLanguage'

const route = useRoute()
const mobileOpen = ref(false)
const { isSpanish, toggleLanguage, language } = useLanguage()

// Typing en el logo (comando después del prompt)
const logoText = ref('')
const COMMANDS = ['whoami', 'ls -la', 'ssh julichaan@blog', 'nmap -sV target', './exploit.py']
let stopped = false

onMounted(async () => {
  const typeLoop = async () => {
    for (const cmd of COMMANDS) {
      for (let i = 0; i <= cmd.length; i++) {
        if (stopped) return
        logoText.value = cmd.slice(0, i)
        await new Promise(r => setTimeout(r, 80))
      }
      await new Promise(r => setTimeout(r, 1600))
      for (let i = cmd.length; i >= 0; i--) {
        if (stopped) return
        logoText.value = cmd.slice(0, i)
        await new Promise(r => setTimeout(r, 40))
      }
      await new Promise(r => setTimeout(r, 300))
    }
    if (!stopped) typeLoop()
  }
  typeLoop()
})
onUnmounted(() => { stopped = true })

const NAV = computed(() => [
  { label: isSpanish.value ? 'Sobre mí' : 'About', path: '/about' },
  { label: 'Writeups', path: '/writeups' },
  { label: 'Blog', path: '/blog' },
  { label: isSpanish.value ? 'Notas' : 'Notes', path: '/notes' },
])
</script>

<template>
  <header class="header">
    <!-- Línea de glitch superior -->
    <div class="glitch-bar" />

    <nav class="inner">
      <!-- Logo / prompt -->
      <router-link to="/" class="logo" @click="mobileOpen = false">
        <span class="logo-user">julichaan</span>
        <span class="logo-sep">@</span>
        <span class="logo-host">blog</span>
        <span class="logo-sep">:~$&nbsp;</span>
        <span class="logo-cmd">{{ logoText }}</span>
        <span class="logo-cursor animate-pulse">▌</span>
      </router-link>

      <!-- Desktop nav -->
      <ul class="desktop-nav">
        <li v-for="item in NAV" :key="item.path">
          <router-link
            :to="item.path"
            class="nav-link"
            :class="{ active: route.path === item.path }"
          >
            <span class="link-bracket">[</span>
            {{ item.label }}
            <span class="link-bracket">]</span>
          </router-link>
        </li>
      </ul>

      <button
        class="lang-toggle"
        type="button"
        :aria-label="isSpanish ? 'Cambiar a inglés' : 'Switch to Spanish'"
        @click="toggleLanguage"
      >
        <span class="lang-label">ES</span>
        <span class="lang-slider" :class="{ on: language === 'en' }">
          <span class="lang-knob" />
        </span>
        <span class="lang-label">EN</span>
      </button>

      <!-- Hamburger mobile -->
      <button class="hamburger" @click="mobileOpen = !mobileOpen" :aria-label="isSpanish ? 'Menú' : 'Menu'">
        <span :class="{ open: mobileOpen }" />
        <span :class="{ open: mobileOpen }" />
        <span :class="{ open: mobileOpen }" />
      </button>
    </nav>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="mobile-nav">
        <router-link
          v-for="item in NAV"
          :key="item.path"
          :to="item.path"
          class="mobile-link"
          :class="{ active: route.path === item.path }"
          @click="mobileOpen = false"
        >
          <span style="color:#ff003c">›</span> {{ item.label }}
        </router-link>
        <button class="mobile-lang-toggle" type="button" @click="toggleLanguage">
          <span style="color:#ff003c">›</span> {{ isSpanish ? 'Cambiar a inglés' : 'Switch to Spanish' }}
        </button>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.92);
  border-bottom: 1px solid #38bdf822;
  backdrop-filter: blur(8px);
  font-family: 'JetBrains Mono', monospace;
}

.glitch-bar {
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, #ff003c 40%, #38bdf8 60%, transparent 100%);
  animation: glitch-slide 4s linear infinite;
}

@keyframes glitch-slide {
  0%   { background-position: -100% 0; opacity: 1; }
  45%  { opacity: 1; }
  50%  { opacity: 0.4; }
  55%  { opacity: 1; }
  100% { background-position: 200% 0; opacity: 1; }
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* Logo */
.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  flex-shrink: 0;
}
.logo-user  { color: #ff003c; }
.logo-sep   { color: #38bdf866; }
.logo-host  { color: #38bdf8; }
.logo-cmd   { color: #e0e0e0; }
.logo-cursor { color: #00ff9f; margin-left: 1px; }

/* Desktop nav */
.desktop-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.25rem;
  margin-left: auto;
}

.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-left: 0.75rem;
  background: transparent;
  border: 1px solid #ff003c22;
  border-radius: 999px;
  padding: 0.25rem 0.5rem;
  color: #666;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}
.lang-toggle:hover {
  color: #ff003c;
  border-color: #ff003c66;
}
.lang-label {
  font-size: 0.63rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.lang-slider {
  width: 30px;
  height: 16px;
  border-radius: 999px;
  border: 1px solid #ff003c44;
  display: flex;
  align-items: center;
  padding: 1px;
  transition: border-color 0.15s;
}
.lang-knob {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff003c;
  transform: translateX(0);
  transition: transform 0.15s;
}
.lang-slider.on .lang-knob {
  transform: translateX(14px);
}

.nav-link {
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #666;
  padding: 6px 10px;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 2px;
}

.link-bracket {
  color: #38bdf844;
  transition: color 0.15s;
}

.nav-link:hover,
.nav-link.active {
  color: #ff003c;
  border-color: #ff003c33;
  background: #ff003c0a;
}

.nav-link:hover .link-bracket,
.nav-link.active .link-bracket {
  color: #ff003c;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-left: auto;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #ff003c;
  border-radius: 2px;
  transition: all 0.2s;
}

/* Mobile nav */
.mobile-nav {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ff003c22;
  padding: 0.75rem 1.5rem 1rem;
  gap: 0.25rem;
  background: rgba(0,0,0,0.97);
}

.mobile-link {
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #888;
  padding: 10px 8px;
  border-bottom: 1px solid #ff003c11;
  display: flex;
  gap: 10px;
  transition: color 0.15s, padding-left 0.15s;
}
.mobile-link:hover,
.mobile-link.active {
  color: #ff003c;
  padding-left: 16px;
}
.mobile-lang-toggle {
  margin-top: 0.35rem;
  background: transparent;
  border: none;
  text-align: left;
  font: inherit;
  color: #888;
  padding: 10px 8px;
  border-bottom: 1px solid #ff003c11;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: flex;
  gap: 10px;
}
.mobile-lang-toggle:hover {
  color: #ff003c;
}

/* Transición mobile menu */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Responsive */
@media (max-width: 640px) {
  .desktop-nav,
  .lang-toggle,
  .terminal-btn { display: none; }
  .hamburger    { display: flex; }
  .logo { font-size: 0.85rem; }
}
</style>
