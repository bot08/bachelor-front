<template>
  <BaseCard>
    <h2 class="px-3 sm:px-4 pt-3 text-3xl font-extrabold leading-9 tracking-tight sm:leading-10">
      Оформити замовлення
    </h2>

    <!-- Forms -->
    <form class="w-full px-3 sm:px-4 pt-3 mb-4">
      <h2 class="font-bold text-xl">Вибрано:</h2>

      <div v-if="!data" style="height: 308px;"></div>
      <div v-else>
        <LazyImage class="flex justify-center">
          <template v-slot:image>
            <img class="w-auto h-40 my-3" :src="axios.defaults.baseURL+data.ModelImage" alt="icon">
          </template>
          <template v-slot:preloader> 
            <div class="w-auto h-40 my-3" style="padding-top: 3.5rem;">
              <svg class="mx-auto animate-spin text-gray-400 h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="spin"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            </div>
          </template>
          <template v-slot:error>
            <img class="w-auto h-40 my-3" src="/img/no_image.png" alt="icon">
          </template>
        </LazyImage>
        <h1 class="text-2xl font-extrabold leading-9 tracking-tight sm:leading-10">{{ data.ModelName }}</h1>
        <p class="text-lg">
          <b>Ціна:</b> {{ data.ModelPrice }} грн
        </p>
        <p class="text-lg">
          <b>Виробник:</b> {{ data.ModelManufacturer }} 
        </p>
        <p class="text-lg">
          <b>Поляризація:</b> {{ data.ModelPolarization ? 'відсутня' : 'наявна' }}
        </p>
      </div>

      <div class="mb-4 mt-4 relative">
        <input v-model="quantity" type="number" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
        <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Кількість</label>
      </div>

      <div class="py-1">
        <h2 class="font-bold mb-1 text-xl">Вкажіть куди доставити:</h2>
      </div>
      <div class="mb-4 relative">
        <input v-model="deliveryAddress" type="text" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
        <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Адрес</label>
      </div>
      <div class="flex items-center mb-4">
        <input v-model="fastDelivery" type="checkbox" value="" class="w-5 h-5 ml-1 mr-3 text-blue-600 bg-gray-100 border-gray-300 rounded ring-transparent focus:ring-0 dark:bg-gray-800 dark:border-gray-600 transition-colors">
        <label for="default-checkbox" class="ms-2 text-base font-medium dark:text-gray-200 transition-colors">Швидка доставка</label>
      </div>
    </form>

    <!-- Btns -->
    <div class="px-3 sm:px-4 mb-4">
      <button v-if="loadingbtn" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-500 dark:bg-indigo-700"><svg class="inline animate-spin -ml-1 mr-2 mb-0.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Добавляю...</button>
      <button v-else @click="add()" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-600 hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none">Добавити</button>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/BaseCard.vue'
import LazyImage from '@/components/LazyImage.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();

import { useAuthStore } from '@/store/user.js'

const authStore = useAuthStore()
// завантажуєм дані
authStore.loadAuthState()

// зміні
const deliveryAddress = ref('')
const fastDelivery = ref(false)

const unitPrice = ref(0)
const quantity = ref(1)

const data = ref('')

const loadingbtn = ref(false)

// Завантажуєм дані окуляра
const getSunglasses = (apiSort) => {
  axios.get(`/api/sunglasses/get.php?id=${apiSort}`)
  .then(response => {
    data.value = response.data[0];
    //loading.value = false;
    console.log(data.value[ModelPrice.value] * quantity.value);
  })
  .catch(() => {
    setTimeout(() => getSunglasses(apiSort), 999);
  });
};

// Добавляєм
const add = () => {
  if (
      !deliveryAddress.value || 
      !quantity
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
        fastDelivery: fastDelivery.value,
        totalAmount: data.value.ModelPrice * quantity.value,
        modelID: data.value.ModelID,
        quantity: quantity.value,
        unitPrice: data.value.ModelPrice
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

getSunglasses(route.query.sunglasses);
</script>