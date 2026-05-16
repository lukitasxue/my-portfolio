import BlogPostMoodPredictor from '../components/BlogPostMoodPredictor.vue'
import BlogPostLinearRegression from '../components/BlogPostLinearRegression.vue'
import BlogPostParkLenseDDSC from '../components/BlogPostParkLenseDDSC.vue'
import BlogPostSkedy from '../components/BlogPostSkedy.vue'

export const blogs = [
  {
    id: 'skedy',
    title: 'Two months building an AI WhatsApp agent — and why the AI was the easy part',
    component: BlogPostSkedy
  },
  {
    id: 'mood-predictor',
    title: 'Mood Predictor App',
    component: BlogPostMoodPredictor
  },
  {
    id: 'linear-regression',
    title: 'Multivariable Linear Regression – From Scratch',
    component: BlogPostLinearRegression
  },
  {
    id: 'parksense',
    title: 'ParkSense: Exploring Real-Time Parking Data',
    component: BlogPostParkLenseDDSC
  }
]
