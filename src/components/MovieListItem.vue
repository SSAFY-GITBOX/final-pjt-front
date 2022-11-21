<template>
  <div id="movie-list-item-div">
    <img :src="movie.poster_path" alt="" height="364" width="250" @click="goDetail">
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
#movie-list-item-div {
  padding-top: 20px;
  padding-right: 20px;
} 

#movie-list-item-div img{
  box-shadow : rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 10px;
}
</style>