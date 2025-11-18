<template>
  <BaseCard>
    <div class="my-2 mx-3 sm:m-4">
      <!-- Image loading -->
      <LazyImage class="mr-3 sm:mb-2" style="float: left;">
        <template v-slot:image>
          <img class="rounded-xl shadow-lg w-20 h-20 mx-auto" :src="'/img/avatars/'+avatarProps+'.jpg'" alt="avatar">
        </template>
        <template v-slot:preloader> 
          <div class="rounded-xl shadow-lg w-20 h-20 mx-auto bg-gray-200 dark:bg-gray-600 animate-pulse"></div>
        </template>
        <template v-slot:error>
          <div class="rounded-xl shadow-lg w-20 h-20 mx-auto bg-red-200 dark:bg-red-800 animate-pulse text-center">img</div>
        </template>
      </LazyImage>
      <!-- /Image --> 
      <h3 class="text-2xl font-bold leading-9 tracking-tight sm:leading-10">
        {{ usernameProps }} <TrashIcon v-if="isSecret && idProps > 0" @click="this.$emit('deleteComment', idProps);" class="h-5 w-5 inline cursor-pointer" style="vertical-align: -1.5px;"/>
      </h3>
      <p style="word-wrap: break-word; margin-bottom: -8px;">
        <span v-if="enableHTMLProps" v-html="commentProps"></span>
        <span v-else>{{ commentProps }}</span>
      </p>
    </div>
  </BaseCard>
</template>


<script>
import LazyImage from '@/components/LazyImage.vue'
import BaseCard from '@/components/BaseCard.vue'
import { TrashIcon } from "@heroicons/vue/solid"

export default {
  name: "Comment",

  props:[
    'usernameProps',
    'commentProps',
    'avatarProps',
    'idProps',
    'enableHTMLProps'
  ],

  emits: ["deleteComment"],

  components: {
    LazyImage,
    TrashIcon,
    BaseCard
  },
  
  data: () => ({
    isSecret: localStorage.getItem("secret")
  })
}
</script>