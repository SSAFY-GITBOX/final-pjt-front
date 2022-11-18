<template>
  <div>
		<h1>GITBOX 커뮤니티</h1>
		<router-link :to="{ name: 'ArticleCreateView' }">[게시글 작성]</router-link>
    <hr>
		<ArticleList/>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'

export default {
	name: 'ArticleView',

	components: {
		ArticleList
	},

	computed: {
		isLogin() {
			return this.$store.getters.isLogin
		}
	},

	created() {
		this.getArticles()
	},

	methods: {
		getArticles() {
			if (this.isLogin === true) {
				this.$store.dispatch('getArticles')
			} else {
				alert('로그인이 필요한 서비스입니다.')
				this.$router.push({ name: 'LogInView' })
			}
		}
	}
}
</script>

<style>

</style>