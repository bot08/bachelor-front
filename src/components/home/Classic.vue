<template>
  <div class="rounded-lg mb-4 md:mb-8 sm:mx-4 overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 transition-colors">
    <router-link class="flex" :to="hrefProps">
      <!-- Image loading -->
      <LazyImage>
        <template v-slot:image>
          <img class="w-20 h-20 mx-3 my-3 drop-shadow" :src="icoProps" alt="menu-ico">
        </template>
        <template v-slot:preloader> 
          <div class="w-16 h-16 rounded-2xl mx-5 my-5 bg-gray-200 dark:bg-gray-600 animate-pulse"></div>
        </template>
        <template v-slot:error>
          <div class="w-16 h-16 rounded-2xl mx-5 my-5 bg-red-200 dark:bg-red-800 animate-pulse text-center">img</div>
        </template>
      </LazyImage>
      <!-- /Image -->
      <div class="px-3 py-1 my-auto">
        <h2 class="font-bold mb-1 text-xl">{{ nameProps }}</h2>
      </div>
    </router-link>
  </div>
</template>


<script>
import LazyImage from '@/components/LazyImage.vue'


export default {
  props:[
    'nameProps',
    'hrefProps',
    'icoProps'
  ],
  
  components: {
    LazyImage
  }
}
</script>
