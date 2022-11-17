import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieView from '../views/MovieView.vue'
import SignUpView from '../views/SignUpView.vue'
<<<<<<< HEAD
import ArticleView from '../views/ArticleView.vue'
=======
import DetailView from '../views/DetailView.vue'

>>>>>>> feature/main-page

Vue.use(VueRouter)

const routes = [
  {
    path: '/movie',
    name: 'MovieView',
    component: MovieView
  },

  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
<<<<<<< HEAD

	{
		path: '/article',
		name: 'ArticleView',
		component: ArticleView
	}
=======
  
  {
    path: '/:id',
    name: 'DetailView',
    component: DetailView
  },
>>>>>>> feature/main-page
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
