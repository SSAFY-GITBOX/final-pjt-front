import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieView from '../views/MovieView.vue'
import MovieListView from '../views/MovieListView.vue'
import SignUpView from '../views/SignUpView.vue'
import ArticleView from '../views/ArticleView.vue'
import LogInView from '../views/LogInView.vue'
import DetailView from '../views/DetailView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'
import ArticleCreateView from '../views/ArticleCreateView.vue'

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(() => {
//         return window.location.reload()
//     })
// };

Vue.use(VueRouter)

const routes = [
  {
    path: '/movie',
    name: 'MovieView',
    component: MovieView
  },

  {
    path: '/movielist',
    name: 'MovieListView',
    component: MovieListView
  },

  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },

	{
		path: '/article',
		name: 'ArticleView',
		component: ArticleView
	},

	{
		path: '/logIn',
		name: 'LogInView',
		component: LogInView
	},
  
  {
    path: '/:id',
    name: 'DetailView',
    component: DetailView
  },

  {
    path: '/article/:id',
    name: 'ArticleDetailView',
    component: ArticleDetailView
  },

  {
    path: '/article/create',
    name: 'ArticleCreateView',
    component: ArticleCreateView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
