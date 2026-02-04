import { createApp } from 'vue'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'
import './assets/main.css'
import router from './router'
import BlogPostMoodPredictor from './components/BlogPostMoodPredictor.vue'
import BlogPostLinearRegression from './components/BlogPostLinearRegression.vue'
import BlogPostParkLenseDDSC from './components/BlogPostParkLenseDDSC.vue'


const app = createApp(App)
app.use(router)
app.use(MotionPlugin)
app.component('BlogPostMoodPredictor', BlogPostMoodPredictor)
app.component('BlogPostLinearRegression', BlogPostLinearRegression)
app.component('BlogPostParkLenseDDSC', BlogPostParkLenseDDSC)
app.mount('#app')

