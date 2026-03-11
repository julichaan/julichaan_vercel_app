<script setup>
import { ref, nextTick, onMounted } from 'vue'
import hackerHero from '../assets/hacker-hero.png'

const input = ref('')
const outputLines = ref([])
const inputRef = ref(null)
const outputRef = ref(null)

// Typing effect
const typingText = ref('')
const typingCursor = ref(true)
const TYPING_MSGS = [
  'Bienvenido a mi blog',
  'nmap -sV -p 80,443 target.com',
  'cat /etc/passwd',
  'sudo rm -rf /tmp/malware',
  'ssh root@192.168.1.1',
  'grep -r "password" /var/log/',
  'netstat -tulpn',
  'chmod 777 exploit.sh && ./exploit.sh',
  'curl -s https://blog.dev',
  'whoami',
  'ls -la /root/',
  'ps aux | grep suspicious',
  'tcpdump -i eth0 port 443',
  'hydra -l admin -P rockyou.txt ssh://target',
  'find / -perm -4000 2>/dev/null',
  'echo "hacked" > /var/www/html/index.html',
  'openssl s_client -connect target:443',
]
let typingIndex = 0

const PROMPT = 'visitor@blog:~$'

const COMMANDS = {
  help: {
    description: 'Muestra los comandos disponibles',
    action: () => [
      { text: '', type: 'output' },
      { text: '╔══════════════════════════════════════════╗', type: 'border' },
      { text: '║           COMANDOS DISPONIBLES           ║', type: 'border' },
      { text: '╚══════════════════════════════════════════╝', type: 'border' },
      { text: '', type: 'output' },
      { text: '  help       →  Muestra esta lista de comandos', type: 'output' },
      { text: '  enter      →  Próximamente...', type: 'output' },
      { text: '', type: 'output' },
      { text: '  Más comandos en desarrollo. Stay tuned.', type: 'muted' },
      { text: '', type: 'output' },
    ]
  },
  enter: {
    description: 'Próximamente',
    action: () => [
      { text: '', type: 'output' },
      { text: '  [ ACCESS PENDING ]  Este comando está en desarrollo.', type: 'warn' },
      { text: '', type: 'output' },
    ]
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (outputRef.value) {
    outputRef.value.scrollTop = outputRef.value.scrollHeight
  }
}

const focusInput = () => {
  inputRef.value?.focus()
}

const handleCommand = async () => {
  const raw = input.value.trim()
  outputLines.value.push({ text: `${PROMPT} ${raw}`, type: 'prompt' })

  if (raw === '') {
    input.value = ''
    await scrollToBottom()
    return
  }

  const cmd = raw.toLowerCase()

  if (COMMANDS[cmd]) {
    outputLines.value.push(...COMMANDS[cmd].action())
  } else {
    outputLines.value.push(
      { text: '', type: 'output' },
      { text: `  comando no encontrado: '${raw}'. Escribe 'help' para ver los comandos disponibles.`, type: 'error' },
      { text: '', type: 'output' },
    )
  }

  input.value = ''
  await scrollToBottom()
}

onMounted(async () => {
  outputLines.value = [
    { text: '██████╗ ██╗   ██╗██████╗ ███████╗██████╗', type: 'ascii' },
    { text: '██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗', type: 'ascii' },
    { text: '██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝', type: 'ascii' },
    { text: '██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗', type: 'ascii' },
    { text: '╚██████╗   ██║   ██████╔╝███████╗██║  ██║', type: 'ascii' },
    { text: ' ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝', type: 'ascii' },
    { text: '', type: 'output' },
    { text: '  Portfolio de Ciberseguridad — v1.0.0', type: 'muted' },
    { text: '  Escribe "help" para ver los comandos disponibles.', type: 'muted' },
    { text: '', type: 'output' },
  ]
  await nextTick()
  focusInput()

  // Typing effect loop: escribe → pausa → borra → pausa → siguiente
  const typeLoop = async () => {
    const msg = TYPING_MSGS[typingIndex % TYPING_MSGS.length]
    typingIndex++
    // Escribir
    for (let i = 0; i <= msg.length; i++) {
      typingText.value = msg.slice(0, i)
      await new Promise(r => setTimeout(r, 70))
    }
    // Pausa con cursor
    await new Promise(r => setTimeout(r, 1600))
    // Borrar
    for (let i = msg.length; i >= 0; i--) {
      typingText.value = msg.slice(0, i)
      await new Promise(r => setTimeout(r, 30))
    }
    // Pausa vacío
    await new Promise(r => setTimeout(r, 400))
    typeLoop()
  }
  typeLoop()
})
</script>

<template>
  <div
    class="min-h-screen bg-black flex items-center justify-center p-6 lg:p-12"
    @click="focusInput"
  >
    <div class="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

      <!-- Imagen izquierda -->
      <div class="flex-shrink-0 w-full lg:w-auto flex flex-col items-center gap-4">
        <!-- Nombre arriba -->
        <span class="text-green-400 text-2xl font-black tracking-widest select-none">julichaan</span>

        <!-- Foto -->
        <img
          :src="hackerHero"
          alt="Hacker"
          class="w-52 md:w-64 lg:w-72 object-contain select-none"
          draggable="false"
        />

        <!-- Texto con efecto typing debajo -->
        <div class="text-sm text-gray-300 h-6">
          <span>{{ typingText }}</span><span v-if="typingCursor" class="animate-pulse" style="color:#ff003c">▌</span>
        </div>
      </div>

      <!-- Terminal derecha -->
      <div class="flex-1 w-full min-w-0">
        <div class="rounded-lg overflow-hidden shadow-2xl" style="border:1px solid #ff003c44; box-shadow: 0 0 30px #ff003c18">

          <!-- Barra de título -->
          <div class="bg-gray-900 px-4 py-3 flex items-center gap-2" style="border-bottom:1px solid #ff003c22">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <span class="ml-4 text-gray-400 text-sm">visitor@blog: ~</span>
          </div>

          <!-- Cuerpo -->
          <div
            ref="outputRef"
            class="bg-black px-6 py-6 h-[60vh] overflow-y-auto scroll-smooth"
          >
            <div
              v-for="(line, i) in outputLines"
              :key="i"
              :class="{
                'font-black tracking-widest text-xs leading-tight': line.type === 'ascii',
                'text-gray-500 text-sm': line.type === 'muted',
                'text-green-400 text-sm': line.type === 'prompt',
                'text-white text-sm': line.type === 'output',
                'text-sm': line.type === 'border',
                'text-sm': line.type === 'error',
                'text-yellow-400 text-sm': line.type === 'warn',
              }"
              :style="{
                color: line.type === 'ascii' ? '#ff003c' : line.type === 'border' ? '#ff003c99' : line.type === 'error' ? '#ff003c' : undefined
              }"
              class="whitespace-pre leading-relaxed"
            >{{ line.text || '\u00a0' }}</div>

            <!-- Input activo -->
            <div class="flex items-center mt-1 text-sm">
              <span class="text-green-400 mr-2 select-none">{{ PROMPT }}</span>
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

        <p class="text-center text-gray-600 text-xs mt-4">
          Escribe <span style="color:#ff003c">help</span> y pulsa Enter
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
div::-webkit-scrollbar { width: 4px; }
div::-webkit-scrollbar-track { background: #000; }
div::-webkit-scrollbar-thumb { background: #ff003c44; border-radius: 2px; }
div::-webkit-scrollbar-thumb:hover { background: #ff003c88; }
</style>
