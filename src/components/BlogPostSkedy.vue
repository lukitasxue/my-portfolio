<template>
  <div class="skedy-page max-w-3xl mx-auto px-6 py-12 text-white">

    <!-- Breadcrumb -->
    <div class="text-sm text-gray-400 mb-10">
      <router-link to="/" class="text-blue-400 hover:underline">Home</router-link>
      <span> » </span>
      <router-link to="/projects" class="text-blue-400 hover:underline">Projects</router-link>
      <span> » </span>
      <span class="text-gray-200 font-semibold">Skedy</span>
    </div>

    <!-- ===================== HERO HEADER ===================== -->
    <header class="skedy-hero mb-12">
      <div class="skedy-eyebrow">
        <span class="skedy-dot"></span>
        Case Study · 13 min read · May 2026
      </div>

      <h1 class="skedy-title">
        Two months building an AI WhatsApp agent —
        <span class="skedy-title-accent">and why the AI was the easy part</span>
      </h1>

      <p class="skedy-subtitle">
        Lessons from co-founding Skedy, an AI customer-service platform for service businesses.
      </p>

      <!-- Metadata pills -->
      <div class="skedy-meta">
        <span class="skedy-pill"><strong>Role</strong> Co-founder / AI Engineer</span>
        <span class="skedy-pill"><strong>Duration</strong> Early 2025 · 2 months</span>
        <span class="skedy-pill skedy-pill--muted"><strong>Status</strong> Archived</span>
      </div>

      <!-- Stack tags -->
      <div class="skedy-tags">
        <span class="skedy-tag">TypeScript</span>
        <span class="skedy-tag">Next.js</span>
        <span class="skedy-tag">Supabase</span>
        <span class="skedy-tag">pgvector</span>
        <span class="skedy-tag">OpenAI API</span>
        <span class="skedy-tag">WhatsApp Business API</span>
        <span class="skedy-tag">RAG</span>
        <span class="skedy-tag">Embeddings</span>
        <span class="skedy-tag">Multi-tenant SaaS</span>
      </div>

      <p class="skedy-archive-note">
        This post documents my contribution at the time I stepped back. The current
        <span class="skedy-mono">skedy.io</span> is no longer the version I worked on.
      </p>

      <div class="skedy-cta">
        <a
          href="https://github.com/mesieou/simple_booking"
          target="_blank"
          rel="noopener"
          class="skedy-link-btn"
        >
          → View the code on GitHub
        </a>
      </div>
    </header>

    <!-- ===================== HERO / COVER IMAGE ===================== -->
    <figure class="skedy-figure">
      <img
        :src="images.cover"
        alt="The full Skedy architecture: customer-facing WhatsApp flow at the top, backend orchestration in the middle, LLM and database layers below."
      />
      <figcaption>The full Skedy architecture: customer-facing WhatsApp flow at the top, backend orchestration in the middle, LLM and database layers below.</figcaption>
    </figure>

    <!-- ===================== ARTICLE BODY ===================== -->
    <article class="skedy-article">

      <p class="skedy-lede">
        Last year I joined a small team trying to solve a problem I'd seen everywhere without naming it: small service businesses — removalists, cleaners, hairdressers — were losing customers because they couldn't respond to WhatsApp messages fast enough.
      </p>

      <p>The pitch was simple. Build an AI agent that lives inside WhatsApp Business. It answers FAQs, quotes jobs Uber-style, handles bookings, escalates to a human when needed. We called it <strong>Skedy</strong>.</p>

      <p>I joined as co-founder and AI engineer, focused on the AI architecture and the integrations that wrapped around it. I spent two months on it before stepping back to focus on my final year of studies. The team continued, and the product has evolved significantly since.</p>

      <p>This is the post I wish someone had written for me before I started. It's not about Skedy as a product. It's about what two months of trying to ship an AI SaaS taught me about everything that <em>isn't</em> the model.</p>

      <h2>The premise: AI is the easy part</h2>

      <p>When you start working on an AI product as a student, your instinct is to obsess over the model. Which LLM? GPT-4 or Gemini? Which embeddings? How do we prompt-engineer the system better?</p>

      <p>Two months in, I realized this is roughly the easy 20%.</p>

      <p>The hard 80% is everything else: WhatsApp integration that doesn't break, conversational state that survives interruptions, business-specific knowledge that doesn't bleed between tenants, retrieval that returns the <em>right</em> chunk and not "kind of close" chunks, escalation rules that don't fire on a sarcastic customer. None of this is in the AI papers.</p>

      <p>Let me show you what I mean.</p>

      <h2>The RAG pipeline: it's never just "retrieval-augmented generation"</h2>

      <p>The idea sounds clean. Customer asks a question → we search the business's documents → we feed the relevant chunks to GPT → it answers in context.</p>

      <p>In a Jupyter notebook, this takes 20 lines of Python. In a real multi-tenant product, the same idea grew into a system that needed to:</p>

      <ul>
        <li><strong>Ingest content from anywhere</strong>: business websites, PDFs (we had a real test FAQ PDF we used constantly), uploaded docs. Each format needed its own crawler and parser. The repo eventually grew a <code>content_processing_report.txt</code> and a <code>crawl_log.txt</code> — both born from the same realization: ingestion fails silently, and you only find out three days later when the bot can't answer something the customer wrote on a webpage.</li>
        <li><strong>Chunk the content meaningfully</strong>: not by character count — by semantic unit. A 200-token chunk of a pricing page is useless if it cuts the price in half.</li>
        <li><strong>Categorize each chunk before embedding</strong>: we ended up tagging content as <code>SERVICES_OFFERED</code>, <code>PRICING_QUOTES</code>, <code>CONTACT</code>, <code>BOOKING_SCHEDULING</code>, <code>ABOUT_TRUST_BUILDING</code>, <code>FAQ</code>, <code>TERMS_CONDITIONS</code>. This let us bias retrieval based on the user's intent — when the user asked "how much?", we didn't want to return a terms-and-conditions chunk that happened to mention a price.</li>
        <li><strong>Store embeddings in Supabase pgvector</strong>, indexed by business ID, with Row-Level Security so a question about Business A could never accidentally retrieve from Business B.</li>
        <li><strong>Handle the retrieval miss</strong>: what happens when the user asks something that isn't in the docs? Hallucinate? Escalate? Apologize? Each of these is a product decision, not a technical one.</li>
      </ul>

      <figure class="skedy-figure">
        <img
          :src="images.pdfParser"
          alt="The content ingestion side of the RAG pipeline: businesses upload a PDF, the system parses and categorizes the content, embeddings get generated, and the bot can answer FAQs from it."
          loading="lazy"
        />
        <figcaption>The content ingestion side of the RAG pipeline: businesses upload a PDF, the system parses and categorizes the content, embeddings get generated, and the bot can answer FAQs from it.</figcaption>
      </figure>

      <blockquote>
        The first time I watched it work end-to-end — customer asks, system retrieves the right chunk, GPT answers correctly — was magic. The next 50 times I watched it pull the wrong chunk taught me what "real" looks like.
      </blockquote>

      <p>This was the first lesson: <strong>the AI pipeline is the part you write last and debug forever.</strong></p>

      <h2>Conversational state is harder than the AI</h2>

      <p>Here's the thing nobody tells you about chatbots: making a bot answer one message is easy. Making it answer the <em>fifth</em> message is hard.</p>

      <p>A real conversation looks like this:</p>

      <ul>
        <li>User asks "how much for moving 2 bedrooms?"</li>
        <li>Bot starts collecting info</li>
        <li>User interrupts: "actually wait, do you do interstate?"</li>
        <li>Bot has to remember the original quote intent, answer the new question, then offer to come back to the quote</li>
      </ul>

      <p>Multiply that by a hundred businesses, each with multiple concurrent users, each user potentially mid-flow when they close WhatsApp and reopen it three days later.</p>

      <p>We modeled this with a system of <strong>intents, submodes, and stages</strong>.</p>

      <ul>
        <li><strong>Intents</strong> were top-level: <code>idle</code>, <code>booking</code>, <code>faq</code>, <code>account</code>, <code>escalation</code>.</li>
        <li><strong>Submodes</strong> lived inside intents. Inside <code>faq</code>, for example, we had the categories I mentioned earlier — <code>PRICING_QUOTES</code>, <code>BOOKING_SCHEDULING</code>, etc.</li>
        <li><strong>Stages</strong> tracked where the user was inside a flow. A <code>booking</code> intent had stages for service selection, address collection, time selection, quote confirmation.</li>
      </ul>

      <figure class="skedy-figure">
        <img
          :src="images.conversationState"
          alt="How a single message flows through the system: webhook → intent detection → handler → stage. Each conversation maintains its place through interruptions and reconnections."
          loading="lazy"
        />
        <figcaption>How a single message flows through the system: webhook → intent detection → handler → stage. Each conversation maintains its place through interruptions and reconnections.</figcaption>
      </figure>

      <p>The implementation lived in TypeScript inside the bot engine. The session state lived in Supabase, keyed by business ID + user phone number. Every incoming message hydrated the state, ran through intent detection, updated the active goal, and persisted again.</p>

      <p>When it worked, it felt like the bot was actually paying attention. When it didn't — and it didn't, often — it felt like talking to a goldfish with amnesia.</p>

      <p>The lessons here weren't theoretical. They came from watching real test conversations break in ways I hadn't designed for:</p>

      <ul>
        <li><strong>Race conditions</strong>: two messages arriving 200ms apart, both reading the same state, both writing back. We started planning around optimistic locking and version control on session updates.</li>
        <li><strong>Context duplication</strong>: the user's history kept getting re-appended to prompts until we hit token limits on long conversations.</li>
        <li><strong>Memory leaks</strong> in session caching that only showed up after the demo had been running for a few hours.</li>
      </ul>

      <p>These problems aren't in tutorials because tutorials show you the happy path. Production is the unhappy path.</p>

      <h2>WhatsApp was harder than expected</h2>

      <p>I assumed WhatsApp would be the easy part. "It's just an API, right?"</p>

      <p>Wrong. The WhatsApp Business API (via Meta WABA) has:</p>

      <ul>
        <li>A separate <strong>Meta Business Suite</strong> account that has to be linked correctly.</li>
        <li>An <strong>app review process</strong> before you can message users who haven't messaged you first.</li>
        <li><strong>Webhook signature verification</strong> that fails silently if you don't handle it right.</li>
        <li><strong>Callback URL</strong> requirements with valid SSL — local development means ngrok or similar, and ngrok URLs change every restart.</li>
        <li><strong>Token rotation</strong> (system user tokens, page access tokens) that I confused for the first week.</li>
        <li><strong>Rate limits</strong> that kick in differently in dev vs production.</li>
      </ul>

      <p>We ended up writing a <code>WHATSAPP_WEBHOOK_DEBUG_GUIDE.md</code> because the same debugging steps came up so often that documenting them was faster than re-explaining them.</p>

      <p>The bigger lesson: <strong>third-party APIs that look like commodity infrastructure are usually full of footguns</strong>. Every "just an API" hides a stack of platform-specific concepts you have to learn before you can build anything reliable on top of it.</p>

      <h2>Multi-tenancy: where data security gets real</h2>

      <p>This was the part of the architecture I'm most proud of, and also the part where I felt least qualified.</p>

      <p>A multi-tenant SaaS means many businesses share the same database, the same backend, the same bot — but their data has to be completely isolated. Business A asks a question about pricing, Business B's pricing data must never appear in the answer. Ever.</p>

      <p>Supabase gave us <strong>Row-Level Security (RLS)</strong> policies that enforce this at the database layer, not the application layer. The difference matters: if a developer (me, on a bad day) writes a buggy query that forgets to filter by <code>businessId</code>, RLS catches it before any data leaks.</p>

      <p>We designed tables for:</p>

      <ul>
        <li><code>businesses</code> — the tenant</li>
        <li><code>users</code> — both staff and customers, scoped to a business</li>
        <li><code>chat_sessions</code> — keyed by business + user phone number</li>
        <li><code>interactions</code> — every individual message in/out</li>
        <li><code>documents</code> and <code>embeddings</code> — RAG content, scoped to business</li>
        <li><code>services</code>, <code>bookings</code>, <code>quotes</code> — operational data</li>
        <li><code>userContexts</code> — the active conversational state</li>
      </ul>

      <p>Every one of these tables had an RLS policy that essentially said: "you can only see rows where <code>businessId</code> matches the authenticated user's business." Once that's set, even a buggy query is safe.</p>

      <p>I'd never thought about data security this seriously before. University projects don't punish you for leaking data. Real products do.</p>

      <figure class="skedy-figure">
        <img
          :src="images.whatsappBooking"
          alt="End-to-end booking flow in production: quote, confirmation, and the escalation card the staff dashboard receives when a customer asks for a human."
          loading="lazy"
        />
        <figcaption>End-to-end booking flow in production: quote, confirmation, and the escalation card the staff dashboard receives when a customer asks for a human.</figcaption>
      </figure>

      <h2>The MVP problem: every feature is also a "no" to other features</h2>

      <p>Around month two, I started feeling something I now think is universal in early-stage products: the gap between what we <em>wanted</em> the bot to do and what we <em>needed</em> it to do for the MVP was enormous.</p>

      <p>We had ambitious ideas:</p>

      <ul>
        <li>Multilingual support</li>
        <li>Voice messages (incoming and outgoing)</li>
        <li>Calendar integrations for booking</li>
        <li>Dashboards for business owners to monitor conversations</li>
        <li>A whole onboarding flow where businesses self-serve their content ingestion</li>
        <li>Feedback loops where escalations trained the bot</li>
      </ul>

      <p>Each of these was a real customer need. But every "yes" was a "no" to faster validation of the core loop: <em>does this thing actually save service businesses time?</em></p>

      <p>I learned to default to the question: <strong>what's the smallest version of this that proves the idea works?</strong></p>

      <p>Not the smallest version that <em>demos</em> well — those are different things. The smallest version that gives you signal. For Skedy, that was probably: one business, one well-categorized FAQ, one booking flow, and a single WhatsApp number. Everything else could come after that loop was proven.</p>

      <h2>Testing and observability: the unglamorous half of the work</h2>

      <p>The repo has a <code>tests/</code> folder and a <code>jest.config.js</code>. It runs <code>test:unit</code>, <code>test:integration</code>, <code>test:e2e</code>, <code>test:newUserFlow</code>, and <code>test:v2</code> scripts. None of these existed when I joined.</p>

      <p>Why did we build them? Because we kept shipping fixes that broke other things.</p>

      <p>The intent classifier worked until someone wrote a message that mixed booking and FAQ language. The retrieval returned the right chunk until we added a new category and the embeddings got noisier. The webhook verified signatures correctly until Meta changed something tiny in their payload format.</p>

      <p>The only way to stop the bot from regressing was to test the critical paths automatically. Boring? Yes. But the alternative was a system that worked Tuesday and broke Wednesday for reasons nobody could find.</p>

      <figure class="skedy-figure">
        <img
          :src="images.deploymentFailed"
          alt="Production reality: not every push deploys cleanly. Every red check was a lesson in why testing and observability matter."
          loading="lazy"
        />
        <figcaption>Production reality: not every push deploys cleanly. Every red check was a lesson in why testing and observability matter.</figcaption>
      </figure>

      <p>The other half of this is <strong>observability</strong>. Logs that tell you not just "an error happened" but "this user, on this business, with this session state, on this intent, with this retrieval result, failed in this way." We started planning structured logging seriously — not just <code>console.log("ok")</code> but events with enough context to reconstruct what went wrong from the logs alone.</p>

      <p>I'd never appreciated how much of senior engineering is just <em>being able to see what your system is doing</em>. You can't fix what you can't observe.</p>

      <h2>The team lessons (the part I almost left out)</h2>

      <p>I had a moment around week six where I had to admit something uncomfortable: most of my mistakes weren't technical.</p>

      <p>I was over-engineering proposals before validating ideas. I was treating disagreements as personal — taking feedback on architecture as if it were feedback on me. I was running meetings that felt productive but produced no decisions.</p>

      <p>The thing that helped most was structure. We landed on a simple meeting format:</p>

      <ol>
        <li>What did I do since the last meeting?</li>
        <li>What am I doing next?</li>
        <li>What's blocking me?</li>
        <li>What decision do I need from the team?</li>
        <li>What's the concrete deliverable for next time?</li>
      </ol>

      <p>Five questions. No exceptions. Meetings shrunk from an hour of vague conversation to fifteen minutes of decisions and ownership.</p>

      <p>The personal piece took longer. I had to learn — and I'm still learning — that <strong>critique of an idea isn't critique of me</strong>. In a fast-moving team, things change, people disagree, and your favourite design gets thrown out. The faster you stop taking it personally, the faster you can contribute the next better idea.</p>

      <blockquote>
        The bot was the easy stuff to build. The harder thing was building the version of myself that could work on a team without my ego getting in the way.
      </blockquote>

      <h2>Why I stepped back</h2>

      <p>Two months in, I made the call to step back and focus on my final year studies. It wasn't a clean exit — it never is in a startup — but it was the right call for me. I had a capstone, finals, and a degree to finish, and trying to do all of it at full intensity was a recipe for doing none of it well.</p>

      <p>The team continued, the product evolved, and what exists at skedy.io today isn't really my work anymore — it's theirs. What I have is the fork at the state I left it, and a notebook of lessons I'm still drawing from.</p>

      <h2>What I'd do differently</h2>

      <p>Looking back, the things I'd change are obvious in retrospect:</p>

      <ul>
        <li><strong>Start smaller</strong>. One target customer, one flow, one validated loop. Resist the temptation to architect for a future you haven't earned yet.</li>
        <li><strong>Observability from day one</strong>. Logs, structured events, a way to replay sessions. We spent too long flying blind.</li>
        <li><strong>Document decisions, not just code</strong>. Every "why did we do it this way?" question I answered twice should have been written down once.</li>
        <li><strong>Test the unhappy path</strong>. Happy-path demos are seductive and misleading.</li>
        <li><strong>Separate identity from work earlier</strong>. Treat critique as data, not as judgement.</li>
      </ul>

      <h2>What I took with me</h2>

      <p>Technically, I left Skedy a much stronger engineer than I joined. RAG pipelines, multi-tenant architecture, conversational state machines, third-party API integration, production deployment, RLS, observability — these are things I now understand from having lived inside them, not from a course.</p>

      <p>But the lessons that surprised me were the non-technical ones:</p>

      <ul>
        <li>AI products aren't AI projects. They're systems projects with AI inside them.</li>
        <li>The hardest part of shipping software is the part that isn't shipping software.</li>
        <li>Working in a small team makes every meeting, every decision, every disagreement matter more — and there's nowhere to hide from your own bad habits.</li>
        <li>Stepping back from something you helped start is hard. Doing it for the right reasons makes it survivable.</li>
      </ul>

      <p>I'm now finishing my final year at Deakin, working on a 10-person IoT capstone as Junior Lead, and building other applied AI projects on the side. If you're a student thinking about joining a startup early in your career: do it, but go in knowing the AI is the easy part. Everything else is what'll teach you.</p>

      <div class="skedy-divider"></div>

      <p class="skedy-contact">
        <em>If you've worked on something similar — or if you're thinking about it — I'd love to hear about it. You can reach me at <a href="mailto:hsuehlucas@gmail.com">hsuehlucas@gmail.com</a> or on <a href="https://www.linkedin.com/in/lucas-hsueh-a56421280/" target="_blank" rel="noopener">LinkedIn</a>.</em>
      </p>
    </article>

    <BackToTop />
  </div>
</template>

<script setup>
import BackToTop from './BackToTop.vue'

// Skedy blog images live in `public/blog/skedy/` (drop the PNGs there and
// they're served as static assets — no imports, no rebuild required).
//
// We bind them dynamically via `:src` (rather than a static `src="..."`)
// so Vite's Vue SFC compiler doesn't try to resolve them as module imports
// at build time — same pattern Projects.vue uses for `public/` thumbnails.
const images = {
  cover:             '/blog/skedy/skedy-system-architecture.png',
  pdfParser:         '/blog/skedy/skedy-pdf-parser.png',
  conversationState: '/blog/skedy/skedy-conversation-state.png',
  whatsappBooking:   '/blog/skedy/skedy-whatsapp-booking.png',
  deploymentFailed:  '/blog/skedy/skedy-deployment-failed.png',
}
</script>

<style scoped>
/* ===========================================================
   Skedy blog post — bespoke styling, scoped to this component.
   Theme: Skedy brand pink → purple gradient on the site's dark
   background, serif body type to feel like a long-read essay.
   =========================================================== */

.skedy-page {
  --accent: #c084fc;
  --accent-pink: #f0abfc;
  --accent-soft: rgba(192, 132, 252, 0.14);
  --accent-line: rgba(192, 132, 252, 0.38);
  --accent-gradient: linear-gradient(135deg, #f0abfc 0%, #c084fc 100%);
  --serif: 'Charter', 'Bitstream Charter', 'Sitka Text', Cambria, Georgia, serif;
  --mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

/* ============== HERO HEADER ============== */
.skedy-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 1.5rem;
}
.skedy-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
  display: inline-block;
}

.skedy-title {
  font-size: clamp(2rem, 4vw + 1rem, 3.25rem);
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  color: #fff;
}
.skedy-title-accent {
  display: inline;
  background: linear-gradient(transparent 65%, var(--accent-soft) 65%);
  padding: 0 0.1em;
}

.skedy-subtitle {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.25rem;
  line-height: 1.55;
  color: #d1d5db;
  margin-bottom: 2rem;
  max-width: 60ch;
}

.skedy-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.skedy-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
  color: #e5e7eb;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 9999px;
}
.skedy-pill strong {
  color: var(--accent);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.65rem;
}
.skedy-pill--muted {
  color: #9ca3af;
}

.skedy-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 1rem 0 1.5rem;
}
.skedy-tag {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.02em;
  color: #e9d5ff;
  padding: 0.2rem 0.55rem;
  background: rgba(192, 132, 252, 0.08);
  border: 1px solid var(--accent-line);
  border-radius: 4px;
}

.skedy-archive-note {
  font-size: 0.8rem;
  color: #9ca3af;
  border-left: 2px solid var(--accent-line);
  padding-left: 0.75rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}
.skedy-mono { font-family: var(--mono); color: #e5e7eb; }

.skedy-cta { margin-top: 1.25rem; }
.skedy-link-btn {
  display: inline-block;
  padding: 0.55rem 1.1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: var(--accent-gradient);
  border-radius: 6px;
  transition: transform 120ms ease, box-shadow 120ms ease;
}
.skedy-link-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px -8px var(--accent);
}

/* ============== FIGURES / IMAGE PLACEHOLDERS ============== */
.skedy-figure {
  margin: 2.5rem 0;
}
.skedy-figure img {
  width: 100%;
  border-radius: 10px;
  display: block;
}
.skedy-figure figcaption {
  margin-top: 0.75rem;
  font-family: var(--serif);
  font-style: italic;
  font-size: 0.9rem;
  color: #9ca3af;
  text-align: center;
}
.skedy-figure--placeholder .skedy-figure-frame {
  border: 1px dashed var(--accent-line);
  border-radius: 10px;
  padding: 2.5rem 1.5rem;
  text-align: center;
  background: linear-gradient(180deg, rgba(192, 132, 252, 0.04), rgba(192, 132, 252, 0));
}
.skedy-figure-tag {
  display: inline-block;
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--accent);
  padding: 0.2rem 0.6rem;
  border: 1px solid var(--accent-line);
  border-radius: 4px;
  margin-bottom: 1rem;
}
.skedy-figure-hint {
  color: #cbd5e1;
  font-size: 0.95rem;
  max-width: 50ch;
  margin: 0 auto 0.75rem;
  line-height: 1.5;
}
.skedy-figure-path {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: #9ca3af;
  margin: 0;
}
.skedy-figure-path code {
  background: rgba(255, 255, 255, 0.04);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
}

/* ============== ARTICLE BODY ============== */
.skedy-article {
  font-family: var(--serif);
  font-size: 1.075rem;
  line-height: 1.75;
  color: #d1d5db;
  counter-reset: skedy-section;
}
.skedy-article p { margin: 0 0 1.25rem; }
.skedy-article strong { color: #fff; font-weight: 600; }
.skedy-article em { color: #e5e7eb; }
.skedy-article a {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid var(--accent-line);
  transition: border-color 120ms ease;
}
.skedy-article a:hover { border-bottom-color: var(--accent); }

/* Drop cap on the lede paragraph */
.skedy-lede {
  font-size: 1.2rem;
  line-height: 1.65;
  color: #e5e7eb;
  margin-bottom: 1.5rem;
}
.skedy-lede::first-letter {
  float: left;
  font-family: var(--serif);
  font-weight: 700;
  font-size: 3.75rem;
  line-height: 0.85;
  padding: 0.45rem 0.75rem 0 0;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Section headings — auto-numbered */
.skedy-article h2 {
  counter-increment: skedy-section;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.25;
  color: #fff;
  margin: 3.5rem 0 1.25rem;
  padding-left: 1.1rem;
  position: relative;
  letter-spacing: -0.01em;
}
.skedy-article h2::before {
  content: counter(skedy-section, decimal-leading-zero);
  position: absolute;
  left: 0;
  top: 0.4rem;
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--accent);
  transform: translateX(-110%);
  white-space: nowrap;
}
.skedy-article h2::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0.25em;
  bottom: 0.25em;
  width: 3px;
  background: var(--accent);
  border-radius: 2px;
}

/* Lists */
.skedy-article ul,
.skedy-article ol {
  margin: 0 0 1.5rem;
  padding-left: 1.5rem;
}
.skedy-article li {
  margin-bottom: 0.65rem;
  padding-left: 0.3rem;
}
.skedy-article ul li::marker { color: var(--accent); }
.skedy-article ol li::marker { color: var(--accent); font-family: var(--mono); font-size: 0.9em; }

/* Inline code */
.skedy-article code {
  font-family: var(--mono);
  font-size: 0.88em;
  color: #f5d0fe;
  background: var(--accent-soft);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  border: 1px solid var(--accent-line);
}
.skedy-article a code { color: inherit; }

/* Blockquotes */
.skedy-article blockquote {
  margin: 2rem 0;
  padding: 0.25rem 0 0.25rem 1.5rem;
  border-left: 4px solid var(--accent);
  background: linear-gradient(90deg, var(--accent-soft), transparent 70%);
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.2rem;
  line-height: 1.55;
  color: #f3f4f6;
}
.skedy-article blockquote p { margin: 0; }

/* Closing divider + contact line */
.skedy-divider {
  margin: 3rem auto;
  width: 60px;
  height: 1px;
  background: var(--accent-line);
  position: relative;
}
.skedy-divider::before,
.skedy-divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 4px;
  height: 4px;
  border-radius: 9999px;
  background: var(--accent);
  transform: translateY(-50%);
}
.skedy-divider::before { left: -10px; }
.skedy-divider::after { right: -10px; }
.skedy-contact {
  text-align: center;
  font-size: 0.95rem;
  color: #9ca3af;
}

/* Responsive tweaks */
@media (max-width: 640px) {
  .skedy-article h2::before { display: none; }
  .skedy-article h2 { padding-left: 0.9rem; }
  .skedy-lede::first-letter {
    font-size: 3rem;
    padding-right: 0.5rem;
  }
}
</style>
