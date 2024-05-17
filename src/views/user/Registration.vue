<template>
  <div class="max-w-sm w-full mx-auto mt-1">
    <BaseCard>
      <h2 class="px-3 sm:px-4 pt-3 text-3xl font-extrabold leading-9 tracking-tight sm:leading-10">
        Реєстрація
      </h2>

      <!-- Forms -->
      <form class="w-full px-3 sm:px-4 pt-3 mb-4" @keyup.enter="singin()">
        <div class="mb-4 relative">
          <input v-model="login" type="text" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="login" autocomplete="off" />
          <label for="login" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Логін</label>
        </div>
        <div class="mb-4 relative">
          <input v-model="pass" type="password" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="password" autocomplete="off" />
          <label for="password" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Пароль</label>
        </div>
        <div class="mb-4 relative">
          <input v-model="fullName" type="text" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="name" autocomplete="off" />
          <label for="name" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Ім'я</label>
        </div>
        <div class="relative">
          <input v-model="email" type="email" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="email" autocomplete="off" />
          <label for="email" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Email</label>
        </div>

      </form>

      <!-- Btns -->
      <div class="px-3 sm:px-4 mb-4">
        <button v-if="loadingbtn" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-500 dark:bg-indigo-700"><svg class="inline animate-spin -ml-1 mr-2 mb-0.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Реєструю...</button>
        <button v-else @click="register()" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-600 hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none">Зареєструватись</button>
      </div>

      <p class="text-md text-center text-gray-400 dark:text-gray-400 mb-3">
        <router-link to="/user">Вже є акаунт?</router-link>
      </p>
    </BaseCard>
  </div>
</template>


<script setup>
// TODO fix laoding btn
import BaseCard from '@/components/BaseCard.vue'
import { ref, onActivated } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';
const router = useRouter();

import { useAuthStore } from '@/store/user.js'

const authStore = useAuthStore()

onActivated(() => {
  // Перевіряємо чи користувач не зайшов раніше
  authStore.loadAuthState()
  if (authStore.isAuthenticated) {
    alert('Ви вже авторизовані');
    router.push('/user');
  }
})

const login = ref('')
const pass = ref('')
const fullName = ref('')
const email = ref('')

const loadingbtn = ref(false)

const register = () => {
  if(!(login.value && pass.value && fullName.value && email.value)) {
    alert("Поля не заповнено");
    return
  }
  loadingbtn.value = true;
  axios({
    method: 'post', 
    url:'/api/users/register.php', 
    data: {
      username: login.value,
      password: pass.value,
      email: email.value,
      fullName: fullName.value
    }, 
    headers: {
      'Content-Type': 'application/json'
    } 
  })
  .then(res => {
    if (res.data.userId) {
      alert('Користувач успішно створений');
      router.push('/user');
    }
    else {
      alert('Імʼя користувача або електронна пошта вже зайняті');
    }
  })
  .catch(() => {
    alert('Помилка')
  })
  .finally(() => loadingbtn.value = false)
}

</script>