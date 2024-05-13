<template>
  <div class="flex justify-end mb-3">
    <div class="flex">
      <!-- Search -->
      <Search v-if="!noSearchProps" @goSearch='goSearch'/>

      <div class="relative block sm:mr-6 z-10">
        <!-- Button -->
        <button @click="isOpen = !isOpen" class="inline-flex justify-center rounded-md shadow-lg px-4 py-2 transition-colors ease-in-out bg-indigo-600 focus:outline-none hover:bg-indigo-500 dark:hover:bg-indigo-700 text-base font-medium text-white">
          Сортування
          <ChevronDownIcon :class="'-mr-1 ml-1 h-6 w-6 transition-transform '+ (isOpen ? 'rotate-180' : '')"/>
        </button>

        <!-- pop panel -->
        <transition enter-active-class="transition ease-out duration-125" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-90">
          <div v-if="isOpen" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-50 ring-1 dark:bg-gray-700 ring-black ring-opacity-5 focus:outline-none transition-colors">
            <transition-group appear enter-active-class="duration-200 ease-in-out" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100">
              <div v-for="(item, index) in sortProps" :key="item.name" :style="{ 'transition-delay': index * 25 + 'ms' }" class="w-full">
                <button @click="this.$emit('updContent', item.query); isOpen = false" class="w-full text-left text-gray-900 dark:text-gray-100 lg:hover:text-indigo-600 lg:dark:hover:text-indigo-500 block px-3 py-3 text-md font-medium transition-colors">{{ item.name }}</button>
              </div>
            </transition-group>
          </div>
        </transition>
      </div>

      <!-- Wrapper & blur -->
      <transition enter-active-class="duration-150 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 backdrop-blur z-[5]"></div>
      </transition>
    </div>
  </div>
</template>


<script>
// TODO: new full screen design & search item (server)
import { ChevronDownIcon } from '@heroicons/vue/solid'
import Search from '@/components/Search.vue'


export default {
  name: "SelectMenu",

  props:[
    'sortProps',
    'noSearchProps'
  ],
  
  data: () => ({
    isOpen: false
  }),
  
  deactivated() {
    this.isOpen = false
  },

  components: {
    ChevronDownIcon,
    Search
  },

  methods: {
    goSearch(search){
      this.$emit('goSearch', search);
    }
  }
}
</script>