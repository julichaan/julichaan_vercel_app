<script setup>
import { ref } from 'vue'

const activeSection = ref('bio')

const sections = [
  { id: 'bio',       label: 'Bio'       },
  { id: 'skills',    label: 'Skills'    },
  { id: 'interests', label: 'Interests' },
  { id: 'contact',   label: 'Contact'   },
]

const profile = {
  name:     'Julián Espada Rodríguez',
  alias:    'julichaan',
  role:     'Security Researcher · Penetration Tester',
  location: 'Madrid, España',
  email:    'julichaan@proton.me',
  github:   'github.com/julichaan',
  twitter:  '@julichaan',
  htb:      'app.hackthebox.com/profile/julichaan',
  bio: [
    'Hacker by vocation, researcher by profession.',
    'I spend my time hunting vulnerabilities in systems before the bad guys do. My favourite area is web pentesting, though lately I\'ve been diving deep into reversing and binary exploitation.',
    'When I\'m not in front of Burp Suite, I\'m solving CTFs, writing writeups, or drinking way too much coffee while debugging at 3am.',
    'I believe in open knowledge and sharing what I learn. This blog is my public notebook.',
  ],
}

const skills = [
  { label: 'Pentesting Web',  pct: 90 },
  { label: 'Bug Bounty',      pct: 85 },
  { label: 'CTF / Reversing', pct: 70 },
  { label: 'Python / Bash',   pct: 80 },
  { label: 'Linux / Infra',   pct: 75 },
  { label: 'OSINT',           pct: 65 },
]

const stack = ['Burp Suite','Nmap','Metasploit','SQLMap','Ffuf','Nuclei','CrackMapExec','Ghidra','Wireshark','Docker']

const interests = [
  { icon: '🕵️', title: 'Bug Bounty',   desc: 'Public and private programs. Speciality in business logic flaws and IDOR.' },
  { icon: '🏁', title: 'CTFs',          desc: 'Regular competitor on HackTheBox, TryHackMe and CTFtime events.' },
  { icon: '✍️', title: 'Writeups',      desc: 'Documenting every challenge as a way to learn and give back to the community.' },
  { icon: '📡', title: 'OSINT',         desc: 'Passive reconnaissance, footprinting and threat intelligence.' },
  { icon: '☕', title: 'Coffee & code', desc: 'Essential ingredient for any late-night hacking session.' },
  { icon: '🔐', title: 'Cryptography',  desc: 'Applied cryptography, implementation attacks and CTF crypto challenges.' },
]

const stats = [
  { num: '47',   label: 'CVEs reported',    color: '#ff003c' },
  { num: '120+', label: 'HTB machines',     color: '#00ff9f' },
  { num: '3',    label: 'Offensive certs',  color: '#ff003c' },
  { num: '∞',    label: 'Coffees consumed', color: '#00ff9f' },
]

const contacts = [
  { icon: '✉', label: 'Email',      val: 'julichaan@proton.me',           href: 'mailto:julichaan@proton.me',                   color: '#38bdf8' },
  { icon: '⌥', label: 'GitHub',    val: 'github.com/julichaan',           href: 'https://github.com/julichaan',                 color: '#38bdf8' },
  { icon: '◈', label: 'Twitter',   val: '@julichaan',                     href: null,                                           color: '#38bdf8' },
  { icon: '⬡', label: 'HackTheBox', val: 'View profile →',                href: 'https://app.hackthebox.com/profile/julichaan', color: '#38bdf8' },
]
</script>

<template>
  <div class="page">
    <div class="layout">

      <!-- ══ SIDEBAR ══════════════════════════════════════════ -->
      <aside class="sidebar">

        <!-- Avatar -->
        <div class="avatar-wrap">
          <img src="../assets/hacker-hero.png" alt="julichaan" class="avatar-img" />
          <div class="avatar-ring" />
        </div>

        <!-- Nombre / alias / rol -->
        <p class="s-name">{{ profile.name }}</p>
        <p class="s-alias">&gt; {{ profile.alias }}</p>
        <p class="s-role">{{ profile.role }}</p>

        <div class="sep" />

        <!-- Meta -->
        <div class="meta-list">
          <div class="meta-row">
            <span class="mk">loc</span>
            <span class="mv">{{ profile.location }}</span>
          </div>
          <div class="meta-row">
            <span class="mk">mail</span>
            <a :href="'mailto:'+profile.email" class="ml">{{ profile.email }}</a>
          </div>
          <div class="meta-row">
            <span class="mk">gh</span>
            <a :href="'https://'+profile.github" target="_blank" rel="noopener" class="ml">{{ profile.github }}</a>
          </div>
          <div class="meta-row">
            <span class="mk">tw</span>
            <span class="mv">{{ profile.twitter }}</span>
          </div>
          <div class="meta-row">
            <span class="mk">htb</span>
            <a :href="'https://'+profile.htb" target="_blank" rel="noopener" class="ml">HTB Profile</a>
          </div>
        </div>

        <div class="sep" />

        <!-- Nav -->
        <nav class="snav">
          <button
            v-for="s in sections"
            :key="s.id"
            class="snav-btn"
            :class="{ active: activeSection === s.id }"
            @click="activeSection = s.id"
          >
            <span class="arrow">▸</span> {{ s.label }}
          </button>
        </nav>

      </aside>

      <!-- ══ PANEL DERECHO ════════════════════════════════════ -->
      <main class="panel">

        <!-- BIO -->
        <section v-show="activeSection === 'bio'" class="fade">
          <h2 class="ptitle">// BIO</h2>
          <div class="bio-text">
            <p v-for="(p,i) in profile.bio" :key="i">{{ p }}</p>
          </div>
          <div class="stats-grid">
            <div v-for="s in stats" :key="s.label" class="stat-card">
              <span class="stat-num" :style="{ color: s.color }">{{ s.num }}</span>
              <span class="stat-lbl">{{ s.label }}</span>
            </div>
          </div>
        </section>

        <!-- SKILLS -->
        <section v-show="activeSection === 'skills'" class="fade">
          <h2 class="ptitle">// SKILLS</h2>
          <div class="skill-list">
            <div v-for="s in skills" :key="s.label" class="skill-row">
              <div class="skill-header">
                <span class="skill-name">{{ s.label }}</span>
                <span class="skill-pct">{{ s.pct }}%</span>
              </div>
              <div class="bar-bg">
                <div class="bar-fill" :style="{ width: s.pct+'%' }" />
              </div>
            </div>
          </div>
          <p class="sub-label">// TOOLBOX</p>
          <div class="tag-wrap">
            <span v-for="t in stack" :key="t" class="tag">{{ t }}</span>
          </div>
        </section>

        <!-- INTERESTS -->
        <section v-show="activeSection === 'interests'" class="fade">
          <h2 class="ptitle">// INTERESTS</h2>
          <div class="int-grid">
            <div v-for="item in interests" :key="item.title" class="int-card">
              <span class="int-icon">{{ item.icon }}</span>
              <div>
                <p class="int-title">{{ item.title }}</p>
                <p class="int-desc">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CONTACT -->
        <section v-show="activeSection === 'contact'" class="fade">
          <h2 class="ptitle">// CONTACT</h2>
          <p class="contact-intro">Feel free to reach out for collaborations, responsible vulnerability disclosures, project proposals or just to talk security.</p>
          <div class="contact-list">
            <component
              v-for="c in contacts" :key="c.label"
              :is="c.href ? 'a' : 'div'"
              :href="c.href || undefined"
              :target="c.href ? '_blank' : undefined"
              rel="noopener"
              class="contact-row"
            >
              <span class="c-icon" :style="{ color: c.color }">{{ c.icon }}</span>
              <span class="c-label">{{ c.label }}</span>
              <span class="c-val">{{ c.val }}</span>
            </component>
          </div>
        </section>

      </main>
    </div>
  </div>
</template>

<style scoped>
.page {
  background: #000;
  min-height: calc(100vh - 56px);
  font-family: 'JetBrains Mono', monospace;
  color: #ccc;
}

.layout {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 3rem;
  align-items: start;
}

/* ── Sidebar ────────────────────────────────── */
.sidebar {
  position: sticky;
  top: 72px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.avatar-wrap {
  position: relative;
  width: 110px;
  height: 110px;
  margin: 0 auto 1.25rem;
}
.avatar-img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top center;
  display: block;
  position: relative;
  z-index: 1;
  filter: sepia(0.1) hue-rotate(80deg) saturate(1.1);
}
.avatar-ring {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 2px solid #38bdf8;
  pointer-events: none;
  animation: rpulse 3s ease-in-out infinite;
}
@keyframes rpulse {
  0%,100% { opacity:1; box-shadow:0 0 8px #38bdf844; }
  50%     { opacity:0.5; box-shadow:0 0 18px #38bdf888; }
}

.s-name  { font-size:.95rem; font-weight:900; color:#fff; letter-spacing:.04em; margin:0 0 3px; text-align:center; }
.s-alias { font-size:.65rem; color:#38bdf8; letter-spacing:.12em; margin:0 0 5px; text-align:center; }
.s-role  { font-size:.6rem; color:#444; line-height:1.6; text-align:center; margin:0; }

.sep { height:1px; background:#38bdf822; margin:.9rem 0; }

.meta-list { display:flex; flex-direction:column; gap:4px; }
.meta-row  { display:flex; gap:8px; align-items:baseline; font-size:.62rem; }
.mk  { color:#38bdf866; width:30px; flex-shrink:0; }
.mv  { color:#666; word-break:break-all; }
.ml  { color:#666; text-decoration:none; word-break:break-all; transition:color .15s; }
.ml:hover { color:#38bdf8; }

.snav { display:flex; flex-direction:column; gap:4px; }
.snav-btn {
  display:flex; align-items:center; gap:8px;
  font-family:inherit; font-size:.72rem; font-weight:600;
  letter-spacing:.1em; text-transform:uppercase;
  color:#444; background:transparent;
  border:1px solid transparent; border-radius:3px;
  padding:7px 12px; cursor:pointer;
  transition:all .15s; text-align:left; width:100%;
}
.snav-btn:hover { color:#38bdf8; border-color:#38bdf822; }
.snav-btn.active { color:#ff003c; border-color:#ff003c44; background:#ff003c0d; }
.arrow { color:#38bdf844; transition:color .15s; }
.snav-btn.active .arrow { color:#ff003c; }

/* ── Panel ──────────────────────────────────── */
.panel { min-width:0; }

.fade { animation:fadein .2s ease; }
@keyframes fadein {
  from { opacity:0; transform:translateY(5px); }
  to   { opacity:1; transform:translateY(0); }
}

.ptitle {
  font-size:.58rem; font-weight:900; letter-spacing:.3em; color:#38bdf8;
  border-bottom:1px solid #38bdf822; padding-bottom:.4rem; margin-bottom:1.5rem;
}

/* Bio */
.bio-text { display:flex; flex-direction:column; gap:.9rem; margin-bottom:2rem; }
.bio-text p { font-size:.78rem; color:#888; line-height:1.85; margin:0; }

.stats-grid {
  display:grid; grid-template-columns:repeat(4,1fr); gap:.75rem; margin-top:1.5rem;
}
.stat-card {
  display:flex; flex-direction:column; align-items:center;
  padding:1rem .5rem; border:1px solid #ffffff08; background:#080808;
  border-radius:2px; gap:5px; transition:border-color .2s;
}
.stat-card:hover { border-color:#38bdf833; }
.stat-num  { font-size:1.6rem; font-weight:900; line-height:1; }
.stat-lbl  { font-size:.55rem; color:#444; letter-spacing:.05em; text-align:center; line-height:1.4; }

/* Skills */
.skill-list { display:flex; flex-direction:column; gap:.9rem; margin-bottom:2rem; }
.skill-row  {}
.skill-header { display:flex; justify-content:space-between; font-size:.7rem; margin-bottom:5px; }
.skill-name   { color:#ccc; }
.skill-pct    { color:#38bdf8; }
.bar-bg  { height:3px; background:#111; border-radius:2px; overflow:hidden; }
.bar-fill{ height:100%; background:linear-gradient(90deg,#ff003c,#38bdf8); border-radius:2px; transition:width .6s ease; }

.sub-label { font-size:.55rem; letter-spacing:.2em; color:#38bdf866; margin-bottom:.75rem; }
.tag-wrap  { display:flex; flex-wrap:wrap; gap:6px; }
.tag {
  font-size:.62rem; padding:3px 8px;
  border:1px solid #38bdf833; color:#38bdf8; background:#38bdf80a;
  border-radius:2px; letter-spacing:.04em;
}

/* Interests */
.int-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:.75rem; }
.int-card {
  display:flex; gap:.75rem; align-items:flex-start;
  padding:.9rem 1rem; border:1px solid #ffffff07; background:#080808;
  border-radius:2px; transition:border-color .2s;
}
.int-card:hover { border-color:#38bdf833; }
.int-icon  { font-size:1.3rem; flex-shrink:0; line-height:1.2; }
.int-title { color:#fff; font-size:.75rem; font-weight:700; margin:0 0 4px; }
.int-desc  { color:#555; font-size:.62rem; line-height:1.6; margin:0; }

/* Contact */
.contact-intro { color:#555; font-size:.72rem; line-height:1.8; margin-bottom:1.5rem; }
.contact-list  { display:flex; flex-direction:column; gap:8px; }
.contact-row {
  display:flex; align-items:center; gap:1rem;
  padding:.8rem 1rem; border:1px solid #ffffff07; background:#080808;
  border-radius:2px; text-decoration:none; transition:border-color .2s, background .2s;
}
.contact-row:hover { border-color:#38bdf833; background:#0a0d10; }
.c-icon  { font-size:1rem; width:20px; text-align:center; flex-shrink:0; }
.c-label { font-size:.6rem; color:#38bdf877; letter-spacing:.12em; text-transform:uppercase; width:76px; flex-shrink:0; }
.c-val   { font-size:.72rem; color:#aaa; word-break:break-all; }

/* Responsive */
@media (max-width: 768px) {
  .layout { grid-template-columns:1fr; gap:2rem; padding:1.5rem 1rem; }
  .sidebar { position:static; }
  .stats-grid { grid-template-columns:repeat(2,1fr); }
  .int-grid   { grid-template-columns:1fr; }
}
</style>
