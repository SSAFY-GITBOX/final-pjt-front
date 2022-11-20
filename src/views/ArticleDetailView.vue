<template>
  <div>
    <p>글 번호 : {{ article?.id }}</p>
    <p>작성자 : {{ article?.username }}</p>
    <p>제목 : {{ article?.title }}</p>
    <p>내용 : {{ article?.content }}</p>
    <p>작성시간 : {{ article?.created_at }}</p>
    <p>수정시간 : {{ article?.updated_at }}</p>
    <p>{{ article?.like_count }}명이 좋아합니다.</p>
    <!-- 버튼들 b-button 으로 해놨음 -->
    <b-button @click="likeArticle">{{ this.likeMessage }}</b-button><br><br>
    <!-- <button @click="updateArticle">수정</button> -->
    <div v-if="($store.state.userPk === article?.user)">
      <b-button v-b-modal.modal-center>수정</b-button>
      <b-button @click="deleteArticle" style="margin-left: 10px">삭제</b-button>
    </div>
    <hr>
    <h3>댓글 ({{ article?.articlecomment_count }})</h3>
    <!-- 댓글 생성 컴포넌트 -->
    <ArticleCreateComment
      @create-comment="createComment"
    />
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
        <template #modal-header="{ close }">
          <!-- Emulate built in modal header close button action -->
          <h5>게시글 수정</h5>
          <b-button size="sm" id="header-button" @click="close()">
            ❌
          </b-button>
        </template>
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
      </b-modal>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import ArticleCommentList from '@/components/ArticleCommentList.vue'
import ArticleCreateComment from '@/components/ArticleCreateComment.vue'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ArticleDetailView',

  components: {
    ArticleCommentList,
    ArticleCreateComment
  },

  data() {
    return {
      article: null,
      initTitle: null,
      initContent: null,
      likeMessage: '',
    }
  },

  created() {
    this.getArticleDetail()
  },

  methods: {
    getArticleDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v2/${this.$route.params.id}`,
        headers: {
					Authorization: `Token ${ this.$store.state.token }`
				}
      })
        .then((res) => {
          this.article = res.data.article
          this.likeMessage = res.data.isLiking ? "좋아요 취소" : "좋아요"
          this.initTitle = this.article.title
          this.initContent = this.article.content
        })
        .catch((err) => {
          console.log(err)
        })
    },

    likeArticle() {
      axios({
        method: 'post',
        url: `${API_URL}/api/v2/${this.article.id}/likes/`,
        headers: {
					Authorization: `Token ${ this.$store.state.token }`
				}
      })
        .then((res) => {
          this.likeMessage = res.data.isLiking ? "좋아요 취소" : "좋아요"
          this.getArticleDetail()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    resetModal() {
      // 모달창 닫히거나 하면 input 값 초기화시키는 메서드
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
        method: 'put',
        url: `${API_URL}/api/v2/${this.$route.params.id}/`,
        headers: {
					Authorization: `Token ${ this.$store.state.token }`
				},
        data: {
          title: this.initTitle,
          content: this.initContent,
        },
      })
        .then(() => {
          this.getArticleDetail()
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteArticle() {
      axios({
        method: 'delete',
        url: `${API_URL}/api/v2/${this.article.id}/`,
        headers: {
					Authorization: `Token ${ this.$store.state.token }`
				}
      })
        .then((res) => {
          console.log(res)
          alert('게시글이 삭제되었습니다.')
          this.$router.push({ name: 'ArticleView'})
        })
        .catch((err) => {
          console.log(err)
        })
    },

    createComment(content) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v2/${this.$route.params.id}/comments/`,
        headers: {
					Authorization: `Token ${ this.$store.state.token }`
				},
        data: {
          content: content,
        },
      })
        .then(() => {
          this.getArticleDetail()
        })
        .catch((err) => {
          console.log(err)
        })
    },  

    updateComment(payload) {
      axios({
        method: 'put',
        url: `${API_URL}/api/v2/comments/${payload.commentId}/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        },
        data: {
          content: payload.content,
        },
      })
        .then(() => {
          this.getArticleDetail()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    deleteComment(commentId) {
      axios({
        method: 'delete',
        url: `${API_URL}/api/v2/comments/${commentId}/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
        .then(() => {
          this.getArticleDetail()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
