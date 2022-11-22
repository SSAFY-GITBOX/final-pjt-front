<template>
  <div id="article-detail-div">
    <div>
      <!-- 작성자 -->
      <div id="article-writer-div">
        <div v-if="articleUser_profile_path">
          <img
            :src="articleUser_profile_path"
            id="writer-profile-image"
            class="rounded-circle shadow"
          />
        </div>
        <div v-else>
          <img
            src="../assets/default_profile_image.png"
            id="writer-profile-image"
            class="rounded-circle shadow"
          />
        </div>
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <div class="one-line">
            <p style="padding-left: 20px; font-size:48px; margin: 0px">{{ article?.username }}</p>
          </div>
          <div class="one-line">
            <p style="margin: 0px;">작성일 : {{ article?.updated_at.substr(0, 10) }}</p>
          </div>
        </div>
      </div>

      <!-- 제목 -->
      <div id="article-title-div">
        <p class="one-line" style="font-size:24px; margin-bottom: 20px">제목 : {{ article?.title }}</p>
      </div>

      <!-- 내용 -->
      <div id="article-content-div">
        <p style="margin: 0px;">내용 : {{ article?.content }}</p>
      </div>

      <!-- 좋아요 -->
      <div id="article-likes-div">
        <div style="display: flex; justify-content: center; align-items: center;">
          <div id="article-like-icon-div" @click="likeArticle">
            <b-icon v-if="isLiked" icon="check-circle-fill" style="width: 100%; height: 100%"></b-icon>
            <b-icon v-else icon="check-circle" style="width: 100%; height: 100%"></b-icon>

          </div>
          <div style="padding-left:20px; height: 50px; display: flex; justify-content: center;">
            <p style="font-size:32px; margin: 0px">{{ article?.like_count }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 본인 게시글일 때 -->
    <div v-if="$store.state.userPk === article?.user" style="display: flex; justify-content: flex-end;">
      <b-button v-b-modal.modal-center>수정</b-button>
      <b-button @click="deleteArticle" style="margin-left: 10px">삭제</b-button>
    </div>



    <hr />
    <h3>댓글 ({{ article?.articlecomment_count }})</h3>
    <!-- 댓글 생성 컴포넌트 -->
    <ArticleCreateComment @create-comment="createComment" />
    <div v-if="article?.articlecomment_count">
      <!-- 댓글 리스트 컴포넌트 -->
      <ArticleCommentList
        :comments="article?.articlecomment_set"
        @update-comment="updateComment"
        @delete-comment="deleteComment"
      />
    </div>
    <div v-else>
      <p>댓글이 없습니다.</p>
    </div>
    <!-- 게시글 수정 모달창 구현 부분 -->
    <div>
      <!-- 여기부터 모달창 -->
      <b-modal
        class="b-modal"
        id="modal-center"
        centered
        ref="modal"
        title="게시글작성"
        size="xl"
        @show="resetModal"
        @hidden="resetModal"
        @ok="updateArticle"
      >
        <!-- 기존 모달 헤더 삭제-->
        <template #modal-header>
          <div></div>
        </template>
        <template #default="{ close, ok, cancel }">
          <div id="article-modal-header">
            <h5>게시글 작성</h5>
            <b-button size="sm" id="header-button" @click="close()">
              ❌
            </b-button>
          </div>
          <b-form-group
            label="제목"
            label-for="article-title-input"
            invalid-feedback="Comment is required"
          >
            <!-- 제목 부분 -->
            <b-form-input
              id="article-title-input"
              v-model.trim="initTitle"
              required
            ></b-form-input>
          </b-form-group>
          <div style="padding-top: 20px">
            <form ref="form">
              <b-form-group
                class="modal-text"
                label="내용"
                label-for="article-content-input"
                invalid-feedback="Comment is required"
              >
                <!-- 내용 부분은 textarea로 바꿔줬음 -->
                <b-form-textarea
                  id="article-content-input"
                  v-model.trim="initContent"
                  required
                  rows="20"
                ></b-form-textarea>
              </b-form-group>
            </form>
          </div>

          <!-- 푸터 -->
          <div id="article-modal-footer">
            <div style="padding-left: 16px; padding-top: 16px">
              <b-button size="sm" variant="primary" @click="ok()">
                OK
              </b-button>
            </div>
            <div style="padding-left: 16px; padding-top: 16px">
              <b-button size="sm" variant="danger" @click="cancel()"
                >Cancel</b-button
              >
            </div>
          </div>
        </template>
        <!-- 기존 모달 푸터 삭제 -->
        <template #modal-footer>
          <div></div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ArticleCommentList from "@/components/ArticleCommentList.vue";
import ArticleCreateComment from "@/components/ArticleCreateComment.vue";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "ArticleDetailView",

  components: {
    ArticleCommentList,
    ArticleCreateComment,
  },

  data() {
    return {
      article: null,
      articleUser: null,
      articleUser_profile_path: null,
      initTitle: null,
      initContent: null,
      isLiked: "",
    };
  },

  created() {
    this.getArticleDetail();
  },

  methods: {
    getArticleDetail() {
      axios({
        method: "get",
        url: `${API_URL}/api/v2/${this.$route.params.id}`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.article = res.data.article;
          this.isLiked = res.data.isLiking;
          this.initTitle = this.article.title;
          this.initContent = this.article.content;

          axios({
            method: "get",
            url: `${API_URL}/accounts/profile/${this.article.user}/`,
            headers: {
              Authorization: `Token ${this.$store.state.token}`,
            },
          })
            .then((res) => {
              this.articleUser = res.data.user;
              console.log(this.articleUser);
              if (this.articleUser.profile_image_url != null) {
                this.articleUser_profile_path = `http://127.0.0.1:8000${this.articleUser?.profile_image_url}`;
              }
              console.log(this.articleUser_profile_path);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    likeArticle() {
      axios({
        method: "post",
        url: `${API_URL}/api/v2/${this.article.id}/likes/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.likeMessage = res.data.isLiking ? "좋아요 취소" : "좋아요";
          this.getArticleDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    resetModal() {
      this.title = null;
      this.content = null;
    },

    hideModal() {
      this.$root.$emit("bv::hide::modal", "modal-1", "#btnShow");
    },

    updateArticle() {
      if (!this.initTitle) {
        alert("제목을 입력해주세요");
        return;
      } else if (!this.initContent) {
        alert("내용을 입력해주세요");
        return;
      }
      axios({
        method: "put",
        url: `${API_URL}/api/v2/${this.$route.params.id}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
        data: {
          title: this.initTitle,
          content: this.initContent,
        },
      })
        .then(() => {
          this.getArticleDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteArticle() {
      axios({
        method: "delete",
        url: `${API_URL}/api/v2/${this.article.id}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          console.log(res);
          alert("게시글이 삭제되었습니다.");
          this.$router.push({ name: "ArticleView" });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    createComment(content) {
      axios({
        method: "post",
        url: `${API_URL}/api/v2/${this.$route.params.id}/comments/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
        data: {
          content: content,
        },
      })
        .then(() => {
          this.getArticleDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateComment(payload) {
      axios({
        method: "put",
        url: `${API_URL}/api/v2/comments/${payload.commentId}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
        data: {
          content: payload.content,
        },
      })
        .then(() => {
          this.getArticleDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteComment(commentId) {
      axios({
        method: "delete",
        url: `${API_URL}/api/v2/comments/${commentId}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then(() => {
          this.getArticleDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
#article-detail-div {
  background-color: pink;
  padding: 3% 5%;
  display: flex;
  flex-direction: column;
  text-align: start;
}

#article-writer-div {
  display: flex;
  justify-content: flex-start;
  align-items : center;
}

.one-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;  /* 말줄임 적용 */
}

#writer-profile-image {
  width: 100px;
  height: 100px;
}

#article-title-div{
  padding-top: 50px;
}

#article-content-div{
  height: 300px;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-bottom: 50px;
}

#article-content-div::-webkit-scrollbar {
  display: none;
}

#article-like-icon-div{
  width: 50px;
  height: 50px;

  /* display: flex; justify-content: center; align-items: center;
  border-radius: 25px;
  padding-top: 5px;
  border: 1px solid black; */
}
</style>