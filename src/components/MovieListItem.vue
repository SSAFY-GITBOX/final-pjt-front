<template>
  <div>
    <img :src="movie.poster_path" alt="" height="364" @click="goDetail">
  </div>
</template>

<script>
export default {
  name: 'MovieListItem',
  props: {
    movie: Object,
  },
  methods: {
    goDetail() {
      console.log(this.movie)
      this.$router.push({ name: "MovieDetailView", params: { id: this.movie.movie_id }})
    }
  }
}
</script>

<style>

</style>