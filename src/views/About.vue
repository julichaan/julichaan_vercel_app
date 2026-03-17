<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ── Typing effect ──────────────────────────────────────────────
const typingText = ref('')
const MSG = 'Security Researcher & Hacker'
let stopped = false

onMounted(async () => {
  const typeLoop = async () => {
    for (let i = 0; i <= MSG.length; i++) {
      if (stopped) return
      typingText.value = MSG.slice(0, i)
      await new Promise(r => setTimeout(r, 70))
    }
    await new Promise(r => setTimeout(r, 2400))
    if (stopped) return
    for (let i = MSG.length; i >= 0; i--) {
      if (stopped) return
      typingText.value = MSG.slice(0, i)
      await new Promise(r => setTimeout(r, 35))
    }
    await new Promise(r => setTimeout(r, 500))
    if (!stopped) typeLoop()
  }
  typeLoop()
})
onUnmounted(() => { stopped = true })

// ── Datos ─────────────────────────────────────────────────────
const profile = {
  name:     'Julia Chan',
  alias:    'julichaan',
  location: 'Madrid, España',
  email:    'julichaan@proton.me',
  github:   'github.com/julichaan',
  linkedin: 'linkedin.com/in/julichaan',
  about:
    'Soy un ingeniero de ciberseguridad de 27 años apasionado por mi trabajo, especializado en Red Team y Pentesting. Mi objetivo es proteger la integridad y la confidencialidad de los sistemas de información mediante análisis proactivos y simulaciones de ataques. Con una sólida formación académica y diversas certificaciones reconocidas por la industria, me dedico a identificar y mitigar vulnerabilidades antes de que puedan ser explotadas.\n\n' +
    'Mis competencias principales incluyen:\n' +
    'Red Team: Simulación de ataques del mundo real para evaluar y mejorar la postura de seguridad de las organizaciones.\n' +
    'Pentesting: Realización de pruebas de penetración detalladas para identificar y remediar fallos de seguridad.\n' +
    'Análisis de vulnerabilidades: Evaluación de sistemas y aplicaciones para descubrir y mitigar riesgos.\n' +
    'Respuesta a incidentes: Desarrollo e implementación de planes de respuesta para mitigar el impacto de los incidentes de seguridad.\n\n' +
    'En mi tiempo libre, disfruto resolviendo retos CTF (Capture The Flag) y aprendiendo constantemente sobre nuevas vulnerabilidades. La ciberseguridad no es solo mi profesión; es mi pasión.',
}

const experience = [
  {
    role:    'Security Researcher (Bug Bounty)',
    company: 'Freelance',
    period:  '2023 — presente',
    desc:    'Investigación de vulnerabilidades en programas públicos y privados. Enfoque en IDOR, XSS, SSRF y lógica de negocio.',
  },
  {
    role:    'Analista de Ciberseguridad Jr.',
    company: 'TechSec S.L.',
    period:  '2022 — 2023',
    desc:    'Pentesting web y de infraestructura para clientes PYME. Informes técnicos y ejecutivos. Hardening de servidores Linux.',
  },
  {
    role:    'Becaria de Desarrollo',
    company: 'StartupXYZ',
    period:  '2021 — 2022',
    desc:    'Desarrollo frontend con Vue.js. Primer contacto con DevSecOps e integración de SAST en CI/CD.',
  },
]

const education = [
  {
    title:  'Grado en Ingeniería Informática',
    center: 'Universidad Autónoma de Madrid',
    period: '2018 — 2022',
  },
  {
    title:  'Máster en Ciberseguridad',
    center: 'UEM — Universidad Europea de Madrid',
    period: '2022 — 2023',
  },
]

const certs = [
  { name: 'eJPT — eLearnSecurity Junior Penetration Tester', year: '2022' },
  { name: 'CEH — Certified Ethical Hacker',                  year: '2023' },
  { name: 'OSCP — Offensive Security Certified Professional', year: '2024' },
  { name: 'HTB Pro Hacker Rank',                             year: '2024' },
]

const skills = {
  ofensivo:  ['Burp Suite', 'Metasploit', 'SQLMap', 'Nmap', 'Ffuf', 'Nuclei', 'CrackMapExec'],
  lenguajes: ['Python', 'Bash', 'JavaScript', 'SQL', 'PowerShell'],
  otros:     ['Linux', 'Docker', 'Git', 'AWS basics', 'OWASP Top 10', 'CVE Research'],
}
</script>

<template>
  <div class="font-mono bg-black text-gray-300 min-h-screen">
    <div class="max-w-5xl mx-auto px-6 py-14">

      <!-- ══ HEADER ════════════════════════════════════════════════ -->
      <header class="mb-12 pb-8 border-b" style="border-color:#ff003c33">
        <p class="text-xs tracking-widest mb-3" style="color:#ff003c66">// curriculum vitae</p>

        <h1 class="text-5xl md:text-6xl font-black tracking-widest mb-4" style="color:#ff003c">
          {{ profile.name }}
        </h1>

        <!-- Prompt con typing -->
        <div class="flex flex-wrap items-center gap-0 text-lg md:text-xl mb-5 select-none">
          <span style="color:#ff003c">julichaan</span>
          <span class="text-gray-600">@</span>
          <span style="color:#ff003c">cv</span>
          <span class="text-gray-600">:~$&nbsp;</span>
          <span class="text-gray-200">{{ typingText }}</span>
          <span class="animate-pulse" style="color:#00ff9f">▌</span>
        </div>

        <!-- Contacto en línea -->
        <div class="flex flex-wrap gap-x-6 gap-y-2 text-xs" style="color:#555">
          <span>📍 {{ profile.location }}</span>
          <a :href="'mailto:' + profile.email"
             class="hover:text-gray-300 transition-colors">✉ {{ profile.email }}</a>
          <a :href="'https://' + profile.github"
             target="_blank" rel="noopener"
             class="hover:text-gray-300 transition-colors">⌥ {{ profile.github }}</a>
          <a :href="'https://' + profile.linkedin"
             target="_blank" rel="noopener"
             class="hover:text-gray-300 transition-colors">⌥ {{ profile.linkedin }}</a>
        </div>
      </header>

      <!-- ══ GRID DOS COLUMNAS ══════════════════════════════════════ -->
      <div class="cv-grid">

        <!-- ── COLUMNA IZQUIERDA (principal) ── -->
        <div class="space-y-10">

          <!-- SOBRE MÍ -->
          <section>
            <h2 class="section-title">SOBRE MÍ</h2>
            <p class="text-sm leading-relaxed text-gray-400 whitespace-pre-line">{{ profile.about }}</p>
          </section>

          <!-- EXPERIENCIA -->
          <section>
            <h2 class="section-title">EXPERIENCIA</h2>
            <div class="space-y-4">
              <div v-for="job in experience" :key="job.role" class="exp-card">
                <div class="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <span class="font-bold text-white text-sm">{{ job.role }}</span>
                  <span class="text-xs tabular-nums shrink-0" style="color:#00ff9f">{{ job.period }}</span>
                </div>
                <p class="text-xs mb-2" style="color:#ff003c">{{ job.company }}</p>
                <p class="text-xs text-gray-500 leading-relaxed">{{ job.desc }}</p>
              </div>
            </div>
          </section>

          <!-- EDUCACIÓN -->
          <section>
            <h2 class="section-title">EDUCACIÓN</h2>
            <div class="space-y-3">
              <div v-for="edu in education" :key="edu.title" class="exp-card">
                <div class="flex flex-wrap items-baseline justify-between gap-2">
                  <span class="font-bold text-white text-sm">{{ edu.title }}</span>
                  <span class="text-xs tabular-nums shrink-0" style="color:#00ff9f">{{ edu.period }}</span>
                </div>
                <p class="text-xs mt-1" style="color:#ff003c">{{ edu.center }}</p>
              </div>
            </div>
          </section>

        </div>

        <!-- ── COLUMNA DERECHA (sidebar) ── -->
        <div class="space-y-10">

          <!-- HABILIDADES -->
          <section>
            <h2 class="section-title">HABILIDADES</h2>

            <p class="label-cat">// ofensivo</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="s in skills.ofensivo" :key="s" class="skill-tag">{{ s }}</span>
            </div>

            <p class="label-cat">// lenguajes</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="s in skills.lenguajes" :key="s" class="skill-tag">{{ s }}</span>
            </div>

            <p class="label-cat">// otros</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in skills.otros" :key="s" class="skill-tag">{{ s }}</span>
            </div>
          </section>

          <!-- CERTIFICACIONES -->
          <section>
            <h2 class="section-title">CERTIFICACIONES</h2>
            <ul class="space-y-2">
              <li
                v-for="cert in certs"
                :key="cert.name"
                class="flex items-start justify-between gap-3 border-l-2 pl-3 py-1"
                style="border-color:#00ff9f33"
              >
                <span class="text-xs text-gray-300 leading-snug">
                  <span style="color:#00ff9f" class="mr-1">▸</span>{{ cert.name }}
                </span>
                <span class="text-xs tabular-nums text-gray-600 shrink-0">{{ cert.year }}</span>
              </li>
            </ul>
          </section>

          <!-- CONTACTO / EXTRA -->
          <section>
            <h2 class="section-title">CONTACTO</h2>
            <div class="space-y-2 text-xs" style="color:#555">
              <p><span style="color:#00ff9f">$</span> location   → {{ profile.location }}</p>
              <p><span style="color:#00ff9f">$</span> email      →
                <a :href="'mailto:' + profile.email" class="hover:text-gray-300 transition-colors">{{ profile.email }}</a>
              </p>
              <p><span style="color:#00ff9f">$</span> github     →
                <a :href="'https://' + profile.github" target="_blank" rel="noopener" class="hover:text-gray-300 transition-colors">{{ profile.github }}</a>
              </p>
              <p><span style="color:#00ff9f">$</span> linkedin   →
                <a :href="'https://' + profile.linkedin" target="_blank" rel="noopener" class="hover:text-gray-300 transition-colors">{{ profile.linkedin }}</a>
              </p>
            </div>
          </section>

        </div>
      </div><!-- /cv-grid -->

      <!-- ══ FOOTER ════════════════════════════════════════════════ -->
      <footer class="text-center text-xs text-gray-700 border-t mt-14 pt-6" style="border-color:#ff003c22">
        cat cv.pdf | strings | grep -i "hire me"
      </footer>

    </div>
  </div>
</template>

<style scoped>
/* Layout dos columnas: 60/40 en desktop, apiladas en móvil */
.cv-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}
@media (min-width: 768px) {
  .cv-grid {
    grid-template-columns: 3fr 2fr;
    gap: 3rem;
  }
}

.section-title {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.3em;
  color: #ff003c;
  margin-bottom: 0.9rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid #ff003c22;
}

.label-cat {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: #ff003c88;
  margin-bottom: 0.5rem;
}

.exp-card {
  padding: 0.7rem 0.9rem;
  border: 1px solid #ffffff07;
  background: #080808;
  border-radius: 2px;
  transition: border-color 0.2s;
}
.exp-card:hover {
  border-color: #ff003c44;
}

.skill-tag {
  font-size: 0.65rem;
  padding: 0.18rem 0.5rem;
  border: 1px solid #00ff9f33;
  color: #00ff9f;
  background: #00ff9f0a;
  border-radius: 2px;
  letter-spacing: 0.04em;
  transition: background 0.2s;
}
.skill-tag:hover {
  background: #00ff9f18;
}
</style>
