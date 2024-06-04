<template>
  <!-- Select -->
  <SelectMenu :noSearchProps='true' :sortProps='sort' @updContent='getContent' @goSearch='goSearch'/>

  <!--Preloader-->
  <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <div v-for="n in (search == '' ? 12 : Math.max(1, 4 - search.length))" :key="n" class="flex rounded-lg mt-1 mb-3 md:mb-8 sm:mx-4 overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-700">
      <div class="p-3 animate-pulse">
        <p class="h-6 mb-2 bg-gray-200 dark:bg-gray-600 rounded w-42"></p>
        <p class="h-5 mb-2 bg-gray-200 dark:bg-gray-600 rounded w-24"></p>
        <p class="h-6 mb-2 bg-gray-200 dark:bg-gray-600 rounded w-28"></p>
        <p class="h-5 mb-2 bg-gray-200 dark:bg-gray-600 rounded w-48"></p>
      </div>
    </div>
  </div>

  <!--Card-->
  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-1 md:mb-0">
    <div v-for="item in data" :key="item.OrderID" class="rounded-lg mt-1 mb-3 md:mb-8 sm:mx-4 overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 transition-colors">
      <router-link :to="'/order/view#'+item.OrderID" class="flex">
        <div class="p-3 my-auto mr-2">
          <div class="font-bold text-xl"><b>Замовив:</b> {{ item.Username }} <TrashIcon @click="deleteOrder(item.OrderID)" class="h-5 w-5 inline cursor-pointer" style="vertical-align: -1.5px;"/></div>
          <div class="text-lg"><b>Дата:</b> {{ item.OrderDate }}</div>
          <div class="text-lg"><b>Сума замовлення:</b> {{ item.TotalAmount }} грн</div>
          <div class="text-lg"><b>Адрес для доставки:</b> {{ item.DeliveryAddress }}</div>
          <div class="text-lg"><b>Швидка доставка:</b> {{ item.FastDelivery ? 'так' : 'ні' }}</div>
          <div class="text-lg mb-2"><b>Тип:</b> {{ item.Details[0].LensID && 'Окуляри з рецептом' }} {{ item.Details[0].ModelID && 'Сонцезахисні окуляри' }} {{ item.Details[0].AccessoryID && 'Аксесуари та контактні лінзи' }}</div>
          <div class="text-lg mb-2"><b>DP:</b> {{ item.Details[0].DP }}</div>
        </div>
      </router-link>
    </div>
  </div>

  <!-- Nothing found -->
  <transition appear enter-active-class="duration-200 ease-in-out" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100">
    <div v-if="!data[0] & !loading">
      <div class="bg-gray-50 shadow-lg mx-auto text-center max-w-lg mt-1 mb-4 md:mb-8 rounded-lg dark:bg-gray-700 transition-colors">
        <div class="mx-auto pt-4 pb-4 px-3 sm:px-4 lg:px-5">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-200 transition-colors">Замовлень немає</h1>
          <p class="text-gray-900 dark:text-gray-300 transition-colors">Зніміть фільтри, або їх немає.</p>
        </div>
      </div>
    </div>
  </transition>
</template>


<script setup>
defineOptions({
  name: 'notAlive',
})
// todo Видалення, дані, пошук (no search props), сортування.
import axios from 'axios';
import { ref } from 'vue';
import { defineAsyncComponent } from 'vue';
import SelectMenuLoader from '@/components/SelectMenuLoader.vue';
import { TrashIcon } from "@heroicons/vue/solid"

import { useAuthStore } from '@/store/user.js'

const authStore = useAuthStore()

// Перевіряємо чи користувач не зайшов раніше
authStore.loadAuthState()

const SelectMenu = defineAsyncComponent({
  loader: () => import('@/components/SelectMenu.vue'),
  loadingComponent: SelectMenuLoader,
  delay: 0,
});

const sort = [
  { name: 'Без сортування', query: '' },
];

const loading = ref(true);
const data = ref([]);
const search = ref('');

const getContent = (apiSort, hidePreloaders) => {
  if (!hidePreloaders) loading.value = true;

  axios.get(`/api/orders/get.php?token=${authStore.token}`)
  .then(response => {
    data.value = response.data;
    console.log(response.data);
    loading.value = false;
  })
  .catch(() => {
    setTimeout(() => getContent(apiSort), 999);
  });
};

const deleteOrder = (id) => {
  axios({
    method: 'post', 
    url:'/api/orders/delete.php', 
    data: {
      token: authStore.token,
      orderID: id
    }, 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(() => getContent('', true))
};

const goSearch = (go) => {
  search.value = go;
  getContent('name='+go);
}

getContent('');
</script>