<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'HomeView' }">Home</router-link> |
			<router-link :to="{ name: 'ArticleView' }">Community</router-link> |
      <router-link :to="{ name: 'SignUpView' }">SIGN UP</router-link> |
			<router-link :to="{ name: 'LogInView' }">LogIn</router-link>
    </nav>
    <router-view/>
    <!-- <router-view :key="$route.fullPath"/> -->
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: black;
  color: white;
  height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
