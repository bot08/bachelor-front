<template>
  <div :class="'relative block ' + (isOpen ? 'z-[12]' : 'delay-200 z-[5]')">
    <!-- Clear btn -->
    <transition enter-active-class="duration-250 ease-out" enter-from-class="opacity-0 translate-x-8 scale-90" enter-to-class="opacity-100 -translate-x-1 scale-100" leave-active-class="duration-150 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0 translate-x-8">
      <button v-if="search && isOpen" @click="this.$emit('goSearch', ''); this.search = ''; isOpen = false;" class="absolute block justify-center rounded-md shadow-lg px-2 py-2 transition ease-in-out bg-indigo-600 focus:outline-none hover:bg-indigo-500 dark:hover:bg-indigo-700 text-base font-medium text-white" style="right: 64px;">
        <XIcon class="w-6 h-6"/>
        <span class="sr-only">Відміна</span>
      </button>
    </transition>

    <!-- Search btn -->
    <button @click="this.openSearch()" class="justify-center rounded-md shadow-lg px-2 py-2 mr-3 transition-colors ease-in-out bg-indigo-600 focus:outline-none hover:bg-indigo-500 dark:hover:bg-indigo-700 text-base font-medium text-white">
      <SearchIcon class="h-6 w-6"/>
      <span class="sr-only">Пошук</span>
    </button>

    <!-- pop panel -->
    <transition enter-active-class="transition ease-out duration-125" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-90">
      <div v-if="isOpen" class="origin-top absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg bg-gray-50 ring-1 dark:bg-gray-700 ring-black ring-opacity-5 focus:outline-none transition-colors">
        <div class="w-full">
          <div class="m-3">
            <div class="relative">
              <input v-model="search" ref="searchInput" @keyup.enter="this.$emit('goSearch', this.search); isOpen = false;" type="text" inputmode="search" placeholder="search" autocomplete="off" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent"/>
              <label class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Пошук</label>
            </div>
            <transition appear enter-active-class="duration-200 ease-in-out" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100">
              <button @click="this.$emit('goSearch', this.search); isOpen = false;" style="transition-delay: 25ms" class="w-full mt-3 inline-flex justify-center rounded-md px-4 py-2 transition ease-in-out bg-indigo-600 focus:outline-none hover:bg-indigo-500 dark:hover:bg-indigo-700 text-base font-medium text-white">
                Шукати
              </button>
            </transition>
          </div>
        </div>
      </div>
    </transition>
  </div>

  <!-- Wrapper & blur -->
  <transition enter-active-class="duration-150 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 backdrop-blur z-[11]"></div>
  </transition>
</template>
  
  
<script>
import { SearchIcon, XIcon } from '@heroicons/vue/solid'
import { nextTick } from 'vue'


export default {
  name: "Search",

  emits: ["goSearch"],
  
  data: () => ({
    isOpen: false,
    search: ''
  }),
  
  deactivated() {
    this.isOpen = false
  },

  methods: {
    async openSearch(){
      this.isOpen = !this.isOpen;
      await nextTick();
      this.isOpen && this.$refs.searchInput.focus();
    }
  },

  components: {
    SearchIcon,
    XIcon
  }
}
</script>