<!-- 자동포맷해서 세미콜론 있는거에요!! -->

<template>
  <div>
    <div v-if="movie">
      <div v-if="movie.video_path">
        <iframe
          :src="`https://www.youtube.com/embed/${movie.video_path}`"
          width="640"
          height="360"
          frameborder="0"
          allowfullscreen
        >
        </iframe>
      </div>
      <div v-else>
        <img :src="movie.poster_path" alt="" height="360" />
      </div>
      <p>{{ movie.title }}</p>
      <hr />
      <p>댓글</p>
      <form @submit.prevent="createComment">
        <label for="content">내용: </label>
        <input type="text" id="content" v-model.trim="content" />
        <div class="star-rating space-x-4 mx-auto">
          <input type="radio" id="5-stars" name="rating" value="10" />
          <label for="5-stars" class="star pr-4">★</label>
          <input type="radio" id="4-stars" name="rating" value="8" />
          <label for="4-stars" class="star">★</label>
          <input type="radio" id="3-stars" name="rating" value="6" />
          <label for="3-stars" class="star">★</label>
          <input type="radio" id="2-stars" name="rating" value="4" />
          <label for="2-stars" class="star">★</label>
          <input type="radio" id="1-star" name="rating" value="2" />
          <label for="1-star" class="star">★</label>
        </div>
        <br />
        <button type="submit" id="submit">작성</button>
      </form>
    </div>
    <hr />
    <br />
    <MovieCommentList 
      :comments="comments"
    />
  </div>
</template>

<script>
import axios from "axios";
import MovieCommentList from "@/components/MovieCommentList";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "DetailView",
  components: {
    MovieCommentList,
  },
  data() {
    return {
      movie: null,
      content: null,
      rating: 3,
      comments: null,
    };
  },
  created() {
    this.getMovieDetail();
  },

  methods: {
    getMovieDetail() {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/${this.$route.params.id}`,
      })
        .then((res) => {
          this.movie = res.data;
          this.movie.poster_path =
            "https://image.tmdb.org/t/p/original" + this.movie.poster_path;
          this.comments = this.movie.comment_set  // 이거붙어야 댓글새로고침 바로됨!!
          // this.movie.video_path = 'https://www.youtube.com/watch?v=' + this.movie.video_path
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createComment() {
      const content = this.content;
      const rating = this.rating;
      if (!content) {
        alert("제목을 입력해주세요");
        return;
      }
      axios({
        method: "post",
        url: `${API_URL}/api/v1/movies/${this.$route.params.id}/comments/`,
        data: {
          content: content,
          rating: rating,
        },
        // headers: {
        //   Authorization: `Token ${this.$store.state.token}`
        // }
      })
        .then(() => {
          this.getMovieDetail()
          this.content = null
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
}
</script>


<style>
.star-rating {
  display: flex;
  flex-direction: row-reverse;
  font-size: 2.25rem;
  line-height: 2.5rem;
  justify-content: space-around;
  padding: 0 0.2em;
  text-align: center;
  width: 5em;
}

.star-rating input {
  display: none;
}

.star-rating label {
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 2.3px;
  -webkit-text-stroke-color: #2b2a29;
  cursor: pointer;
}

.star-rating :checked ~ label {
  -webkit-text-fill-color: gold;
}

.star-rating label:hover,
.star-rating label:hover ~ label {
  -webkit-text-fill-color: #fff58c;
}
</style>