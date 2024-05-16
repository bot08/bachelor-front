<template>
  <div class="grid grid-cols-1 md:grid-cols-2">

    <div class="rounded-lg mt-1 mb-4 md:mb-8 overflow-hidden mx-auto">
      <!-- Image loading -->
      <LazyImage>
        <template v-slot:image>
          <img class="h-72 sm:h-96 m-auto mt-4" src="/img/accessories_icon.png" alt="image">
        </template>
        <template v-slot:preloader> 
          <div class="h-72 sm:h-96 mx-auto sm:mt-4 mb-4 sm:mb-0 pt-28">
            <svg class="mx-auto animate-spin text-gray-400 h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="spin"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          </div>
        </template>
        <template v-slot:error>
          <div class="h-72 sm:h-96 mx-auto mt-3 pt-28"></div>
        </template>
      </LazyImage>
      <!-- /Image -->
    </div>


    <!-- About card -->
    <div class="px-3 pb-2 rounded-lg mb-4 md:mb-8 overflow-hidden text-lg text-gray-900 dark:text-gray-200 shadow-lg bg-gray-50 dark:bg-gray-700 transition-colors sm:m-4">
      <h3 class="pb-2 pt-3 text-3xl font-extrabold leading-9 tracking-tight sm:leading-10">
        Про роботу
      </h3>

      <!-- Preloader -->
      <div v-if="loading">
        <p class="h-5 mt-1 mb-2 bg-gray-200 dark:bg-gray-600 rounded w-full animate-pulse" v-for="n in 7" :key="n"></p>
        <p class="h-5 mt-1 mb-2 bg-gray-200 dark:bg-gray-600 rounded w-36 animate-pulse"></p>
        <p class="h-5 mt-1 mb-2 bg-gray-200 dark:bg-gray-600 rounded w-48 animate-pulse"></p>
      </div>

      <!-- Content -->
      <div v-else>
        {{ about.description }}<br>
        <p v-for="item in about.top_discord" :key="item.value">
          <!-- <DiscordIcon/> --> 
            {{ item.value }}
        </p>
      </div>
    </div>

  </div>


  <!-- Buttons (static) -->
  <div class="flex p-2">
    <div class="grid grid-cols-1 sm:grid-cols-2 rounded-md mx-auto">
      <LazyLinkBtn :nameProps="'На головну'" :linkProps="'/'"/>
      <LazyLinkBtn :nameProps="'Акаунт'" :linkProps="'/user'"/>
    </div>
  </div>

  <!-- CopyRight -->
  <div class="mx-auto text-center max-w-xl my-4">
    <p class="text-gray-400 dark:text-gray-500 text-base transition-colors">Демонстраційний варіант</p>
  </div>
</template>


<script>
//import axios from 'axios'
import LazyImage from '@/components/LazyImage.vue'
import LazyLinkBtn from '@/components/LazyLinkBtn.vue'
//import DiscordIconLoader from '@/components/DiscordIconLoader.vue'

import { defineAsyncComponent } from 'vue'

// const DiscordIcon = defineAsyncComponent({
//   loader: () => import('@/components/DiscordIcon.vue'),
//   loadingComponent: DiscordIconLoader,
//   delay: 0,
// })

export default {
  components: {
    LazyImage,
    LazyLinkBtn,
    //DiscordIcon
  },

  data: () => ({
    loading: true,
    about: []
  }),

  created(){
    this.getContent();
  },

  methods: {
    getContent(){
      
    }
  }
}
</script>