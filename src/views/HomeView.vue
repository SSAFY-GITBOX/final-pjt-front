<!-- 전체보기 버튼 미구현 -->
<template>
  <div id="home-view-div">
    <LatestMovieList />
    <hr />

    <div id="home-genre-movie-div">
      <!-- 장르별 영화 버튼 -->
      <h4 style="padding:20px 20px 0px 20px; margin: 0px">장르별 영화를 감상해 보세요!</h4>
      <div id="genre-movie-header">
        <div style="display: flex" class="genre-btn-div">
          <div v-for="(genre, genre_id) in genres" :key="genre_id" id="genre-btn-div">
            <button class="genre-btn" :class="{'selected-genre-btn': selectedGenreBtnIndex === genre_id }" @click="getGenreMovie(genre.id, genre_id)">{{ genre.name }}</button>
            <span style="padding: 10px"></span>
          </div>
        </div>
        <div>
          <button class="genre-more-btn" @click="goMovieListByGenre"><span style="font-size: 20px"> 더 보기  </span><i class="fas fa-angle-right fa-lg"></i> </button>
        </div>
      </div>
      <!-- 장르별 영화 응답 -->
      <div id="genre-movie-body" v-if="selectedGenreMovies">
        <div style="display: flex">
          <div v-for="(movie, movie_id) in selectedGenreMovies" :key="movie_id">
            <MovieListItem :movie="movie" />
          </div>
        </div>
      </div>
      <div id="scroll-btn-div">
        <div class="genre-icon-div" @click="leftScroll">
          <i class="fas fa-angle-left fa-2x"></i>
        </div>
        <div class="genre-icon-div" @click="rightScroll">
          <i class="fas fa-angle-right fa-2x"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LatestMovieList from "@/components/LatestMovieList.vue";
import MovieListItem from "@/components/MovieListItem.vue";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: 'HomeView',

  components: {
    LatestMovieList,
    MovieListItem,
  },

  data() {
    return {
      selectedGenreMovies: [],
      selectedGenreBtnIndex: 0,
    };
  },

  computed: {
    selectedGenre() {
      return this.$store.state.selectedGenre;
    },

    // no setter 에러 뜰 때 처리방법
    genres: {
      set: function () {},
      get: function () {
        return this.$store.state.genres;
      },
    },
  },

  methods: {
    // 장르 초기 정보 요청
    init() {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/genres/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.$store.commit("SAVE_GENRES", res.data);
          this.$store.commit("SAVE_SELECTED_GENRE", res.data[0].id);
          this.genres = res.data;
          axios({
            method: "get",
            url: `${API_URL}/api/v1/movies/genres/${res.data[0].id}/init/`,
            headers: {
              Authorization: `Token ${this.$store.state.token}`,
            },
          })
            .then((res) => {
              this.selectedGenreMovies = res.data.movies;
              this.selectedGenreMovies.forEach((movie) => {
                movie.poster_path =
                  "https://image.tmdb.org/t/p/original" + movie.poster_path;
              });
              this.$store.commit(
                "SAVE_SELECT_MOVIE_LENGTH",
                res.data.movie_length
              );
            })
            .catch((err) => {
              console.log(err);
            });
        })

        .catch((err) => {
          console.log(err);
        });
    },

    // 장르 선택 했을 때
    getGenreMovie(genreId, genre_index) {
      this.selectedGenreBtnIndex = genre_index
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/genres/${genreId}/init/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.selectedGenreMovies = res.data.movies;
          this.selectedGenreMovies.forEach((movie) => {
            movie.poster_path =
              "https://image.tmdb.org/t/p/original" + movie.poster_path;
          });
          this.$store.commit("SAVE_SELECTED_GENRE", genreId);
          this.$store.commit("SAVE_SELECT_MOVIE_LENGTH", res.data.movie_length);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 전체보기 클릭 시
    goMovieListByGenre() {
      const select = `genres/${this.selectedGenre}`;
      this.$router.push({
        name: "MovieView",
        params: { select: select },
        query: { page: 1 },
      });
    },

    leftScroll() {
      const bodyDiv = document.querySelector("#genre-movie-body");
      bodyDiv.scrollLeft -= bodyDiv.clientWidth;
    },

    rightScroll() {
      const bodyDiv = document.querySelector("#genre-movie-body");
      bodyDiv.scrollLeft += bodyDiv.clientWidth;
    },
  },

  created() {
		if (!this.$store.getters.isLogin) {
			this.$router.push({ name: 'LogInView' })
		}

    if (this.$store.state.genres.length === 0) {
      this.init();
    } else {
      this.getGenreMovie(this.$store.state.selectedGenre, 0);
    }
  },
};
</script>

<style>
#home-view-div {
  background-image: url("../assets/back-image.png");
  /* background-color: #6C7A89; */
  padding: 3% 5%;
}

#home-genre-movie-div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 20px;
  background-color: rgba(51, 61, 81, 0.9);
  /* opacity: 0.9; */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 20px;
  color: #F5F5DC;
}

#genre-movie-header {
  width: 100%;
  padding: 20px; 
  padding-bottom: 0px;
  display: flex;
  justify-content: space-between;
}

#genre-movie-body {
  width: 100%;
  display: flex;
  overflow: auto;
  scroll-behavior: smooth;
}

#genre-movie-body::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
}

#scroll-btn-div {
  width: 100%;
  height: 0px;
  padding-left: 15px; 
  padding-right: 15px;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: -220px;
}

.genre-icon-div {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  padding: 5px 5px 5px 5px;
  background-color: #D3AC2B
}

.genre-icon-div:hover{
  cursor: pointer;
}

#genre-movie-header{
  padding-top: 0px;
  flex-wrap: nowrap;
  width: 100%;
}

.genre-btn-div {
  width: 93%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}

.genre-btn{
  height: 32px;

  border-radius: 20px;
  border: none;
  padding: 0px 16px;
  margin-top: 10px;
  background-color: #2e3133;
  color: #F5F5DC;
}

.genre-btn:hover{
  transform: none;
  background-color: #D3AC2B;
}

.genre-more-btn{
  white-space: nowrap;
  font-size: 16px;
  background-color: #2e3133;
  cursor: pointer;
  margin-top: 10px;
  padding: 0px 20px;
  height: 55px;
  text-align:center;
  border: none;
  background-size: 300% 100%;
  border-radius: 50px;
  color: #F5F5DC;

}

.genre-more-btn:hover{
  background-color: #D3AC2B;
}

.selected-genre-btn{
  background-color: #D3AC2B;
}
</style>