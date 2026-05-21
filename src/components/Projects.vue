<template>
  <section id="projects" class="projects-section h-full overflow-hidden px-4 sm:px-6 flex flex-col justify-center" :style="{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }">
    <h2 class="projects-title text-3xl font-bold text-center">Some Projects</h2>

    <!-- Responsive 2-column grid -->
    <div class="projects-grid grid gap-4 max-w-6xl mx-auto w-full">
      <router-link
        v-for="project in showcaseProjects"
        :key="project.id"
        :to="`/projects/${project.id}`"
        :id="project.id"
        :ref="project.id === luckyId ? 'luckyCard' : null"
        :class="[
          'project-card bg-zinc-800 rounded-xl overflow-hidden shadow-xl transition-transform hover:scale-[1.02] hover:shadow-2xl group',
          project.id === luckyId ? 'animate-bounce-target' : ''
        ]"
      >
        <!-- Thumbnail -->
        <img
          :src="project.image"
          :alt="project.title"
          class="project-image w-full object-cover group-hover:opacity-90 transition duration-300"
        />

        <!-- Content -->
        <div class="project-content">
          <h3 class="project-card-title font-semibold text-white mb-1">{{ project.title }}</h3>
          <p class="project-card-description text-gray-400">{{ project.description }}</p>
        </div>
      </router-link>

    </div>

    <!-- View More Button -->
    <div class="projects-action flex justify-center">
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

<style scoped>
.projects-section {
  padding-top: clamp(1.25rem, 5vh, 4rem);
  padding-bottom: clamp(3.5rem, 7vh, 5rem);
}

.projects-title {
  margin-bottom: clamp(0.9rem, 3vh, 2rem);
}

.projects-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.project-card {
  min-width: 0;
}

.project-image {
  height: clamp(6rem, 19vh, 10rem);
}

.project-content {
  padding: clamp(0.7rem, 1.5vw, 1rem);
}

.project-card-title {
  font-size: clamp(0.9rem, 1.4vw, 1.1rem);
  line-height: 1.2;
}

.project-card-description {
  display: -webkit-box;
  overflow: hidden;
  font-size: clamp(0.72rem, 1.1vw, 0.88rem);
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.projects-action {
  margin-top: clamp(1rem, 3vh, 2rem);
}

@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .project-image {
    height: clamp(5rem, 15vh, 8rem);
  }
}

@media (max-width: 520px) {
  .projects-section {
    padding-top: 1rem;
    padding-bottom: 3rem;
  }

  .projects-title {
    font-size: 1.7rem;
    margin-bottom: 0.75rem;
  }

  .projects-grid {
    gap: 0.6rem;
  }

  .project-image {
    height: clamp(3.6rem, 12vh, 5.25rem);
  }

  .project-content {
    padding: 0.55rem;
  }

  .project-card-title {
    font-size: 0.82rem;
  }

  .project-card-description {
    font-size: 0.68rem;
    line-height: 1.3;
    -webkit-line-clamp: 3;
  }

  .projects-action {
    margin-top: 0.8rem;
  }
}

@media (max-height: 700px) {
  .project-card-description {
    -webkit-line-clamp: 2;
  }
}
</style>
