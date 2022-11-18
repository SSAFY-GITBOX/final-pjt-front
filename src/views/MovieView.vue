<!-- 전체보기 버튼 미구현, 클릭 시 디테일 페이지 이동 미구현 -->
<template>
  <div>
    <PopularMovie/>

    <!-- 장르별 영화 버튼 -->
    <div style="display: flex; justify-content: space-between;">
      <div style="display: flex;">
        <div v-for="(genre, genre_id) in genres" :key="genre_id">
          <button @click="getGenreMovie(genre)">{{ genre.name }}</button>
        </div>
      </div>
      <div>
        <button>전체보기</button>
      </div>
    </div>
    <!-- 장르별 영화 응답 -->
    <div style="display: flex; overflow-x: scroll;">
      <div v-for="(movie, movie_id) in selectedGenreMovies" :key="movie_id">
        <MovieListItem :movie="movie"/>
      </div>
    </div>
  </div>
</template>

<script>
import PopularMovie from '@/components/PopularMovie.vue'
import MovieListItem from '@/components/MovieListItem.vue'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MovieView',
  components: {
    PopularMovie,
    MovieListItem,
  },

  data() {
    return {
      genres: null,
      selectedGenre: 12,
      selectedGenreMovies: [],
    }
  },

  methods: {
    getGenres() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/genres/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          this.$store.commit('SAVE_GENRES', res.data)
          this.genres = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getGenreMovie(genre) {
      this.selectedGenre = genre.id
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/genres/${this.selectedGenre}/init/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          this.selectedGenreMovies = res.data
          this.selectedGenreMovies.forEach((movie) => {
            movie.poster_path = 'https://image.tmdb.org/t/p/original' + movie.poster_path
          })
        })
        .catch((err)=> {
          console.log(err)
        })
    }
  },

  created() {
    if (this.$store.state.genres.length === 0) {
      this.getGenres()
    } else {
      this.genres = this.$store.state.genres
    }

    if (this.selectedGenreMovies.length === 0) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/genres/${this.selectedGenre}/init/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          this.selectedGenreMovies = res.data
          this.selectedGenreMovies.forEach((movie) => {
            movie.poster_path = 'https://image.tmdb.org/t/p/original' + movie.poster_path
          })
        })
        .catch((err)=> {
          console.log(err)
        })
    } 
  }
}
</script>

<style>

</style>