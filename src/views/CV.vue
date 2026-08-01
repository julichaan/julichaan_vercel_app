<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const { isSpanish } = useLanguage()

const typingText = ref('')
const stopped = ref(false)
let runId = 0

const titleMessage = computed(() => (
  isSpanish.value ? 'Ingeniero IT, threat hunter y ethical hacker' : 'IT Engineer, Threat Hunter & Ethical Hacker'
))

const profile = computed(() => isSpanish.value ? {
  name: 'Julián Espada Rodríguez',
  alias: 'julichaan',
  location: 'Madrid, España',
  email: 'julian.espada.business@gmail.com',
  github: 'github.com/julichaan',
  linkedin: 'linkedin.com/in/juli%C3%A1n-espada-rodr%C3%ADguez-752006246',
} : {
  name: 'Julián Espada Rodríguez',
  alias: 'julichaan',
  location: 'Madrid, Spain',
  email: 'julian.espada.business@gmail.com',
  github: 'github.com/julichaan',
  linkedin: 'linkedin.com/in/juli%C3%A1n-espada-rodr%C3%ADguez-752006246',
})

const experience = computed(() => isSpanish.value ? [
  {
    role: 'Threat Hunter and Deception - Telefonica Tech',
    company: 'ALTEN Spain · Jornada completa',
    period: 'abr. 2026 — actualidad · En remoto',
    desc: 'Equipo de Threat Hunting de Telefonica Tech. Threat hunter multiclientelar con Cortex XDR, Microsoft Defender for Endpoint, Cytomic Orion y CrowdStrike.',
  },
  {
    role: 'Bug Bounty Hunter',
    company: 'Secur0 · Profesional independiente',
    period: 'sept. 2025 — actualidad',
    desc: 'Hunting de bugs y vulnerabilidades en la plataforma Secur0.',
  },
  {
    role: 'Cybersecurity Engineer',
    company: 'Isdefe · Jornada completa',
    period: 'jun. 2023 — abr. 2026 · Presencial',
    desc: 'Proyecto de ciberseguridad en el Mando Conjunto del Ciberespacio.',
  },
  {
    role: 'Cybersecurity Engineer',
    company: 'Mando Conjunto del Ciberespacio (MCCE) · Jornada completa',
    period: 'jun. 2023 — abr. 2026 · Presencial',
    desc: 'Analista SOC y posteriormente ingeniero en proyecto 5G. Tecnologías: ArcSight, Cortex XDR, Splunk, Tenable y herramientas CCN (Lucia, Reyes y Carmen).',
  },
] : [
  {
    role: 'Threat Hunter and Deception - Telefonica Tech',
    company: 'ALTEN Spain · Full-time',
    period: 'Apr 2026 — present · Remote',
    desc: 'Part of Telefonica Tech threat hunting team. Multi-client threat hunter using Cortex XDR, Microsoft Defender for Endpoint, Cytomic Orion, and CrowdStrike.',
  },
  {
    role: 'Bug Bounty Hunter',
    company: 'Secur0 · Independent',
    period: 'Sep 2025 — present',
    desc: 'Hunting bugs and vulnerabilities on the Secur0 platform.',
  },
  {
    role: 'Cybersecurity Engineer',
    company: 'Isdefe · Full-time',
    period: 'Jun 2023 — Apr 2026 · On-site',
    desc: 'Worked on the cybersecurity project for Mando Conjunto del Ciberespacio.',
  },
  {
    role: 'Cybersecurity Engineer',
    company: 'Mando Conjunto del Ciberespacio (MCCE) · Full-time',
    period: 'Jun 2023 — Apr 2026 · On-site',
    desc: 'SOC analyst and later engineer in a 5G project. Stack: ArcSight, Cortex XDR, Splunk, Tenable, and CCN tools (Lucia, Reyes, Carmen).',
  },
])

const certifications = computed(() => isSpanish.value ? [
  {
    name: 'eJPT',
    detail: 'eLearnSecurity Junior Penetration Tester',
    issuer: 'INE Security',
    image: '/certifications/ejpt.png',
  },
  {
    name: 'eCPPT',
    detail: 'eLearnSecurity Certified Professional Penetration Tester',
    issuer: 'INE Security',
    image: '/certifications/ecppt.png',
  },
  {
    name: 'CRTA',
    detail: 'Certified Red Team Analyst',
    issuer: 'Altered Security',
    image: '/certifications/crta.png',
  },
  {
    name: 'Web-RTA',
    detail: 'Web Red Team Analyst',
    issuer: 'Web Security Program',
    image: '/certifications/webrta.png',
  },
] : [
  {
    name: 'eJPT',
    detail: 'eLearnSecurity Junior Penetration Tester',
    issuer: 'INE Security',
    image: '/certifications/ejpt.png',
  },
  {
    name: 'eCPPT',
    detail: 'eLearnSecurity Certified Professional Penetration Tester',
    issuer: 'INE Security',
    image: '/certifications/ecppt.png',
  },
  {
    name: 'CRTA',
    detail: 'Certified Red Team Analyst',
    issuer: 'Altered Security',
    image: '/certifications/crta.png',
  },
  {
    name: 'Web-RTA',
    detail: 'Web Red Team Analyst',
    issuer: 'Web Security Program',
    image: '/certifications/webrta.png',
  },
])

const education = computed(() => isSpanish.value ? [
  { title: 'Grado en Ingeniería Informática', center: 'Universidad Autónoma de Madrid', period: '2018 — 2022' },
  { title: 'Máster en Ciberseguridad', center: 'ITTI High Institute', period: '2022 — 2023' },
] : [
  { title: 'BSc in Computer Engineering', center: 'Autonomous University of Madrid', period: '2018 — 2022' },
  { title: 'Master’s in Cybersecurity', center: 'ITTI High Institute', period: '2022 — 2023' },
])

const skills = computed(() => isSpanish.value ? {
  ofensivo: ['Burp Suite', 'Metasploit', 'SQLMap', 'Nmap', 'Ffuf', 'Nuclei', 'CrackMapExec'],
  lenguajes: ['Python', 'Bash', 'JavaScript', 'SQL', 'PowerShell'],
  otros: ['Linux', 'Docker', 'Git', 'nociones de AWS', 'OWASP Top 10', 'investigación de CVEs'],
} : {
  ofensivo: ['Burp Suite', 'Metasploit', 'SQLMap', 'Nmap', 'Ffuf', 'Nuclei', 'CrackMapExec'],
  lenguajes: ['Python', 'Bash', 'JavaScript', 'SQL', 'PowerShell'],
  otros: ['Linux', 'Docker', 'Git', 'AWS basics', 'OWASP Top 10', 'CVE research'],
})

const startTyping = () => {
  runId += 1
  const currentRun = runId
  const message = titleMessage.value
  typingText.value = ''

  const typeLoop = async () => {
    for (let i = 0; i <= message.length; i++) {
      if (stopped.value || currentRun !== runId) return
      typingText.value = message.slice(0, i)
      await new Promise((resolve) => setTimeout(resolve, 70))
    }
    await new Promise((resolve) => setTimeout(resolve, 2200))
    if (stopped.value || currentRun !== runId) return
    for (let i = message.length; i >= 0; i--) {
      if (stopped.value || currentRun !== runId) return
      typingText.value = message.slice(0, i)
      await new Promise((resolve) => setTimeout(resolve, 35))
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (!stopped.value && currentRun === runId) typeLoop()
  }

  typeLoop()
}

onMounted(() => {
  startTyping()
})

onUnmounted(() => {
  stopped.value = true
  runId += 1
})

watch(titleMessage, () => {
  if (!stopped.value) startTyping()
})
</script>

<template>
  <div class="font-mono bg-black text-gray-300 min-h-screen">
    <div class="max-w-[1400px] mx-auto px-6 py-12 md:py-14">
      <header class="mb-10 md:mb-12 pb-8 border-b text-center" style="border-color:#ff003c33">
        <p class="text-xs tracking-widest mb-3" style="color:#ff003c66">// cv</p>

        <h1 class="text-2xl md:text-4xl font-black tracking-wide mb-4" style="color:#ff003c">
          {{ profile.name }}
        </h1>

        <div class="flex flex-wrap items-center justify-center gap-0 text-lg md:text-xl mb-5 select-none">
          <span style="color:#ff003c">julichaan</span>
          <span class="text-gray-600">@</span>
          <span style="color:#ff003c">cv</span>
          <span class="text-gray-600">:~$&nbsp;</span>
          <span class="text-gray-200">{{ typingText }}</span>
          <span class="animate-pulse" style="color:#00ff9f">▌</span>
        </div>

        <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs" style="color:#555">
          <span>📍 {{ profile.location }}</span>
          <a :href="'mailto:' + profile.email" class="hover:text-gray-300 transition-colors">✉ {{ profile.email }}</a>
          <a :href="'https://' + profile.github" target="_blank" rel="noopener" class="hover:text-gray-300 transition-colors">⌥ {{ profile.github }}</a>
          <a :href="'https://' + profile.linkedin" target="_blank" rel="noopener" class="hover:text-gray-300 transition-colors">⌥ {{ profile.linkedin }}</a>
        </div>
      </header>

      <div class="cv-grid max-w-[1300px] mx-auto">
        <div class="space-y-12 md:space-y-14">
          <section>
            <h2 class="section-title text-center">{{ isSpanish ? 'EXPERIENCIA' : 'EXPERIENCE' }}</h2>
            <div class="space-y-5">
              <div v-for="job in experience" :key="job.role" class="exp-card text-center">
                <div class="flex flex-col items-center gap-1 mb-1">
                  <span class="font-bold text-white text-sm">{{ job.role }}</span>
                  <span class="text-xs tabular-nums" style="color:#00ff9f">{{ job.period }}</span>
                </div>
                <p class="text-xs mb-2" style="color:#ff003c">{{ job.company }}</p>
                <p class="text-xs text-gray-500 leading-relaxed">{{ job.desc }}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 class="section-title text-center">{{ isSpanish ? 'EDUCACIÓN' : 'EDUCATION' }}</h2>
            <div class="space-y-4">
              <div v-for="edu in education" :key="edu.title" class="exp-card text-center">
                <div class="flex flex-col items-center gap-1">
                  <span class="font-bold text-white text-sm">{{ edu.title }}</span>
                  <span class="text-xs tabular-nums" style="color:#00ff9f">{{ edu.period }}</span>
                </div>
                <p class="text-xs mt-1" style="color:#ff003c">{{ edu.center }}</p>
              </div>
            </div>
          </section>

          <section class="pt-3 md:pt-6">
            <h2 class="section-title text-center">{{ isSpanish ? 'CERTIFICACIONES' : 'CERTIFICATIONS' }}</h2>
            <div class="grid-certifications">
              <article v-for="cert in certifications" :key="cert.name" class="cert-card">
                <img :src="cert.image" :alt="cert.name" class="cert-image" loading="lazy" />
                <h3 class="text-sm font-bold text-white mt-3">{{ cert.name }}</h3>
                <p class="text-xs mt-1 text-gray-400">{{ cert.detail }}</p>
                <p class="text-xs mt-1" style="color:#00ff9f">{{ cert.issuer }}</p>
              </article>
            </div>
          </section>
        </div>

        <aside class="space-y-10 md:space-y-12 sidebar-panel">
          <section>
            <h2 class="section-title text-center">{{ isSpanish ? 'HABILIDADES' : 'SKILLS' }}</h2>

            <p class="label-cat text-center">{{ isSpanish ? '// ofensivo' : '// offensive' }}</p>
            <div class="flex flex-wrap gap-2 mb-4 justify-center">
              <span v-for="s in skills.ofensivo" :key="s" class="skill-tag">{{ s }}</span>
            </div>

            <p class="label-cat text-center">{{ isSpanish ? '// lenguajes' : '// languages' }}</p>
            <div class="flex flex-wrap gap-2 mb-4 justify-center">
              <span v-for="s in skills.lenguajes" :key="s" class="skill-tag">{{ s }}</span>
            </div>

            <p class="label-cat text-center">{{ isSpanish ? '// otros' : '// other' }}</p>
            <div class="flex flex-wrap gap-2 justify-center">
              <span v-for="s in skills.otros" :key="s" class="skill-tag">{{ s }}</span>
            </div>
          </section>

          <section>
            <h2 class="section-title text-center">{{ isSpanish ? 'CONTACTO' : 'CONTACT' }}</h2>
            <div class="space-y-2 text-xs text-center" style="color:#555">
              <p><span style="color:#00ff9f">$</span> {{ isSpanish ? 'ubicación' : 'location' }}   → {{ profile.location }}</p>
              <p><span style="color:#00ff9f">$</span> {{ isSpanish ? 'correo' : 'email' }}      →
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
        </aside>
      </div>

      <footer class="text-center text-xs text-gray-700 border-t mt-14 pt-6" style="border-color:#ff003c22">
        {{ isSpanish ? 'cat cv.pdf | strings | grep -i "contrátame"' : 'cat cv.pdf | strings | grep -i "hire me"' }}
      </footer>
    </div>
  </div>
</template>

<style scoped>
.cv-grid {
  display: block;
}

@media (min-width: 1200px) {
  .cv-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.95fr) minmax(320px, 1fr);
    gap: 2rem;
    align-items: start;
  }
}

.sidebar-panel {
  padding-top: 0;
}

@media (min-width: 1200px) {
  .sidebar-panel {
    position: sticky;
    top: 5.25rem;
  }
}

.section-title {
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.28em;
  color: #ff003c;
  margin-bottom: 1.15rem;
  padding-bottom: 0.45rem;
  border-bottom: 1px solid #ff003c22;
}

.label-cat {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: #ff003c88;
  margin-bottom: 0.5rem;
}

.exp-card {
  padding: 1rem 1.1rem;
  border: 1px solid #ffffff07;
  background: #080808;
  border-radius: 4px;
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

.grid-certifications {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .grid-certifications {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-certifications {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1400px) {
  .grid-certifications {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.cert-card {
  padding: 0.95rem;
  border: 1px solid #ffffff0f;
  background: #070707;
  border-radius: 4px;
  text-align: center;
}

.cert-image {
  width: 100%;
  height: 120px;
  object-fit: contain;
  border-radius: 3px;
  border: 1px solid #ffffff14;
}
</style>