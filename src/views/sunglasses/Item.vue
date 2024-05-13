<template>
  <div>
    {{ $route.params.id }}
    {{ itemID }}
  </div>
</template>


<script setup>
// alive
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const itemID = route.params.id
</script>