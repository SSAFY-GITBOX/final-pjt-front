<template>
  <div>
    <p>{{content}} (으)로 검색한 결과</p>
    <div v-if="searchedMovies.length==0">
      <p>검색 결과가 없습니다</p>
    </div>
    <div v-else>
      <div v-for="(searchedMovie, movie_id) in searchedMovies" :key="movie_id">
        <p>제목 : {{ searchedMovie.title }}</p>
        <p>줄거리 : {{ searchedMovie.overview }}</p>
        <p>id : {{ searchedMovie.movie_id }}</p>
        <MovieListItem
          :movie="searchedMovie"
        />
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'
import axios from 'axios'

const API_URL = "http://127.0.0.1:8000";

export default {
  name: 'SearchedMovieView',
  components: {
    MovieListItem,
  },

  data() {
    return {
      searchedMovies: [],
    }
  },

  computed: {
    content() {
      this.getSearchedMovie()
      return this.$route.params.content
    }
  },

  methods: {
    getSearchedMovie() {
      const content = this.$route.params.content
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/search`,
        params: {
          content: content,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          console.log(res)
          this.searchedMovies = res.data
          this.searchedMovies.forEach((movie) => {
            movie.poster_path = 'https://image.tmdb.org/t/p/original' + movie.poster_path
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created() {
    this.getSearchedMovie()
  },
  // updated() {
  //   this.getSearchedMovie()
  // }
}
</script>

<style>

</style>