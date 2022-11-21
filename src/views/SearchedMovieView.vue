<template>
  <div id="searched-movie-view-div">
    <h2>
      <b
        >'<span style="color: crimson">{{ content }}</span
        >'(으)로 검색한 결과 ({{ searchedMovies.length }})</b
      >
    </h2>
    <div v-if="searchedMovies.length == 0">
      <p>검색 결과가 없습니다</p>
    </div>
    <div v-else>
      <div style="display: flex; flex-direction: column"
          v-for="(searchedMovie, movie_id) in searchedMovies"
          :key="movie_id"
      >
        <div
        id="searched-movie-div"
          style="display: flex; padding-bottom: 20px"
        >
          <div id="poster-div">
            <MovieListItem :movie="searchedMovie" />
          </div>
          <div id="content-div">
            <h4>
              <b>{{ searchedMovie.title }}</b>
            </h4>
            <h5>
              <span v-for="(genre, index) in searchedMovie.genres" :key="index">
                <span v-if="index != 0">, </span>
                {{ genre.name }}</span
              >
            </h5>
            <p>{{ searchedMovie.overview }}</p>
          </div>
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import MovieListItem from "@/components/MovieListItem";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "SearchedMovieView",
  components: {
    MovieListItem,
  },

  data() {
    return {
      searchedMovies: [],
    };
  },

  computed: {
    content() {
      this.getSearchedMovie();
      return this.$route.params.content;
    },
  },

  methods: {
    getSearchedMovie() {
      const content = this.$route.params.content;
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/search`,
        params: {
          content: content,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.searchedMovies = res.data;

          this.searchedMovies.forEach((movie) => {
            const tempGenres = [];
            movie.poster_path =
              "https://image.tmdb.org/t/p/original" + movie.poster_path;
            movie.genres.forEach((genre) => {
              genre = this.$store.state.genres.find((s_genre) => {
                return s_genre.id === genre;
              });
              tempGenres.push(genre);
            });
            movie.genres = tempGenres;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getSearchedMovie();
  },
};
</script>

<style>
#searched-movie-view-div {
  background-color: pink;
  padding: 3% 5%;
  display: flex;
  flex-direction: column;
  text-align: start;
}

#searched-movie-div {
  background-color: yellow;

}

#content-div {
  padding-top: 20px;
  height: 384px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>