<template>
  <div class="flex justify-end mb-3 sm:mr-6">
    <!-- search button mirage -->
    <div v-if="!noSearchProps" class="justify-center rounded-md shadow-lg px-2 py-2 mr-3 bg-indigo-600 text-base font-medium text-white">
      <SearchIcon class="h-6 w-6"/>
    </div>
    
    <!-- sort button mirage -->
    <div class="inline-flex justify-center rounded-md shadow-lg px-4 py-2 bg-indigo-600 text-base font-medium text-white">
      Сортування
      <ChevronDownIcon class="-mr-1 ml-1 h-6 w-6"/>
    </div>
  </div>
</template>


<script setup>
import { ChevronDownIcon, SearchIcon } from '@heroicons/vue/solid'

const props = defineProps({
  noSearchProps: Boolean
});
</script>