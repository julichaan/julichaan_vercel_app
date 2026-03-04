<script setup>
import { ref, nextTick, onMounted } from 'vue'

const input = ref('')
const outputLines = ref([])
const inputRef = ref(null)
const outputRef = ref(null)

const PROMPT = 'visitor@cyberport:~$'

const COMMANDS = {
  help: {
    action: () => [
      { text: '', type: 'output' },
      { text: '╔══════════════════════════════════════════╗', type: 'border' },
      { text: '║             AVAILABLE COMMANDS              ║', type: 'border' },
      { text: '╚══════════════════════════════════════════╝', type: 'border' },
      { text: '', type: 'output' },
      { text: '  help       →  Show this command list', type: 'output' },
      { text: '  clear      →  Clear the terminal', type: 'output' },
      { text: '', type: 'output' },
      { text: '  More writeups under development. Stay tuned.', type: 'muted' },
      { text: '', type: 'output' },
    ]
  },
  clear: { action: () => null },
}

const scrollToBottom = async () => {
  await nextTick()
  if (outputRef.value) outputRef.value.scrollTop = outputRef.value.scrollHeight
}

const focusInput = () => inputRef.value?.focus()

const handleCommand = async () => {
  const raw = input.value.trim()
  outputLines.value.push({ text: `${PROMPT} ${raw}`, type: 'prompt' })

  if (raw === '') { input.value = ''; await scrollToBottom(); return }

  const cmd = raw.toLowerCase()

  if (cmd === 'clear') {
    outputLines.value = []
    input.value = ''
    return
  }

  if (COMMANDS[cmd]) {
    outputLines.value.push(...COMMANDS[cmd].action())
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
})
</script>

<template>
  <div
    class="min-h-[calc(100vh-56px)] bg-black flex flex-col items-center justify-center p-6 lg:p-12"
    @click="focusInput"
  >
    <div class="w-full max-w-4xl">
      <div
        class="rounded-lg overflow-hidden shadow-2xl"
        style="border:1px solid #38bdf844; box-shadow: 0 0 30px #38bdf818"
      >
        <!-- Barra título -->
        <div class="bg-gray-900 px-4 py-3 flex items-center gap-2" style="border-bottom:1px solid #38bdf822">
          <div class="w-3 h-3 rounded-full bg-red-500" />
          <div class="w-3 h-3 rounded-full bg-yellow-500" />
          <div class="w-3 h-3 rounded-full bg-green-500" />
          <span class="ml-4 text-gray-400 text-sm font-mono">visitor@blog: ~/writeups</span>
        </div>

        <!-- Cuerpo -->
        <div
          ref="outputRef"
          class="bg-black px-6 py-6 h-[70vh] overflow-y-auto scroll-smooth"
        >
          <div
            v-for="(line, i) in outputLines"
            :key="i"
            class="whitespace-pre leading-relaxed font-mono text-sm"
            :class="{
              'font-black tracking-widest text-xs leading-tight': line.type === 'ascii',
            }"
            :style="{
              color: line.type === 'ascii'   ? '#ff003c'
                   : line.type === 'border'  ? '#00ff9f66'
                   : line.type === 'error'   ? '#ff003c'
                   : line.type === 'prompt'  ? '#00ff9f'
                   : line.type === 'muted'   ? '#555'
                   : line.type === 'warn'    ? '#f59e0b'
                   : '#c8c8c8'
            }"
          >{{ line.text || '\u00a0' }}</div>

          <!-- Input -->
          <div class="flex items-center mt-1 text-sm font-mono">
            <span class="mr-2 select-none" style="color:#00ff9f">{{ PROMPT }}</span>
            <input
              ref="inputRef"
              v-model="input"
              @keydown.enter="handleCommand"
              @click.stop
              class="bg-transparent text-white outline-none border-none flex-1 font-mono"
              style="caret-color: #00ff9f"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
            />
          </div>
        </div>
      </div>

      <p class="text-center text-gray-600 text-xs mt-4 font-mono">
        Type <span style="color:#ff003c">help</span> and press Enter
      </p>
    </div>
  </div>
</template>

<style scoped>
div::-webkit-scrollbar { width: 4px; }
div::-webkit-scrollbar-track { background: #000; }
div::-webkit-scrollbar-thumb { background: #ff003c44; border-radius: 2px; }
div::-webkit-scrollbar-thumb:hover { background: #ff003c88; }
</style>
