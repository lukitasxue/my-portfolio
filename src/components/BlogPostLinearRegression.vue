<template>
	<div class="max-w-3xl mx-auto px-6 py-12 text-white">
        <div class="text-sm text-gray-400 mb-4">
          <router-link to="/" class="text-blue-400 hover:underline">Home</router-link>
          <span> » </span>
          <router-link to="/projects" class="text-blue-400 hover:underline">Projects</router-link>
          <span> » </span>
          <span class="text-gray-200 font-semibold">Multivariable Linear Regression</span>
        </div>

        <h1 class="text-3xl font-bold mb-6">Multivariable Linear Regression - From Scratch</h1>

        <p class="mb-6 text-gray-300">
          I started this journey by trying to predict mood using just a couple of variables. What began as a curiosity about how lifestyle affects emotional state turned into one of my most fun and rewarding learning experiences so far.
        </p>

        <p class="mb-6 text-gray-300">
          The core model was built completely from scratch, no Scikit-learn, just pure NumPy. I wanted to challenge myself and reinforce my university-level math knowledge. Turns out, linear regression isn't just about drawing a best-fit line. I got to dive into matrix multiplication, gradient descent, and more.
        </p>



        <h2 class="text-2xl font-bold mt-12 mb-4">Before the Matrix: Linear Regression Basics</h2>

<p class="mb-6 text-gray-300">
  Before I dove into multivariable linear regression, I explored how linear regression works at its most basic form, with just two variables. This was my first proper step into machine learning logic: plotting a line through points and minimizing the distance between the predicted and actual values.
</p>

<p class="mb-6 text-gray-300">
  The idea is simple: if you have a set of points (x, y), your goal is to find the best-fitting line <strong>y = mx + b</strong> that goes through them. That line represents your model's "best guess" at predicting outputs based on inputs. The actual points are your data, and the line is the prediction. The better the line fits those points, the better your model is.
</p>

<img :src="linearChartSimpleVar" alt="Linear Regression basic chart" class="rounded-lg mb-6 shadow" />

<p class="mb-6 text-gray-300">
  Here's a simple function I implemented to evaluate how far off predictions are from the actual values:
</p>

<div class="relative bg-[#1e1e1e] text-white rounded-md shadow p-4 mb-6 overflow-x-auto">
  <pre class="whitespace-pre-wrap"><code class="language-python">def mean_squared_error(y_true, y_pred):
    total_error = 0
    for yt, yp in zip(y_true, y_pred): 
        total_error += (yt - yp)**2
    return total_error / len(y_true)

# Or in a one-liner:
# return sum((yt - yp)**2 for yt, yp in zip(y_true, y_pred)) / len(y_true)</code></pre>
</div>

<p class="mb-6 text-gray-300">
  Then I tried training the model using <strong>gradient descent</strong>, a technique that adjusts the slope and intercept until the line fits best by minimizing error:
</p>

<div class="relative bg-[#1e1e1e] text-white rounded-md shadow p-4 mb-6 overflow-x-auto">
  <pre class="whitespace-pre-wrap"><code class="language-python">def train_gradient_descent(x, y, m_init=0, b_init=0, learning_rate=0.01, epochs=1000):
    m = m_init
    b = b_init

    for epoch in range(epochs):
        dm, db = compute_gradients(x, y, m, b)
        m -= learning_rate * dm
        b -= learning_rate * db

        if epoch % 100 == 0:
            y_pred = m*x + b
            loss = ((y - y_pred) ** 2).mean()
            print(f"epoch {epoch}: mse = {loss:.4f}")

    return m, b</code></pre>
</div>

<p class="mb-6 text-gray-300">
  In this function:
</p>

<ul class="list-disc ml-6 mb-6 text-gray-300">
  <li><code>m</code> is the slope (how steep the line is).</li>
  <li><code>b</code> is the intercept (where the line crosses the y-axis).</li>
  <li><code>epochs</code> refers to how many times we go over the dataset.</li>
  <li><code>learning_rate</code> controls how big the steps are while learning.</li>
</ul>

<p class="mb-6 text-gray-300">
  The idea is to tweak <code>m</code> and <code>b</code> repeatedly to minimize the Mean Squared Error. Each iteration, we compute how off the predictions are and use that info to take a "step" in the right direction.
</p>

<p class="mb-6 text-gray-300">
  After testing this with just 1–2 variables, I realized this wasn't enough to capture the complexity of something like mood prediction. For that, I needed more features, sleep hours, nutrition, hydration, stress levels, and so on. That's when I transitioned to <strong>multivariable linear regression</strong>.
</p>

<!-- Transition Section -->
<h3 class="text-xl font-bold mb-4 text-gray-200">Evolving to Multivariable Linear Regression</h3>
<p class="mb-6 text-gray-300">
  Once I had the basic mechanics down, like calculating loss with <code>mean_squared_error()</code> and optimizing weights using gradient descent, I realized it was time to scale things up. Predicting mood based on just one or two features was too limiting.
</p>
<p class="mb-6 text-gray-300">
  People's emotional states are influenced by many factors, not just one. So instead of a single variable model like <code>y = mx + b</code>, I moved to something like:
  <br />
  <code>y = w₁x₁ + w₂x₂ + ... + wₙxₙ + b</code>
</p>
<p class="mb-6 text-gray-300">
  But managing multiple weights manually? Not fun. So I dropped gradient descent and rewrote everything using matrix operations (a.k.a. the <strong>Normal Equation</strong>). Once you're working with multiple features, matrix algebra becomes way more efficient and readable.
</p>

<p class="mb-6 text-gray-300">
  Here's a quick look at the training function:
</p>


        <div class="relative bg-[#1e1e1e] text-white rounded-md shadow p-4 mb-6 overflow-x-auto">
  <button
    class="copy-btn absolute top-2 right-2 text-sm text-gray-300 hover:text-white border border-gray-600 rounded px-2 py-1 bg-[#2d2d2d]"
    onclick="(() => {
      const btn = event.currentTarget;
      navigator.clipboard.writeText(`def train_linear_regression(X, y):\n    X_b = np.c_[np.ones((X.shape[0], 1)), X]\n    theta_best = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)\n    return theta_best`);
      const originalText = btn.innerText;
      btn.innerText = 'Copied!';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
      }, 2000);
    })()"
  >
    Copy
  </button>

  <pre class="whitespace-pre-wrap"><code class="language-python">def train_linear_regression(X, y):
    X_b = np.c_[np.ones((X.shape[0], 1)), X]
    theta_best = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)
    return theta_best</code></pre>
</div>

<p class="mb-6 text-gray-300">
  Here's what's going on in this function. This is my custom implementation of the <strong>Normal Equation</strong>, a closed-form solution to linear regression using pure matrix algebra (no gradient descent involved).
</p>

<h3 class="text-xl font-semibold mb-2 text-white">Bias and Ones Matrix (for Matrix Regression)</h3>
<p class="mb-4 text-gray-300">
  The first line adds a <code>np.ones((X.shape[0], 1))</code> column to simulate the bias term. This ensures that the model learns the intercept, not just the weights.
</p>

<p class="mb-4 text-gray-300">
  For example, if we have 2 rows of input features, this adds a column of 1s to make the equation work like:
  <br />
  <code>y = θ₀ × 1 + θ₁x₁ + θ₂x₂ + ... + θₙxₙ</code>
</p>

<p class="mb-6 text-gray-300">
  That trick turns the <strong>bias</strong> into just another weight to learn. We do this so we can write the whole thing as one matrix multiplication expression.
</p>

<h3 class="text-xl font-semibold mb-4 text-white">Normal Equation Logic</h3>

<div class="bg-[#1e1e1e] p-4 rounded-md text-gray-300 text-sm mb-4 leading-relaxed">
  <p><strong>Step 1:</strong> <code>X_b.T.dot(X_b)</code>, This gives you <code>XᵀX</code>, the core matrix for linear regression.</p>
  <p><strong>Step 2:</strong> <code>np.linalg.inv(...)</code>, Inverts <code>XᵀX</code> so you can solve for the weights analytically.</p>
  <p><strong>Step 3:</strong> <code>.dot(X_b.T).dot(y)</code>, Multiplies it with <code>Xᵀy</code> to get the final weights.</p>
</div>

<p class="mb-6 text-gray-300">
  The result is <code>theta_best</code>, which includes all the learned coefficients:
  <br />
  <code>theta_best[0]</code> is the <strong>bias</strong>, and the rest are feature weights (e.g. <code>w_sleep</code>, <code>w_stress</code>).
</p>


<h3 class="text-xl font-semibold mb-2 text-white">Interpretation</h3>
<p class="mb-4 text-gray-300">
  Say the model learns:
</p>

<pre class="bg-[#1e1e1e] p-4 rounded-md text-sm text-gray-100 mb-6 whitespace-pre-wrap"><code>w_sleep = 0.6
w_stress = -0.8</code></pre>

<div class="mb-4 text-gray-300">
  <p class="mb-2">Then:</p>
  <ul class="list-disc ml-6 text-gray-300">
    <li>Increasing sleep by 1 hour raises predicted mood by <code>+0.6</code>.</li>
    <li>Increasing stress by 1 unit drops mood by <code>-0.8</code>.</li>
  </ul>
</div>


<p class="mb-6 text-gray-300">
  This kind of interpretability is what makes linear regression so useful for understanding how inputs affect outcomes, not just making predictions.
</p>


        <p class="mb-6 text-gray-300">
          At first, I trained the model on just 100 entries, without splitting into training and test sets. This helped me understand how it behaves-but it wasn't enough. I soon realized I needed to scale it up.
        </p>

        <img :src="barChart" alt="Correlationis Bar Chart" class="rounded-lg mb-6 shadow" />

        <p class="mb-6 text-gray-300">
          I didn't use statistical correlation (like Pearson's r) to drop features, but instead manually removed variables and observed the resulting MSE/RMSE. Caffeine and exercise had minimal impact, sometimes even increasing error so I dropped them from the feature set.
        </p>

        <h2 class="text-2xl font-bold mt-12 mb-4">Why Splitting Your Data Actually Matters</h2>
<p class="mb-6 text-gray-300">
  This lesson hit me after a class discussion where one of our data science professors mentioned that using a <strong>50/50</strong>, <strong>70/30</strong>, or <strong>80/20</strong> split between training and test data is standard practice. It made me pause. I had trained everything on 100% of the data, so technically, my model was being evaluated on the same examples it learned from.
</p>

<p class="mb-6 text-gray-300">
  After class, I started a small discussion to understand why this matters. Turns out, it's a fundamental principle in machine learning: <strong>you can't evaluate how well a model generalizes if you test it on the same data it saw during training</strong>. That's like giving someone the answers before the exam.
</p>

<p class="mb-6 text-gray-300">
  By training on one subset and testing on another, we make sure the model isn't just memorizing numbers, it's actually learning relationships that apply to new, unseen data. Here's the Python code I used to implement the split manually:
</p>

<div class="relative bg-[#1e1e1e] text-white rounded-md shadow p-4 mb-6 overflow-x-auto">
  <button
    class="copy-btn absolute top-2 right-2 text-sm text-gray-300 hover:text-white border border-gray-600 rounded px-2 py-1 bg-[#2d2d2d]"
    onclick="(() => {
      const btn = event.currentTarget;
      navigator.clipboard.writeText('def train_test_split(X, y, test_size=0.2, random_seed=42):\\n    np.random.seed(random_seed)\\n    indices = np.arange(X.shape[0])\\n    np.random.shuffle(indices)\\n    test_count = int(X.shape[0] * test_size)\\n    test_indices = indices[:test_count]\\n    train_indices = indices[test_count:]\\n    return X[train_indices], X[test_indices], y[train_indices], y[test_indices]');
      const originalText = btn.innerText;
      btn.innerText = 'Copied!';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
      }, 2000);
    })()"
  >
    Copy
  </button>

  <pre class="whitespace-pre-wrap"><code class="language-python">def train_test_split(X, y, test_size=0.2, random_seed=42):
    np.random.seed(random_seed)
    indices = np.arange(X.shape[0])
    np.random.shuffle(indices)

    test_count = int(X.shape[0] * test_size)
    test_indices = indices[:test_count]
    train_indices = indices[test_count:]

    return X[train_indices], X[test_indices], y[train_indices], y[test_indices]
  </code></pre>
</div>

<p class="mb-6 text-gray-300">
  This gave me the flexibility to control test size and randomness. After applying it, the model's results became more honest. The error increased a little, which was expected, but now I had a <strong>realistic measure</strong> of performance. That shift in mindset made a huge difference in the rest of my project.
</p>
<p class="mb-6 text-gray-300">
  After splitting the data properly, I tested the model's accuracy. It returned predictions with a <strong>Mean Squared Error (MSE)</strong> of <code>0.612</code> and <strong>Root Mean Squared Error (RMSE)</strong> of <code>0.783</code> on the test set, a solid result considering the complexity of predicting something as subjective as mood.
</p>




<!-- Hydration Logic Section -->
<section class="mb-12">
  <h2 class="text-2xl font-bold mb-4">Fixing the Water Problem with a Reverse Parabola</h2>

  <p class="mb-6 text-gray-300">
    While working on the <a href="https://moodpredictorapp.netlify.app" target="_blank" class="text-blue-400 underline hover:text-blue-300">Mood Predictor App</a>, I hit an unexpected issue: the model kept rewarding higher mood scores the more water you drank. At first glance, this seemed fine, hydration is healthy, right? But then I logged a test case where someone drank 6 liters of water… and the mood score shot up unrealistically. That just didn't make sense.
  </p>

  <p class="mb-6 text-gray-300">
    So I started thinking more critically about what "healthy hydration" actually means. In reality, there's an optimal range, around 2 to 2.5L, and going beyond that doesn't make you happier. If anything, too much water starts having diminishing (and even negative) effects. I wanted the model to reflect that.
  </p>

  <p class="mb-6 text-gray-300">
    That's when I decided to replace the linear logic with a <strong>reverse parabola</strong>. The idea: mood improves up to a point, then drops if water intake gets excessive. I defined a transformation where mood impact peaks around 2L, and starts to decrease past that point.
  </p>

  <p class="mb-6 text-gray-300">
    Here's the transformation logic in Python:
  </p>

  <div class="relative bg-[#1e1e1e] text-white rounded-md shadow p-4 mb-6 overflow-x-auto">
    <pre class="whitespace-pre-wrap"><code class="language-python">if water_liters &gt; 3:
    water_effect = 10 - (water_liters - 3) * 2
else:
    water_effect = water_liters * 3.3</code></pre>
  </div>

  <p class="mb-6 text-gray-300">
    This creates a curve where the mood benefit rises until about 2–2.5L, then begins to fall. It feels way more realistic and grounded than a simple “more water = more mood” approach. Plus, it's a perfect example of why building your own model logic, instead of relying entirely on pre-built libraries, can lead to smarter results.
  </p>
  <img :src="waterChart" alt="Water curve chart" class="rounded-lg mb-6 shadow" />

  <p class="mb-6 text-gray-300">
    If you're curious to see this applied in action, you can 
    <a href="https://moodpredictorapp.netlify.app" target="_blank" class="text-blue-400 underline hover:text-blue-300">try the app here</a>,
    or you can 
    <a href="/projects/mood-predictor" class="text-blue-400 underline hover:text-blue-300">visit the blog of this app</a>
    for a full walkthrough of the project.
  </p>


  
</section>
        

        <h2 class="text-2xl font-bold mt-12 mb-4">Curiosity Corner</h2>
        <p class="mb-6 text-gray-300">
  A few interesting things came up during this project that really shaped how I now think about machine learning:
</p>

<ul class="list-disc ml-6 mb-6 text-gray-300">
  <li>
    <strong>Training vs. Testing Data:</strong> After a class discussion where a professor mentioned the importance of train-test splits (like 50/50, 70/30, or 80/20), I started wondering if my model was cheating a little. At the time, I was training and testing on the same data, so of course it performed well. Once I added a proper 80/20 split, the error increased slightly, but the predictions became more honest.
  </li>

  <li>
    <strong>Matrix Math & Normal Equation:</strong> Originally, I used <code>gradient descent</code> to train the model, which works great for small problems. But once I started adding more variables, I rewrote everything using matrix operations and the <strong>Normal Equation</strong> (closed-form solution). Not only did it simplify my code, but it also helped me understand linear regression at a deeper level.
  </li>

  <li>
    <strong>Hydration Penalty Logic:</strong> While testing my mood predictor app, I noticed that drinking 6L of water would always boost the mood score. That didn't feel realistic. So, I added a custom transformation, a reverse parabola, that peaks at 2–2.5L and penalizes anything beyond that. It was one of my favorite tweaks, and you can <a href="https://moodpredictorapp.netlify.app" target="_blank" class="text-blue-400 underline hover:text-blue-300">try the app here</a> or <router-link to="/projects/mood-predictor" class="text-blue-400 underline hover:text-blue-300">read the full app blog</router-link> to see it in action.
  </li>

  <li>
    <strong>Going from 2 to Many Features:</strong> At first, I only used 1 or 2 variables. But mood is complex, and I needed a more complete picture. That's why I eventually built a <strong>multivariable linear regression model</strong>, now using features like sleep, stress, nutrition, water, and more.
  </li>
</ul>

<p class="mb-6 text-gray-300">
  All of these little discoveries, from questioning my test setup to rewriting the math, made the final model smarter and the app feel more real. Every small “why does this not feel right?” moment led to something cooler.
</p>


        <h2 class="text-2xl font-bold mt-12 mb-4">What's Next?</h2>
        <p class="mb-6 text-gray-300">
          In the future, I'd love to try more powerful models like polynomial regression, decision trees, or even neural networks. I also want to collect more diverse data and integrate mood logging with real apps like Apple Health or Google Fit.
        </p>

        <p class="mb-6 text-gray-300">
          This blog was just the first step. The full Mood Predictor App builds on top of everything I learned here. Feel free to check it out!
        </p>

        <BackToTop />
      </div>
</template>

<script setup>
import BackToTop from './BackToTop.vue'
import barChart from '../assets/barChartLinReg.png'
import waterChart from '../assets/parabolaWater.png'
import linearChartSimpleVar from '../assets/linearRegSimpleVar.png'
</script>
