<template>
  <section id="projects" class="py-20 px-6" :style="{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }">
    <h2 class="text-3xl font-bold text-center mb-10">Projects</h2>

    <!-- Responsive 2-column grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <router-link
        v-for="project in showcaseProjects"
        :key="project.id"
        :to="`/projects/${project.id}`"
        :id="project.id"
        :ref="project.id === luckyId ? 'luckyCard' : null"
        :class="[
          'bg-zinc-800 rounded-xl overflow-hidden shadow-xl transition-transform hover:scale-105 hover:shadow-2xl group',
          project.id === luckyId ? 'animate-bounce-target' : ''
        ]"
      >
        <!-- Thumbnail -->
        <img
          :src="project.image"
          :alt="project.title"
          class="w-full h-56 object-cover group-hover:opacity-90 transition duration-300"
        />

        <!-- Content -->
        <div class="p-5">
          <h3 class="text-xl font-semibold text-white mb-1">{{ project.title }}</h3>
          <p class="text-sm text-gray-400">{{ project.description }}</p>
        </div>
      </router-link>

    </div>

    <!-- View More Button -->
    <div class="flex justify-center mt-10">
      <router-link to="/projects">
        <button class="px-6 py-2 border border-white rounded-lg text-white hover:bg-white hover:text-black transition">
          View More Projects
        </button>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { projects } from '../data/projects.js'
import { onMounted, ref } from 'vue'

const showcaseProjects = projects.filter(p => p.showcase)
const showcaseIds = showcaseProjects.map(p => p.id)
// Export only the showcased project IDs
const exposedRef = ref({ showcaseIds })
const luckyId = ref(null)

function triggerLuckyBounce(id) {
  const el = document.getElementById(id)
  if (el) {
    el.classList.remove('animate-bounce') // reset if already applied
    void el.offsetWidth; // force reflow to re-trigger animation
    el.classList.add('animate-bounce')
    setTimeout(() => el.classList.remove('animate-bounce'), 1000)
  }
}

defineExpose({ triggerLuckyBounce })

</script>
