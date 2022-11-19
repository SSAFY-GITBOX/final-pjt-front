<template>
  <div>
    <span>최신 영화</span><br><br>
    <div style="display: flex; overflow-x: scroll;">
        <MovieListItem
        v-for="(movie, index) in latestMovies" 
        :key="index"
        :movie="movie"
        />
    </div>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'LetestMovieList',
  components: {
    MovieListItem,
  },
  data() {
    return {
      latestMovies: null,
    }
  },

  methods: {
    getLatestMovieList() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/latest/init/`
      })
        .then((res) => {
          this.$store.commit('LATEST_MOVIE_LENGTH', res.data.movie_length)
          this.latestMovies = res.data.movies
          this.latestMovies.forEach((movie) => {
            movie.poster_path = 'https://image.tmdb.org/t/p/original' + movie.poster_path
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },

  created() {
    this.getLatestMovieList()
  }
}

</script>

<style>

</style>