<template>
    <b-nav-form @submit.prevent="getSearchMovie">
      <b-navbar-nav style="display: flex; justify-content: center; align-items: center;">
        <b-navbar-nav>
          <b-form-input size="lg" placeholder="Search" v-model="inputData"></b-form-input>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-button style="margin-left: 10px;" size="lg" type="submit">Search</b-button>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-nav-form>
</template>

<script>
export default {
  name: 'MovieSearchBar',
  data() {
    return {
      inputData: null,
    }
  },
  
  methods: {
    getSearchMovie() {
      const content = this.inputData
      if (content != null) {
        if (this.$route.params.content != content && content != null && content.trim()) {
          this.$emit('get-search-movie', content)
          this.inputData = ''
        }
      }
    }
  }
}
</script>

<style>

</style>