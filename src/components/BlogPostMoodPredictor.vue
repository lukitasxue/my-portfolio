
<template>
	<div class="max-w-3xl mx-auto px-6 py-12 text-white">
    <div class="text-sm text-gray-400 mb-4">
      <router-link to="/" class="text-blue-400 hover:underline">Home</router-link>
      <span> » </span>
      <router-link to="/projects" class="text-blue-400 hover:underline">Projects</router-link>
      <span> » </span>
      <span class="text-gray-200 font-semibold">Mood Predictor App</span>
    </div>

    <h1 class="text-3xl font-bold mb-4">Building My Mood Predictor App - From Scratch (Literally)</h1>

    <p class="mb-6 text-gray-300">
      This project started with a simple idea: what if I could log my daily habits and predict how they affect my mood? What began as a curious experiment became one of my most complete personal builds. It combines machine learning, backend + frontend integration, and user-centered design (with a sprinkle of chaotic debugging, of course).
    </p>

	<p class="mb-6 text-gray-300">
	Curious to see how it works?  
	<a 
		href="https://moodpredictorapp.netlify.app" 
		target="_blank"
		class="text-purple-400 underline hover:text-purple-300 transition">
		→ Test the App Live
	</a>
	</p>


    <img :src="moodShowcase" alt="Mood Over Time Chart" class="rounded-lg mb-6 shadow" />
		<section class="mb-12">
			<h2 class="text-2xl font-semibold mb-2">Tech Stack (a.k.a. How I Pieced It All Together)</h2>
			<ul class="list-disc ml-6 mb-6 text-gray-300">
				<li><strong>Backend:</strong> FastAPI serving a custom mood prediction model through a simple POST endpoint.</li>
				<li><strong>Frontend:</strong> Built with Vue 3 and manual CSS (no Tailwind here!). Hosted via Netlify.</li>
				<li><strong>ML Model:</strong> A multivariable linear regression model trained using NumPy. It was handcrafted instead of using a library like Scikit-learn because... well, why not suffer a bit more to learn?</li>
			</ul>
		</section>
    

		<!-- Description Section -->
		<section class="mb-12">
			<h2 class="text-2xl font-bold mb-4">What's This App About?</h2>
			<p class="mb-4 text-gray-300">
				The <strong>Mood Predictor App</strong> is a personal lifestyle companion that predicts your daily mood score based on how you sleep, eat, hydrate, socialize, and manage stress. You simply input those five variables using sliders... and <em>voilà</em>, the app estimates your mood on a scale from 1 to 10.
			</p>
			<p class="mb-4 text-gray-300">
				It’s built around a custom <strong>multivariable linear regression model</strong> I wrote from scratch using NumPy (yep, no Scikit-learn here!). The model runs behind a FastAPI backend that processes your data and shoots back predictions in real time.
			</p>
			<p class="mb-4 text-gray-300">
				On the frontend, the app gives you way more than just a score. It logs your mood history, shows trends with charts, gives personal lifestyle insights, and even lets you generate test data to experiment with. It's designed to be simple, responsive, and most importantly, help you understand how your habits actually affect your emotional well-being.
			</p>
		</section>
		

		<section class="mb-12">
			<h2 class="text-2xl font-semibold mb-2">What the User Sees</h2>
			<p class="mb-6 text-gray-300">
				Users enter their daily lifestyle data through sliders: sleep hours, stress levels, nutrition, social time, and water intake. The app returns a mood score from 1 to 10 instantly and logs it for visual tracking. There's one log per day stored locally, complete with test data generation for lazy days.
			</p>

			<img :src="radarChart" alt="Lifestyle Radar" class="rounded-lg mb-6 shadow" />

			<h2 class="text-xl font-semibold mb-2">Graph Features</h2>
			<ul class="list-disc ml-6 mb-6 text-gray-300">
				<li><strong>Mood Line Chart:</strong> Tracks mood changes over time.</li>
				<li><strong>Radar Chart:</strong> Compares your lifestyle averages to recommended values.</li>
				<li><strong>Bar Chart:</strong> Shows the influence each lifestyle factor has on your mood (based on correlations, not sorcery).</li>
			</ul>

			<img :src="barChart" alt="Mood Impact Chart" class="rounded-lg mb-6 shadow" />

			<p class="mb-6 text-gray-300">
				These graphs are dynamically generated from the user's inputs. If you see missing or strange results (like a flatline), it probably means you haven't logged enough data yet.
			</p>

			<img :src="linearChart" alt="Mood Over Time Chart" class="rounded-lg mb-6 shadow" />
		</section>
    
		<section class="mb-12">
			<h2 class="text-2xl font-semibold mb-2">Performance Notes</h2>
			<p class="mb-6 text-gray-300">
				The model returns predictions with a <strong>Mean Squared Error (MSE)</strong> of <code>0.612</code> and <strong>RMSE</strong> of <code>0.783</code> on test data. Not perfect, but pretty decent for a first version. There's definitely room for improvement, and I'll be diving into that in a future blog where I break down my full regression model, feature analysis, and some of the wacky edge cases I ran into.
			</p>
			

			<h2 class="text-2xl font-semibold mb-2">Curiosity Corner</h2>
			<p class="mb-6 text-gray-300">
				During development, I realized I had originally trained the model on 100% of the data. Classic rookie mistake. So, I went back, added a proper 80/20 train-test split, and surprisingly got better generalization with a lower error. 🫠
			</p>
		</section>
    

    <h2 class="text-xl font-semibold mb-2">GitHub Links</h2>
    <ul class="list-disc ml-6 mb-6 text-blue-400">
      <li><a href="https://github.com/lukitasxue/mood-frontend" target="_blank">Frontend Repo - Vue + Manual CSS</a></li>
      <li><a href="https://github.com/lukitasxue/backend_moodPredPage" target="_blank">Backend Repo - FastAPI + ML Model</a></li>
    </ul>

    <p class="text-sm text-gray-500">
      In the future, I'll be breaking down the model itself in a dedicated blog - from how I trained it, to the lifestyle variables I included, and where I think it could be improved. (See placeholder: <em>Linear Regression Blog</em>)
    </p>
		<BackToTop />
  </div>
</template>
<script setup>
import barChart from '../assets/barChart.png'
import radarChart from '../assets/radarChart.png'
import linearChart from '../assets/linearChart.png'
import moodShowcase from '../assets/moodAppShowcase_2.png'

import BackToTop from './BackToTop.vue'


</script>
