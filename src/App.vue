<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const route = useRoute()
const hasLayout = computed(() => route.meta?.layout === 'default')
</script>

<template>
  <div class="app-shell">
    <AppHeader v-if="hasLayout" />
    <main class="main-content">
      <RouterView />
    </main>
    <AppFooter v-if="hasLayout" />
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
