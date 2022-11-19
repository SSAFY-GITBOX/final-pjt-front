<template>
  <div>
    <form class="d-flex" @submit.prevent="getSearchMovie">
      <input class="form-control me-2" type="search" placeholder="Search"
        v-model="inputData"
      >
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
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
      if (this.$route.params.content != content) {
        this.$emit('get-search-movie', content)
      }
    }
  }
}
</script>

<style>

</style>