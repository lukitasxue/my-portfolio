<!-- ProjectDetail.vue -->
<template>
  <component
    :is="blogEntry?.component"
    v-if="blogEntry?.component"
    class="w-full"
  />
  <div v-else class="text-gray-300">Blog not found.</div>
</template>


<script setup>
import { blogs } from '../data/projectBlogs.js'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const blogEntry = computed(() => {
  return blogs.find(b => b.id === route.params.id)
})
</script>


