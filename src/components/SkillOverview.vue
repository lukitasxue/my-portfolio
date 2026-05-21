<template>
  <div class="text-base">
    <section
      id="skills"
      class="relative bg-[#1a1a1a] min-h-screen py-20 pb-32 text-center flex flex-col justify-center"
    >
      <div class="w-full px-5 sm:px-6 max-w-6xl mx-auto text-left">
        <div class="max-w-2xl mx-auto text-center mb-10">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300 mb-3">Skills and tools</p>
          <h2 class="text-3xl md:text-4xl font-semibold text-white">What I Use to Work Magic</h2>
          <p class="mt-4 text-sm md:text-base leading-7 text-gray-400">
            A practical stack shaped through data science coursework, portfolio apps, capstone work, and startup-style AI product development.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
            class="rounded-lg border border-white/10 bg-[#202020] p-5 md:p-6 shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition duration-300 hover:border-blue-400/40 hover:bg-[#232323]"
          >
            <div class="flex flex-col gap-3">
              <h3 class="text-lg md:text-xl font-semibold text-white">{{ group.title }}</h3>
              <p class="text-sm md:text-base leading-7 text-gray-300">{{ group.description }}</p>

              <div class="flex flex-wrap gap-2 pt-2">
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
