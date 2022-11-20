<!-- 자동포맷해서 세미콜론 있는거에요!! 엔터누를때 댓글작성되는거는 안됩니다 ㅠㅠㅠ 다시해보겠습니다 -->

<template>
  <div>
    <div
      style="display: flex; margin-left: 30px; margin-right: 100px"
      v-if="movie"
    >
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
      <div style="text-align: left; margin-left: 20px">
        <!-- v-if 안적으니까 typeerror 많이 남 -->
        <div v-if="(user, movie)" style="display: flex">
          <h2>{{ movie.title }}</h2>
          <button class="button_css mb-5 ms-2" @click="likeMovie">
            {{ this.likeMessage }}</button
          ><span style="font-size: 20px; margin-top: 6px"
            >({{ movie.like_count }})</span
          >
        </div>
        <p>개봉일 {{ movie.release_date }}</p>
        <br /><br /><br />
        <h4>줄거리</h4>
        <hr />
        <p>{{ movie.overview }}</p>
      </div>
    </div>
    <hr />
    <br />

    <!-- 배우이미지띄우기, 이미지 클릭시 배우프로필 페이지로 이동!! -->
    <div style="display: flex">
      <div
        v-if="(actors[0], actors[1], actors[2])"
        style="text-align: center; margin-left: 30px"
      >
        <h3>출연 배우</h3>
        <br />
        <a :href="`https://www.themoviedb.org/person/${actors[0].actor_id}`">
          <img :src="actors[0].profile_path" alt="" width="140" height="180" />
        </a>
        <p>{{ actors[0].name }}</p>
        <a :href="`https://www.themoviedb.org/person/${actors[1].actor_id}`">
          <img :src="actors[1].profile_path" alt="" width="140" height="180" />
        </a>
        <p>{{ actors[1].name }}</p>
        <a :href="`https://www.themoviedb.org/person/${actors[2].actor_id}`">
          <img :src="actors[2].profile_path" alt="" width="140" height="180" />
        </a>
        <p>{{ actors[2].name }}</p>
      </div>

      <!-- ---댓글 작성 모달띄우기(부트스트랩)--- -->
      <div>
        <!-- 댓글작성 누르는데 댓글수정창도 같이 떠서 id 부분을 밑에 수정창이랑 다르게 만들었음 -->
        <div style="margin-left: 100px">
          <div style="text-align: left; margin-left: 30px">
            <b-button v-b-modal.modal-prevent>댓글 작성</b-button>
          </div>
          <br />
          <MovieCommentList
            :comments="comments"
            @update-comment="updateComment"
            @delete-comment="deleteComment"
          />
        </div>
        <!-- modal-class 지정한거는 ok 버튼 스타일 지정하려고 한거임!! 승태참고해 -->
        <b-modal
          :modal-class="myclass"
          id="modal-prevent"
          ref="modal"
          title="댓글작성"
          @show="resetModal"
          @hidden="resetModal"
          @ok="createComment"
          ok-only
        >
          <form ref="form">
            <!-- 모달창에 별점 지정한 부분 -->
            <star-rating
              :increment="0.5"
              :show-rating="false"
              :border-width="4"
              border-color="#d8d8d8"
              :rounded-corners="true"
              :star-points="[
                23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46,
                19, 31, 17,
              ]"
              style="justify-content: center"
              v-model="rating"
              @rating-selected="setRating"
            >
            </star-rating
            ><br />
            <b-form-group
              label="댓글"
              label-for="comment-input"
              invalid-feedback="Comment is required"
            >
              <!-- 엔터 눌렀을 때도 createComment 호출시킬려고 했는데 안됨... -->
              <b-form-input
                @keyup.enter="createComment"
                id="comment-input"
                v-model="content"
                required
              ></b-form-input>
            </b-form-group>
          </form>
          <!-- footer 쪽 접근하려고 아예 덮어씌워씀 -->
          <template #modal-footer>
            <button
              v-b-modal.modal-close_visit
              class="btn btn-success btn-sm m-1"
              @click="createComment"
            >
              작성
            </button>
          </template>
        </b-modal>
      </div>
      <div v-if="updatecomment">
        <b-modal
          id="modal-prevent-closing"
          ref="modal"
          title="댓글수정"
          @ok="updateCommentPerfect"
          @keyup.enter="updateCommentPerfect"
          v-model="modalshow"
        >
          <form ref="form">
            <star-rating
              :increment="0.5"
              :show-rating="false"
              :border-width="4"
              border-color="#d8d8d8"
              :rounded-corners="true"
              :star-points="[
                23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46,
                19, 31, 17,
              ]"
              style="justify-content: center"
              v-model="updatedcommentrating"
              @rating-selected="setRating"
            >
            </star-rating
            ><br />
            <b-form-group
              label="댓글"
              label-for="comment-input"
              invalid-feedback="Comment is required"
            >
              <b-form-input
                id="comment-input"
                v-model="updatedcommentcontent"
                required
              ></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StarRating from "vue-star-rating";
import MovieCommentList from "@/components/MovieCommentList";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "DetailView",

  components: {
    MovieCommentList,
    StarRating,
  },
  // 마지막에 myclass 는 모달창이랑 관련된 부분
  data() {
    return {
      movie: null,
      content: null,
      rating: null,
      comments: null,
      updatecomment: null, // 자식에서 받아온 바꿔야할 댓글
      updatedcommentcontent: null, // 업데이트될 댓글의 수정된 내용. 이걸 장고에 put 으로 보냄
      updatedcommentrating: null, // 별점
      modalshow: false,
      actorIds: [],
      actors: [],
      user: null,
      likeMessage: "",
      myclass: ["myclass"],
    };
  },

  created() {
    this.getUser();
    this.getMovieDetail();
  },

  methods: {
    getMovieDetail() {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/${this.$route.params.id}`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.movie = res.data.movie;
          this.actorIds = res.data.movie.actors;
          this.movie.poster_path =
            "https://image.tmdb.org/t/p/original" + this.movie.poster_path;
          this.comments = this.movie.comment_set; // 이거붙어야 댓글새로고침 바로됨!!
          // this.movie.video_path = 'https://www.youtube.com/watch?v=' + this.movie.video_path
          this.likeMessage = res.data.isLiking ? "💗" : "🤍";

          this.actorIds.forEach((actorId) => {
            axios({
              method: "get",
              url: `${API_URL}/api/v1/actors/${actorId}`,
              headers: {
                Authorization: `Token ${this.$store.state.token}`,
              },
            })
              .then((res) => {
                res.data.profile_path =
                  "https://image.tmdb.org/t/p/original" + res.data.profile_path;
                this.actors.push(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    createComment() {
      const content = this.content;
      const rating = this.rating * 2;
      console.log(rating);
      if (!content) {
        alert("댓글을 입력해주세요");
        return;
      }
      axios({
        method: "post",
        url: `${API_URL}/api/v1/movies/${this.$route.params.id}/comments/`,
        data: {
          content: content,
          rating: rating,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then(() => {
          this.getMovieDetail();
          this.content = null;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteComment(comment) {
      axios({
        method: "delete",
        url: `${API_URL}/api/v1/comments/${comment.id}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then(() => {
          this.getMovieDetail();
          console.log(this.movie); // 승태한테물어보기. 위에메서드하고도 댓글셋에 있음
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateComment(comment) {
      // MovieCommentList 에서 업데이트할 댓글 가져오는 메서드!!
      this.updatecomment = comment; // 업데이트할 데이터를 updatecomment 로 data에 저장해놓기! 밑에 메서드에서 쓸거임!
      this.updatedcommentcontent = comment.content;
      this.updatedcommentrating = comment.rating;
      this.modalshow = true; // 모델창띄우는 부트스트랩에 modalshow 로 v-model 해놓고, true 로 바꾸면 모달창 띄워짐!!
    },

    updateCommentPerfect() {
      // 댓글 업데이트 장고에 엑시오스할 메서드!!
      this.updatecomment.content = this.updatedcommentcontent;
      this.rating= this.updatedcommentrating * 2;
      axios({
        method: "put",
        url: `${API_URL}/api/v1/comments/${this.updatecomment.id}/`,
        data: {
          content: this.updatedcommentcontent, // 위에 const 안 해놔서 this 붙여야함! 동작은 똑같음!
          rating: this.rating,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then(() => {
          this.getMovieDetail();
          console.log(this.movie); // 승태한테물어보기. 위에메서드하고도 댓글셋에 있음
        })
        .catch((err) => {
          console.log(err);
        });
    },

    resetModal() {
      // 모달창 닫히거나 하면 input 값 초기화시키는 메서드
      this.content = null;
      this.rating = null;
    },

    // 누가 좋아하는지 알아야 하기 때문에!
    getUser() {
      axios({
        method: "get",
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.user = res.data;
          console.log(this.user);
        })
        .catch((err) => {
          console.log("getUserError");
          console.log(err);
        });
    },

    likeMovie() {
      axios({
        method: "post",
        url: `${API_URL}/api/v1/movies/${this.movie.movie_id}/likes/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.likeMessage = res.data.isLiking ? "💗" : "🤍";
          this.getMovieDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setRating(rating) {
      this.rating = rating;
    },
  },
};
</script>


<style>
.button_css {
  font-size: x-large;
  background-color: white;
  border-radius: 5px;
  border: 1px solid white;
  color: #dc3545;
}

/* .button_css:hover{
  border-width: 3px;
  font-size: 2rem;
} */

/* 모달창 버튼 부분 스타일 지정 */
.myclass > .modal-dialog > .modal-content > .modal-footer > button {
  background-color: salmon;
}
</style>