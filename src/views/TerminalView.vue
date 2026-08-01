<script setup>
import { ref, nextTick, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguage } from '../composables/useLanguage'

const router = useRouter()
const input = ref('')
const outputLines = ref([])
const inputRef = ref(null)
const outputRef = ref(null)
const { isSpanish } = useLanguage()

const PROMPT = computed(() => (isSpanish.value ? 'visitante@blog:~$' : 'visitor@blog:~$'))

const initScreen = () => {
  outputLines.value = [
    { text: '██████╗ ██╗   ██╗██████╗ ███████╗██████╗', type: 'ascii' },
    { text: '██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗', type: 'ascii' },
    { text: '██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝', type: 'ascii' },
    { text: '██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗', type: 'ascii' },
    { text: '╚██████╗   ██║   ██████╔╝███████╗██║  ██║', type: 'ascii' },
    { text: ' ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝', type: 'ascii' },
    { text: '', type: 'output' },
    { text: isSpanish.value ? '  Portfolio de Ciberseguridad — v1.0.0' : '  Cybersecurity portfolio — v1.0.0', type: 'muted' },
    { text: isSpanish.value ? '  Escribe "help" para ver los comandos disponibles.' : '  Type "help" to see the available commands.', type: 'muted' },
    { text: '', type: 'output' },
  ]
}

const COMMANDS = {
  help: {
    action: () => [
      { text: '', type: 'output' },
      { text: '╔══════════════════════════════════════════╗', type: 'border' },
      { text: isSpanish.value ? '║           COMANDOS DISPONIBLES           ║' : '║           AVAILABLE COMMANDS             ║', type: 'border' },
      { text: '╚══════════════════════════════════════════╝', type: 'border' },
      { text: '', type: 'output' },
      { text: isSpanish.value ? '  help       →  Muestra esta lista de comandos' : '  help       →  Show this command list', type: 'output' },
      { text: isSpanish.value ? '  enter      →  Próximamente...' : '  enter      →  Coming soon...', type: 'output' },
      { text: isSpanish.value ? '  clear      →  Limpia la terminal' : '  clear      →  Clear the terminal', type: 'output' },
      { text: isSpanish.value ? '  back       →  Volver al inicio' : '  back       →  Go back home', type: 'output' },
      { text: '', type: 'output' },
      { text: isSpanish.value ? '  Más comandos en desarrollo. Stay tuned.' : '  More commands are in development. Stay tuned.', type: 'muted' },
      { text: '', type: 'output' },
    ]
  },
  enter: {
    action: () => [
      { text: '', type: 'output' },
      { text: isSpanish.value ? '  [ ACCESS PENDING ]  Este comando está en desarrollo.' : '  [ ACCESS PENDING ]  This command is under development.', type: 'warn' },
      { text: '', type: 'output' },
    ]
  },
  clear: {
    action: () => null // manejado aparte
  },
  back: {
    action: () => null // manejado aparte
  },
}

const scrollToBottom = async () => {
  await nextTick()
  if (outputRef.value) outputRef.value.scrollTop = outputRef.value.scrollHeight
}

const focusInput = () => inputRef.value?.focus()

const handleCommand = async () => {
  const raw = input.value.trim()
  outputLines.value.push({ text: `${PROMPT} ${raw}`, type: 'prompt' })

  if (raw === '') {
    input.value = ''
    await scrollToBottom()
    return
  }

  const cmd = raw.toLowerCase()

  if (cmd === 'clear') {
    outputLines.value = []
    input.value = ''
    return
  }

  if (cmd === 'back') {
    router.push('/')
    return
  }

  if (COMMANDS[cmd]) {
    outputLines.value.push(...COMMANDS[cmd].action())
  } else {
    outputLines.value.push(
      { text: '', type: 'output' },
      { text: isSpanish.value ? `  comando no encontrado: '${raw}'. Escribe 'help' para ver los comandos disponibles.` : `  command not found: '${raw}'. Type 'help' to see the available commands.`, type: 'error' },
      { text: '', type: 'output' },
    )
  }

  input.value = ''
  await scrollToBottom()
}

onMounted(async () => {
  initScreen()
  await nextTick()
  focusInput()
})

watch(isSpanish, () => {
  initScreen()
})
</script>

<template>
  <div
    class="min-h-screen bg-black flex flex-col items-center justify-center p-6 lg:p-12"
    @click="focusInput"
  >
    <!-- Botón volver -->
    <div class="w-full max-w-4xl mb-4 flex">
      <button
        @click.stop="router.push('/')"
        class="text-xs font-mono tracking-widest transition-all duration-200"
        style="color:#ff003c"
        @mouseover="$event.target.style.textDecoration='underline'"
        @mouseleave="$event.target.style.textDecoration='none'"
      >
        {{ isSpanish ? '← volver al inicio' : '← back to home' }}
      </button>
    </div>

    <!-- Ventana terminal -->
    <div class="w-full max-w-4xl">
      <div
        class="rounded-lg overflow-hidden shadow-2xl"
        style="border:1px solid #ff003c44; box-shadow: 0 0 30px #ff003c18"
      >
        <!-- Barra título -->
        <div class="bg-gray-900 px-4 py-3 flex items-center gap-2" style="border-bottom:1px solid #ff003c22">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
          <span class="ml-4 text-gray-400 text-sm">{{ isSpanish ? 'visitante@blog: ~' : 'visitor@blog: ~' }}</span>
        </div>

        <!-- Cuerpo -->
        <div
          ref="outputRef"
          class="bg-black px-6 py-6 h-[70vh] overflow-y-auto scroll-smooth"
        >
          <div
            v-for="(line, i) in outputLines"
            :key="i"
            :class="{
              'font-black tracking-widest text-xs leading-tight': line.type === 'ascii',
              'text-gray-500 text-sm': line.type === 'muted',
              'text-sm': line.type === 'prompt',
              'text-white text-sm': line.type === 'output',
              'text-sm': line.type === 'border' || line.type === 'error',
              'text-yellow-400 text-sm': line.type === 'warn',
            }"
            :style="{
              color: line.type === 'ascii'  ? '#ff003c'
                   : line.type === 'border' ? '#ff003c99'
                   : line.type === 'error'  ? '#ff003c'
                   : line.type === 'prompt' ? '#ff003c'
                   : undefined
            }"
            class="whitespace-pre leading-relaxed"
          >{{ line.text || '\u00a0' }}</div>

          <!-- Input -->
          <div class="flex items-center mt-1 text-sm">
            <span class="mr-2 select-none" style="color:#ff003c">{{ PROMPT }}</span>
            <input
              ref="inputRef"
              v-model="input"
              @keydown.enter="handleCommand"
              @click.stop
              class="bg-transparent text-white outline-none border-none flex-1 font-mono"
              style="caret-color: #ff003c"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
            />
          </div>
        </div>
      </div>

      <p class="text-center text-gray-600 text-xs mt-4 font-mono">
        {{ isSpanish ? 'Escribe' : 'Type' }} <span style="color:#ff003c">help</span> {{ isSpanish ? 'y pulsa Enter' : 'and press Enter' }}
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
