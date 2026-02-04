<template>
  <div class="max-w-3xl mx-auto px-6 py-12 text-white">
    <div class="text-sm text-gray-400 mb-4">
      <router-link to="/" class="text-blue-400 hover:underline">Home</router-link>
      <span> » </span>
      <router-link to="/projects" class="text-blue-400 hover:underline">Projects</router-link>
      <span> » </span>
      <span class="text-gray-200 font-semibold">ParkSense</span>
    </div>

    <h1 class="text-3xl font-bold mb-6">Building ParkSense</h1>
    <h2 class="text-xl text-gray-400 mb-8">Exploring Real-Time Parking Data, Prediction Limits, and Smarter Alternatives</h2>

    <p class="mb-6 text-gray-300">
      This project started with a deceptively simple question:
      <span class="font-semibold text-white">Can we predict whether you’ll find a parking spot in the next 15–45 minutes?</span>
    </p>

    <p class="mb-6 text-gray-300">
      What followed was a deep dive into real-time urban sensor data, backend data pipelines, aggregation strategies, and the harsh reality of what you can and cannot predict with imperfect data. ParkSense became less about “just training a model” and more about understanding how data structure shapes what’s possible.
    </p>

    <h2 class="text-2xl font-bold mt-12 mb-4">Tech Stack (How the Pieces Fit Together)</h2>
    
    <div class="space-y-6 text-gray-300">
      <div>
        <h3 class="text-lg font-semibold text-white mb-2">Backend</h3>
        <ul class="list-disc ml-6">
          <li><strong>FastAPI</strong> serving parking data through versioned REST endpoints</li>
          <li><strong>PostgreSQL (via Supabase)</strong> for bays, snapshots, and historical state</li>
          <li><strong>Supabase Edge Functions</strong> to continuously sync live sensor data</li>
        </ul>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-white mb-2">Frontend</h3>
        <ul class="list-disc ml-6">
          <li><strong>Next.js with MapLibre GL</strong> for interactive maps</li>
          <li>Real-time marker rendering for parking bay availability</li>
          <li>Prepared for future probability overlays (heatmaps / zones)</li>
        </ul>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-white mb-2">Data Source</h3>
        <ul class="list-disc ml-6">
          <li>City of Melbourne on-street parking bay sensors API</li>
          <li>Live status updates per bay (occupied / free)</li>
        </ul>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-white mb-2">ML & Analysis</h3>
        <ul class="list-disc ml-6">
          <li>Python (pandas, NumPy, scikit-learn)</li>
          <li>Linear regression baselines</li>
          <li>Time-based feature engineering</li>
          <li>Error analysis, stability testing, and calibration checks</li>
        </ul>
      </div>
    </div>

    <h2 class="text-2xl font-bold mt-12 mb-4">What Is ParkSense About?</h2>
    <p class="mb-6 text-gray-300">
      ParkSense explores how real-time parking sensor data can be used to help drivers make better parking decisions.
    </p>
    <p class="mb-4 text-gray-300">At its core, the system:</p>
    <ul class="list-disc ml-6 mb-6 text-gray-300">
      <li>Continuously ingests live parking bay statuses</li>
      <li>Stores only meaningful changes (snapshots) to reduce noise</li>
      <li>Serves the latest state through an API</li>
      <li>Visualizes availability on a live map</li>
    </ul>
    <p class="mb-6 text-gray-300">
      On top of that, I experimented with short-term prediction, trying to estimate the probability that a bay or area will be occupied in 15, 30, or 45 minutes. That’s where things got interesting.
    </p>

    <h2 class="text-2xl font-bold mt-12 mb-4">The Core Data Problem</h2>
    <p class="mb-4 text-gray-300">Each parking sensor gives us:</p>
    <ul class="list-disc ml-6 mb-4 text-gray-300">
      <li>kerbsideid</li>
      <li>latitude / longitude</li>
      <li>current status (occupied or free)</li>
      <li>timestamp of the last change</li>
    </ul>
    
    <p class="mb-4 text-gray-300">What it does <strong>NOT</strong> give us:</p>
    <ul class="list-disc ml-6 mb-6 text-gray-300">
      <li>How long a car intends to stay</li>
      <li>Why a bay changed state</li>
      <li>Driver behavior patterns</li>
      <li>Traffic, events, weather, or pricing context</li>
    </ul>

    <p class="mb-6 text-gray-300">
      Even though we can reconstruct when a bay changed state, the data is still <strong>sparse, binary, and highly noisy</strong> at the individual bay level. This limitation shaped everything that followed.
    </p>

    <h2 class="text-2xl font-bold mt-12 mb-4">Model Experiments & Results</h2>
    <p class="mb-6 text-gray-300">
      I tested whether historical snapshots could meaningfully predict short-term future occupancy.
    </p>

    <h3 class="text-xl font-semibold text-white mb-2">Baseline vs Model</h3>
    <ul class="list-disc ml-6 mb-6 text-gray-300">
      <li>A simple “current state = future state” baseline already performs surprisingly well</li>
      <li>Linear regression slightly improves MAE and RMSE</li>
      <li>R² remains close to zero, meaning the model explains almost none of the variance</li>
    </ul>
    <p class="mb-6 text-gray-300 italic">
      This is an important result: The model is not “bad” — the signal is weak.
    </p>

    <h3 class="text-xl font-semibold text-white mb-2">Feature Engineering Insights</h3>
    <p class="mb-4 text-gray-300">I evaluated multiple feature sets: current occupancy only, time features (hour, weekday), short-term lags, and lags + trend.</p>
    <p class="mb-4 text-gray-300"><strong>Results:</strong></p>
    <ul class="list-disc ml-6 mb-6 text-gray-300">
      <li>Adding lags slightly stabilizes predictions</li>
      <li>Time features help marginally</li>
      <li>Predictions converge toward an average occupancy level</li>
    </ul>
    <p class="mb-6 text-gray-300">
      Visually, the model tends to smooth volatility and miss sudden flips (cars leaving or arriving), acting more like a probability estimator than a classifier.
    </p>

    <h2 class="text-2xl font-bold mt-12 mb-4">Aggregation Changed Everything</h2>
    <p class="mb-4 text-gray-300">
      Predicting per bay turned out to be unreliable. When I aggregated bays by <strong>road segment</strong> or <strong>minimum number of bays per segment</strong>, the results became more stable, less noisy, and more interpretable.
    </p>
    <p class="mb-6 text-gray-300">
      <strong>Key insight:</strong> Smaller groups are noisier. Larger groups are more predictable. Segments with 20–50 bays performed far better than segments with 5–9 bays.
    </p>

    <h2 class="text-2xl font-bold mt-12 mb-4">Classification Perspective (Busy vs Not Busy)</h2>
    <p class="mb-4 text-gray-300">Instead of predicting exact occupancy ratios, I reframed the problem: <em>“Is this area likely to be busy?”</em></p>
    <p class="mb-4 text-gray-300">Using a threshold (e.g. >80% occupied):</p>
    <ul class="list-disc ml-6 mb-6 text-gray-300">
      <li>ROC-AUC slightly above 0.5</li>
      <li>High precision but extremely low recall</li>
    </ul>
    <p class="mb-6 text-gray-300">
      <strong>Interpretation:</strong> When the model says “busy”, it’s often right. But it misses most busy cases. This makes it unsuitable for strict classification, but useful for risk estimation.
    </p>

    <h2 class="text-2xl font-bold mt-12 mb-4">What the Visuals Revealed</h2>
    <p class="mb-6 text-gray-300">
      Plotting predictions vs reality per segment made one thing clear: The model predicts smooth probabilities, while reality is abrupt and binary. This isn’t a failure, it’s a clue. The model is better at answering <em>“How risky is it to try parking here soon?”</em> rather than <em>“Will this exact bay be free at 12:15?”</em>
    </p>

    
    <h2 class="text-2xl font-bold mt-12 mb-4">Final Conclusions</h2>
    <ul class="list-disc ml-6 mb-6 text-gray-300">
      <li>Snapshot data can’t reliably predict individual bay behavior</li>
      <li>Aggregation by street or zone is essential</li>
      <li>The model works best as a probability layer, not a decision oracle</li>
      <li>Real-time state is more valuable than long-term prediction</li>
      <li>Combining live data + short-term risk estimation is the right approach</li>
    </ul>

    <h2 class="text-2xl font-bold mt-12 mb-4">Recommended Architecture Going Forward</h2>
    <div class="space-y-4 text-gray-300">
      <div>
        <h3 class="text-lg font-semibold text-white">Live Map (No ML)</h3>
        <p>Always show the current state from the API. This is the most accurate information available.</p>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-white">Predictive Overlay (ML)</h3>
        <p>Probabilities per zone or street segment, 15–30–45 min risk estimates, and confidence indicators, not yes/no answers. This mirrors how humans actually make parking decisions.</p>
      </div>
    </div>

    <h2 class="text-2xl font-bold mt-12 mb-4">What Can Be Predicted With These Data?</h2>
    <ul class="space-y-2 mb-6 text-gray-300">
      <li class="flex items-center"><span class="text-green-400 mr-2">✔</span> Area-level occupancy probability</li>
      <li class="flex items-center"><span class="text-green-400 mr-2">✔</span> Relative parking risk</li>
      <li class="flex items-center"><span class="text-green-400 mr-2">✔</span> Stability trends by time of day</li>
      <li class="flex items-center"><span class="text-red-400 mr-2">✘</span> Exact bay availability</li>
      <li class="flex items-center"><span class="text-red-400 mr-2">✘</span> Individual car behavior</li>
    </ul>

    <h2 class="text-2xl font-bold mt-12 mb-4">Next Steps</h2>
    <ul class="list-disc ml-6 mb-6 text-gray-300">
      <li>Define parking zones explicitly</li>
      <li>Train models per zone type (CBD vs residential)</li>
      <li>Add external signals (time restrictions, pricing, events)</li>
      <li>Replace regression with probabilistic or survival models</li>
      <li>Visualize uncertainty directly on the map</li>
    </ul>

    <h2 class="text-2xl font-bold mt-12 mb-4">Why This Project Matters</h2>
    <p class="mb-6 text-gray-300">
      ParkSense isn’t just about parking. It’s a real example of data realism vs ML hype, engineering pipelines that respect data limitations, and designing products that work with uncertainty, not against it. And that’s exactly the kind of problem real-world data science is made of.
    </p>

    <h2 class="text-2xl font-bold mt-12 mb-4">Team Context and My Role</h2>
    <p class="mb-6 text-gray-300">
      ParkSense was developed as part of the <strong>Deakin Data Science Club</strong>, as a collaborative, student-led project aimed at exploring real-world urban data and applied machine learning. The project was carried out by a small team, and I took on the role of <strong>team lead and data science lead</strong>, coordinating both the technical direction and the overall workflow.
    </p>

    <h3 class="text-xl font-semibold text-white mb-2">My responsibilities included:</h3>
    <ul class="list-disc ml-6 mb-6 text-gray-300">
      <li>Defining the project scope and realistic goals</li>
      <li>Breaking the work into sprints and assigning tasks</li>
      <li>Organizing meetings and tracking progress</li>
      <li>Leading the data analysis and modeling decisions</li>
      <li>Designing and implementing both the backend logic and the frontend map interface</li>
    </ul>

    <p class="mb-6 text-gray-300">
      On the technical side, I worked across the full stack:
    </p>
    <ul class="list-disc ml-6 mb-6 text-gray-300">
      <li>Designed the data pipeline and snapshot strategy</li>
      <li>Led the aggregation and modeling experiments</li>
      <li>Implemented the FastAPI backend endpoints</li>
      <li>Built the interactive map frontend using MapLibre</li>
      <li>Evaluated model performance and limitations</li>
    </ul>

    <h2 class="text-2xl font-bold mt-12 mb-4">Team Collaboration</h2>
    <p class="mb-6 text-gray-300">
      Each team member contributed in different ways based on their strengths and learning goals. Van focused primarily on the backend and database side, working with Supabase, schema design, and data ingestion logic.
    </p>
    <p class="mb-6 text-gray-300">
      Manit and Maheer were newer to data science, so I intentionally gave them research-oriented tasks:
    </p>
    <ul class="list-disc ml-6 mb-6 text-gray-300">
      <li>Investigating where relevant data could be sourced</li>
      <li>Assessing whether the available data was actually usable</li>
      <li>Exploring basic analysis questions and limitations</li>
      <li>Learning how to reason about data quality and signal vs noise</li>
    </ul>
    <p class="mb-6 text-gray-300">
      This approach allowed them to grow their data intuition, while also feeding useful insights back into the project. I treated the project not just as a build, but as a learning-oriented team environment, balancing delivery with mentorship.
    </p>
    
    <h2 class="text-2xl font-bold mt-12 mb-4">Why the Team Aspect Matters</h2>
    <p class="mb-6 text-gray-300">
      One of the biggest takeaways from this project wasn’t just technical, it was organizational: Real-world data science projects fail more often due to unclear goals and unrealistic expectations than bad models.
    </p>
    <p class="mb-4 text-gray-300">Leading this project required:</p>
    <ul class="list-disc ml-6 mb-6 text-gray-300">
      <li>Saying “no” to overambitious ideas</li>
      <li>Redirecting the team when the data didn’t support certain predictions</li>
      <li>Helping others understand why some approaches wouldn’t work</li>
      <li>Aligning technical constraints with product decisions</li>
    </ul>
    <p class="mb-6 text-gray-300">
      This experience closely mirrored how real data teams operate in industry.
    </p>

    <BackToTop />
  </div>
</template>

<script setup>
import BackToTop from './BackToTop.vue'
</script>
