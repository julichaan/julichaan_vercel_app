<script setup>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const { isSpanish } = useLanguage()

const LINKS = [
  { label: { es: 'Sobre mí', en: 'About' }, path: '/about' },
  { label: 'Writeups',       path: '/writeups' },
  { label: 'Blog',           path: '/blog' },
  { label: { es: 'Notas', en: 'Notes' }, path: '/notes' },
]

const SOCIAL = [
  {
    label: 'GitHub',
    href: 'https://github.com/julichaan',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
  },
  {
    label: 'HackTheBox',
    href: 'https://www.hackthebox.com/profile/114171',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.996 0L3 5v14l8.996 5L21 19V5L11.996 0zm0 1.155l8.004 4.497V18.35l-8.004 4.497-8.004-4.497V5.652l8.004-4.497zM8 8v8l4 2 4-2V8l-4-2-4 2z"/></svg>`,
  },
]

const year = new Date().getFullYear()

const localizedLinks = computed(() =>
  LINKS.map((link) => ({
    ...link,
    label: typeof link.label === 'string' ? link.label : (isSpanish.value ? link.label.es : link.label.en),
  })),
)
</script>

<template>
  <footer class="footer">
    <!-- Línea superior -->
    <div class="top-bar" />

    <div class="inner">
      <!-- Col 1: Brand -->
      <div class="col brand-col">
        <div class="brand-prompt">
          <span class="red">julichaan</span>
          <span class="gray">@</span>
          <span class="blue">blog</span>
          <span class="gray">:~$</span>
        </div>
        <p class="brand-desc">
          {{ isSpanish ? 'Blog de ciberseguridad.' : 'Cybersecurity blog.' }}<br/>
          {{ isSpanish ? 'Bug Bounty · CTF · Writeups.' : 'Bug Bounty · CTF · Writeups.' }}
        </p>
        <!-- Social icons -->
        <div class="social">
          <a
            v-for="s in SOCIAL"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener"
            class="social-link"
            :title="s.label"
            v-html="s.icon"
          />
        </div>
      </div>

      <!-- Col 2: Nav -->
      <div class="col">
        <h4 class="col-title">{{ isSpanish ? '// Navegación' : '// Navigation' }}</h4>
        <ul class="foot-nav">
          <li v-for="link in localizedLinks" :key="link.path">
            <router-link :to="link.path" class="foot-link">
              <span class="red">›</span> {{ link.label }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Col 3: Status -->
      <div class="col">
        <h4 class="col-title">{{ isSpanish ? '// Estado' : '// Status' }}</h4>
        <ul class="status-list">
          <li>
            <span class="dot green" />
            <span class="gray-text">{{ isSpanish ? 'Todos los sistemas en funcionamiento' : 'All systems operational' }}</span>
          </li>
          <li>
            <span class="dot yellow" />
            <span class="gray-text">{{ isSpanish ? 'Nuevos writeups en progreso' : 'New writeups in progress' }}</span>
          </li>
          <li>
            <span class="dot red-dot" />
            <span class="gray-text">{{ isSpanish ? 'Live2D: desactivado por ahora' : 'Live2D: disabled for now' }}</span>
          </li>
        </ul>

        <!-- HTB badge -->
        <a href="https://www.hackthebox.com/profile/114171" target="_blank" rel="noopener" class="htb-badge">
          <img
            src="https://www.hackthebox.com/badge/image/114171"
            alt="HackTheBox badge"
            class="htb-img"
          />
        </a>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="bottom-bar">
      <span class="bottom-text">
        <span class="red">©{{ year }}</span> julichaan — {{ isSpanish ? 'hecho con' : 'made with' }}
        <span class="red">♥</span> {{ isSpanish ? 'y demasiado café' : 'and way too much coffee' }}
      </span>
      <span class="bottom-text">
        <span class="gray">[ </span>
        <span class="red">Vue 3</span>
        <span class="gray"> + </span>
        <span class="red">Vite</span>
        <span class="gray"> + </span>
        <span class="red">Tailwind</span>
        <span class="gray"> ]</span>
      </span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #000;
  border-top: 1px solid #ff003c22;
  font-family: 'JetBrains Mono', monospace;
  color: #555;
}

.top-bar {
  height: 2px;
  background: linear-gradient(90deg, transparent, #ff003c55, #38bdf855, transparent);
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 1.5rem 2rem;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1.4fr;
  gap: 3rem;
}

/* Brand */
.brand-prompt {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-bottom: 0.75rem;
}
.brand-desc {
  font-size: 0.75rem;
  color: #444;
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.social {
  display: flex;
  gap: 0.75rem;
}
.social-link {
  color: #444;
  width: 20px;
  height: 20px;
  display: block;
  transition: color 0.15s;
}
.social-link:hover { color: #ff003c; }
.social-link :deep(svg) { width: 100%; height: 100%; }

/* Cols */
.col-title {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #38bdf888;
  margin-bottom: 1rem;
}

/* Foot nav */
.foot-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.foot-link {
  text-decoration: none;
  font-size: 0.78rem;
  color: #555;
  display: flex;
  gap: 8px;
  transition: color 0.15s, padding-left 0.15s;
}
.foot-link:hover { color: #38bdf8; padding-left: 4px; }

/* Status */
.status-list {
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.status-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
}
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot.green  { background: #22c55e; box-shadow: 0 0 6px #22c55e88; }
.dot.yellow { background: #eab308; box-shadow: 0 0 6px #eab30888; }
.dot.red-dot { background: #ff003c; box-shadow: 0 0 6px #ff003c88; }
.gray-text { color: #444; }

/* HTB badge */
.htb-badge { display: inline-block; }
.htb-img { max-width: 160px; opacity: 0.85; transition: opacity 0.2s; }
.htb-img:hover { opacity: 1; }

/* Bottom bar */
.bottom-bar {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  border-top: 1px solid #ff003c11;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.bottom-text { font-size: 0.7rem; color: #333; }

/* Helpers */
.red  { color: #ff003c; }
.blue { color: #38bdf8; }
.gray { color: #555; }

/* Responsive */
@media (max-width: 768px) {
  .inner {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1.25rem 1.5rem;
  }
  .bottom-bar { flex-direction: column; text-align: center; }
}
</style>
