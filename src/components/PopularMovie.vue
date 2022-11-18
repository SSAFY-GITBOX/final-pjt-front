<template>
  <div>
    <span>인기영화</span><br><br>
    <div style="display: flex; overflow-x: scroll;">
        <PopularMovieItem
        v-for="(movie, index) in popularMovies" 
        :key="index"
        :movie="movie"
        />
    </div>
  </div>
</template>

<script>
import PopularMovieItem from '@/components/PopularMovieItem'
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'PopularMovie',
  components: {
    PopularMovieItem,
  },
  data() {
    return {
      popularMovies: null,
    }
  },

  methods: {
    getPopularMovieList() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/popular/init/`
      })
        .then((res) => {
          this.popularMovies = res.data
          this.popularMovies.forEach((movie) => {
            movie.poster_path = 'https://image.tmdb.org/t/p/original' + movie.poster_path
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },

  created() {
    this.getPopularMovieList()
  }
}

</script>

<style>

</style>