<template>
  <nav class="fixed top-0 py-2.5 sm:py-3 px-4 sm:px-6 bg-gray-50 dark:bg-gray-700 shadow-sm w-screen z-30">
    <div class="flex sm:flex-row justify-between max-w-7xl mx-auto">
      <!-- Left part -->
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <img class="h-8 w-8 sm:h-10 sm:w-10 md:mx-2" src="/favicon.svg" alt="logo" />
        <!-- Pages mirage -->
        <div class="hidden md:flex items-center ml-7 lg:ml-8">
          <p v-for="n in 5" :key="n" class="h-6 w-20 lg:w-28 ml-2 mr-5 inline-block bg-gray-200 dark:bg-gray-600 rounded-xl animate-pulse"></p>
        </div> 
      </div>  

      <!-- Right part -->
      <div class="flex items-center">
        <div class="flex items-center lg:mr-5">
          <!-- theme PC -->
            <div class="h-6 w-6 mr-2 hidden lg:block"/>
            <div class="dark:bg-gray-800 bg-gray-200 relative shrink-0 h-[34px] w-[66px] border-2 border-transparent rounded-full cursor-pointer ease-in-out focus:outline-none hidden md:inline-flex">
              <span class="dark:translate-x-8 translate-x-0 pointer-events-none inline-block h-[30px] w-[30px] rounded-full bg-white dark:bg-gray-200 shadow-lg ring-0 ease-in-out"/>
            </div>
            <div class="h-6 w-6 ml-2 hidden lg:block"/>
          <!-- mobile theme -->
          <div class="bg-white rounded-md p-2 inline-flex md:hidden dark:bg-gray-800">
            <div class="h-6 w-6"/>
          </div>
          <!-- mobile menu -->
          <div class="bg-white rounded-md p-2 ml-3 inline-flex md:hidden dark:bg-gray-800">
            <div class="h-6 w-6"/>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>