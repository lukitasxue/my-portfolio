<template>
  <section
    class="relative min-h-screen flex items-center justify-center px-6 pb-20"
    :style="{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }"
  >
    <!-- Content Wrapper -->
    <div class="max-w-5xl w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-10">
      <!-- Profile Image -->
      <img
        src="/profilePhoto.jpeg"
        alt="Lucas profile photo"
        class="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
      />

      <!-- Intro + Buttons + Socials -->
      <div class="flex-1">
        <h1 class="text-5xl font-bold text-center md:text-left mb-4 text-[color:var(--text-color)]">
          Hi, I’m Lucas 👋
        </h1>

        <p class="text-lg mb-2 text-[color:var(--text-color)]">
          An <span class="font-medium">Argentinian-Taiwanese aspiring data scientist</span> who loves predicting things with machine learning,
          and enjoys other things like wrangling data, analyzing patterns, and telling clear, insightful stories.
        </p>
        <br>
        <br>
        <p class="text-sm mb-6 text-center md:text-left text-[color:var(--text-color)]">
          Scroll down to check out my favorite projects, or hit the lucky button!
        </p>

        <!-- Buttons -->
        <div class="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
          <!-- View Projects Button -->
          <div class="relative group inline-block">
            <button
              @click="scrollToProjects"
              class="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
            >
              <span
                class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              ></span>
              <span class="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                <div class="relative z-10 flex items-center space-x-2">
                  <span class="transition-all duration-500 group-hover:translate-x-1">View Projects</span>
                  <svg class="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </span>
            </button>
          </div>

          <!-- Feeling Lucky Button -->
          <div class="relative group inline-block">
            <button
              @click="feelingLucky"
              class="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
            >
              <span
                class="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              ></span>
              <span class="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                <div class="relative z-10 flex items-center space-x-2">
                  <span class="transition-all duration-500 group-hover:translate-x-1">Feeling Lucky</span>
                  <svg class="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </span>
            </button>
          </div>
        </div>

        <!-- Social Icons -->
        <div class="flex justify-center md:justify-start gap-6 text-3xl">
          <a href="https://github.com/lukitasxue" target="_blank" aria-label="GitHub" class="hover:text-white text-gray-400 transition">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/lucas-hsueh-a56421280/" target="_blank" aria-label="LinkedIn" class="hover:text-blue-400 text-gray-400 transition">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://www.youtube.com/@lukitasCS" target="_blank" aria-label="YouTube" class="hover:text-red-500 text-gray-400">
            <i class="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
    
  <!-- Arrow should appear at the very bottom center of the Hero section -->

  <div class="absolute inset-x-0 bottom-6 sm:bottom-20 flex justify-center">

    <button
      @click="scrollToSkills"
      aria-label="Scroll to skills"
      class="text-4xl animate-bounce text-white hover:text-blue-400 transition"
    >
      ▼
    </button>
  </div>





  </section>
  
</template>

  
  
<script setup>
  import { projects } from '../data/projects.js'
  import Projects from './Projects.vue'
  import { useRouter } from 'vue-router'

  import { ref, nextTick } from 'vue'

  const router = useRouter()
  function scrollToProjects() {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  const props = defineProps(['projectsSectionRef'])

  function feelingLucky() {
    const projectIds = ['mood-predictor', 'linear-regression'] // Add all proj IDs here
  const luckyProjectId = projectIds[Math.floor(Math.random() * projectIds.length)]
    router.push({
      path: `/projects/${luckyProjectId}`,
      query: { lucky: 'true' }
    })
  }





  function scrollToSkills() {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  }
</script>
  