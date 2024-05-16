<template>
  <div class="m-2">
    <router-link v-if="!loading" @click="loading = true" :to="Props.linkProps">
      <div class="items-center text-center px-7 py-2 shadow-lg text-base font-medium leading-6 text-white transition ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none">
        {{ Props.nameProps }}
      </div>
    </router-link>
    <div v-else class="items-center text-center px-4 py-2 shadow-lg text-base font-medium leading-6 text-white transition ease-in-out bg-indigo-500 dark:bg-indigo-700 border border-transparent rounded-md">
      <svg class="inline animate-spin -ml-1 mr-2 mb-0.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 
      {{ Props.nameProps }}
    </div>
  </div>
</template>


<script setup>
import { ref, onDeactivated } from 'vue'

const Props = defineProps({
  linkProps: String,
  nameProps: String,
});

const loading = ref(false)

onDeactivated(() => {
  loading.value = false
})
</script>