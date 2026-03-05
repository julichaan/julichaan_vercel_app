<template>
  <div class="cert-root">

    <!-- ── GRID VIEW ──────────────────────────────── -->
    <div v-if="!activePost" class="grid-view">
      <div class="cert-header">
        <p class="section-pre">// skills & credentials</p>
        <h1 class="section-title">CERTIFICATIONS</h1>
        <p class="section-sub">Professional certifications obtained in cybersecurity and penetration testing.</p>
      </div>

      <div class="certs-grid">
        <article
          v-for="cert in certs"
          :key="cert.id"
          class="cert-card"
          @click="activePost = cert"
        >
          <div class="card-img-wrap">
            <img :src="cert.diplomaImg" :alt="cert.title" class="card-diploma-img" loading="lazy" />
          </div>
          <div class="card-bottom">
            <span class="card-category">{{ cert.category }}</span>
            <h2 class="card-title">{{ cert.title }}</h2>
          </div>
        </article>
      </div>
    </div>

    <!-- ── POST VIEW ──────────────────────────────── -->
    <div v-else class="post-view">
      <button class="back-btn" @click="activePost = null">← Back to Certifications</button>

      <header class="post-header">
        <div class="post-meta-top">
          <span class="card-category">{{ activePost.category }}</span>
          <span class="card-issuer">{{ activePost.issuer }}</span>
        </div>
        <h1 class="post-title">{{ activePost.title }}</h1>
        <div class="post-meta">
          <span class="post-date">{{ activePost.date }}</span>
        </div>
        <div class="post-tags">
          <span class="card-tag" v-for="tag in activePost.tags" :key="tag">{{ tag }}</span>
        </div>
      </header>

      <div class="post-body">
        <template v-for="(block, i) in activePost.content" :key="i">
          <p      v-if="block.type === 'p'"       class="p-text" v-html="block.text"></p>
          <h2     v-else-if="block.type === 'h2'" class="p-h2">{{ block.text }}</h2>
          <h3     v-else-if="block.type === 'h3'" class="p-h3">{{ block.text }}</h3>
          <div    v-else-if="block.type === 'callout'" :class="['p-callout', block.variant]">{{ block.text }}</div>
          <ul     v-else-if="block.type === 'ul'"  class="p-ul">
            <li v-for="(item, j) in block.items" :key="j" v-html="item"></li>
          </ul>
          <figure v-else-if="block.type === 'img'" class="p-figure">
            <img :src="block.src" :alt="block.alt" loading="lazy" class="p-img" />
            <figcaption v-if="block.caption" class="p-caption">{{ block.caption }}</figcaption>
          </figure>
        </template>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const activePost = ref(null)

const certs = ref([
  {
    id: 1,
    title: 'Web Red Team Analyst (Web-RTA)',
    issuer: 'Cyberwarfare Labs',
    category: 'Certification',
    date: '2024',
    diplomaImg: '/certifications/web-rta/img2.png',
    tags: ['Web Penetration Testing', 'Cyberwarfare Labs', 'Web-RTA'],
    content: [
      {
        type: 'callout', variant: 'info',
        text: 'Web Red Team Analyst (Web-RTA) · Cyberwarfare Labs · Web Penetration Testing'
      },
      {
        type: 'h2', text: 'Overview'
      },
      {
        type: 'p',
        text: 'This certification is offered by <strong>Cyberwarfare Labs</strong>. They currently have some great Black Friday deals, but it\'s already very reasonably priced. It\'s also the company\'s latest certification and their first for web penetration testing. It provides a good overview of the most basic web vulnerabilities.'
      },
      {
        type: 'img',
        src: '/certifications/web-rta/img1.png',
        alt: 'Web-RTA certification',
        caption: 'Web Red Team Analyst — Cyberwarfare Labs'
      },
      {
        type: 'h2', text: 'Course'
      },
      {
        type: 'p',
        text: 'Its theoretical course is very accessible and easy to understand.'
      },
      {
        type: 'h2', text: 'Exam'
      },
      {
        type: 'p',
        text: 'The exam consists of several web applications with multiple chained web vulnerabilities.'
      },
      {
        type: 'p',
        text: 'No web vulnerability appears that isn\'t covered in the course, nor does it include how to exploit it.'
      },
      {
        type: 'h2', text: 'Verdict'
      },
      {
        type: 'callout', variant: 'info',
        text: 'Recommended for anyone starting out in web penetration testing who wants to obtain a quick, simple, and useful certification. Low cost, lots of introductory web penetration testing content.'
      },
      {
        type: 'img',
        src: '/certifications/web-rta/img2.png',
        alt: 'Web-RTA diploma',
        caption: 'Web Red Team Analyst diploma'
      },
    ]
  }
])
</script>

<style scoped>
/* ── Base ────────────────────────────────────────── */
.cert-root {
  min-height: 100vh;
  background: #000;
  font-family: 'JetBrains Mono', monospace;
  color: #ccc;
  padding: 3rem 2rem;
}

/* ── Grid View ───────────────────────────────────── */
.grid-view { max-width: 1200px; margin: 0 auto; }

.cert-header { text-align: center; margin-bottom: 4rem; }
.section-pre   { font-size: .7rem; letter-spacing: .2em; color: #ff003c44; margin: 0 0 .6rem; }
.section-title { font-size: 2.6rem; font-weight: 900; letter-spacing: .3em; color: #ff003c; margin: 0 0 1rem; }
.section-sub   { font-size: .82rem; color: #444; max-width: 520px; margin: 0 auto; line-height: 1.8; }

.certs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.cert-card {
  background: #080808;
  border: 1px solid #ffffff0a;
  border-radius: 3px;
  cursor: pointer;
  transition: border-color .2s, background .2s, transform .15s;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.cert-card:hover {
  border-color: #38bdf833;
  background: #0a0d10;
  transform: translateY(-2px);
}

.card-img-wrap {
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #06060a;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-diploma-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform .3s ease;
}
.cert-card:hover .card-diploma-img {
  transform: scale(1.03);
}

.card-bottom {
  padding: 1.1rem 1.3rem 1.3rem;
  display: flex;
  flex-direction: column;
  gap: .6rem;
}

.card-category {
  font-size: .65rem; letter-spacing: .15em; text-transform: uppercase;
  color: #ff003c; border: 1px solid #ff003c44; padding: 3px 8px; border-radius: 2px;
  align-self: flex-start;
}

.card-title {
  font-size: .95rem; font-weight: 700; color: #fff;
  line-height: 1.5; margin: 0;
}

/* ── Post View ───────────────────────────────────── */
.post-view { max-width: 820px; margin: 0 auto; }

.back-btn {
  font-family: inherit; font-size: .75rem; letter-spacing: .1em;
  color: #38bdf8; background: transparent;
  border: 1px solid #38bdf833; padding: 7px 16px;
  border-radius: 2px; cursor: pointer;
  transition: all .15s; margin-bottom: 2.5rem;
  text-transform: uppercase;
}
.back-btn:hover { background: #38bdf80d; border-color: #38bdf8; }

.post-header { margin-bottom: 3rem; }
.post-meta-top { display: flex; gap: .75rem; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; }

.card-issuer {
  font-size: .65rem; letter-spacing: .12em; text-transform: uppercase;
  color: #38bdf8; border: 1px solid #38bdf844; padding: 3px 8px; border-radius: 2px;
}

.post-title {
  font-size: 1.65rem; font-weight: 900; color: #fff;
  line-height: 1.4; margin: 0 0 1rem;
}
.post-meta {
  display: flex; gap: .75rem; align-items: center;
  font-size: .72rem; color: #444; margin-bottom: 1rem;
}
.post-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.card-tag {
  font-size: .62rem; padding: 3px 8px;
  border: 1px solid #38bdf822; color: #38bdf888; border-radius: 2px;
  letter-spacing: .04em;
}

/* ── Article Body ────────────────────────────────── */
.post-body { display: flex; flex-direction: column; gap: 1.4rem; }

.p-h2 {
  font-size: 1rem; font-weight: 900; color: #ff003c;
  letter-spacing: .15em; text-transform: uppercase;
  border-bottom: 1px solid #ff003c22; padding-bottom: .5rem;
  margin: 1.5rem 0 0; padding-top: 1rem;
}
.p-h3 {
  font-size: .88rem; font-weight: 700; color: #38bdf8;
  letter-spacing: .1em; margin: .5rem 0 0;
}
.p-text {
  font-size: .88rem; color: #888; line-height: 1.95; margin: 0;
}
.p-text code   { color: #38bdf8; background: #38bdf80d; padding: 1px 5px; border-radius: 2px; font-family: inherit; }
.p-text a      { color: #38bdf8; text-decoration: underline; text-underline-offset: 3px; }
.p-text strong { color: #ccc; font-weight: 700; }

.p-callout {
  padding: 1rem 1.25rem;
  border-radius: 2px;
  font-size: .8rem;
  line-height: 1.8;
}
.p-callout.info {
  background: #38bdf80d; border: 1px solid #38bdf833; color: #38bdf8;
}
.p-callout.warn {
  background: #ff003c0d; border: 1px solid #ff003c44; color: #ff6688;
}

.p-ul {
  padding-left: 1.25rem;
  display: flex; flex-direction: column; gap: .6rem;
  margin: 0;
}
.p-ul li {
  font-size: .88rem; color: #888; line-height: 1.85;
  list-style: none;
}
.p-ul li::before {
  content: '▸ ';
  color: #38bdf8;
  font-size: .75rem;
}
.p-ul li strong { color: #ccc; }

/* ── Image block ─────────────────────────────────── */
.p-figure {
  margin: 0 auto;
  text-align: center;
}
.p-img {
  max-width: 100%;
  border-radius: 4px;
  border: 1px solid #ffffff0a;
  display: block;
  margin: 0 auto;
}
.p-caption {
  font-size: .7rem;
  color: #333;
  margin-top: .5rem;
  font-style: italic;
  padding-left: .25rem;
}

/* ── Responsive ──────────────────────────────────── */
@media (max-width: 768px) {
  .cert-root { padding: 2rem 1rem; }
  .certs-grid { grid-template-columns: 1fr; }
  .post-title { font-size: 1.2rem; }
  .section-title { font-size: 1.8rem; }
}
</style>
