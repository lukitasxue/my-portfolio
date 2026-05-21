<template>
  <div class="mp-page max-w-3xl mx-auto px-6 py-12">
    <div class="mp-breadcrumb">
      <router-link to="/">Home</router-link>
      <span>/</span>
      <router-link to="/projects">Projects</router-link>
      <span>/</span>
      <span>Mood Predictor App</span>
    </div>

    <header class="mp-hero">
      <p class="mp-eyebrow">Lifestyle ML / Vue / FastAPI</p>
      <h1>Building My Mood Predictor App</h1>
      <p class="mp-subtitle">
        A small dark-mode dashboard that turns sleep, stress, nutrition, social time, and hydration into a predicted mood score.
      </p>

      <div class="mp-actions">
        <a :href="liveAppUrl" target="_blank" rel="noopener" class="mp-primary-link">
          View the live page
        </a>
      </div>
    </header>

    <section class="mp-panel mp-screenshot-plan" aria-label="Mood Predictor image placeholders">
      <div class="mp-placeholder mp-placeholder-large">
        <span class="mp-placeholder-label">Screenshot placeholder</span>
        <strong>App dashboard / hero view</strong>
        <p>Put the replacement image at <code>public/blog/mood-predictor/cover.png</code>.</p>
      </div>

      <div class="mp-placeholder-grid">
        <div class="mp-placeholder">
          <span class="mp-placeholder-label">Screenshot placeholder</span>
          <strong>Input sliders</strong>
          <p>Use <code>public/blog/mood-predictor/input-flow.png</code>.</p>
        </div>
        <div class="mp-placeholder">
          <span class="mp-placeholder-label">Screenshot placeholder</span>
          <strong>Charts + history</strong>
          <p>Use <code>public/blog/mood-predictor/charts-overview.png</code>.</p>
        </div>
      </div>
    </section>

    <article class="mp-article">
      <section>
        <h2>What This App Does</h2>
        <p>
          The Mood Predictor App is a personal lifestyle companion that estimates a daily mood score from five habits:
          sleep, stress, nutrition, social time, and water intake. The front end keeps the interaction simple with sliders,
          local mood history, and charts that make the trend visible over time.
        </p>
        <p>
          The prediction comes from a custom multivariable linear regression model written with NumPy and served through a
          FastAPI endpoint. I built the model logic myself because I wanted to understand the full pipeline instead of hiding
          everything behind a library call.
        </p>
      </section>

      <section class="mp-stack">
        <h2>Stack</h2>
        <div class="mp-stack-grid">
          <div>
            <span>Frontend</span>
            Vue 3, manual CSS, Netlify
          </div>
          <div>
            <span>Backend</span>
            FastAPI prediction endpoint
          </div>
          <div>
            <span>Model</span>
            NumPy linear regression
          </div>
          <div>
            <span>Data</span>
            Lifestyle inputs + generated logs
          </div>
        </div>
      </section>

      <section>
        <h2>What the User Sees</h2>
        <p>
          Users log their day through sliders, submit the values, and immediately get a predicted score from 1 to 10.
          The app stores one log per day locally, so the dashboard can show mood history without needing accounts or a
          database for the first version.
        </p>

        <aside class="mp-callout">
          <span>Design note</span>
          The blog now follows the app's own color system: near-black panels, lavender actions, warm slider gradients,
          and teal chart accents. The screenshots are intentionally placeholders until fresh captures are ready.
        </aside>
      </section>

      <section>
        <h2>Graph Features</h2>
        <ul>
          <li><strong>Mood line chart:</strong> tracks the predicted score over time.</li>
          <li><strong>Radar chart:</strong> compares lifestyle averages against recommended values.</li>
          <li><strong>Impact bars:</strong> shows which lifestyle factors are moving the score most.</li>
        </ul>
      </section>

      <section>
        <h2>Performance Notes</h2>
        <p>
          The model returned an MSE of <code>0.612</code> and an RMSE of <code>0.783</code> on test data. That result was
          strong enough for a first pass, but the project also exposed the limits of simple linear assumptions. Hydration,
          for example, needed more nuanced logic because "more water always means better mood" gets unrealistic fast.
        </p>
      </section>

      <section>
        <h2>Project Link</h2>
        <ul class="mp-links-list">
          <li>
            <a :href="liveAppUrl" target="_blank" rel="noopener">Mood Predictor project page</a>
          </li>
        </ul>
      </section>
    </article>

    <BackToTop />
  </div>
</template>

<script setup>
import BackToTop from './BackToTop.vue'

const liveAppUrl = 'https://lucasxueportfolio.netlify.app/projects/mood-predictor'
</script>

<style scoped>
.mp-page {
  --mp-bg: #1b1b1d;
  --mp-panel: #202023;
  --mp-panel-soft: #25252a;
  --mp-text: #f8fafc;
  --mp-muted: #b8bcc8;
  --mp-soft: #8580ed;
  --mp-soft-bright: #9b92ff;
  --mp-teal: #6fcad0;
  --mp-warm: #f0c574;
  --mp-line: rgba(133, 128, 237, 0.34);
  --mp-gradient: linear-gradient(90deg, #6658c8 0%, #b452ad 50%, #f0c574 100%);
  color: var(--mp-text);
}

.mp-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 2rem;
  color: #8f94a3;
  font-size: 0.86rem;
}

.mp-breadcrumb a {
  color: var(--mp-soft-bright);
  text-decoration: none;
}

.mp-breadcrumb a:hover,
.mp-links-list a:hover {
  color: var(--mp-teal);
}

.mp-hero {
  margin-bottom: 2rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background:
    radial-gradient(circle at 20% 0%, rgba(133, 128, 237, 0.16), transparent 32%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.015)),
    var(--mp-panel);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
}

.mp-eyebrow {
  margin: 0 0 0.9rem;
  color: var(--mp-teal);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.mp-hero h1 {
  margin: 0;
  max-width: 12ch;
  font-size: clamp(2.35rem, 5vw, 4rem);
  line-height: 0.98;
  font-weight: 850;
  letter-spacing: 0;
}

.mp-subtitle {
  max-width: 58ch;
  margin: 1.15rem 0 0;
  color: var(--mp-muted);
  font-size: 1.06rem;
  line-height: 1.75;
}

.mp-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.6rem;
}

.mp-primary-link,
.mp-secondary-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 1rem;
  border-radius: 8px;
  font-weight: 800;
  text-decoration: none;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.mp-primary-link {
  background: var(--mp-soft);
  color: #ffffff;
  box-shadow: 0 10px 28px rgba(133, 128, 237, 0.28);
}

.mp-secondary-link {
  border: 1px solid var(--mp-line);
  color: var(--mp-text);
  background: rgba(133, 128, 237, 0.08);
}

.mp-primary-link:hover,
.mp-secondary-link:hover {
  transform: translateY(-2px);
}

.mp-panel {
  margin-bottom: 2.4rem;
  padding: 1rem;
  border-radius: 8px;
  background: var(--mp-panel);
}

.mp-placeholder-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.mp-placeholder {
  min-height: 210px;
  padding: 1.25rem;
  border: 1px dashed var(--mp-line);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(111, 202, 208, 0.08), transparent 34%),
    var(--mp-panel-soft);
  position: relative;
  overflow: hidden;
}

.mp-placeholder::after {
  content: "";
  position: absolute;
  left: 1.25rem;
  right: 1.25rem;
  bottom: 1.25rem;
  height: 8px;
  border-radius: 999px;
  background: var(--mp-gradient);
}

.mp-placeholder-large {
  min-height: 300px;
}

.mp-placeholder-label {
  display: inline-flex;
  margin-bottom: 1rem;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  background: rgba(133, 128, 237, 0.14);
  color: var(--mp-soft-bright);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
}

.mp-placeholder strong {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.35rem;
}

.mp-placeholder p {
  max-width: 32ch;
  color: var(--mp-muted);
  line-height: 1.65;
}

.mp-article {
  counter-reset: mp-section;
}

.mp-article section {
  margin-bottom: 2.5rem;
}

.mp-article h2 {
  counter-increment: mp-section;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 1rem;
  font-size: 1.45rem;
  font-weight: 850;
}

.mp-article h2::before {
  content: counter(mp-section, decimal-leading-zero);
  color: var(--mp-teal);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.82rem;
}

.mp-article p,
.mp-article li {
  color: var(--mp-muted);
  line-height: 1.78;
}

.mp-article strong {
  color: var(--mp-text);
}

.mp-article ul {
  display: grid;
  gap: 0.65rem;
  margin: 0;
  padding-left: 1.15rem;
}

.mp-article li::marker {
  color: var(--mp-soft-bright);
}

.mp-article code {
  padding: 0.13rem 0.32rem;
  border-radius: 4px;
  background: rgba(111, 202, 208, 0.1);
  color: #95edf1;
  font-size: 0.88em;
}

.mp-stack-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
  background: var(--mp-panel);
}

.mp-stack-grid div {
  padding: 1rem;
  color: var(--mp-muted);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.mp-stack-grid span,
.mp-callout span {
  display: block;
  margin-bottom: 0.35rem;
  color: var(--mp-teal);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
}

.mp-callout {
  margin-top: 1.4rem;
  padding: 1rem 1rem 1rem 1.2rem;
  border-left: 4px solid var(--mp-soft);
  border-radius: 8px;
  background: rgba(133, 128, 237, 0.11);
  color: var(--mp-muted);
  line-height: 1.72;
}

.mp-links-list a {
  color: var(--mp-soft-bright);
}

@media (max-width: 640px) {
  .mp-page {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .mp-hero {
    padding: 1.25rem;
  }

  .mp-hero h1 {
    max-width: none;
  }

  .mp-placeholder-grid,
  .mp-stack-grid {
    grid-template-columns: 1fr;
  }

  .mp-actions {
    flex-direction: column;
  }

  .mp-primary-link,
  .mp-secondary-link {
    justify-content: center;
  }
}
</style>
