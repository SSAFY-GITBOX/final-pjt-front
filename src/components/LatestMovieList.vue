<template>
  <div id="latest-movie-list">
    <div id="latest-movie-list-header">
      <h4 class="mb-0"><span style="color: crimson;">최신 영화</span>를 감상해보세요!</h4>
      <div style="display: flex;">
        <div class="icon-div" @click="leftScroll">
          <i class="fas fa-angle-left fa-lg"></i>
        </div>
        <div style="width: 10px;">
          
        </div>
        <div class="icon-div" @click="rightScroll">
          <i class="fas fa-angle-right fa-lg"></i>
        </div>
      </div>
    </div>
    <div id="latest-movie-list-body">
      <MovieListItem
        v-for="(movie, index) in latestMovies"
        :key="index"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/js/swiper.min.js"></script>
<script>
import MovieListItem from "@/components/MovieListItem";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";
export default {
  name: "LetestMovieList",
  components: {
    MovieListItem,
  },
  data() {
    return {
      latestMovies: null,
      isMouseDown: false,
    };
  },

  methods: {
    getLatestMovieList() {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/latest/init/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.$store.commit("LATEST_MOVIE_LENGTH", res.data.movie_length);
          this.latestMovies = res.data.movies;
          this.latestMovies.forEach((movie) => {
            movie.poster_path =
              "https://image.tmdb.org/t/p/original" + movie.poster_path;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    leftScroll() {
      const bodyDiv = document.querySelector('#latest-movie-list-body')
      bodyDiv.scrollLeft -= bodyDiv.clientWidth
    },

    rightScroll() {
      const bodyDiv = document.querySelector('#latest-movie-list-body')
      bodyDiv.scrollLeft += bodyDiv.clientWidth
    },
  },

  created() {
    this.getLatestMovieList();
  },
};
</script>

<style>
#latest-movie-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 20px;
  background-color: #333D51;
  color: #F5F5DC;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 20px;
}

#latest-movie-list-header {
  width: 100%;
  padding: 20px;
  padding-bottom: 0px;
  display: flex;
  justify-content: space-between;
}

#latest-movie-list-body {
  width: 100%;
  display: flex;
  overflow: auto;
  scroll-behavior: smooth;
}

/* 스크롤바 숨기기 */
#latest-movie-list-body::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
}

.icon-div{
  width: 20px;
  padding: 5px 0px 0px 5px;
}

.icon-div:hover{
  cursor: pointer;
}

</style>