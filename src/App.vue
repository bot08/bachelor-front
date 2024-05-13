<script setup>
import NavbarLoader from '@/components/NavbarLoader.vue'
//import Error from '@/components/Error.vue'

import { defineAsyncComponent } from 'vue'

// Lazy load navbar
const Navbar = defineAsyncComponent({
  loader: () => import('@/components/Navbar.vue'),
  loadingComponent: NavbarLoader,
  delay: 0,
  //errorComponent: Error,
})
</script>


<template>
  <div class="bg-gray-200 dark:bg-gray-800 transition-colors min-h-screen">
    <header>
      <Navbar/>
    </header>
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-18 sm:pt-20 lg:pt-24">
      <router-view v-slot="{ Component }">
        <keep-alive :max="5" exclude="notAlive">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>
