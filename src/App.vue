<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Analytics } from '@vercel/analytics/vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { useLanguage } from './composables/useLanguage'

const route = useRoute()
const hasLayout = computed(() => route.meta?.layout === 'default')
const { language } = useLanguage()

const resolveTitle = (metaTitle) => {
  if (!metaTitle) return 'julichaan'
  if (typeof metaTitle === 'string') return metaTitle
  return metaTitle[language.value] ?? metaTitle.en ?? metaTitle.es ?? 'julichaan'
}

watch([() => route.meta?.title, language], ([metaTitle]) => {
  document.title = resolveTitle(metaTitle)
}, { immediate: true })
</script>

<template>
  <div class="app-shell">
    <AppHeader v-if="hasLayout" />
    <main class="main-content">
      <RouterView />
    </main>
    <AppFooter v-if="hasLayout" />
    <Analytics />
  </div>
</template>

<style>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1;
}
</style>
