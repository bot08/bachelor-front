<template>
  <!-- Select -->
  <SelectMenu :sortProps='sort' @updContent='getContent' @goSearch='goSearch'/>

  <!--Preloader-->
  <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <div v-for="n in (search == '' ? 20 : Math.max(1, 4 - search.length))" :key="n" class="flex rounded-lg mt-1 mb-3 md:mb-8 sm:mx-4 overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-700">
      <div class="w-20 h-24 bg-gray-200 dark:bg-gray-600 rounded-xl mx-7 my-5 animate-pulse"></div>
      <div class="px-1 my-auto animate-pulse">
        <p class="h-6 mb-2 bg-gray-200 dark:bg-gray-600 rounded w-32 sm:w-24"></p>
        <p class="h-5 mb-3 bg-gray-200 dark:bg-gray-600 rounded w-9"></p>
      </div>
    </div>
  </div>

  <!--Card-->
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-1 md:mb-0">
    <div v-for="item in data" :key="item.ModelName" class="rounded-lg mt-1 mb-3 md:mb-8 sm:mx-4 overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 transition-colors">
      <router-link :to="'/sunglasses/'+item.ModelID" class="flex">
        <!-- Image loading -->
        <LazyImage class="shrink-0">
          <template v-slot:image>
            <img class="w-28 h-28 mx-3 my-3 drop-shadow" :src="item.Modelimage" alt="icon">
          </template>
          <template v-slot:preloader> 
            <div class="w-20 h-24 bg-gray-200 dark:bg-gray-600 rounded-xl mx-7 my-5 animate-pulse"></div>
          </template>
          <template v-slot:error>
            <div class="w-20 h-24 bg-red-200 dark:bg-red-800 rounded-xl mx-7 my-5 animate-pulse text-center">img</div>
          </template>
        </LazyImage>
        <!-- /Image -->
        <div class="px-1 py-1 my-auto mr-2">
          <div class="font-bold text-xl">{{ item.ModelName }}</div>
          <div class="text-lg mb-2">{{ item.ModelManufacturer }}</div>
        </div>
      </router-link>
    </div>
  </div>

  <!-- Nothing found -->
  <SearchNothing v-if="!data[0] & !loading" :searchProps='search' :keyWordProps='"назви"' @goSearch='goSearch'/>
</template>


<script setup>
// todo img & sort
import axios from 'axios';
import { ref } from 'vue';
import LazyImage from '@/components/LazyImage.vue';
import { defineAsyncComponent } from 'vue';
import SelectMenuLoader from '@/components/SelectMenuLoader.vue';
import SearchNothing from '@/components/SearchNothing.vue';

const SelectMenu = defineAsyncComponent({
  loader: () => import('@/components/SelectMenu.vue'),
  loadingComponent: SelectMenuLoader,
  delay: 0,
});

const sort = [
  { name: 'Без сортування', query: '[_id]=-1' },
  { name: 'Від дорогих', query: '[eye]=1' },
  { name: 'Від недорогих', query: '[rarity]=-1' },
  { name: 'По алфавіту', query: '[rarity]=1' },
  { name: 'Ну якісь', query: '[name]=1' },
];

const loading = ref(true);
const data = ref([]);
const search = ref('');

const getContent = (apiSort, hidePreloaders) => {
  if (!hidePreloaders) loading.value = true;

  axios.get(`/api/sunglasses/get.php`)
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
  getContent();
}

getContent();
</script>