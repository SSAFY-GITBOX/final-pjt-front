<template>
  <div id="searched-movie-view-div">
    <h2 style="padding: 20px;">
      <b
        >'<span style="color: crimson;">{{ content }}</span
        >'(으)로 검색한 결과 ({{ searchedMovies.length }})</b
      >
    </h2>
    <div v-if="searchedMovies.length == 0">
      <p>검색 결과가 없습니다</p>
    </div>
    <div v-else>
      <div
        style="display: flex; flex-direction: column"
        v-for="(searchedMovie, movie_id) in searchedMovies"
        :key="movie_id"
      >
        <div id="searched-movie-div">
          <div id="poster-div">
            <MovieListItem :movie="searchedMovie" />
          </div>
          <div id="content-div">
            <h4 class="one-line">
              <b>{{ searchedMovie.title }}</b>
            </h4>
            <h5 class="one-line">
              <span v-for="(genre, index) in searchedMovie.genres" :key="index">
                <span v-if="index != 0">, </span>
                {{ genre.name }}</span
              >
            </h5>
            <p id="overview">{{ searchedMovie.overview }}</p>
          </div>
        </div>
        <hr />
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
  color: #333D51;
  background-color: #F5F5DC;
  padding: 3% 5%;
  display: flex;
  flex-direction: column;
  text-align: start;
  
}

#searched-movie-div {
  display: flex;
  color: #F5F5DC;
  background-color: rgba(51, 61, 81, 0.9);
  padding: 10px 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 20px;
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

.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

#overview {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 11;
  -webkit-box-orient: vertical;
}
</style>