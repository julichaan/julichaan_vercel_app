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
      <script setup>
      import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
      import { useLanguage } from '../composables/useLanguage'
    }
    await new Promise(r => setTimeout(r, 2400))
    if (stopped) return
      const { isSpanish } = useLanguage()
      const MSG = computed(() => (isSpanish.value ? 'Investigadora de seguridad y hacker' : 'Security Researcher & Hacker'))
      if (stopped) return
      let runId = 0

      const typeLoop = async (id) => {
        const message = MSG.value
        for (let i = 0; i <= message.length; i++) {
          if (stopped || id !== runId) return
          typingText.value = message.slice(0, i)
          await new Promise(r => setTimeout(r, 70))
        }
        await new Promise(r => setTimeout(r, 2400))
        if (stopped || id !== runId) return
        for (let i = message.length; i >= 0; i--) {
          if (stopped || id !== runId) return
          typingText.value = message.slice(0, i)
          await new Promise(r => setTimeout(r, 35))
        }
        await new Promise(r => setTimeout(r, 500))
        if (!stopped && id === runId) typeLoop(id)
      }

      const restartTyping = () => {
        runId += 1
        typingText.value = ''
        typeLoop(runId)
      }
      typingText.value = MSG.slice(0, i)
      await new Promise(r => setTimeout(r, 35))
        restartTyping()
  github:   'github.com/julichaan',
      onUnmounted(() => { stopped = true; runId += 1 })

      watch(MSG, () => {
        if (!stopped) restartTyping()
      })

      // ── Datos ─────────────────────────────────────────────────────
      const profile = computed(() => isSpanish.value ? {
        name: 'Julia Chan',
        alias: 'julichaan',
        location: 'Madrid, España',
        email: 'julichaan@proton.me',
        github: 'github.com/julichaan',
        linkedin: 'linkedin.com/in/julichaan',
        about:
          'Soy un ingeniero de ciberseguridad de 27 años apasionado por mi trabajo, especializado en Red Team y pentesting. Mi objetivo es proteger la integridad y la confidencialidad de los sistemas de información mediante análisis proactivos y simulaciones de ataque. Con una sólida formación académica y varias certificaciones reconocidas por la industria, me dedico a identificar y mitigar vulnerabilidades antes de que puedan ser explotadas.\n\n' +
          'Mis competencias principales incluyen:\n' +
          'Red Team: simulación de ataques reales para evaluar y mejorar la postura de seguridad de las organizaciones.\n' +
          'Pentesting: realización de pruebas de penetración detalladas para identificar y corregir fallos de seguridad.\n' +
          'Análisis de vulnerabilidades: evaluación de sistemas y aplicaciones para descubrir y mitigar riesgos.\n' +
          'Respuesta a incidentes: desarrollo e implementación de planes de respuesta para mitigar el impacto de los incidentes de seguridad.\n\n' +
          'En mi tiempo libre, disfruto resolviendo retos CTF (Capture The Flag) y aprendiendo constantemente sobre nuevas vulnerabilidades. La ciberseguridad no es solo mi profesión; es mi pasión.',
      } : {
        name: 'Julia Chan',
        alias: 'julichaan',
        location: 'Madrid, Spain',
        email: 'julichaan@proton.me',
        github: 'github.com/julichaan',
        linkedin: 'linkedin.com/in/julichaan',
        about:
          'I am a 27-year-old cybersecurity engineer passionate about my work, specialized in Red Team and penetration testing. My goal is to protect the integrity and confidentiality of information systems through proactive analysis and attack simulations. With a strong academic background and several industry-recognized certifications, I focus on identifying and mitigating vulnerabilities before they can be exploited.\n\n' +
          'My main skills include:\n' +
          'Red Team: simulating real-world attacks to assess and improve an organization\'s security posture.\n' +
          'Penetration testing: performing detailed security assessments to identify and fix security issues.\n' +
          'Vulnerability analysis: evaluating systems and applications to uncover and reduce risk.\n' +
          'Incident response: developing and implementing response plans to reduce the impact of security incidents.\n\n' +
          'In my free time, I enjoy solving CTF (Capture The Flag) challenges and constantly learning about new vulnerabilities. Cybersecurity is not just my profession; it is my passion.',
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
          role: 'Becaria de Desarrollo',
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

      const certs = [
        { name: 'eJPT — eLearnSecurity Junior Penetration Tester', year: '2022' },
        { name: 'CEH — Certified Ethical Hacker', year: '2023' },
        { name: 'OSCP — Offensive Security Certified Professional', year: '2024' },
        { name: 'HTB Pro Hacker Rank', year: '2024' },
      ]

      const skills = computed(() => isSpanish.value ? {
        ofensivo: ['Burp Suite', 'Metasploit', 'SQLMap', 'Nmap', 'Ffuf', 'Nuclei', 'CrackMapExec'],
        lenguajes: ['Python', 'Bash', 'JavaScript', 'SQL', 'PowerShell'],
        otros: ['Linux', 'Docker', 'Git', 'nociones de AWS', 'OWASP Top 10', 'investigación de CVEs'],
      } : {
        ofensivo: ['Burp Suite', 'Metasploit', 'SQLMap', 'Nmap', 'Ffuf', 'Nuclei', 'CrackMapExec'],
        lenguajes: ['Python', 'Bash', 'JavaScript', 'SQL', 'PowerShell'],
        otros: ['Linux', 'Docker', 'Git', 'AWS basics', 'OWASP Top 10', 'CVE research'],
      })

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
            <h2 class="section-title">{{ isSpanish ? 'SOBRE MÍ' : 'ABOUT ME' }}</h2>
            <p class="text-sm leading-relaxed text-gray-400 whitespace-pre-line">{{ profile.about }}</p>
          </section>

          <!-- EXPERIENCIA -->
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

          <!-- EDUCACIÓN -->
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

        <!-- ── COLUMNA DERECHA (sidebar) ── -->
        <div class="space-y-10">

          <!-- HABILIDADES -->
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

          <!-- CERTIFICACIONES -->
          <section>
            <h2 class="section-title">{{ isSpanish ? 'CERTIFICACIONES' : 'CERTIFICATIONS' }}</h2>
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
      </div><!-- /cv-grid -->

      <!-- ══ FOOTER ════════════════════════════════════════════════ -->
      <footer class="text-center text-xs text-gray-700 border-t mt-14 pt-6" style="border-color:#ff003c22">
        {{ isSpanish ? 'cat cv.pdf | strings | grep -i "contrátame"' : 'cat cv.pdf | strings | grep -i "hire me"' }}
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
