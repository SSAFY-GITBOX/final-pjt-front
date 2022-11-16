<template>
  <div>Movie
    <div>
      <!-- 전체보기 버튼 미구현, 클릭 시 디테일 페이지 이동 미구현 -->
      <span>인기영화</span>
      <div style="display: flex; overflow-x: scroll;">
        <div v-for="(movie, index) in popularMovies" :key="index" >
          <p>{{ movie.title }}</p>
          <img :src="movie.poster_path" alt="" height="364">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MovieView',

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
          console.log(res)
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