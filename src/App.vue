<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" style="z-index: 1000; padding-right: 20px; background-color: #2B2D31; position: -webkit-sticky; position: sticky; top: 0px;">

      <img src="./assets/gitbox_logo2.png" alt="" height="50" @click="clickLogo" id="gitbox-logo">
      <b-navbar-brand href="#" style="margin-left:3px; color: white; font-size: xx-large; font-family:'Times New Roman', Times, serif">
        <router-link class="nav-link" :to="{ name: 'HomeView' }">GITBOX</router-link>
      </b-navbar-brand>


      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav style="justify-content: space-between; font-size: x-large;">
        <b-navbar-nav>
          <b-nav-item href="#"><router-link class="nav-link" :to="{ name: 'HomeView' }">Home</router-link></b-nav-item>
          <b-nav-item href="#"><router-link class="nav-link" :to="{ name: 'ArticleView' }">Community</router-link></b-nav-item>
        </b-navbar-nav>

        <!-- <b-navbar-nav class="ml-auto"> -->
        <!-- 검색창 부분 -->
        <b-navbar-nav v-if="$store.getters.isLogin" style="width: 400px; margin: auto;">
          <MovieSearchBar @get-search-movie="getSearchMovie"/>
        </b-navbar-nav>

        <b-navbar-nav v-if="$store.getters.isLogin" style="display: flex;">
          <b-nav-item href="#"><router-link class="nav-link" :to="{ name: 'ProfileView', params: { id: this.$store.state.userPk } }">Profile</router-link></b-nav-item>
          <!-- 로그아웃이 버튼이라 토글창에서 계속 중앙으로 안 갔는데 margin 넣으니까 중앙정렬됨 -->
          <b-nav-item href="#" style="margin: auto;"><button class="nav-link" @click="logOut" style="background-color: #2e3133; border: none; transform: none;">LogOut</button></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else style="display: flex;">
          <b-nav-item href="#"><router-link class="nav-link" :to="{ name: 'SignUpView' }">SignUp</router-link></b-nav-item>
          <b-nav-item href="#"><router-link class="nav-link" :to="{ name: 'LogInView' }">LogIn</router-link></b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import MovieSearchBar from '@/components/MovieSearchBar'

export default {
  components: {
    MovieSearchBar,
  },

	created() {
		if (!this.$store.getters.isLogin) {
			this.$router.push({ name: 'LogInView' })
		} else {
      if (this.$router.history.current.name === null) {
        this.$router.push({ name: 'HomeView' })
      }
    }
	},
	
  methods: {
    getSearchMovie(content) {
      this.$router.push({ name: 'SearchedMovieView', params: {content: content}})
    },

		logOut() {
			this.$store.dispatch('logOut')
			this.$router.go()
		},
    
    clickLogo() {
      this.$router.push({ name: 'HomeView' })
    }
  }
}
</script>

<style>
@font-face {
  font-family: "DOHYEON";
  src: url("./fonts/DoHyeon-Regular.ttf");
}

#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: "DOHYEON";

  background-color: #F5F5DC;
}

nav a.router-link-active {
  color: white;
}

#gitbox-logo:hover {
  cursor: pointer;
}

</style>
