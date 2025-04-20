<template>
  <section class="py-20 px-6 text-white max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-10">All Projects</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <router-link
        v-for="project in allProjects"
        :key="project.id"
        :to="`/projects/${project.id}`"
        class="bg-zinc-800 rounded-xl overflow-hidden shadow-xl transition-transform hover:scale-105 group"
      >
        <img :src="project.image" :alt="project.title" class="w-full h-56 object-cover group-hover:opacity-90 transition duration-300" />
        <div class="p-5">
          <h3 class="text-xl font-semibold">{{ project.title }}</h3>
          <p class="text-sm text-gray-400">{{ project.description }}</p>
        </div>
      </router-link>
    </div>
    <BackToTop />
  </section>
</template>


<script setup>
import { projects } from '../data/projects.js'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import BackToTop from '../components/BackToTop.vue'

const route = useRoute()  
const allProjects = projects

onMounted(() => {
  const lucky = route.query.lucky === 'true'
  const id = route.params.id
  if (lucky && id) {
    const el = document.getElementById(id)
    if (el) {
      el.classList.remove('target-bounce') // reset
      void el.offsetWidth // reflow
      el.classList.add('target-bounce')
      setTimeout(() => el.classList.remove('target-bounce'), 1000)
    }
  }
}) 
</script>
