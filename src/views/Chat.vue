<template>
  <Chat/>
</template>


<script setup>
import { defineAsyncComponent } from 'vue'

const Chat = defineAsyncComponent({
  loader: () => import('@/components/ai/ChatV2.vue'),
})
</script>