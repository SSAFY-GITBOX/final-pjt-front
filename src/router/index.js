import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieView from '../views/MovieView.vue'
import SearchedMovieView from '../views/SearchedMovieView.vue'
import SignUpView from '../views/SignUpView.vue'
import ArticleView from '../views/ArticleView.vue'
import LogInView from '../views/LogInView.vue'
import MovieDetailView from '../views/MovieDetailView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'
import ProfileView from '../views/ProfileView.vue'
import EditProfileView from '../views/EditProfileView.vue'

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(() => {
//         return window.location.reload()
//     })
// };

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'HomeView',
    component: HomeView
  },

  {
    path: '/movies/search/:content',
    name: 'SearchedMovieView',
    component: SearchedMovieView
  },
  
  {
    path: '/movies/:select',
    name: 'MovieView',
    component: MovieView
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
    name: 'MovieDetailView',
    component: MovieDetailView
  },

  {
    path: '/article/:id',
    name: 'ArticleDetailView',
    component: ArticleDetailView
  },

  {
    path: '/profile/:id',
    name: 'ProfileView',
    component: ProfileView
  },

	{
    path: '/editprofile/:id',
    name: 'EditProfileView',
    component: EditProfileView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
