<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { useLanguage } from '../composables/useLanguage'

const route   = useRoute()
const html    = ref('')
const title   = ref('')
const loading = ref(true)
const error   = ref('')
const { isSpanish } = useLanguage()

// Custom marked renderer for images → figure + figcaption
const renderer = new marked.Renderer()
renderer.image = function({ href, title: t, text }) {
  return `<figure class="md-figure">
    <img src="${href}" alt="${text}" loading="lazy" />
    ${text ? `<figcaption>${text}</figcaption>` : ''}
  </figure>`
}
marked.use({ renderer })

onMounted(async () => {
  const file = route.query.file
  if (!file) {
    error.value = isSpanish.value ? 'No se especificó el parámetro del archivo.' : 'No file parameter specified.'
    loading.value = false
    return
  }
  try {
    const res = await fetch(file)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const md = await res.text()
    // Extract first h1 as page title
    const h1 = md.match(/^#\s+(.+)$/m)
    if (h1) title.value = h1[1]
    html.value = marked.parse(md)
  } catch (e) {
    error.value = isSpanish.value ? `No se pudo cargar el writeup: ${e.message}` : `Failed to load writeup: ${e.message}`
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="viewer-root">

    <!-- Loading -->
    <div v-if="loading" class="viewer-state">
      <span class="state-dot blink"></span>
      <span>{{ isSpanish ? 'Cargando writeup...' : 'Loading writeup...' }}</span>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="viewer-state viewer-error">
      <span>✗ {{ error }}</span>
    </div>

    <!-- Content -->
    <article
      v-else
      class="viewer-article"
      v-html="html"
    ></article>

  </div>
</template>

<style>
/* ── Base ─────────────────────────────────────────────── */
* { box-sizing: border-box; }

body {
  margin: 0;
  background: #030305;
  color: #e0e0e0;
  font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
}

/* ── Root ─────────────────────────────────────────────── */
.viewer-root {
  min-height: 100vh;
  background: #030305;
  padding: 3.5rem 2rem 5rem;
}

/* ── Loading / Error ──────────────────────────────────── */
.viewer-state {
  max-width: 820px;
  margin: 8rem auto;
  display: flex;
  align-items: center;
  gap: .75rem;
  font-size: .82rem;
  color: #444;
  font-family: 'JetBrains Mono', monospace;
}
.viewer-error { color: #ff003c77; }
.state-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #ff003c;
}
.blink { animation: blink 0.9s infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

/* ── Article ──────────────────────────────────────────── */
.viewer-article {
  max-width: 820px;
  margin: 0 auto;
  font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
}

/* H1 */
.viewer-article h1 {
  font-size: 1.9rem;
  font-weight: 900;
  color: #fff;
  line-height: 1.3;
  margin: 0 0 1.5rem;
  letter-spacing: -.01em;
}

/* H2 */
.viewer-article h2 {
  font-size: .92rem;
  font-weight: 900;
  color: #ff003c;
  letter-spacing: .18em;
  text-transform: uppercase;
  border-bottom: 1px solid #ff003c22;
  padding-bottom: .55rem;
  margin: 2.8rem 0 1.2rem;
  padding-top: .5rem;
}

/* H3 */
.viewer-article h3 {
  font-size: .88rem;
  font-weight: 700;
  color: #38bdf8;
  letter-spacing: .08em;
  margin: 1.8rem 0 .75rem;
}

/* HR */
.viewer-article hr {
  border: none;
  border-top: 1px solid #ffffff08;
  margin: 1.5rem 0;
}

/* Blockquote (meta box) */
.viewer-article blockquote {
  border-left: 3px solid #ff003c;
  background: #ff003c09;
  border-radius: 0 4px 4px 0;
  padding: .9rem 1.3rem;
  margin: 0 0 1.2rem;
}
.viewer-article blockquote p {
  font-size: .82rem;
  color: #777;
  margin: 0;
  line-height: 1.7;
}

/* Paragraphs */
.viewer-article p {
  font-size: .875rem;
  color: #888;
  line-height: 1.95;
  margin: .9rem 0 0;
}

/* Inline code */
.viewer-article :not(pre) > code {
  color: #38bdf8;
  background: #38bdf80d;
  padding: 2px 6px;
  border-radius: 2px;
  font-family: inherit;
  font-size: .82rem;
}

/* Code blocks */
.viewer-article pre {
  background: #07080a;
  border: 1px solid #38bdf81a;
  border-left: 3px solid #38bdf8;
  border-radius: 2px;
  padding: 1.3rem 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: .79rem;
  color: #a5f3fc;
  overflow-x: auto;
  line-height: 1.72;
  margin: 1rem 0 0;
  white-space: pre;
}
.viewer-article pre code {
  background: transparent;
  padding: 0;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
}

/* Images */
.viewer-article img {
  max-width: 100%;
  border-radius: 4px;
  border: 1px solid #ffffff0a;
  display: block;
  margin: 1rem 0 0;
}

/* Figure + figcaption */
.viewer-article .md-figure {
  margin: 1.2rem 0 0;
}
.viewer-article .md-figure img {
  margin: 0;
}
.viewer-article .md-figure figcaption {
  font-size: .7rem;
  color: #333;
  margin-top: .5rem;
  font-style: italic;
  padding-left: .25rem;
}

/* Lists */
.viewer-article ul {
  list-style: none;
  padding: 0;
  margin: .75rem 0 0;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
.viewer-article li {
  font-size: .875rem;
  color: #888;
  line-height: 1.85;
  display: flex;
  align-items: baseline;
  gap: .55rem;
}
.viewer-article li::before {
  content: '▸';
  color: #38bdf8;
  font-size: .68rem;
  flex-shrink: 0;
}

/* Strong */
.viewer-article strong {
  color: #ccc;
  font-weight: 700;
}

/* Links */
.viewer-article a {
  color: #38bdf8;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: #38bdf844;
  transition: text-decoration-color .15s;
}
.viewer-article a:hover {
  text-decoration-color: #38bdf8;
}

/* ── Responsive ───────────────────────────────────────── */
@media (max-width: 768px) {
  .viewer-root { padding: 2rem 1.25rem 4rem; }
  .viewer-article h1 { font-size: 1.4rem; }
}
</style>
