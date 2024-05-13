<template>
  <nav class="fixed top-0 py-2.5 sm:py-3 px-4 sm:px-6 bg-gray-50 dark:bg-gray-700 transition-colors shadow-sm w-screen z-30">
    <div class="flex sm:flex-row justify-between max-w-7xl mx-auto">
      <!-- Left part -->
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/">
          <span class="sr-only">Logo</span>
          <img class="h-8 w-8 sm:h-10 sm:w-10 md:mx-2" :src="easterEgg == 9 ? '/img/6star.svg' : '/favicon.svg'" alt="" />
        </router-link>
        <!-- Pages -->
        <router-link v-for="item in navigation.slice(0, 4)" :key="item.name" :to="item.href" class="hidden md:flex h-full items-center ml-7 lg:ml-8 transition-colors font-medium text-gray-900 dark:text-gray-100 lg:hover:text-indigo-600 lg:dark:hover:text-indigo-500">
          <div class="block">
            <component :is="item.icon" class="hidden lg:inline h-5 w-5 lg:mx-1 v-align-min3-5"/>
            {{ item.name }}
          </div>
        </router-link>
        <!-- More -->
        <div class="relative group h-full">
          <button @click="changeNav()" class="hidden md:flex h-full items-center ml-7 lg:ml-8 transition-colors font-medium text-gray-900 dark:text-gray-100 lg:hover:text-indigo-600 lg:dark:hover:text-indigo-500 focus:outline-none">
            <div class="block">
              <ChevronDownIcon :class="'inline h-5 w-5 lg:ml-1 v-align-min3-5 transition-transform '+ (showNav ? 'rotate-180' : '')"/>
              {{ showNav ? "Менше" : "Більше" }}
            </div>
          </button>
          <!-- Dropdown menu -->
          <transition enter-active-class="transition ease-out duration-125" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-90">
            <div v-if="showNav" class="z-30 origin-top absolute mt-5 w-48 hidden md:block rounded-md shadow-lg bg-gray-50 ring-1 dark:bg-gray-700 ring-black ring-opacity-5 focus:outline-none transition-colors">
              <transition-group appear enter-active-class="duration-200 ease-in-out" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100">
                <div v-for="(item, index) in navigation.slice(4)" :key="item.name" :style="{ 'transition-delay': index * 25 + 'ms' }" class="w-full text-gray-900 dark:text-gray-100 lg:hover:text-indigo-600 lg:dark:hover:text-indigo-500 transition">
                  <router-link :to="item.href" class="w-full text-left block px-3 py-3 text-md font-medium">
                    <component :is="item.icon" class="inline h-5 w-5 mx-1 v-align-min3-5"/>
                    {{ item.name }}
                  </router-link>
                </div>
              </transition-group>
            </div>
          </transition>
          <!-- Wrapper for click outside is below <nav> -->
        </div>
      </div>

      <!-- Right part -->
      <div class="flex items-center">
        <div class="flex items-center lg:mr-5">
          <!-- theme PC -->
            <SunIcon class="h-6 w-6 mr-2 text-gray-600 dark:text-gray-200 hidden lg:block transition-colors"/>
            <div @click="themeSwitch()" class="dark:bg-gray-800 bg-gray-200 relative shrink-0 h-[34px] w-[66px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out focus:outline-none hidden md:inline-flex">
              <span class="sr-only">Theme switch</span>
              <span class="dark:translate-x-8 translate-x-0 pointer-events-none inline-block h-[30px] w-[30px] rounded-full bg-white dark:bg-gray-200 shadow-lg ring-0 transition ease-in-out"/>
            </div>
            <MoonIcon class="h-6 w-6 ml-2 text-gray-600 dark:text-gray-200 hidden lg:block transition-colors"/>
          <!-- mobile theme -->
          <button
            type="button"
            @click="themeSwitch()"
            class="bg-white rounded-md p-2 inline-flex md:hidden items-center justify-center text-gray-500 dark:text-gray-300 focus:outline-none active:ring-2 active:ring-inset active:ring-indigo-500 dark:bg-gray-800 transition-colors">
              <span class="sr-only">Theme switch (MOBILE)</span>
              <MoonIcon class="h-6 w-6 dark:hidden"/>
              <SunIcon class="h-6 w-6 hidden dark:block"/>
          </button>
          <!-- mobile menu -->
          <button
            type="button"
            @click="changeNav()"
            class="bg-white rounded-md p-2 ml-3 inline-flex md:hidden items-center justify-center text-gray-500 dark:text-gray-300 focus:outline-none active:ring-2 active:ring-inset active:ring-indigo-500 dark:bg-gray-800 transition-colors">
              <span class="sr-only">Open menu</span>
              <MenuIcon class="h-6 w-6"/>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Wrapper for PC dropdown & blur -->
  <transition enter-active-class="duration-150 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="showNav" @click="changeNav()" class="hidden md:block fixed inset-0 backdrop-blur z-20"></div>
  </transition>

  <!-- Mobile -->
  <transition enter-active-class="duration-250 ease-out" enter-from-class="translate-x-full" enter-to-class="-translate-x-1" leave-active-class="duration-150 ease-in" leave-from-class="translate-x-0" leave-to-class="translate-x-full">
    <!-- Wrapper -->
    <div v-if="showNav" @click="changeNav()" class="fixed inset-0 transition-transform md:hidden z-40">
      <!-- Menu -->
      <div class="w-72 h-full float-right transition-transform">
        <div @click.stop class="w-full h-full overflow-auto bg-gray-50 dark:bg-gray-700 ring-1 ring-black ring-opacity-5 shadow-lg">
          <div class="mx-5 mt-4 flex items-center justify-between">
            <!-- Logo -->
            <router-link to="/">
              <img class="h-8 w-8" src="/favicon.svg" alt="logo" />
            </router-link>
            <!-- X button -->
            <button @click="changeNav()" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 dark:text-gray-300 focus:outline-none active:ring-2 active:ring-inset active:ring-indigo-500 dark:bg-gray-800">
              <span class="sr-only">Close menu</span>
              <XIcon class="h-6 w-6"/>
            </button>
          </div>
          <!-- nav -->
          <div class="px-2 pt-2 pb-3 overflow-hidden">
            <transition-group appear enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 translate-x-8" enter-to-class="opacity-100">
              <router-link v-if="!isTouch" v-for="(item, index) in navigation" :key="item.name" :to="item.href" :style="{ 'transition-delay': 100 + index * 10 + 'ms' }" :class="'w-full inline-block text-left px-3 py-2.5 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 outline-none transition-transform'">
                <component :is="item.icon" class="inline h-5 w-5 text-indigo-600 dark:text-indigo-500 mx-1 v-align-min3-5"/>
                {{ item.name }}
              </router-link>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- Mobile blur BG -->
  <transition enter-active-class="duration-200 ease-in-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-100 ease-in-out" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="showNav" class="md:hidden block fixed inset-0 backdrop-blur z-30"></div> <!-- :style="isTouch && `backdrop--filter: blur(${Math.min(8, (290-xLeft)/48)}px);`" -->
  </transition>
</template>


<script>
// todo: remove out-line if possible & refactor swipes
import { MenuIcon, XIcon, TranslateIcon, ChevronDownIcon } from '@heroicons/vue/outline'
import { MoonIcon, HomeIcon, PuzzleIcon, SparklesIcon, InformationCircleIcon, SunIcon, BriefcaseIcon, QuestionMarkCircleIcon, MapIcon } from '@heroicons/vue/solid'

const navigation = [
  { name: 'Головна', href: '/', icon: HomeIcon },
  { name: 'Сонцезахисні', href: '/sunglasses', icon: SunIcon },
  { name: 'Аксесуари', href: '/accessories', icon: PuzzleIcon },
  { name: 'Замовлення', href: '/order', icon: SparklesIcon },
  { name: 'Про роботу', href: '/about', icon: InformationCircleIcon },
]

export default {
  components: {
    MenuIcon,
    XIcon,
    MoonIcon,
    SunIcon,
    ChevronDownIcon
  },

  data: () => ({
    showNav: false,
    isTouch: false,
    xLeft: 0,
    easterEgg: 0,
    /*
      $isAndroid() // get access

      // main js
      app.config.globalProperties.$isAndroid = () => {
        return navigator.userAgent.match(/Android/i)
      };
    */
    navigation
  }),

  // ЯКЩО ВЕРНУ ЖЕСТИ, ТО ТІКИ БАЗОВІ ДО ВІДСЛІДКОВУВАННЯ ПАЛЬЦЯ
  // mounted() {
  //   if(window.screen.width < 768){
  //     document.body.addEventListener('touchstart', this.handleTouchStart);
  //     document.body.addEventListener('touchmove', this.handleTouchMove);
  //     document.body.addEventListener('touchend', this.handleTouchEnd);
  //   }
  // },

  methods: {
    themeSwitch() {
      const html = document.querySelector("html");
      if(localStorage.getItem('theme')=="dark") {
        html.classList.remove("dark");
        localStorage.setItem("theme", "white");
        document.querySelector('meta[name="theme-color"]').setAttribute("content", "#f9fafb");
      } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
        document.querySelector('meta[name="theme-color"]').setAttribute("content", "#374151");
      }
      this.easterEgg++
    },

    changeNav() {
      this.showNav = !this.showNav
    },    
  },

  watch: {
    '$route.path'() {
      this.showNav = false;
    }
  }
}
</script>