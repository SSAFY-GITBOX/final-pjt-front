import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router'

Vue.use(Vuex)


const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
	plugins: [
		createPersistedState()
	],

  state: {
    token: null,
    articles: [],
    genres: [],
    selectedGenre: null,
    selectedGenreMovieLength: null,
    latestMovieLength: null,
  },

  getters: {
		isLogin(state) {
			return state.token ? true : false
		},
    
    // 페이지네이션 마지막 인덱스
    selectedMoviePageEndIndex(state) {
      return Math.ceil(state.selectedGenreMovieLength / 30)
    },
  },

  mutations: {
    // 회원가입 && 로그인
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({ name: 'ArticleView' })
    },

		GET_ARTICLES(state, articles) {
			state.articles = articles
		},

    SAVE_GENRES(state, genres) {
      state.genres = genres
    },

    SAVE_SELECTED_GENRE(state, genreId) {
      state.selectedGenre = genreId
    },

    SAVE_SELECT_MOVIE_LENGTH(state, movie_length) {
      state.selectedGenreMovieLength = movie_length
    },

    LATEST_MOVIE_LENGTH(state, movie_length) {
      state.latestMovieLength = movie_length
    },
  },

  actions: {
    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
        }
      })
        .then((res) => {
          console.log(res)
          context.commit('SAVE_TOKEN', res.data.key)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getArticles(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v2/`,
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
        .then((res) => {
          context.commit('GET_ARTICLES', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    logIn(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
        .then((res) => {
          context.commit('SAVE_TOKEN', res.data.key)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },

  modules: {
  }
})
