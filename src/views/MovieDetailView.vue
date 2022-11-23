<!-- 자동포맷해서 세미콜론 있는거에요!! 엔터누를때 댓글작성되는거는 안됩니다 ㅠㅠㅠ 다시해보겠습니다 -->

<template>
  <div class="show-grid" id="movie-detail-div" :style="{'background-image': 'url(' + movie.poster_path + ')'}">
    <div
      style="
        display: flex;
        width: 100%;
        overflow: auto;
        padding: 30px 30px 30px 30px;
        font-size: x-large;
        background-color: rgba(51, 61, 81, 0.9);
        color: #F5F5DC;
        border-radius: 20px;
        "
      v-if="movie"
    >
      <div>
        <img :src="movie.poster_path" alt="" width="540" height="800" />
      </div>
      <div style="text-align: left; margin-left: 100px; margin-right: 100px">
        <!-- v-if 안적으니까 typeerror 많이 남 -->
        <br />
        <div v-if="(user, movie)" style="display: flex">
          <h1 class="one-line" style="font-weight: bold;">{{ movie.title }}</h1>
          <button class="button_css ms-2" @click="likeMovie">
            <div v-if="(this.likeMessage) === '🖤'">
              <p class="h3"><b-icon-hand-thumbs-up-fill></b-icon-hand-thumbs-up-fill></p>
            </div>
            <div v-else>
              <p class="h3"><b-icon-hand-thumbs-up></b-icon-hand-thumbs-up></p>
            </div>
          </button>
          <span style="font-size: 23px; margin-top: 11px">({{ movie.like_count }})</span>
        </div>
        <p class="one-line">평점 {{ movie.vote_average }} | 개봉일 {{ movie.release_date }}</p><br><br>
        <p>{{ movie.overview }}</p><br><br>
        <div v-if="movie.video_path" style="display: flex;">
          <div>
            <b-button v-b-modal.modal-center style="background-color: #d3ac2b; border: white; width: 200px; height: 70px; font-size: x-large;"><b-icon-caret-right-fill></b-icon-caret-right-fill> Play Trailer</b-button>
            <b-modal
              id="modal-center" 
              centered
              size="xl"
              :header-bg-variant="black"
              :body-bg-variant="black"
              :footer-bg-variant="black"
            >
            <template #default="{ close }">
              <div id="article-modal-header">
                <b-button size="sm" id="header-button" style="margin-left: auto; text-align: right;" @click="close()">
                <b-icon-x-circle-fill></b-icon-x-circle-fill>
                </b-button>
              </div>
              <iframe
              :src="`https://www.youtube.com/embed/${movie.video_path}`"
              width="1100"
              height="650"
              frameborder="0"
              allowfullscreen
              >
            </iframe>
          </template>
            <template #modal-header>
              <div></div>
            </template>
            <template #modal-footer>
              <p></p>
            </template>
            </b-modal>
          </div>
          <div>
            <b-button v-b-modal.modal-prevent style="background-color: #d3ac2b; border: white; width: 200px; height: 70px; font-size: x-large; margin-left: 30px;"><b-icon-star-fill></b-icon-star-fill> 댓글 쓰기</b-button>
          </div>
        </div>
        <div v-else>
          <div>
            <b-button v-b-modal.modal-prevent style="background-color: #d3ac2b; border: white; width: 200px; height: 70px; font-size: x-large;"><b-icon-star-fill></b-icon-star-fill> 댓글 쓰기</b-button>
          </div>
        </div>
        <br><br><br><br>
      </div>
    </div>
    <br>
    <hr />
    <br />

    <!-- 배우이미지띄우기, 이미지 클릭시 배우프로필 페이지로 이동!! -->
    <div
      style="
        width: 100%;
        overflow: auto;
        padding: 20px 30px;
        font-size: large;
        color: #F5F5DC;
        background-color: rgba(51, 61, 81, 0.9);
        border-radius: 20px;
      "
    >
      <h3 style="margin-left: 30px; margin-top: 10px; font-weight: bold">
        Cast
      </h3>
      <div
        v-if="actors"
        style="text-align: center; margin-left: 30px; margin-right: 30px"
      >
        <br />
        <div style="display: flex">
          <div v-for="actor in actors" :key="actor.id">
            <div style="margin-right: 30px; padding-right: 30px">
              <a :href="`https://www.themoviedb.org/person/${actor.actor_id}`">
                <img
                  :src="actor.profile_path"
                  alt=""
                  @error="replaceByDefault"
                  width="140"
                  height="210"
                />
              </a>
              <p>{{ actor.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br /><br />
    <!-- ---댓글 작성 모달띄우기(부트스트랩)--- -->
    <div>
      <!-- 댓글작성 누르는데 댓글수정창도 같이 떠서 id 부분을 밑에 수정창이랑 다르게 만들었음 -->
      <div
        style="
          padding: 20px 30px;
          font-size: large;
          background-color: rgba(51, 61, 81, 0.9);
          color: #F5F5DC;
          border-radius: 20px;
        "
      >
        <!-- <b-button v-b-modal.modal-prevent style="width: 120px; height: 50px;">댓글 작성</b-button> -->
        <h3 style="margin-left: 30px; margin-top: 30px; font-weight: bold">
          GITBOX 사용자 댓글
        </h3>
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
        centered
        id="modal-prevent"
        ref="modal"
        size="lg"
        title="댓글작성"
        @show="resetModal"
        @hidden="resetModal"
      >
        <form ref="form">
          <br /><br />
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
          ><br /><br />
          <b-form-group
            label="댓글"
            label-for="comment-input"
            label-size="xl"
            invalid-feedback="Comment is required"
          >
            <!-- 엔터 눌렀을 때도 createComment 호출시킬려고 했는데 안됨... -->
            <b-form-textarea
              @keyup.enter="createComment"
              placeholder="고객님의 소중한 댓글을 기다리고 있어요"
              id="comment-input"
              v-model="content"
              required
            ></b-form-textarea>
          </b-form-group>
        </form>
        <template #modal-header="{ close }">
          <span size="lg" style="margin-right: auto; text-align: left"
            >댓글 작성</span
          >
          <b-button
            size="lg"
            id="header-button"
            style="margin-left: auto; text-align: right"
            @click="close()"
          >
          <div style="width: 25px; height: 25px; border-radius: 15px; background-color: #F5F5DC;">
            <b-icon-x-circle-fill style="color: #D3AC2B"></b-icon-x-circle-fill>
          </div>
          </b-button>
        </template>
        <!-- footer 쪽 접근하려고 아예 덮어씌워씀 -->
        <template #modal-footer>
          <button
            v-b-modal.modal-close_visit
            class="btn btn-success btn-lg m-1"
            @click="createComment"
          >
            작성
          </button>
        </template>
      </b-modal>
    </div>
    <div v-if="updatecomment">
      <b-modal
        :modal-class="myclass"
        centered
        id="modal-prevent-closing"
        ref="modal"
        size="lg"
        title="댓글수정"
        @keyup.enter="updateCommentPerfect"
        v-model="modalshow"
      >
        <form ref="form">
          <br /><br />
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
          ><br /><br />
          <b-form-group
            label="댓글"
            label-for="comment-input"
            label-size="lg"
            invalid-feedback="Comment is required"
          >
            <b-form-textarea
              id="comment-input"
              v-model="updatedcommentcontent"
              required
            ></b-form-textarea>
          </b-form-group>
        </form>
        <template #modal-header="{ close }">
          <span size="lg" style="margin-right: auto; text-align: left;">댓글 수정</span>
          <b-button size="lg" id="header-button" style="margin-left: auto; text-align: right;" @click="close()">
            <div style="width: 25px; height: 25px; border-radius: 15px; background-color: #F5F5DC;">
              <b-icon-x-circle-fill style="color: #D3AC2B"></b-icon-x-circle-fill>
            </div>
          </b-button>
        </template>
        <!-- footer 쪽 접근하려고 아예 덮어씌워씀 -->
        <template #modal-footer>
          <button
            v-b-modal.modal-close_visit
            class="btn btn-success btn-lg m-1"
            @click="updateCommentPerfect"
          >
            작성
          </button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StarRating from "vue-star-rating";
import MovieCommentList from "@/components/MovieCommentList";
import img from "../assets/actorimage.png";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "MovieDetailView",

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
      black: "dark",
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
          this.likeMessage = res.data.isLiking ? "🖤" : "🤍";
          console.log(this.movie);

          if (this.actors.length === 0) {
            this.actorIds.forEach((actorId) => {
              axios({
                method: "get",
                url: `${API_URL}/api/v1/actors/${actorId}`,
                headers: {
                  Authorization: `Token ${this.$store.state.token}`,
                },
              })
                .then((res) => {
                    res.data.profile_path = "https://image.tmdb.org/t/p/original" + res.data.profile_path;
                    this.actors.push(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          }
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
          this.rating = null;
          this.$bvModal.hide("modal-prevent"); // ok 버튼을 덮어씌워서 이거 써줘야 모달창 닫힘!!!
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
      this.updatedcommentrating = comment.rating / 2;
      this.modalshow = true; // 모델창띄우는 부트스트랩에 modalshow 로 v-model 해놓고, true 로 바꾸면 모달창 띄워짐!!
    },

    updateCommentPerfect() {
      // 댓글 업데이트 장고에 엑시오스할 메서드!!
      this.updatecomment.content = this.updatedcommentcontent;
      this.rating = this.updatedcommentrating * 2;
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
          this.$bvModal.hide("modal-prevent-closing"); // ok 버튼을 덮어씌워서 이거 써줘야 모달창 닫힘!!!
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
          this.likeMessage = res.data.isLiking ? "🖤" : "🤍";
          this.getMovieDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setRating(rating) {
      this.rating = rating;
    },
    replaceByDefault(e) {
      e.target.src = img;
    },
  },
};
</script>


<style>
#movie-detail-div {
  /* background-color: #e0e7e9; */
  padding: 3% 5%;
  display: flex;
  flex-direction: column;
  text-align: start;
  color: black;
  /* font-family: "DOHYEON"; */
}

/* 마우스 올려놨을떄의 css */
button:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.button_css {
  font-size: x-large;
  background-color: rgba(51, 61, 81, 0);
  border-radius: 5px;
  border: none;
  color: #dc3545;
}

/* 모달창 버튼 부분 스타일 지정 */
.myclass > .modal-dialog > .modal-content > .modal-footer > button {
  background-color: #d3ac2b;
  border: white;
}

.myclass > .modal-dialog > .modal-content > .modal-header {
  font-size: x-large;
}

#modal-center___BV_modal_content_ {
  width: 1132px;
}

#modal-prevent___BV_modal_body_, #modal-prevent___BV_modal_header_, #modal-prevent___BV_modal_footer_ {
  /* background-color: #e0e7e9; */
  background-color: rgba(51, 61, 81, 0.9);
  color: #F5F5DC;
  font-family: "DOHYEON";
  border: none;
}

#modal-prevent-closing___BV_modal_header_, #modal-prevent-closing___BV_modal_body_, #modal-prevent-closing___BV_modal_footer_ {
  background-color: rgba(51, 61, 81, 0.9);
  color: #F5F5DC;
  font-family: "DOHYEON";
  border: none;
}
</style>