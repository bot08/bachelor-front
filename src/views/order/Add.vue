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
        Оформити замовлення
      </h2>

      <!-- Forms -->
      <form class="w-full px-3 sm:px-4 pt-3 mb-4">
        <div class="py-1">
          <h2 class="font-bold mb-1 text-xl">Вибіріть оправу та лінзу:</h2>
        </div>
        
        <div v-if="!frameData" style="height: 434px;"></div>
        <div v-else>
          <div class="mb-4 flex overflow-x-scroll">
            <div v-for="item in frameData" :key="item.FrameID" @click="frameID = item.FrameID" :class="'rounded-lg mt-1 mb-4 mx-2 sm:mx-4 shrink-0 overflow-hidden shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors ' + (frameID == item.FrameID && 'ring-4 ring-indigo-500')">
              <div class="blcok">
                <!-- Image loading -->
                <LazyImage class="shrink-0 flex justify-center">
                  <template v-slot:image>
                    <img class="w-24 h-24 mx-3 my-3 drop-shadow rounded-lg" :src="axios.defaults.baseURL+item.FrameImage" alt="icon">
                  </template>
                  <template v-slot:preloader> 
                    <div class="w-20 h-20 bg-gray-200 dark:bg-gray-600 rounded-xl mx-5 my-5 animate-pulse"></div>
                  </template>
                  <template v-slot:error>
                    <img class="w-24 h-24 mx-3 my-3 drop-shadow" src="/img/no_image.png" alt="icon error">
                  </template>
                </LazyImage>
                <!-- /Image -->
                <div class="px-2 py-1 my-auto mr-2">
                  <div class="font-bold text-lg">{{ item.FrameName }}</div>
                  <div class="text-base">{{ item.FramePrice }} грн</div>
                  <div class="text-base mb-2">{{ item.FrameManufacturer }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-4 flex overflow-x-scroll">
            <div v-for="item in lensData" :key="item.LensID" @click="lensID = item.LensID" :class="'rounded-lg mt-1 mb-4 mx-2 sm:mx-4 shrink-0 overflow-hidden shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors ' + (lensID == item.LensID && 'ring-4 ring-indigo-500')">
              <div class="blcok">
                <div class="px-2 py-1 my-auto mr-2">
                  <div class="font-bold text-lg">{{ item.LensType }}</div>
                  <div class="text-base">{{ item.LensPrice }} грн</div>
                  <div class="text-base">{{ item.LensManufacturer }}</div>
                  <div class="text-base mb-2">{{ item.LensManufacturerCountry }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="mb-4 relative">
          <input v-model="lensID" type="number" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">ID лінзи</label>
        </div> -->

        <div class="py-1">
          <h2 class="font-bold mb-1 text-xl">Вкажіть ваш рецепт:</h2>
        </div>
        <div class="mb-4 relative">
          <input v-model="dioptersRight" type="number" step="0.01" max="25" min="-25" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Діоптрії (праве око)</label>
        </div>
        <div class="mb-4 relative">
          <input v-model="dioptersLeft" type="number" step="0.01" max="25" min="-25" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Діоптрії (ліве око)</label>
        </div>
        <div class="mb-4 relative">
          <input v-model="astigmatismRight" type="number" step="0.01" max="25" min="-25" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Астегматика (праве око)</label>
        </div>
        <div class="mb-4 relative">
          <input v-model="astigmatismLeft" type="number" step="0.01" max="25" min="-25" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Астегматика (ліве око)</label>
        </div>
        <div class="mb-4 relative">
          <input v-model="DP" type="number" step="0.1" max="100" min="20" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">DP (міжзінична відстань)</label>
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
          <input v-model="fastDelivery" type="checkbox" value="" class="w-5 h-5 ml-1 mr-3 text-blue-600 bg-gray-100 border-gray-300 rounded ring-transparent focus:ring-0 dark:bg-gray-800 dark:border-gray-600 transition-colors">
          <label for="default-checkbox" class="ms-2 text-base font-medium dark:text-gray-200 transition-colors">Швидка доставка</label>
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
      <!-- {{ (lensData && frameData && lensID && frameID) && (lensData[lensID-1].LensPrice + frameData[frameID-1].FramePrice)*quantity }} -->
    </BaseCard>
  </div>
</template>


<script setup>
// Тут супер крінжа, сорі
// todo: вибір оправи + лінз нормально. + інші товари з хедера ловити
defineOptions({
  name: 'notAlive',
})

import BaseCard from '@/components/BaseCard.vue'
import LazyImage from '@/components/LazyImage.vue';
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
const fastDelivery = ref(false)
const frameID = ref('')
const lensID = ref('')
const dioptersLeft = ref('')
const dioptersRight = ref('')
const astigmatismLeft = ref('')
const astigmatismRight = ref('')
const lensDescription = ref('')
const DP = ref('')

const unitPrice = ref(0)
const quantity = ref(1)

const frameData = ref('')
const lensData = ref('')

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
        fastDelivery: fastDelivery.value,
        totalAmount: lensPrice() * quantity.value,
        frameID: frameID.value,
        lensID: lensID.value,
        dioptersLeft: dioptersLeft.value,
        dioptersRight: dioptersRight.value,
        astigmatismLeft: astigmatismLeft.value,
        astigmatismRight: astigmatismRight.value,
        lensDescription: lensDescription.value,
        dp: DP.value,
        lensPrice: lensPrice(), // ?
        quantity: quantity.value,
        unitPrice: unitPrice.value // ?
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

// Завантажуєм лінзи на оправи
const getLensAndFrames = (apiSort) => {
  axios.get(`/api/frames/get.php?${apiSort}`)
  .then(response => {
    frameData.value = response.data;
    //loading.value = false;
  })
  .catch(() => {
    setTimeout(() => getLensAndFrames(apiSort), 999);
  });
  axios.get(`/api/lens/get.php?${apiSort}`)
  .then(response => {
    lensData.value = response.data;
    //loading.value = false;
  })
  .catch(() => {
    setTimeout(() => getLensAndFrames(apiSort), 999);
  });
};

const lensPrice = () => {
  return (lensData.value && frameData.value && lensID.value&& frameID.value) && (lensData.value[lensID.value - 1].LensPrice + frameData.value[frameID.value - 1].FramePrice)
}

// Завандажуєм дані
getLensAndFrames();
</script>