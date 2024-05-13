<template>
  <header class="bg-gray-50 shadow-lg mx-auto text-center max-w-lg mt-1 pt-2 mb-4 rounded-lg dark:bg-gray-700 transition-colors">
    <!-- Image loading -->
    <!-- <LazyImage>
      <template v-slot:image>
        <img @click="currentAnswer <= 10 && currentAnswer++" class="w-40 h-40 mx-auto drop-shadow" src="/img/paimon404.png" alt="404">
      </template>
      <template v-slot:preloader> 
        <div class="w-40 h-40 mx-auto pt-18 sm:pt-20">
          <svg class="mx-auto animate-spin text-spin text-gray-400 h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="spin"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        </div>
      </template>
      <template v-slot:error>
        <div></div>
      </template>
    </LazyImage> -->
    <!-- /Image -->
    <div class="mx-auto pt-4 pb-4 px-3 sm:px-4 lg:px-5">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-200 transition-colors">404</h1>
      <router-link to="/" class="inline-block items-center justify-center mt-3 mb-1 px-7 py-2 text-base font-medium leading-6 text-white transition ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none">
        На головну
      </router-link>
    </div>
  </header>
</template>


<script>
import LazyImage from '@/components/LazyImage.vue'


export default {
  data: () => ({
    currentAnswer: 0,
    //answers,
    //smartButton
  }),

  components: {
    LazyImage
  },

  methods: {
    match() {
      return this.smartButton.find(a => window.location.pathname.includes(a.toHref));
    }
  }
}
</script>