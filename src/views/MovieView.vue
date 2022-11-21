<template>
  <div id="movie-view-div">
    <!-- 무비 리스트 아이템 컴포넌트 호출 -->
    <div style="display: flex; flex-wrap: wrap">
      <div v-for="(movie, movie_id) in movies" :key="movie_id">
        <MovieListItem :movie="movie" />
      </div>
    </div>

    <!-- 페이지네이션 컴포넌트 호출 -->
    <div>
      <MovieListPagenation :page="page" @click-pagenation="clickPagenation" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieListItem from "@/components/MovieListItem";
import MovieListPagenation from "@/components/MovieListPagenation";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "MovieView",
  components: {
    MovieListItem,
    MovieListPagenation,
  },

  data() {
    return {
      select: this.$route.params.select,
      movies: [],
      page: 1,
    };
  },

  methods: {
    // 선택한 영화 정보 요청하기
    getMovie() {
      const select = this.select;
      const page = this.page;
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/${select}`,
        qurey: {
          page: page,
        },
        params: {
          page: page
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.movies = res.data;
          this.movies.forEach((movie) => {
            movie.poster_path =
              "https://image.tmdb.org/t/p/original" + movie.poster_path;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 페이지네이션 컴포넌트가 준 이벤트
    clickPagenation(page) {
      const select = this.select;
      this.page = page

      this.$router.push({ name: 'MovieView' , params: {select: select}, query: {page: page} })
      this.getMovie()
    },
  },

  created() {
    this.getMovie();
  },

  updated () {
    window.scrollTo(0, 0)
  }
};
</script>

<style>
</style>