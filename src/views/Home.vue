<template>
  <!-- Content -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-1">
    <Classic v-for="item in menus" :key="item.name" :nameProps="item.name" :hrefProps="item.href" :icoProps="'/img/'+item.href+'.png'"/>
  </div>
</template>


<script setup>
import Classic from '@/components/home/Classic.vue'

const menus = [
  { name: 'Сонцезахисні окуляри', href: '/sunglasses' },
  { name: 'Акаунт', href: '/user' },
]
</script>