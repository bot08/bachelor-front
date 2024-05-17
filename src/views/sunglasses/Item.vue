<template>
  <!--Preloader-->
  <div v-if="loading">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-1 sm:mt-4">
      <!-- img -->
      <div class="rounded-lg mb-4 sm:mx-4 md:mb-8 overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-700 flex justify-center items-end">
        <div class="w-auto h-44" style="padding-top: 3.5rem;">
          <svg class="mx-auto animate-spin text-gray-400 h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="spin"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle></svg>
        </div>
      </div>
      <!-- data -->
      <BaseCard>
        <h3 class="pt-4 px-3 mb-2 sm:mb-3">
          <p class="h-8 bg-gray-200 dark:bg-gray-600 rounded w-44 animate-pulse"></p>
        </h3>
        <p class="h-5 mt-1 mb-1 ml-3 bg-gray-200 dark:bg-gray-600 rounded w-52 animate-pulse"></p>
        <p class="h-5 mt-3 mb-1 ml-3 bg-gray-200 dark:bg-gray-600 rounded w-44 animate-pulse"></p>
        <p class="h-5 mt-3 mb-1 ml-3 bg-gray-200 dark:bg-gray-600 rounded w-60 animate-pulse"></p>
      </BaseCard>
      <!-- desc -->
      <BaseCard class="md:col-span-2 lg:col-span-1">
        <h3 class="px-3 pt-3 pb-2 text-3xl font-extrabold leading-9 tracking-tight sm:leading-10">Опис</h3>
        <p class="px-3">
          <p class="h-5 mt-1 mb-2 bg-gray-200 dark:bg-gray-600 rounded w-full animate-pulse" v-for="n in 3" :key="n"></p>
          <p class="h-5 mt-1 mb-2 bg-gray-200 dark:bg-gray-600 rounded w-44 animate-pulse"></p>
        </p>
      </BaseCard>
    </div>
  </div>

  <!--Content-->
  <div v-if="data.ModelName">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-1 sm:mt-4">
      <!-- img section -->
      <div class="rounded-lg mb-4 sm:mx-4 md:mb-8 overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-700 transition-colors flex justify-center items-end">
        <!-- Image loading -->
        <LazyImage>
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
        <!-- /Image -->
      </div>
      <!-- Base info -->
      <BaseCard>
        <h1 class="px-3 pt-3 pb-2 text-3xl font-extrabold leading-9 tracking-tight sm:leading-10">{{ data.ModelName }}</h1>
        <p class="px-3 text-lg">
          <b>Ціна:</b> {{ data.ModelPrice }} грн
        </p>
        <p class="px-3 text-lg">
          <b>Виробник:</b> {{ data.ModelManufacturer }} 
        </p>
        <p class="px-3 text-lg">
          <b>Поляризація:</b> {{ data.ModelPolarization ? 'відсутня' : 'наявна' }}
        </p>
      </BaseCard>
      <!-- desc -->
      <BaseCard class="md:col-span-2 lg:col-span-1">
        <h3 class="px-3 pt-3 pb-2 text-3xl font-extrabold leading-9 tracking-tight sm:leading-10">Опис</h3>
        <p class="px-3 text-lg">
          {{ data.ModelDescription }}
        </p>
      </BaseCard>
    </div>

    <div class="flex justify-center mb-4">
      <LazyLinkBtn :nameProps="'Замовити'" :linkProps="'/order?sunglasses='+itemID"/>
    </div>
  </div>

  <!-- 404 Error -->
  <NotFound v-if="error"/>
</template>


<script setup>
defineOptions({
  name: 'notAlive',
})

import { ref } from 'vue'
import NotFound from '@/components/NotFound.vue'
import LazyImage from '@/components/LazyImage.vue'
import BaseCard from '@/components/BaseCard.vue'
import LazyLinkBtn from '@/components/LazyLinkBtn.vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
const route = useRoute()

const itemID = route.params.id
const loading = ref(true);
const error = ref(false);
const data = ref([]);


const getContent = () => {
  axios.get(`/api/sunglasses/get.php?id=${itemID}`)
  .then(response => {
    if(!response.data[0]) {
      error.value = true;
      return
    }
    data.value = response.data[0];
  })
  .catch(() => {
    error.value = true;
  })
  .finally(() => {
    loading.value = false;
  })
};

getContent();
</script>