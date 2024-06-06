<template>
  <div class="max-w-lg w-full mx-auto mt-1">
    <BaseCard>
      <h2 class="px-3 sm:px-4 pt-3 text-3xl font-extrabold leading-9 tracking-tight sm:leading-10">
        Редагувати користувача
      </h2>

      <!-- Forms -->
      <form class="w-full px-3 sm:px-4 pt-3 mb-4">
        <div class="mb-4 relative">
          <input v-model="userID" type="number" step="1" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">ID користувача</label>
        </div>
        <div class="mb-4 relative">
          <input v-model="roleSelect" type="number" step="1" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Роль</label>
        </div>
      </form>

      <!-- Btns -->
      <div class="px-3 sm:px-4 mb-4">
        <button v-if="loadingbtn" class="w-full py-2 px-4 mb-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-500 dark:bg-indigo-700"><svg class="inline animate-spin -ml-1 mr-2 mb-0.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Змінити роль</button>
        <button v-else @click="updateRole()" class="w-full py-2 px-4 mb-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-600 hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none">Змінити роль</button>
        <button v-if="loadingbtn" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-500 dark:bg-indigo-700"><svg class="inline animate-spin -ml-1 mr-2 mb-0.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Видалити</button>
        <button v-else @click="deleteUser()" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-600 hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none">Видалити</button>
      </div>

      <p class="text-md text-center text-gray-400 dark:text-gray-400 mb-3">
        <router-link to="/user">Вернутись</router-link>
      </p>
    </BaseCard>
  </div>
</template>


<script setup>
defineOptions({
  name: 'notAlive',
})

import BaseCard from '@/components/BaseCard.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';
const router = useRouter();

import { useAuthStore } from '@/store/user.js'

const authStore = useAuthStore()
// завантажуєм дані
authStore.loadAuthState()

// Якщо користувач не увійшов
if (!authStore.isAuthenticated) {
  router.push('/user');
}

// зміні
const userID = ref('')
const roleSelect = ref('0')

const loadingbtn = ref(false)

// Оновлення ролі
const updateRole = () => {
  if(!(userID.value && roleSelect.value != "")) {
    alert("Поля не заповнено");
    return
  }
  
  loadingbtn.value = true;

  axios({
    method: 'post', 
    url:'/api/users/update_role.php', 
    data: {
      token: authStore.token,
      userId: userID.value,
      roleId: roleSelect.value 
    }, 
    headers: {
      'Content-Type': 'application/json'
    } 
  })
  .then(res => {
    if (res.data.message) {
      alert('Роль оновлено');
      userID.value = '';
      roleSelect.value = '0';
    }
    else {
      alert('Помилка даних');
    }
  })
  .catch(() => {
    alert('Помилка')
  })
  .finally(() => loadingbtn.value = false)
}

// Видалення
const deleteUser = () => {
  if(!(userID.value)) {
    alert("Поля не заповнено");
    return
  }
  
  loadingbtn.value = true;

  axios({
    method: 'post', 
    url:'/api/users/delete.php', 
    data: {
      token: authStore.token,
      userId: userID.value,
    }, 
    headers: {
      'Content-Type': 'application/json'
    } 
  })
  .then(res => {
    if (res.data.message) {
      alert('Користувача видалено');
      userID.value = '';
      roleSelect.value = '0';
    }
    else {
      alert('Помилка даних');
    }
  })
  .catch(() => {
    alert('Помилка')
  })
  .finally(() => loadingbtn.value = false)
}
</script>