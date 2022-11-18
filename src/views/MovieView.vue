<!-- 전체보기 버튼 미구현 -->
<template>
  <div>
    <PopularMovie/>
    <hr>
    <!-- 장르별 영화 버튼 -->
    <div style="display: flex; justify-content: space-between;">
      <div style="display: flex;">
        <div v-for="(genre, genre_id) in genres" :key="genre_id">
          <button @click="getGenreMovie(genre.id)">{{ genre.name }}</button>
        </div>
      </div>
      <div>
        <button @click="goMovieListByGenre">전체보기</button>
      </div>
    </div>
    <!-- 장르별 영화 응답 -->
    <div v-if="selectedGenreMovies">
      <div style="display: flex; overflow-x: scroll;">
        <div v-for="(movie, movie_id) in selectedGenreMovies" :key="movie_id">
          <MovieListItem :movie="movie"/>
        </div>
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
      selectedGenreMovies: [],
    }
  },

  computed: {
    selectedGenre() {
      return this.$store.state.selectedGenre
    },

    // no setter 에러 뜰 때 처리방법
    genres: {
      set: function () {
      },
      get: function () {
        return this.$store.state.genres
      }
    },

  },

  methods: {
    // 장르 초기 정보 요청
    init() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/genres/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          this.$store.commit('SAVE_GENRES', res.data)
          this.$store.commit('SAVE_SELECTED_GENRE', res.data[0].id)
          this.genres = res.data
          axios({
            method: 'get',
            url: `${API_URL}/api/v1/movies/genres/${res.data[0].id}/init/`,
            headers: {
              Authorization: `Token ${this.$store.state.token}`
            }
          })
            .then((res) => {
              this.selectedGenreMovies = res.data.movies
              this.selectedGenreMovies.forEach((movie) => {
                movie.poster_path = 'https://image.tmdb.org/t/p/original' + movie.poster_path
              })
              this.$store.commit('SAVE_SELECT_MOVIE_LENGTH', res.data.movie_length)
            })
            .catch((err)=> {
              console.log(err)
            })

          })
        
        .catch((err) => {
          console.log(err)
        })
    },

    // 장르 선택 했을 때
    getGenreMovie(genreId) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/genres/${genreId}/init/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          this.selectedGenreMovies = res.data.movies
          this.selectedGenreMovies.forEach((movie) => {
            movie.poster_path = 'https://image.tmdb.org/t/p/original' + movie.poster_path
          })
          this.$store.commit('SAVE_SELECTED_GENRE', genreId)
          this.$store.commit('SAVE_SELECT_MOVIE_LENGTH', res.data.movie_length)
        })
        .catch((err)=> {
          console.log(err)
        })
    },

    // 전체보기 클릭 시
    goMovieListByGenre() {
      const select = `genres/${this.selectedGenre}`
      this.$router.push({ name: 'MovieListView' , params: {select: select} })
    }
  },

  created() {
    if (this.$store.state.genres.length === 0) {
      this.init()
    } else {
      this.getGenreMovie(this.$store.state.selectedGenre)
    }
  }
}
</script>

<style>

</style>