<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <img src="./assets/gitbox_logo.png" alt="" height="40">
        <a class="navbar-brand" href="#" style="margin-left: 3px; font-size: large;">GITBOX</a>
        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent" style="display: flex; justify-content: space-between;">
          <div>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
                <router-link class="nav-link" :to="{ name: 'HomeView' }">Home</router-link>
              </li>
              <li class="nav-item">
                <!-- <a class="nav-link" href="#">Link</a> -->
                <router-link class="nav-link" :to="{ name: 'ArticleView' }">Community</router-link>
              </li>
            </ul>
          </div>
          <div v-if="$store.getters.isLogin">
            <TheMovieSearchBar @get-search-movie="getSearchMovie"/>
            <!-- <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form> -->
          </div>
          <div>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<div v-if="$store.getters.isLogin">
								<li class="nav-item">
									<router-link	router-link class="nav-link" :to="{ name: 'ProfileView', params: { id: this.$store.state.userPk } }">Profile</router-link>
								</li>
								<li class="nav-item">
									<button class="nav-link" @click="logOut" style="border: none; background: none; transform: none;">LogOut</button>
								</li>
							</div>
							<div v-else>
								<li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'SignUpView' }">SignUp</router-link>
								</li>
								<li class="nav-item">
									<router-link class="nav-link" :to="{ name: 'LogInView' }">LogIn</router-link>
								</li>
							</div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <!-- <nav>
      <router-link :to="{ name: 'HomeView' }">Home</router-link> |
			<router-link :to="{ name: 'ArticleView' }">Community</router-link> |
      <TheMovieSearchBar/>
      <router-link :to="{ name: 'SignUpView' }">SIGN UP</router-link> |
			<router-link :to="{ name: 'LogInView' }">LogIn</router-link>
    </nav> -->
    <router-view/>
    <!-- <router-view :key="$route.fullPath"/> -->
  </div>
</template>

<script>
import TheMovieSearchBar from '@/components/TheMovieSearchBar'

export default {
  components: {
    TheMovieSearchBar,
  },

	created() {
		if (!this.$store.getters.isLogin) {
			this.$router.push({ name: 'LogInView' })
		}
	},
	
  methods: {
    getSearchMovie(content) {
      this.$router.push({ name: 'SearchedMovieView', params: {content: content}})
    },

		logOut() {
			this.$store.dispatch('logOut')
			this.$router.go()
		}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #2c3e50;
}

</style>
