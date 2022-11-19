<template>
  <span>
    <input type="text" v-model="inputData" @keyup.enter="getSearchMovie">
  </span>
</template>

<script>
export default {
  name: 'TheMovieSearchBar',
  data() {
    return {
      inputData: null,
    }
  },
  methods: {
    getSearchMovie() {
      const content = this.inputData
      this.$router.push({ name: 'SearchedMovieView', params: {content: content}, query: {content: content}})
    }
  }
}
</script>

<style>

</style>