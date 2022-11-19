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
    <b-button v-b-modal.modal-prevent>수정</b-button>
    <b-button @click="deleteArticle" style="margin-left: 10px">삭제</b-button>
    <hr>
    <h3>댓글 ({{ article?.articlecomment_count }})</h3>
    <div v-if="article?.articlecomment_count">
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
      <b-modal
        id="modal-prevent"
        ref="modal"
        title="게시글수정"
        @show="resetModal"
        @hidden="resetModal"
        @ok="updateArticle"
      >
        <form ref="form">
          <b-form-group
            label="제목"
            label-for="article-title-input"
            invalid-feedback="Comment is required"
          >
            <!-- 엔터쳤을 때 메서드호출하는거는 아직 구현못함 -->
            <b-form-input
              @keyup.enter="createArticle"
              id="article-title-input"
              v-model.trim="title"
              required
            ></b-form-input>
          </b-form-group>
        </form>
        <form ref="form">
          <b-form-group
            class="modal-text"
            label="내용"
            label-for="article-content-input"
            invalid-feedback="Comment is required"
          >
            <!-- 내용 부분은 textarea로 바꿔줬음 -->
            <b-form-textarea
              @keyup.enter="createArticle"
              id="article-content-input"
              v-model.trim="content"
              required
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

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ArticleDetailView',

  components: {
    ArticleCommentList
  },

  data() {
    return {
      article: null,
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

    updateArticle() {
      console.log("updateArticle")
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

    updateComment(commentId) {
      console.log(commentId)
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
