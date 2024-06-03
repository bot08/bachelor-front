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

    <div v-else>
      <SunglassesOrder v-if="$route.query.sunglasses"/>
      <AccessoriesOrder v-if="$route.query.accessory"/>
      <CustomOrder v-if="Object.keys($route.query).length === 0"/>
    </div>
  </div>
</template>


<script setup>
defineOptions({
  name: 'notAlive',
})

import BaseCard from '@/components/BaseCard.vue'
import LazyLinkBtn from '@/components/LazyLinkBtn.vue'
import CustomOrder from '@/components/order/Custom.vue'
import SunglassesOrder from '@/components/order/Sunglasses.vue'
import AccessoriesOrder from '@/components/order/Accessories.vue'

import { useAuthStore } from '@/store/user.js'

const authStore = useAuthStore()
authStore.loadAuthState()
</script>