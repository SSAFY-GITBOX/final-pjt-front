<template>

  <div>
    <input type="text"
    v-model="inputData"
    @keyup.enter="getSearchArticle">
    
  </div>

    <!-- <b-nav-form @submit.prevent="getSearchMovie">
      <b-navbar-nav style="display: flex; justify-content: center; align-items: center;">
        <b-navbar-nav>
          <b-form-input size="lg" placeholder="Search" v-model="inputData"></b-form-input>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-button style="margin-left: 10px;" size="lg" type="submit">Search</b-button>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-nav-form> -->
</template>

<script>
export default {
  name: 'ArticleSearchBar',

  data() {
    return {
      inputData: null,
    }
  },

  methods: {
    getSearchArticle() {
      const content = this.inputData
        this.$emit('get-search-article', content)
    }
  }
}
</script>

<style>

</style>