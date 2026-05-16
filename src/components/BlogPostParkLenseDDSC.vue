<template>
  <div class="ps-page max-w-3xl mx-auto px-6 py-12 text-white">

    <!-- Breadcrumb -->
    <div class="text-sm text-gray-400 mb-10">
      <router-link to="/" class="text-blue-400 hover:underline">Home</router-link>
      <span> » </span>
      <router-link to="/projects" class="text-blue-400 hover:underline">Projects</router-link>
      <span> » </span>
      <span class="text-gray-200 font-semibold">ParkSense</span>
    </div>

    <!-- ===================== HERO HEADER ===================== -->
    <header class="ps-hero mb-12">
      <div class="ps-eyebrow">
        <span class="ps-eyebrow-tick"></span>
        Field Notes · Data Science · 2024
      </div>

      <h1 class="ps-title">Building ParkSense</h1>

      <p class="ps-subtitle">
        Exploring real-time parking data, prediction limits, and smarter alternatives.
      </p>

      <!-- Premise quote -->
      <div class="ps-premise">
        <span class="ps-premise-label">Premise</span>
        <p>Can we predict whether you'll find a parking spot in the next 15–45 minutes?</p>
      </div>

      <!-- Stat-grid metadata -->
      <dl class="ps-stats">
        <div class="ps-stat">
          <dt>Role</dt>
          <dd>Team Lead · Data Science Lead</dd>
        </div>
        <div class="ps-stat">
          <dt>Team</dt>
          <dd>Deakin Data Science Club</dd>
        </div>
        <div class="ps-stat">
          <dt>Stack</dt>
          <dd>FastAPI · Supabase · Next.js · Python</dd>
        </div>
        <div class="ps-stat">
          <dt>Data source</dt>
          <dd>City of Melbourne parking sensors</dd>
        </div>
      </dl>
    </header>

    <!-- ===================== ARTICLE BODY ===================== -->
    <article class="ps-article">

      <p class="ps-lede">
        What followed was a deep dive into real-time urban sensor data, backend data pipelines, aggregation strategies, and the harsh reality of what you can and cannot predict with imperfect data. ParkSense became less about “just training a model” and more about understanding how data structure shapes what's possible.
      </p>

      <h2>Tech Stack — how the pieces fit together</h2>

      <div class="ps-stack-grid">
        <div class="ps-stack-cell">
          <h3>Backend</h3>
          <ul>
            <li><strong>FastAPI</strong> serving parking data through versioned REST endpoints</li>
            <li><strong>PostgreSQL (via Supabase)</strong> for bays, snapshots, and historical state</li>
            <li><strong>Supabase Edge Functions</strong> to continuously sync live sensor data</li>
          </ul>
        </div>

        <div class="ps-stack-cell">
          <h3>Frontend</h3>
          <ul>
            <li><strong>Next.js with MapLibre GL</strong> for interactive maps</li>
            <li>Real-time marker rendering for parking bay availability</li>
            <li>Prepared for future probability overlays (heatmaps / zones)</li>
          </ul>
        </div>

        <div class="ps-stack-cell">
          <h3>Data Source</h3>
          <ul>
            <li>City of Melbourne on-street parking bay sensors API</li>
            <li>Live status updates per bay (occupied / free)</li>
          </ul>
        </div>

        <div class="ps-stack-cell">
          <h3>ML &amp; Analysis</h3>
          <ul>
            <li>Python (pandas, NumPy, scikit-learn)</li>
            <li>Linear regression baselines</li>
            <li>Time-based feature engineering</li>
            <li>Error analysis, stability testing, and calibration checks</li>
          </ul>
        </div>
      </div>

      <h2>What is ParkSense about?</h2>
      <p>ParkSense explores how real-time parking sensor data can be used to help drivers make better parking decisions.</p>
      <p>At its core, the system:</p>
      <ul>
        <li>Continuously ingests live parking bay statuses</li>
        <li>Stores only meaningful changes (snapshots) to reduce noise</li>
        <li>Serves the latest state through an API</li>
        <li>Visualizes availability on a live map</li>
      </ul>
      <p>On top of that, I experimented with short-term prediction, trying to estimate the probability that a bay or area will be occupied in 15, 30, or 45 minutes. That's where things got interesting.</p>

      <h2>The core data problem</h2>
      <p>Each parking sensor gives us:</p>
      <ul>
        <li><code>kerbsideid</code></li>
        <li>latitude / longitude</li>
        <li>current status (occupied or free)</li>
        <li>timestamp of the last change</li>
      </ul>

      <p>What it does <strong>NOT</strong> give us:</p>
      <ul>
        <li>How long a car intends to stay</li>
        <li>Why a bay changed state</li>
        <li>Driver behavior patterns</li>
        <li>Traffic, events, weather, or pricing context</li>
      </ul>

      <p>Even though we can reconstruct when a bay changed state, the data is still <strong>sparse, binary, and highly noisy</strong> at the individual bay level. This limitation shaped everything that followed.</p>

      <h2>Model experiments &amp; results</h2>
      <p>I tested whether historical snapshots could meaningfully predict short-term future occupancy.</p>

      <h3>Baseline vs. Model</h3>
      <ul>
        <li>A simple “current state = future state” baseline already performs surprisingly well</li>
        <li>Linear regression slightly improves MAE and RMSE</li>
        <li>R² remains close to zero, meaning the model explains almost none of the variance</li>
      </ul>

      <aside class="ps-callout">
        <span class="ps-callout-label">▸ Important result</span>
        <p>The model is not “bad” — the signal is weak.</p>
      </aside>

      <h3>Feature engineering insights</h3>
      <p>I evaluated multiple feature sets: current occupancy only, time features (hour, weekday), short-term lags, and lags + trend.</p>
      <p><strong>Results:</strong></p>
      <ul>
        <li>Adding lags slightly stabilizes predictions</li>
        <li>Time features help marginally</li>
        <li>Predictions converge toward an average occupancy level</li>
      </ul>
      <p>Visually, the model tends to smooth volatility and miss sudden flips (cars leaving or arriving), acting more like a probability estimator than a classifier.</p>

      <h2>Aggregation changed everything</h2>
      <p>Predicting per bay turned out to be unreliable. When I aggregated bays by <strong>road segment</strong> or <strong>minimum number of bays per segment</strong>, the results became more stable, less noisy, and more interpretable.</p>

      <aside class="ps-callout">
        <span class="ps-callout-label">▸ Key insight</span>
        <p>Smaller groups are noisier. Larger groups are more predictable. Segments with 20–50 bays performed far better than segments with 5–9 bays.</p>
      </aside>

      <h2>Classification perspective — busy vs. not busy</h2>
      <p>Instead of predicting exact occupancy ratios, I reframed the problem: <em>“Is this area likely to be busy?”</em></p>
      <p>Using a threshold (e.g. &gt;80% occupied):</p>
      <ul>
        <li>ROC-AUC slightly above 0.5</li>
        <li>High precision but extremely low recall</li>
      </ul>

      <aside class="ps-callout">
        <span class="ps-callout-label">▸ Interpretation</span>
        <p>When the model says “busy”, it's often right. But it misses most busy cases. This makes it unsuitable for strict classification, but useful for risk estimation.</p>
      </aside>

      <h2>What the visuals revealed</h2>
      <p>Plotting predictions vs. reality per segment made one thing clear: the model predicts smooth probabilities, while reality is abrupt and binary. This isn't a failure, it's a clue. The model is better at answering <em>“How risky is it to try parking here soon?”</em> rather than <em>“Will this exact bay be free at 12:15?”</em></p>

      <h2>Final conclusions</h2>
      <ul>
        <li>Snapshot data can't reliably predict individual bay behavior</li>
        <li>Aggregation by street or zone is essential</li>
        <li>The model works best as a probability layer, not a decision oracle</li>
        <li>Real-time state is more valuable than long-term prediction</li>
        <li>Combining live data + short-term risk estimation is the right approach</li>
      </ul>

      <h2>Recommended architecture going forward</h2>
      <div class="ps-recs">
        <div class="ps-rec">
          <h3>Live Map <span class="ps-rec-tag">No ML</span></h3>
          <p>Always show the current state from the API. This is the most accurate information available.</p>
        </div>
        <div class="ps-rec">
          <h3>Predictive Overlay <span class="ps-rec-tag">ML</span></h3>
          <p>Probabilities per zone or street segment, 15–30–45 min risk estimates, and confidence indicators — not yes/no answers. This mirrors how humans actually make parking decisions.</p>
        </div>
      </div>

      <h2>What can be predicted with these data?</h2>
      <ul class="ps-verdict">
        <li class="ps-yes"><span class="ps-verdict-icon">✓</span> Area-level occupancy probability</li>
        <li class="ps-yes"><span class="ps-verdict-icon">✓</span> Relative parking risk</li>
        <li class="ps-yes"><span class="ps-verdict-icon">✓</span> Stability trends by time of day</li>
        <li class="ps-no"><span class="ps-verdict-icon">✕</span> Exact bay availability</li>
        <li class="ps-no"><span class="ps-verdict-icon">✕</span> Individual car behavior</li>
      </ul>

      <h2>Next steps</h2>
      <ul>
        <li>Define parking zones explicitly</li>
        <li>Train models per zone type (CBD vs. residential)</li>
        <li>Add external signals (time restrictions, pricing, events)</li>
        <li>Replace regression with probabilistic or survival models</li>
        <li>Visualize uncertainty directly on the map</li>
      </ul>

      <h2>Why this project matters</h2>
      <p>ParkSense isn't just about parking. It's a real example of data realism vs. ML hype, engineering pipelines that respect data limitations, and designing products that work with uncertainty, not against it. And that's exactly the kind of problem real-world data science is made of.</p>

      <div class="ps-divider">· · ·</div>

      <h2>Team context and my role</h2>
      <p>ParkSense was developed as part of the <strong>Deakin Data Science Club</strong>, as a collaborative, student-led project aimed at exploring real-world urban data and applied machine learning. The project was carried out by a small team, and I took on the role of <strong>team lead and data science lead</strong>, coordinating both the technical direction and the overall workflow.</p>

      <h3>My responsibilities included:</h3>
      <ul>
        <li>Defining the project scope and realistic goals</li>
        <li>Breaking the work into sprints and assigning tasks</li>
        <li>Organizing meetings and tracking progress</li>
        <li>Leading the data analysis and modeling decisions</li>
        <li>Designing and implementing both the backend logic and the frontend map interface</li>
      </ul>

      <p>On the technical side, I worked across the full stack:</p>
      <ul>
        <li>Designed the data pipeline and snapshot strategy</li>
        <li>Led the aggregation and modeling experiments</li>
        <li>Implemented the FastAPI backend endpoints</li>
        <li>Built the interactive map frontend using MapLibre</li>
        <li>Evaluated model performance and limitations</li>
      </ul>

      <h2>Team collaboration</h2>
      <p>Each team member contributed in different ways based on their strengths and learning goals. Van focused primarily on the backend and database side, working with Supabase, schema design, and data ingestion logic.</p>
      <p>Manit and Maheer were newer to data science, so I intentionally gave them research-oriented tasks:</p>
      <ul>
        <li>Investigating where relevant data could be sourced</li>
        <li>Assessing whether the available data was actually usable</li>
        <li>Exploring basic analysis questions and limitations</li>
        <li>Learning how to reason about data quality and signal vs. noise</li>
      </ul>
      <p>This approach allowed them to grow their data intuition, while also feeding useful insights back into the project. I treated the project not just as a build, but as a learning-oriented team environment, balancing delivery with mentorship.</p>

      <h2>Why the team aspect matters</h2>
      <p>One of the biggest takeaways from this project wasn't just technical, it was organizational: real-world data science projects fail more often due to unclear goals and unrealistic expectations than bad models.</p>
      <p>Leading this project required:</p>
      <ul>
        <li>Saying “no” to overambitious ideas</li>
        <li>Redirecting the team when the data didn't support certain predictions</li>
        <li>Helping others understand why some approaches wouldn't work</li>
        <li>Aligning technical constraints with product decisions</li>
      </ul>
      <p>This experience closely mirrored how real data teams operate in industry.</p>
    </article>

    <BackToTop />
  </div>
</template>

<script setup>
import BackToTop from './BackToTop.vue'
</script>

<style scoped>
/* ===========================================================
   ParkSense blog — "Data Field" style, scoped to this component.
   Theme: green sensor-data accent on the site's dark background,
   sharp/square shapes, sans throughout, evokes a field-notebook
   or technical report rather than Skedy's long-read essay.
   =========================================================== */

.ps-page {
  --accent: #25d366;
  --accent-deep: #16a34a;
  --accent-soft: rgba(37, 211, 102, 0.10);
  --accent-line: rgba(37, 211, 102, 0.35);
  --sans: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

/* ============== HERO HEADER ============== */
.ps-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.5rem;
}
.ps-eyebrow-tick {
  width: 10px;
  height: 10px;
  background: var(--accent);
  display: inline-block;
  transform: rotate(45deg);
}

.ps-title {
  font-family: var(--sans);
  font-size: clamp(2.2rem, 4vw + 1rem, 3.5rem);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #fff;
  margin-bottom: 0.75rem;
}

.ps-subtitle {
  font-size: 1.15rem;
  color: #d1d5db;
  line-height: 1.55;
  margin-bottom: 2rem;
  max-width: 60ch;
}

/* Premise quote — distinctive callout right under the title */
.ps-premise {
  position: relative;
  padding: 1.25rem 1.5rem;
  margin-bottom: 2rem;
  background: var(--accent-soft);
  border: 1px solid var(--accent-line);
  border-radius: 2px;
}
.ps-premise::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--accent);
}
.ps-premise-label {
  display: inline-block;
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.5rem;
}
.ps-premise p {
  font-size: 1.15rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
  line-height: 1.45;
}

/* Stat grid — 4-cell metadata grid replacing Skedy's pill chips */
.ps-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  overflow: hidden;
  margin: 0;
}
.ps-stat {
  background: #0a0a0a;
  padding: 0.85rem 1rem;
}
.ps-stat dt {
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.25rem;
}
.ps-stat dd {
  font-size: 0.85rem;
  color: #e5e7eb;
  margin: 0;
  line-height: 1.4;
}
@media (min-width: 640px) {
  .ps-stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

/* ============== ARTICLE BODY ============== */
.ps-article {
  font-family: var(--sans);
  font-size: 1.025rem;
  line-height: 1.7;
  color: #d1d5db;
}
.ps-article p { margin: 0 0 1.1rem; }
.ps-article strong { color: #fff; font-weight: 600; }
.ps-article em { color: #e5e7eb; }
.ps-article a {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px dotted var(--accent-line);
}
.ps-article a:hover { border-bottom-color: var(--accent); }

/* Lede — square green drop cap, contrast with Skedy's gradient text drop cap */
.ps-lede {
  font-size: 1.15rem;
  line-height: 1.6;
  color: #e5e7eb;
  margin-bottom: 2rem;
}
.ps-lede::first-letter {
  float: left;
  width: 3rem;
  height: 3rem;
  margin: 0.25rem 0.85rem 0 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--sans);
  font-size: 2rem;
  font-weight: 800;
  color: #062e0f;
  background: var(--accent);
  line-height: 1;
}

/* Headings — bracket prefix, dotted underline, sans heavy.
   Distinct from Skedy's auto-numbered vertical-bar h2. */
.ps-article h2 {
  font-family: var(--sans);
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: #fff;
  letter-spacing: -0.01em;
  margin: 3rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed rgba(37, 211, 102, 0.25);
  position: relative;
}
.ps-article h2::before {
  content: '›';
  color: var(--accent);
  font-weight: 800;
  margin-right: 0.5rem;
  font-size: 1.4em;
  line-height: 0.9;
  vertical-align: middle;
}

.ps-article h3 {
  font-family: var(--sans);
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin: 1.75rem 0 0.75rem;
  letter-spacing: 0;
}

/* Lists — green › markers (different from Skedy's solid bullets) */
.ps-article ul,
.ps-article ol {
  list-style: none;
  padding-left: 0;
  margin: 0 0 1.5rem;
}
.ps-article ul li,
.ps-article ol li {
  position: relative;
  padding-left: 1.4rem;
  margin-bottom: 0.5rem;
}
.ps-article ul li::before {
  content: '›';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--accent);
  font-weight: 700;
}
.ps-article ol {
  counter-reset: ps-ol;
}
.ps-article ol li {
  counter-increment: ps-ol;
}
.ps-article ol li::before {
  content: counter(ps-ol) '.';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--accent);
  font-family: var(--mono);
  font-weight: 600;
  font-size: 0.9em;
}

/* Inline code — squared corners, green-tinted */
.ps-article code,
.ps-page code {
  font-family: var(--mono);
  font-size: 0.85em;
  color: #bbf7d0;
  background: var(--accent-soft);
  padding: 0.05rem 0.4rem;
  border-left: 2px solid var(--accent);
  border-radius: 0;
}

/* Callouts — bracket label + right-side accent.
   Distinct from Skedy's left-bar blockquotes. */
.ps-callout {
  position: relative;
  margin: 1.75rem 0;
  padding: 1rem 1.25rem;
  background: rgba(37, 211, 102, 0.05);
  border: 1px solid var(--accent-line);
  border-left: none;
  border-right: 3px solid var(--accent);
  border-radius: 0 2px 2px 0;
}
.ps-callout-label {
  display: block;
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.4rem;
}
.ps-callout p {
  margin: 0;
  color: #f3f4f6;
  font-size: 1rem;
  line-height: 1.55;
}

/* Tech-stack 4-cell grid */
.ps-stack-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin: 1rem 0 2rem;
}
@media (min-width: 640px) {
  .ps-stack-grid { grid-template-columns: 1fr 1fr; }
}
.ps-stack-cell {
  background: #0a0a0a;
  padding: 1.1rem 1.25rem;
}
.ps-stack-cell h3 {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 0.6rem;
}
.ps-stack-cell ul { margin-bottom: 0; }
.ps-stack-cell li {
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

/* Recommended architecture — 2-card row */
.ps-recs {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin: 1rem 0 2rem;
}
@media (min-width: 640px) {
  .ps-recs { grid-template-columns: 1fr 1fr; }
}
.ps-rec {
  padding: 1.1rem 1.25rem;
  border: 1px solid var(--accent-line);
  background: rgba(37, 211, 102, 0.03);
  border-radius: 2px;
}
.ps-rec h3 {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 0.5rem;
  font-size: 1rem;
}
.ps-rec p { margin: 0; font-size: 0.95rem; }
.ps-rec-tag {
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.15rem 0.4rem;
  background: var(--accent);
  color: #062e0f;
  border-radius: 2px;
}

/* Verdict list — keep the ✓/✗ but restyle */
.ps-verdict {
  list-style: none;
  padding: 0;
  margin: 1rem 0 2rem;
  display: grid;
  gap: 0.4rem;
}
.ps-verdict li {
  position: static;
  padding-left: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 0.75rem;
  font-size: 0.95rem;
}
.ps-verdict li::before { content: none; }
.ps-verdict .ps-yes {
  background: rgba(37, 211, 102, 0.06);
  border-left: 2px solid var(--accent);
}
.ps-verdict .ps-no {
  background: rgba(239, 68, 68, 0.05);
  border-left: 2px solid #ef4444;
  color: #9ca3af;
}
.ps-verdict-icon {
  font-family: var(--mono);
  font-weight: 700;
  width: 1rem;
  text-align: center;
}
.ps-verdict .ps-yes .ps-verdict-icon { color: var(--accent); }
.ps-verdict .ps-no .ps-verdict-icon { color: #ef4444; }

/* Divider — three dots, centered (Skedy uses a hairline with bullets) */
.ps-divider {
  text-align: center;
  letter-spacing: 0.8rem;
  font-size: 1.5rem;
  color: var(--accent);
  margin: 3rem 0;
  user-select: none;
}

/* Responsive tweaks */
@media (max-width: 640px) {
  .ps-article h2 { font-size: 1.3rem; }
  .ps-lede::first-letter {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.6rem;
    margin-right: 0.65rem;
  }
}
</style>
