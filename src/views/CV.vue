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
  email: 'julichaan@proton.me',
  github: 'github.com/julichaan',
  linkedin: 'linkedin.com/in/juli%C3%A1n-espada-rodr%C3%ADguez-752006246',
  about:
    'Soy ingeniero IT y profesional de ciberseguridad en Madrid, con enfoque en threat hunting, ethical hacking y bug bounty. Mi forma de trabajar combina mentalidad ofensiva con disciplina de análisis: identificar señales débiles, entender el contexto técnico y transformarlo en hallazgos accionables para reducir riesgo real.\n\n' +
    'Mi especialidad está en entornos donde confluyen lógica de negocio, control de acceso y superficie web/API. Me interesan especialmente las vulnerabilidades que parecen menores en aislamiento, pero que encadenadas explican impacto de negocio. Además, mantengo una práctica continua en CTF y writeups para reforzar investigación, reporting técnico y criterio de priorización.',
} : {
  name: 'Julián Espada Rodríguez',
  alias: 'julichaan',
  location: 'Madrid, Spain',
  email: 'julichaan@proton.me',
  github: 'github.com/julichaan',
  linkedin: 'linkedin.com/in/juli%C3%A1n-espada-rodr%C3%ADguez-752006246',
  about:
    'I am an IT Engineer and cybersecurity professional based in Madrid, focused on threat hunting, ethical hacking, and bug bounty research. My approach blends offensive thinking with analytical discipline: identify weak signals, understand technical context, and turn findings into actionable security decisions that reduce real risk.\n\n' +
    'I perform best in areas where business logic, access control, and web/API attack surface converge. I am especially interested in vulnerabilities that look minor in isolation but become high-impact when chained. I also keep an active CTF/writeup routine to sharpen research depth, technical reporting, and triage judgment.',
})

const experience = computed(() => isSpanish.value ? [
  {
    role: 'Security Researcher (Bug Bounty)',
    company: 'Freelance',
    period: '2023 — presente',
    desc: 'Investigación de vulnerabilidades en programas públicos y privados. Enfoque en IDOR, XSS, SSRF y lógica de negocio.',
  },
  {
    role: 'Analista de Ciberseguridad Jr.',
    company: 'TechSec S.L.',
    period: '2022 — 2023',
    desc: 'Pentesting web y de infraestructura para clientes PYME. Informes técnicos y ejecutivos. Hardening de servidores Linux.',
  },
  {
    role: 'Becario de Desarrollo',
    company: 'StartupXYZ',
    period: '2021 — 2022',
    desc: 'Desarrollo frontend con Vue.js. Primer contacto con DevSecOps e integración de SAST en CI/CD.',
  },
] : [
  {
    role: 'Security Researcher (Bug Bounty)',
    company: 'Freelance',
    period: '2023 — present',
    desc: 'Vulnerability research across public and private programs. Focus on IDOR, XSS, SSRF, and business logic.',
  },
  {
    role: 'Junior Cybersecurity Analyst',
    company: 'TechSec S.L.',
    period: '2022 — 2023',
    desc: 'Web and infrastructure penetration testing for SMB clients. Technical and executive reporting. Linux server hardening.',
  },
  {
    role: 'Development Intern',
    company: 'StartupXYZ',
    period: '2021 — 2022',
    desc: 'Frontend development with Vue.js. First exposure to DevSecOps and SAST integration in CI/CD.',
  },
])

const education = computed(() => isSpanish.value ? [
  { title: 'Grado en Ingeniería Informática', center: 'Universidad Autónoma de Madrid', period: '2018 — 2022' },
  { title: 'Máster en Ciberseguridad', center: 'UEM — Universidad Europea de Madrid', period: '2022 — 2023' },
] : [
  { title: 'BSc in Computer Engineering', center: 'Autonomous University of Madrid', period: '2018 — 2022' },
  { title: 'Master’s in Cybersecurity', center: 'UEM — European University of Madrid', period: '2022 — 2023' },
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
    <div class="max-w-5xl mx-auto px-6 py-14">
      <header class="mb-12 pb-8 border-b text-center" style="border-color:#ff003c33">
        <p class="text-xs tracking-widest mb-3" style="color:#ff003c66">// cv</p>

        <h1 class="text-5xl md:text-6xl font-black tracking-widest mb-4" style="color:#ff003c">
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

      <div class="cv-grid max-w-4xl mx-auto">
        <div class="space-y-10">
          <section>
            <h2 class="section-title">{{ isSpanish ? 'SOBRE MÍ' : 'ABOUT ME' }}</h2>
            <p class="text-sm leading-relaxed text-gray-400 whitespace-pre-line">{{ profile.about }}</p>
          </section>

          <section>
            <h2 class="section-title">{{ isSpanish ? 'EXPERIENCIA' : 'EXPERIENCE' }}</h2>
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

          <section>
            <h2 class="section-title">{{ isSpanish ? 'EDUCACIÓN' : 'EDUCATION' }}</h2>
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

        <div class="space-y-10">
          <section>
            <h2 class="section-title">{{ isSpanish ? 'HABILIDADES' : 'SKILLS' }}</h2>

            <p class="label-cat">{{ isSpanish ? '// ofensivo' : '// offensive' }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="s in skills.ofensivo" :key="s" class="skill-tag">{{ s }}</span>
            </div>

            <p class="label-cat">{{ isSpanish ? '// lenguajes' : '// languages' }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="s in skills.lenguajes" :key="s" class="skill-tag">{{ s }}</span>
            </div>

            <p class="label-cat">{{ isSpanish ? '// otros' : '// other' }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in skills.otros" :key="s" class="skill-tag">{{ s }}</span>
            </div>
          </section>

          <section>
            <h2 class="section-title">{{ isSpanish ? 'CONTACTO' : 'CONTACT' }}</h2>
            <div class="space-y-2 text-xs" style="color:#555">
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
        </div>
      </div>

      <footer class="text-center text-xs text-gray-700 border-t mt-14 pt-6" style="border-color:#ff003c22">
        {{ isSpanish ? 'cat cv.pdf | strings | grep -i "contrátame"' : 'cat cv.pdf | strings | grep -i "hire me"' }}
      </footer>
    </div>
  </div>
</template>

<style scoped>
.cv-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
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