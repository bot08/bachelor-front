<template>
  <!-- Container (if not logined) -->
  <div v-if="!authStore.isAuthenticated" class="max-w-sm w-full mx-auto mt-20">
    <BaseCard>
      <h2 class="px-3 sm:px-4 pt-3 text-3xl font-extrabold leading-9 tracking-tight sm:leading-10">
        Авторизація
      </h2>

      <!-- Forms -->
      <form class="w-full px-3 sm:px-4 pt-3 mb-4" @keyup.enter="singin()">
        <div class="mb-4 relative">
          <input v-model="login" type="text" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="login" autocomplete="off" />
          <label for="login" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Логін</label>
        </div>
        <div class="relative">
          <input v-model="pass" type="password" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="password" autocomplete="off" />
          <label for="password" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Пароль</label>
        </div>

      </form>

      <!-- Btns -->
      <div class="px-3 sm:px-4 mb-4">
        <button v-if="loadingbtn" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-500 dark:bg-indigo-700"><svg class="inline animate-spin -ml-1 mr-2 mb-0.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Заходимо...</button>
        <button v-else @click="handleLogin()" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-600 hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none">Увійти</button>
      </div>

      <p class="text-md text-center text-gray-400 dark:text-gray-400 mb-3">
        <router-link to="/registration">Реєстрація</router-link>
      </p>
    </BaseCard>
  </div>

  <!-- Profile Card content -->
  <div v-else class="mt-1">
    <div class="grid grid-cols-1">
      <!-- Base profile -->
      <BaseCard class="md:col-span-2 h-32">
        <div v-if="userData" class="my-2 mx-3 sm:m-4">
          <h3 class="text-2xl font-bold leading-9 tracking-tight sm:leading-10">
            {{ userData.FullName }}
          </h3>
          <p>
            <b>Логін: </b> {{ userData.Username }} <br>
            <b>Пошта: </b> {{ userData.Email }} <br>
          </p>
        </div>
        <div v-else class="my-2 mx-3 sm:m-4">
          <h3>
            <p class="h-8 mb-2 bg-gray-200 dark:bg-gray-600 rounded w-44 animate-pulse"></p>
          </h3>
          <p class="h-5 mt-1 mb-1 bg-gray-200 dark:bg-gray-600 rounded w-52 animate-pulse"></p>
          <p class="h-5 mt-2 mb-1 bg-gray-200 dark:bg-gray-600 rounded w-44 animate-pulse"></p>
        </div>
      </BaseCard>
    </div>

    <!-- Buttons -->
    <div class="mx-auto p-2 mb-4 md:mb-8 max-w-xl">
      <div class="grid grid-cols-1 md:grid-cols-2 rounded-md">
        <LazyLinkBtn :nameProps="'Відкрити замовлення'" :linkProps="'/order/view'"/>
        <button @click="logout()" class="items-center m-2 text-center px-7 py-2 shadow-lg text-base font-medium leading-6 text-white transition ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none">
          Вийти <LogoutIcon class="h-5 w-5 inline v-align-min3-5"/>
        </button>
        <transition-group appear enter-active-class="duration-200 ease-in-out transition" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100" leave-active-class="ease-in duration-150 transition" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-90">
          <LazyLinkBtn v-if="userData.RoleID > 0" :nameProps="'Добавити сонцезахисні'" :linkProps="'/add/sunglasses'"/>
          <LazyLinkBtn v-if="userData.RoleID > 0" :nameProps="'Добавити аксесуар'" :linkProps="'/add/accessories'"/>
          <LazyLinkBtn v-if="userData.RoleID > 0" :nameProps="'Добавити оправу'" :linkProps="'/add/frames'"/>
          <LazyLinkBtn v-if="userData.RoleID > 0" :nameProps="'Добавити лінзу'" :linkProps="'/add/lenses'"/>
        </transition-group>
      </div>
    </div>
  </div>

</template>


<script setup>
import BaseCard from '@/components/BaseCard.vue'
import LazyLinkBtn from '@/components/LazyLinkBtn.vue'
import { LogoutIcon } from '@heroicons/vue/outline'
import { ref } from 'vue'
import axios from 'axios'

import { useAuthStore } from '@/store/user.js'

const authStore = useAuthStore()

const login = ref('')
const pass = ref('')
const loadingbtn = ref(false)

const userData = ref('')

// Перевіряємо чи користувач не зайшов раніше
authStore.loadAuthState()

// вийти
const logout = authStore.logout

// Завантажити дані користувача
const getUserData = async (token) => {
  axios.get(`/api/users/get_user.php?token=${token}`)
  .then(res => {
    if(res.data.error) {
      authStore.logout();
    }
    userData.value = res.data;
  })
  .catch(() => {
    authStore.logout();
  })
}

// увійти
const handleLogin = async () => {
  const credentials = {
    username: login.value,
    password: pass.value
  }
  loadingbtn.value = true;
  await authStore.login(credentials)
  .finally(() => {
    loadingbtn.value = false;
    getUserData(authStore.token);
  })
  .catch(e => {
    console.log(e);
    authStore.logout();
  })
}

// При ініціалізації сторінки
if (authStore.isAuthenticated) {
  getUserData(authStore.token);
}
</script>