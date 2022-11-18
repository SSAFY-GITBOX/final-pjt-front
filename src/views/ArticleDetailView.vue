<template>
  <div>
    <p>글 번호 : {{ article?.id }}</p>
    <p>작성자 : {{ article?.username }}</p>
    <p>제목 : {{ article?.title }}</p>
    <p>내용 : {{ article?.content }}</p>
    <p>작성시간 : {{ article?.created_at }}</p>
    <p>수정시간 : {{ article?.updated_at }}</p>
    <p>{{ article?.like_count }}명이 좋아합니다.</p>
    <button @click="likeArticle">{{ this.likeMessage }}</button><br><br>
    <button @click="updateArticle">수정</button>
    <button @click="deleteArticle" style="margin-left: 10px">삭제</button>
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
