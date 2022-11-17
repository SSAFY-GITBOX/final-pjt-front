<template>
  <img :src="movie.poster_path" alt="" height="364" @click="goDetail">
</template>

<script>
export default {
  name: 'PopularMovieItem',
  props: {
    movie: Object,
  },
  methods: {
    goDetail() {
      console.log(this.movie)
      this.$router.push({ name: "DetailView", params: { id: this.movie.movie_id }})
    }
  }
}
</script>

<style>

</style>