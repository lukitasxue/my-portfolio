<template>
  <div class="text-base sm:text-lg md:text-xl lg:text-[1.25rem]">
    <section
      id="skills"
      class="relative bg-[#1a1a1a] min-h-screen py-16 pb-32 text-center flex flex-col justify-center"
    >

        

        <div class="w-full px-4 sm:px-0 max-w-xl mx-auto text-left space-y-6">
          <h2 class="text-3xl font-semibold mb-10 text-white text-center">What I Use to Work Magic</h2>

          <div
            v-for="(skill, index) in skills"
            :key="index"
            v-motion="{
              visibleOnce: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.6,
                  ease: 'easeOut'
                }
              },
              initial: {
                opacity: 0,
                x: index % 2 === 0 ? -40 : 40
              }
            }"
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 border-gray-700 space-y-1 sm:space-y-0"
          >
            <span class="font-medium text-white sm:mr-8 w-full sm:w-auto">{{ skill.name }}</span>
            <span class="text-sm text-gray-300 sm:text-right w-full sm:w-2/3">{{ skill.level }}</span>
          </div>


        </div>

        <!-- Arrow should appear at the very bottom center of the skills section -->
        <div class="absolute inset-x-0 bottom-10 flex justify-center">
          <button
            @click="scrollToProjects"
            aria-label="Scroll to projects"
            class="text-4xl animate-bounce text-white hover:text-blue-400 transition"
          >
            ▼
          </button>
        </div>
      </section>
  </div>
</template>

<script setup>
const skills = [
  { name: 'Python', level: 'Confident with Python basics and using it for data-related tasks' },
  { name: 'Pandas', level: 'Solid grasp for wrangling and transformation' },
  { name: 'NumPy', level: 'Used frequently for numeric operations/math, and transformation' },
  { name: 'Scikit-learn', level: 'Experience with regression and basic models' },
  { name: 'Matplotlib', level: 'Comfortable plotting trends and comparisons for later analysis' },
  { name: 'Seaborn', level: 'Used for quick and beautiful statistical plots' },
  { name: 'SQL (MySQL)', level: 'Basic knowledge for querying structured data' },
  { name: 'Git / GitHub', level: 'Good day-to-day use for tracking & sharing code' },
  { name: 'Vue.js', level: 'Some experience building web interfaces' }
]

function scrollToProjects() {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }
</script>
