<template>
  <transition appear enter-active-class="ease-out duration-150" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100" leave-active-class="ease-in duration-100" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-90">
    <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 h-full pt-18 mx-auto px-4 sm:pt-20 sm:px-6 lg:pt-24 lg:px-8 xl:pt-26 pb-4 sm:pb-8 z-[12]">
                                  <!-- for chrome < 79 -->
      <header @click.stop :class="'h-full overflow-hidden shadow-lg mx-auto rounded-lg text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 transition-colors '+maxWProps" :style="`height: min(${mainHeight+84}px, 100%);`">
        <!-- Top panel -->
        <div class="px-4 pt-4 pb-3 flex items-center justify-between">
          <!-- Logo -->
          <h4 class="text-3xl font-extrabold leading-9 tracking-tight sm:leading-10 overflow-hidden h-10">
            {{ nameBlockProps }}
          </h4>
          <!-- X button -->
          <button @click="isOpen = false" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 dark:text-gray-300 focus:outline-none active:ring-2 active:ring-inset active:ring-indigo-500 dark:bg-gray-800 transition-colors">
            <span class="sr-only">Close</span>
            <XIcon class="h-6 w-6"/>
          </button>
        </div>
        <!-- Content -->
        <div class="h-full" style="padding-bottom: 68px;"><!-- pb top content (close btn + logo) -->
          <div class="h-full pb-4 px-1 overflow-auto">
            <div ref="content">
              <slot/>
            </div>
          </div>
        </div>
      </header>
    </div>
  </transition>

  <!-- Wrapper blur -->
  <transition enter-active-class="duration-150 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="isOpen" @click="isOpen = false" class="block fixed inset-0 backdrop-blur z-[11]"></div>
  </transition>
</template>


<script>
import { XIcon } from '@heroicons/vue/outline'
import { nextTick } from 'vue'

export default {
  name: "FullScreenPopup",

  props:[
    'openDefaultProps',
    'nameBlockProps',
    'maxWProps',
  ],

  emits: ['changeOpen'],
  
  data: () => ({
    isOpen: false,
    mainHeight: 0,
  }),
  
  deactivated() {
    this.isOpen = false
  },

  created() {
    this.openDefaultProps && (this.changeOpen());
  },

  components: {
    XIcon,
  },

  methods: {
    async changeOpen() {
      this.isOpen = !this.isOpen;
      this.$emit('changeOpen', this.isOpen);
      await nextTick();
      this.isOpen && (this.mainHeight = this.$refs.content.scrollHeight);
    }
  },

  watch: {
    isOpen(newValue) {
      if (!newValue) {
        this.$emit('changeOpen', false);
      }
    }
  }
}
</script>