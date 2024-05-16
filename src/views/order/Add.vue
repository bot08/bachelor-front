<template>
  <div class="max-w-lg w-full mx-auto mt-1">
    <BaseCard v-if="!authStore.isAuthenticated">
      <h2 class="px-3 sm:px-4 pt-3 text-3xl font-extrabold leading-9 tracking-tight sm:leading-10">
        Для оформення замовлення необхідно авторизуватись
      </h2>
      <div class="flex justify-center m-4">
        <LazyLinkBtn :nameProps="'Сторінка авторизації'" :linkProps="'/user'"/>
      </div>
    </BaseCard>

    <BaseCard v-else>
      <h2 class="px-3 sm:px-4 pt-3 text-3xl font-extrabold leading-9 tracking-tight sm:leading-10">
        Оформити замовлення (НОТ РЕДІ УЕТ)
      </h2>

      <!-- Forms -->
      <form class="w-full px-3 sm:px-4 pt-3 mb-4">
        <div class="py-1">
          <h2 class="font-bold mb-1 text-xl">Вибіріть оправу та лінзу:</h2>
        </div>
        <div class="mb-4 relative">
          <input v-model="frameID" type="number" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">ID оправи</label>
        </div>
        <div class="mb-4 relative">
          <input v-model="lensID" type="number" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">ID лінзи</label>
        </div>

        <div class="py-1">
          <h2 class="font-bold mb-1 text-xl">Вкажіть ваш рецепт:</h2>
        </div>
        <div class="mb-4 relative">
          <input v-model="dioptersLeft" type="number" step="0.01" max="25" min="-25" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Діоптрії (ліве око)</label>
        </div>
        <div class="mb-4 relative">
          <input v-model="dioptersRight" type="number" step="0.01" max="25" min="-25" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Діоптрії (праве око)</label>
        </div>
        <div class="mb-4 relative">
          <input v-model="astigmatismLeft" type="number" step="0.01" max="25" min="-25" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Астегматика (ліве око)</label>
        </div>
        <div class="mb-4 relative">
          <input v-model="astigmatismRight" type="number" step="0.01" max="25" min="-25" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Астегматика (праве око)</label>
        </div>
        <div class="mb-4 relative">
          <input v-model="lensDescription" type="text" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Додаткові параметри (опціонально)</label>
        </div>

        <div class="py-1">
          <h2 class="font-bold mb-1 text-xl">Вкажіть куди доставити:</h2>
        </div>
        <div class="mb-4 relative">
          <input v-model="deliveryAddress" type="text" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Адрес</label>
        </div>
        <div class="flex items-center mb-4">
          <input type="checkbox" value="" class="w-5 h-5 ml-1 mr-3 text-blue-600 bg-gray-100 border-gray-300 rounded ring-transparent focus:ring-0 dark:bg-gray-800 dark:border-gray-600 transition-colors">
          <label for="default-checkbox" class="ms-2 text-base font-medium dark:text-gray-200 transition-colors">Швидка доставка (нема)</label>
        </div>
      </form>

      <!-- Btns -->
      <div class="px-3 sm:px-4 mb-4">
        <button v-if="loadingbtn" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-500 dark:bg-indigo-700"><svg class="inline animate-spin -ml-1 mr-2 mb-0.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Добавляю...</button>
        <button v-else @click="add()" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-600 hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none">Добавити</button>
      </div>

      <p class="text-md text-center text-gray-400 dark:text-gray-400 mb-3">
        <router-link :to="'/'">Головна</router-link>
      </p>
    </BaseCard>
  </div>
</template>


<script setup>
defineOptions({
  name: 'notAlive',
})

import BaseCard from '@/components/BaseCard.vue'
import LazyLinkBtn from '@/components/LazyLinkBtn.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';
const router = useRouter();

import { useAuthStore } from '@/store/user.js'

const authStore = useAuthStore()
// завантажуєм дані
authStore.loadAuthState()

// зміні
const deliveryAddress = ref('')
const frameID = ref('')
const lensID = ref('')
const dioptersLeft = ref('')
const dioptersRight = ref('')
const astigmatismLeft = ref('')
const astigmatismRight = ref('')
const lensDescription = ref('')
const lensPrice = ref(0)
const unitPrice = ref(0)
const quantity = ref(0)

const loadingbtn = ref(false)

// Добавляєм
const add = () => {
  if (
      !deliveryAddress.value || 
      !frameID.value || 
      !lensID.value || 
      dioptersLeft.value === "" || 
      dioptersRight.value === "" || 
      astigmatismLeft.value === "" || 
      astigmatismRight.value === ""
  ) {
    alert("Поля не заповнено");
    return
  }
  
  loadingbtn.value = true;

  axios({
    method: 'post', 
    url:'/api/orders/add.php', 
    data: {
      order: {
        deliveryAddress: deliveryAddress.value,
        totalAmount: (unitPrice.value + lensPrice.value)*quantity.value,
        frameID: frameID.value,
        lensID: lensID.value,
        dioptersLeft: dioptersLeft.value,
        dioptersRight: dioptersRight.value,
        astigmatismLeft: astigmatismLeft.value,
        astigmatismRight: astigmatismRight.value,
        lensDescription: lensDescription.value,
        lensPrice: lensPrice.value,
        quantity: quantity.value,
        unitPrice: unitPrice.value
      },
      token: authStore.token
    }, 
    headers: {
      'Content-Type': 'application/json'
    } 
  })
  .then(res => {
    if (res.data.message) {
      alert('Замовлення оформлено. Деталі можна переглянути натиснувши кнопку "Відкрити замовлення" в профілі користувача.');
      router.push('/user');
    }
    else {
      alert('Помилка даних');
    }
  })
  .catch(() => {
    alert('Помилка серверу')
  })
  .finally(() => loadingbtn.value = false)
}
</script>