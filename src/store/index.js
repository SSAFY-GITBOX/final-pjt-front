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
    userPk: null,
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
			state.isLogin = true
    },
    
    SAVE_USER_PK(state, userPk) {
      state.userPk = userPk
      router.push({ name: 'HomeView' })
    },

		LOGOUT(state) {
			state.token = null,
			state.userPk = null,
			state.isLogin = false
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
        .then((res1) => {
          context.commit('SAVE_TOKEN', res1.data.key)
					axios({
            method: 'get',
            url: `${API_URL}/accounts/user/`,
            headers: {
              Authorization: `Token ${ context.state.token }`
            }
          })
          .then((res2) => {
            context.commit('SAVE_USER_PK', res2.data.pk)
          })
          .catch((err2) => {
            console.log(err2)
          })
        })
        .catch((err1) => {
          console.log(err1)
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
        .then((res1) => {
          context.commit('SAVE_TOKEN', res1.data.key)
          axios({
            method: 'get',
            url: `${API_URL}/accounts/user/`,
            headers: {
              Authorization: `Token ${ context.state.token }`
            }
          })
          .then((res2) => {
            context.commit('SAVE_USER_PK', res2.data.pk)
          })
          .catch((err2) => {
            console.log(err2)
          })
        })
        .catch((err1) => {
					alert('잘못된 요청입니다.')
          console.log(err1)
        })
    },

		logOut(context) {
			context.commit('LOGOUT')
			// axios({
			// 	method: 'post',
			// 	url: `${ API_URL }/accounts/logout/`,
			// 	headers: {
			// 		Authorization: `Token ${ context.state.token }`
			// 	}
			// })
			// 	.then(() => {
			// 		context.commit('LOGOUT')
			// 	})
			// 	.catch((err) => {
			// 		console('logout err')
			// 		console.log(err)
			// 	})
		}
  },

  modules: {
  }
})
