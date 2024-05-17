<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-1">
    <Classic v-for="item in menus" :key="item.name" :nameProps="item.name" :hrefProps="item.href" :icoProps="'/img/'+item.icon+'.png'"/>
  </div>
</template>


<script setup>
import { computed } from 'vue'
import Classic from '@/components/home/Classic.vue'
import { useAuthStore } from '@/store/user.js'

const authStore = useAuthStore()
// Перевіряємо чи користувач не зайшов раніше
authStore.loadAuthState()

const menus = computed(() => [
  { name: 'Сонцезахисні окуляри', href: '/sunglasses', icon: 'sunglass_icon' },
  { name: 'Аксесуари', href: '/accessories', icon: 'accessories_icon' },
  { name: 'Окуляри під замовлення', href: '/order', icon: 'glasses_icon' },
  { name: authStore.isAuthenticated ? 'Профіль' : 'Авторизація', href: '/user', icon: 'person_icon' },
  { name: 'Про роботу', href: '/about', icon: 'info_icon' },
])
</script>