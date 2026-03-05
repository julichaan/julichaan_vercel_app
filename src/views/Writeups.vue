<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'

// ── Terminal state ───────────────────────────────────────────────
const input        = ref('')
const outputLines  = ref([])
const inputRef     = ref(null)
const outputRef    = ref(null)
const sidebarOpen  = ref(false)
const openNodes    = ref(new Set(['writeups']))
const activeFile   = ref(null)   // { name, folder, mdFile, viewerUrl }

const PROMPT = 'visitor@cyberport:~/writeups$'

// ── Filesystem ───────────────────────────────────────────────────
const FS = {
  name: 'writeups',
  type: 'dir',
  children: [
    {
      name: 'HTB',
      type: 'dir',
      children: [
        { name: 'Active.md', type: 'file', id: 'htb-active', mdFile: '/writeups/htb/active.md' },
      ]
    },
    {
      name: 'Intigriti',
      type: 'dir',
      children: [
        { name: '1125-November-2025.md', type: 'file', id: 'inti-1125', mdFile: '/writeups/intigriti/1125.md' },
      ]
    },
  ]
}

// ── Open writeup modal ────────────────────────────────────────────
function openWriteup(name, folder, mdFile) {
  activeFile.value = {
    name,
    folder,
    mdFile,
    viewerUrl: `/writeup?file=${mdFile}`,
  }
}

function openFullscreen() {
  window.open(activeFile.value.viewerUrl, '_blank')
}

// ── Find file in FS by name (supports path like HTB/Active.md) ────
function findFile(query) {
  const q = query.replace(/^["'`]|["'`]$/g, '').trim()
  const parts = q.split('/').filter(Boolean)

  if (parts.length > 1) {
    let cur = FS
    for (const part of parts) {
      const child = (cur.children ?? []).find(c =>
        c.name.toLowerCase() === part.toLowerCase()
      )
      if (!child) return null
      cur = child
    }
    return cur.type === 'file' ? cur : null
  }

  function search(node) {
    if (node.type === 'file' && node.name.toLowerCase() === q.toLowerCase()) return node
    for (const child of node.children ?? []) {
      const found = search(child)
      if (found) return found
    }
    return null
  }
  return search(FS)
}

function getParentName(mdFile) {
  // '/writeups/htb/active.md' → 'HTB'
  const parts = mdFile.split('/').filter(Boolean)
  return parts.length >= 3 ? parts[parts.length - 2].toUpperCase() : ''
}

// ── Sidebar tree ─────────────────────────────────────────────────
function flattenTree(node, depth = 0, parentPath = '') {
  const path   = parentPath ? `${parentPath}/${node.name}` : node.name
  const isOpen = openNodes.value.has(path)
  const rows   = [{
    name: node.name, type: node.type, depth, path, open: isOpen,
    id: node.id, mdFile: node.mdFile
  }]

  if (node.type === 'dir' && isOpen) {
    if (node.children.length === 0) {
      rows.push({ name: 'empty', type: 'empty', depth: depth + 1, path: `${path}/__empty`, open: false })
    } else {
      for (const child of node.children) {
        rows.push(...flattenTree(child, depth + 1, path))
      }
    }
  }
  return rows
}

const treeRows = computed(() => flattenTree(FS))

function handleRowClick(row) {
  if (row.type === 'dir') {
    const next = new Set(openNodes.value)
    if (next.has(row.path)) next.delete(row.path)
    else next.add(row.path)
    openNodes.value = next
  } else if (row.type === 'file' && row.mdFile) {
    const folder = getParentName(row.mdFile)
    openWriteup(row.name, folder, row.mdFile)
  }
}

// ── ls output ────────────────────────────────────────────────────
function lsOutput(args) {
  const dirs  = FS.children
  const lines = [{ text: '', type: 'output' }]
  const arg   = args?.trim()

  if (arg) {
    const target = dirs.find(d => d.name.toLowerCase() === arg.replace(/\/$/, '').toLowerCase())
    if (!target) {
      return [
        { text: '', type: 'output' },
        { text: `  ls: cannot access '${arg}': No such file or directory`, type: 'error' },
        { text: '', type: 'output' },
      ]
    }
    if (target.children.length === 0) {
      lines.push({ text: '  (empty)', type: 'muted' })
    } else {
      target.children.forEach((f, i) => {
        const isLast = i === target.children.length - 1
        lines.push({ text: `  ${isLast ? '└── ' : '├── '}${f.name}`, type: 'file' })
      })
    }
    lines.push({ text: '', type: 'output' })
    lines.push({ text: `  ${target.children.length} file${target.children.length !== 1 ? 's' : ''}`, type: 'muted' })
    lines.push({ text: '', type: 'output' })
    return lines
  }

  for (let i = 0; i < dirs.length; i++) {
    const d      = dirs[i]
    const isLast = i === dirs.length - 1
    const prefix = isLast ? '  └── ' : '  ├── '
    const count  = d.children.length
    const meta   = count === 0
      ? '          [empty]'
      : `          [${count} writeup${count > 1 ? 's' : ''}]`
    lines.push({ text: `${prefix}${d.name}/  ${meta}`, type: 'dir' })
  }

  const totalFiles = dirs.reduce((s, d) => s + d.children.length, 0)
  lines.push({ text: '', type: 'output' })
  lines.push({ text: `  ${dirs.length} directories, ${totalFiles} file${totalFiles !== 1 ? 's' : ''}`, type: 'muted' })
  lines.push({ text: '', type: 'output' })
  return lines
}

// ── Commands ─────────────────────────────────────────────────────
const COMMANDS = {
  help: {
    action: () => [
      { text: '', type: 'output' },
      { text: '  ┌──────────────────────────────────────────────┐', type: 'border' },
      { text: '  │              AVAILABLE COMMANDS               │', type: 'border' },
      { text: '  └──────────────────────────────────────────────┘', type: 'border' },
      { text: '', type: 'output' },
      { text: '  help            →  Show this command list',             type: 'output' },
      { text: '  ls [dir]        →  List writeup directory structure',   type: 'output' },
      { text: '  cat <file>      →  Open and read a writeup',            type: 'output' },
      { text: '  show            →  Open the file explorer sidebar',     type: 'output' },
      { text: '  hide            →  Close the file explorer sidebar',    type: 'output' },
      { text: '  clear           →  Clear the terminal',                 type: 'output' },
      { text: '', type: 'output' },
      { text: '  Example: cat Active.md  |  cat HTB/Active.md', type: 'muted' },
      { text: '', type: 'output' },
    ]
  },
  ls: { action: (args) => lsOutput(args) },
  cat: {
    action: (args) => {
      if (!args?.trim()) {
        return [
          { text: '', type: 'output' },
          { text: '  Usage: cat <filename.md>  e.g. cat Active.md', type: 'error' },
          { text: '', type: 'output' },
        ]
      }
      const file = findFile(args)
      if (!file) {
        return [
          { text: '', type: 'output' },
          { text: `  cat: ${args}: No such file`, type: 'error' },
          { text: '', type: 'output' },
        ]
      }
      const folder = getParentName(file.mdFile)
      openWriteup(file.name, folder, file.mdFile)
      return [
        { text: '', type: 'output' },
        { text: `  [ OPEN ] Opening ${file.name}...`, type: 'success' },
        { text: '', type: 'output' },
      ]
    }
  },
  show: {
    action: () => {
      sidebarOpen.value = true
      return [
        { text: '', type: 'output' },
        { text: '  [ EXPLORER ] File explorer opened.', type: 'success' },
        { text: '', type: 'output' },
      ]
    }
  },
  hide: {
    action: () => {
      sidebarOpen.value = false
      return [
        { text: '', type: 'output' },
        { text: '  [ EXPLORER ] Closed.', type: 'muted' },
        { text: '', type: 'output' },
      ]
    }
  },
  clear: { action: () => null },
}

// ── Terminal logic ────────────────────────────────────────────────
const scrollToBottom = async () => {
  await nextTick()
  if (outputRef.value) outputRef.value.scrollTop = outputRef.value.scrollHeight
}

const focusInput = () => inputRef.value?.focus()

const handleCommand = async () => {
  const raw  = input.value.trim()
  outputLines.value.push({ text: `${PROMPT} ${raw}`, type: 'prompt' })

  if (raw === '') { input.value = ''; await scrollToBottom(); return }

  const parts = raw.split(/\s+/)
  const cmd   = parts[0].toLowerCase()
  const args  = parts.slice(1).join(' ')

  if (cmd === 'clear') { outputLines.value = []; input.value = ''; return }

  if (COMMANDS[cmd]) {
    const result = COMMANDS[cmd].action(args)
    if (result) outputLines.value.push(...result)
  } else {
    outputLines.value.push(
      { text: '', type: 'output' },
      { text: `  command not found: '${raw}'. Type 'help'.`, type: 'error' },
      { text: '', type: 'output' },
    )
  }

  input.value = ''
  await scrollToBottom()
}

// ── ESC key handler ───────────────────────────────────────────────
const onKeydown = (e) => {
  if (e.key === 'Escape') activeFile.value = null
}

onMounted(async () => {
  outputLines.value = [
    { text: '██╗    ██╗██████╗ ██╗████████╗███████╗██╗   ██╗██████╗ ███████╗', type: 'ascii' },
    { text: '██║    ██║██╔══██╗██║╚══██╔══╝██╔════╝██║   ██║██╔══██╗██╔════╝', type: 'ascii' },
    { text: '██║ █╗ ██║██████╔╝██║   ██║   █████╗  ██║   ██║██████╔╝███████╗', type: 'ascii' },
    { text: '██║███╗██║██╔══██╗██║   ██║   ██╔══╝  ██║   ██║██╔═══╝ ╚════██║', type: 'ascii' },
    { text: '╚███╔███╔╝██║  ██║██║   ██║   ███████╗╚██████╔╝██║     ███████║', type: 'ascii' },
    { text: ' ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═╝     ╚══════╝', type: 'ascii' },
    { text: '', type: 'output' },
    { text: '  CTF, HackTheBox and Bug Bounty writeups.', type: 'muted' },
    { text: '  Type "help" to see available commands.', type: 'muted' },
    { text: '', type: 'output' },
  ]
  await nextTick()
  focusInput()
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="writeups-root" @click="focusInput">
    <div class="main-layout" :class="{ 'has-sidebar': sidebarOpen }">

      <!-- ── File explorer sidebar ─────────────────── -->
      <Transition name="sidebar">
        <aside v-if="sidebarOpen" class="file-sidebar" @click.stop>
          <div class="fs-header">
            <span class="fs-icon">◈</span>
            <span class="fs-title">EXPLORER</span>
            <button class="fs-close" @click="sidebarOpen = false" title="hide">✕</button>
          </div>
          <div class="fs-body">
            <div
              v-for="row in treeRows"
              :key="row.path"
              class="fs-row"
              :class="[`fs-${row.type}`]"
              :style="{ paddingLeft: `${0.6 + row.depth * 1.1}rem` }"
              @click="handleRowClick(row)"
            >
              <span v-if="row.type === 'dir'"       class="fs-chev" :class="{ open: row.open }">›</span>
              <span v-else-if="row.type === 'file'" class="fs-sym">▸</span>
              <span v-else                          class="fs-sym fs-sym-empty">·</span>
              <span class="fs-name">{{ row.name }}</span>
            </div>
          </div>
        </aside>
      </Transition>

      <!-- ── Terminal ───────────────────────────────── -->
      <div class="terminal-wrap">
        <div class="terminal-window">
          <div class="titlebar">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
            <span class="titlebar-label">visitor@cyberport: ~/writeups</span>
          </div>
          <div ref="outputRef" class="terminal-body">
            <div v-for="(line, i) in outputLines" :key="i" class="line" :class="line.type">
              {{ line.text || '\u00a0' }}
            </div>
            <div class="input-row">
              <span class="prompt-label">{{ PROMPT }}</span>
              <input
                ref="inputRef" v-model="input"
                @keydown.enter="handleCommand" @click.stop
                class="term-input"
                autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
              />
            </div>
          </div>
        </div>
        <p class="hint">
          Try <span class="hint-cmd">ls</span>,
          <span class="hint-cmd">cat Active.md</span>,
          <span class="hint-cmd">show</span>
        </p>
      </div>

    </div>
  </div>

  <!-- ── Writeup modal ──────────────────────────────── -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="activeFile" class="writeup-overlay" @click.self="activeFile = null">
        <div class="writeup-modal">

          <!-- Top bar -->
          <div class="modal-topbar">
            <span class="modal-path">
              <span class="path-dim">writeups /</span>
              <span class="path-dim" v-if="activeFile.folder"> {{ activeFile.folder }} /</span>
              <span class="path-name"> {{ activeFile.name }}</span>
            </span>
            <div class="modal-actions">
              <button class="modal-btn" @click="openFullscreen" title="Open in new tab">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
              </button>
              <button class="modal-btn modal-close-btn" @click="activeFile = null" title="Close (Esc)">✕</button>
            </div>
          </div>

          <!-- Content iframe -->
          <iframe
            class="modal-iframe"
            :src="activeFile.viewerUrl"
            allowfullscreen
            sandbox="allow-scripts allow-same-origin"
          ></iframe>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Root ────────────────────────────────────────────── */
.writeups-root {
  min-height: calc(100vh - 56px);
  background: #000;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* ── Layout ──────────────────────────────────────────── */
.main-layout {
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: flex-start;
  transition: max-width .3s ease;
}
.main-layout.has-sidebar { max-width: 1180px; }

/* ── File sidebar ────────────────────────────────────── */
.file-sidebar {
  width: 230px; flex-shrink: 0;
  background: #06060a; border: 1px solid #ff003c2a; border-right: none;
  border-radius: 6px 0 0 6px; display: flex; flex-direction: column;
  align-self: stretch; overflow: hidden;
}
.fs-header {
  display: flex; align-items: center; gap: .5rem;
  padding: .7rem 1rem; border-bottom: 1px solid #ff003c18;
  background: #08080e; flex-shrink: 0;
}
.fs-icon  { color: #ff003c55; font-size: .75rem; }
.fs-title { flex: 1; font-size: .6rem; letter-spacing: .18em; color: #ff003c77; text-transform: uppercase; font-weight: 900; }
.fs-close { background: transparent; border: none; cursor: pointer; color: #333; font-size: .68rem; padding: 1px 4px; font-family: inherit; transition: color .12s; }
.fs-close:hover { color: #ff003c; }
.fs-body  { flex: 1; overflow-y: auto; padding: .4rem 0; scrollbar-width: thin; scrollbar-color: #ff003c18 transparent; }
.fs-body::-webkit-scrollbar       { width: 3px; }
.fs-body::-webkit-scrollbar-thumb { background: #ff003c22; }
.fs-row   { display: flex; align-items: center; gap: .4rem; padding-top: .28rem; padding-bottom: .28rem; padding-right: .75rem; transition: background .1s; }
.fs-dir   { cursor: pointer; }
.fs-dir:hover  { background: #ff003c0a; }
.fs-file  { cursor: pointer; }
.fs-file:hover { background: #38bdf808; }
.fs-empty { cursor: default; }
.fs-chev  { font-size: .9rem; color: #2e2e2e; transition: transform .18s, color .12s; flex-shrink: 0; width: 12px; text-align: center; }
.fs-chev.open { transform: rotate(90deg); color: #ff003c77; }
.fs-sym       { font-size: .58rem; color: #38bdf855; flex-shrink: 0; width: 12px; text-align: center; }
.fs-sym-empty { color: #1e1e1e; }
.fs-name { font-size: .74rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fs-dir  .fs-name { color: #ff003c88; font-weight: 700; }
.fs-file .fs-name { color: #38bdf8aa; }
.fs-empty .fs-name { color: #222; font-style: italic; font-size: .68rem; }

.sidebar-enter-active, .sidebar-leave-active { transition: width .28s ease, opacity .22s ease; overflow: hidden; }
.sidebar-enter-from, .sidebar-leave-to  { width: 0; opacity: 0; }
.sidebar-enter-to,   .sidebar-leave-from { width: 230px; opacity: 1; }

/* ── Terminal window ─────────────────────────────────── */
.terminal-wrap { flex: 1; min-width: 0; }
.terminal-window { border-radius: 6px; overflow: hidden; border: 1px solid #ff003c44; box-shadow: 0 0 30px #ff003c18; }
.main-layout.has-sidebar .terminal-window { border-radius: 0 6px 6px 0; }
.titlebar { background: #0d0d0d; border-bottom: 1px solid #ff003c22; padding: .65rem 1rem; display: flex; align-items: center; gap: .45rem; }
.dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; display: inline-block; }
.dot-red    { background: #ff5f57; }
.dot-yellow { background: #febc2e; }
.dot-green  { background: #28c840; }
.titlebar-label { margin-left: 1rem; font-size: .78rem; color: #444; }
.terminal-body { background: #000; padding: 1.5rem 2rem; height: 65vh; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #ff003c22 transparent; }
.terminal-body::-webkit-scrollbar       { width: 4px; }
.terminal-body::-webkit-scrollbar-thumb { background: #ff003c33; border-radius: 2px; }
.line { white-space: pre; line-height: 1.75; font-family: 'JetBrains Mono', monospace; font-size: .82rem; color: #f0f0f0; }
.line.ascii   { color: #ff003c; font-size: .72rem; font-weight: 900; letter-spacing: .05em; line-height: 1.4; }
.line.prompt  { color: #00ff9f; }
.line.error   { color: #ff003c; }
.line.muted   { color: #3a3a3a; }
.line.border  { color: #ff003c55; }
.line.success { color: #00ff9f; }
.line.warn    { color: #f59e0b; }
.line.output  { color: #f0f0f0; }
.line.dir     { color: #ff003c88; }
.line.file    { color: #38bdf8; }
.input-row { display: flex; align-items: center; margin-top: .3rem; font-family: 'JetBrains Mono', monospace; font-size: .82rem; }
.prompt-label { color: #00ff9f; margin-right: .5rem; flex-shrink: 0; white-space: nowrap; }
.term-input { background: transparent; border: none; outline: none; color: #fff; font-family: inherit; font-size: .82rem; caret-color: #ff003c; flex: 1; min-width: 0; }
.hint { text-align: center; font-size: .7rem; color: #222; margin-top: .75rem; }
.hint-cmd { color: #ff003c; }

/* ── Writeup modal ───────────────────────────────────── */
.writeup-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  padding: 2vh 2vw;
}
.writeup-modal {
  width: 96vw; height: 94vh;
  background: #06060a;
  border: 1px solid #ff003c2a;
  border-radius: 8px;
  overflow: hidden;
  display: flex; flex-direction: column;
  box-shadow: 0 24px 80px #000000cc, 0 0 0 1px #ff003c15;
}
.modal-topbar {
  height: 46px; flex-shrink: 0;
  background: #08080e;
  border-bottom: 1px solid #ff003c18;
  display: flex; align-items: center;
  padding: 0 1rem;
  gap: .75rem;
}
.modal-path {
  flex: 1; font-size: .72rem;
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.path-dim  { color: #2a2a2a; }
.path-name { color: #38bdf8aa; font-weight: 700; }

.modal-actions { display: flex; align-items: center; gap: .4rem; }
.modal-btn {
  background: transparent; border: 1px solid #ffffff08; border-radius: 3px;
  cursor: pointer; color: #444; padding: 5px 8px;
  font-family: 'JetBrains Mono', monospace; font-size: .72rem;
  display: flex; align-items: center; justify-content: center;
  transition: color .15s, border-color .15s, background .15s;
  width: 30px; height: 26px;
}
.modal-btn svg { width: 13px; height: 13px; stroke: currentColor; }
.modal-btn:hover { color: #38bdf8; border-color: #38bdf844; background: #38bdf808; }
.modal-close-btn { font-size: .75rem; }
.modal-close-btn:hover { color: #ff003c; border-color: #ff003c44; background: #ff003c08; }

.modal-iframe {
  flex: 1; border: none; width: 100%; min-height: 0;
  background: #030305;
}

/* modal transition */
.modal-enter-active { transition: opacity .18s ease; }
.modal-leave-active { transition: opacity .15s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .writeup-modal,
.modal-leave-active .writeup-modal { transition: transform .18s ease, opacity .18s ease; }
.modal-enter-from .writeup-modal { transform: scale(.97) translateY(8px); opacity: 0; }
.modal-leave-to   .writeup-modal { transform: scale(.97); opacity: 0; }

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 768px) {
  .writeups-root { padding: 1rem; }
  .terminal-body { padding: 1.25rem 1.5rem; height: 60vh; }
  .file-sidebar  { width: 180px; }
  .sidebar-enter-to, .sidebar-leave-from { width: 180px; }
  .writeup-overlay { padding: 1vh 1vw; }
  .writeup-modal { width: 99vw; height: 98vh; border-radius: 4px; }
}
</style>
