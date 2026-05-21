<template>
  <div class="h-full text-base">
    <section
      id="skills"
      class="skill-section relative bg-[#1a1a1a] h-full overflow-hidden text-center flex flex-col justify-center"
    >
      <div class="skill-content w-full px-4 sm:px-6 max-w-6xl mx-auto text-left">
        <div class="skill-header max-w-2xl mx-auto text-center">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300 mb-3">Skills and tools</p>
          <h2 class="text-3xl md:text-4xl font-semibold text-white">What I Use to Work Magic</h2>
          <p class="skill-intro mt-3 text-sm md:text-base leading-7 text-gray-400">
            A practical stack shaped through data science coursework, portfolio apps, capstone work, and startup-style AI product development.
          </p>
        </div>

        <div class="skill-grid grid gap-3">
          <article
            v-for="(group, index) in skillGroups"
            :key="group.title"
            v-motion="{
              visibleOnce: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: 'easeOut'
                }
              },
              initial: {
                opacity: 0,
                y: 24
              }
            }"
            class="skill-card rounded-lg border border-white/10 bg-[#202020] shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition duration-300 hover:border-blue-400/40 hover:bg-[#232323]"
          >
            <div class="flex flex-col gap-2">
              <h3 class="skill-card-title text-base md:text-lg font-semibold text-white">{{ group.title }}</h3>
              <p class="skill-card-description text-sm leading-6 text-gray-300">{{ group.description }}</p>

              <div class="skill-tools flex flex-wrap gap-2 pt-1">
                <span
                  v-for="tool in group.tools"
                  :key="tool"
                  class="rounded-md border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-medium text-gray-200"
                >
                  {{ tool }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div class="absolute inset-x-0 bottom-4 sm:bottom-6 flex justify-center">
        <button
          @click="scrollToProjects"
          aria-label="Scroll to projects"
          class="text-3xl sm:text-4xl animate-bounce text-white hover:text-blue-400 transition"
        >
          ▼
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
const skillGroups = [
  {
    title: 'Data Science and Machine Learning',
    tools: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Matplotlib', 'Seaborn'],
    description: 'Used for data cleaning, exploratory analysis, feature engineering, regression models, anomaly detection, model evaluation, and visual storytelling.'
  },
  {
    title: 'AI and LLM Systems',
    tools: ['OpenAI API', 'Embeddings', 'RAG', 'Vector search', 'Supabase pgvector', 'Prompt engineering'],
    description: 'Built retrieval-based chatbot systems, semantic search flows, intent-aware responses, and business-specific AI assistants.'
  },
  {
    title: 'Backend and Data Systems',
    tools: ['FastAPI', 'Node.js', 'PostgreSQL', 'Supabase', 'SQL', 'REST APIs'],
    description: 'Built API endpoints, connected models to web apps, handled structured data, and integrated backend services with frontend interfaces.'
  },
  {
    title: 'Frontend and Product Development',
    tools: ['Vue.js', 'React', 'Next.js', 'Tailwind CSS', 'Chart.js', 'MapLibre'],
    description: 'Built responsive interfaces, dashboards, project pages, visualisations, and user-facing tools for data-driven applications.'
  },
  {
    title: 'Developer Workflow and Collaboration',
    tools: ['Git', 'GitHub', 'Pull requests', 'Documentation', 'Agile planning', 'MS Planner', 'Trello'],
    description: 'Used branches, PRs, code reviews, team planning, documentation, and structured collaboration in university, capstone, and startup-style projects.'
  }
]

function scrollToProjects() {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
}
</script>

<style scoped>
.skill-section {
  padding: clamp(1rem, 4vh, 3rem) 0 clamp(3.25rem, 7vh, 5rem);
}

.skill-header {
  margin-bottom: clamp(0.8rem, 2.5vh, 2rem);
}

.skill-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.skill-card {
  padding: clamp(0.85rem, 1.6vw, 1.25rem);
}

@media (min-width: 1180px) {
  .skill-card:nth-child(5) {
    grid-column: span 2;
  }
}

@media (max-width: 1024px) {
  .skill-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .skill-section {
    padding-top: 0.75rem;
    padding-bottom: 3rem;
  }

  .skill-header {
    margin-bottom: 0.65rem;
  }

  .skill-header h2 {
    font-size: 1.55rem;
    line-height: 1.15;
  }

  .skill-intro {
    display: none;
  }

  .skill-grid {
    grid-template-columns: 1fr;
    gap: 0.45rem;
  }

  .skill-card {
    padding: 0.65rem 0.75rem;
  }

  .skill-card-title {
    font-size: 0.92rem;
  }

  .skill-card-description {
    font-size: 0.76rem;
    line-height: 1.35;
  }

  .skill-tools {
    gap: 0.35rem;
  }

  .skill-tools span {
    padding: 0.2rem 0.42rem;
    font-size: 0.66rem;
  }
}

@media (max-height: 720px) and (min-width: 641px) {
  .skill-section {
    padding-top: 1rem;
    padding-bottom: 3.25rem;
  }

  .skill-header h2 {
    font-size: 1.9rem;
  }

  .skill-intro {
    font-size: 0.82rem;
    line-height: 1.45;
  }

  .skill-card-description {
    font-size: 0.78rem;
    line-height: 1.45;
  }

  .skill-tools span {
    padding: 0.28rem 0.5rem;
    font-size: 0.68rem;
  }
}
</style>
