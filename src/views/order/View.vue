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
          <div class="font-bold text-xl"><b>Замовив:</b> {{ item.Username }}</div>
          <div class="text-lg"><b>Дата:</b> {{ item.OrderDate }}</div>
          <div class="text-lg"><b>Сума замовлення:</b> {{ item.TotalAmount }} грн</div>
          <div class="text-lg mb-2"><b>Адрес для доставки:</b> {{ item.DeliveryAddress }}</div>
        </div>
      </router-link>
    </div>
  </div>

  <!-- Nothing found -->
  <SearchNothing v-if="!data[0] & !loading" :searchProps='search' :keyWordProps='"назви"' @goSearch='goSearch'/>
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
import SearchNothing from '@/components/SearchNothing.vue';

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
    loading.value = false;
  })
  .catch(() => {
    setTimeout(() => getContent(apiSort), 999);
  });
};

const goSearch = (go) => {
  search.value = go;
  getContent('name='+go);
}

getContent('');
</script>