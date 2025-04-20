<template>
    <button
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 p-2 rounded-full bg-gray-800 shadow-lg hover:bg-blue-500 transition"
      aria-label="Back to top"
    >
      <img src="../assets/r.png" alt="Back to Top" class="w-6 h-6" />
    </button>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  
  const showBackToTop = ref(false)
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  function handleScroll() {
    showBackToTop.value = window.scrollY > 200
  }
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  </script>
  