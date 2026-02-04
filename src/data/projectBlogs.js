import BlogPostMoodPredictor from '../components/BlogPostMoodPredictor.vue'
import BlogPostLinearRegression from '../components/BlogPostLinearRegression.vue'
import BlogPostParkLenseDDSC from '../components/BlogPostParkLenseDDSC.vue'

export const blogs = [
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
