<template>
  <div id="app">
    <!-- Header is always shown -->
    <header class="top-0 z-50 px-6 py-4 flex justify-between items-center bg-[color:var(--bg-color)] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">

      <router-link to="/" class="font-bold text-white text-xl">
        Lucas' Portfolio
      </router-link>

      <nav class="flex gap-6 items-center text-sm font-medium">
        <template v-if="route.path.startsWith('/projects/')">
          <a @click.prevent="router.push('/projects')" class="hover:text-blue-400 text-[color:var(--text-color)] transition cursor-pointer">
            ← Back to Projects
          </a>
        </template>
        <template v-else-if="route.path !== '/projects'">
          <a @click.prevent="router.push('/projects')" class="hover:text-blue-400 text-[color:var(--text-color)] transition cursor-pointer">
            Projects
          </a>
        </template>
        <template v-else>
          <a @click.prevent="router.push('/')" class="hover:text-blue-400 text-[color:var(--text-color)] transition cursor-pointer">
            ← Back to Profile
          </a>
        </template>

        <!-- Social Icons -->
        <a href="https://github.com/lukitasxue" target="_blank" class="hover:text-white text-gray-400 transition">
          <i class="fab fa-github text-xl"></i>
        </a>
        <a href="https://www.linkedin.com/in/lucas-hsueh-a56421280/" target="_blank" class="hover:text-blue-400 text-gray-400 transition">
          <i class="fab fa-linkedin text-xl"></i>
        </a>
      </nav>
    </header>

    <!-- Main Homepage Sections (only shown when NOT on /projects or blog page) -->
    <div v-if="route.path === '/'" class="font-sans">
      <Hero :projectsSectionRef="projectsSectionRef" />
      <Skills />
      <Projects ref="projectsSectionRef" />
      <Contact />

      <!-- Back to Top Button -->
      <BackToTop />
    </div>

    <!-- Routed pages like /projects or /projects/:id -->
    <router-view v-else />
  </div>
</template>



<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

import Hero from './components/Hero.vue'
import Skills from './components/SkillOverview.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BackToTop from './components/BackToTop.vue'


const projectsSectionRef = ref()
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
