import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    token: null,
		articles: []
  },

  getters: {
  },

  mutations: {
    // 회원가입 && 로그인
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({ name: 'ArticleView' })
    },

		GET_ARTICLES(state, articles) {
			state.articles = articles
		}
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
					console.commit('GET_ARTICLES', res.data)
				})
				.catch((err) => {
					console.log(err)
				})
		}
  },

  modules: {
  }
})
