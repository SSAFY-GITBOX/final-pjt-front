<template>
  <div class="w-100 h-100 mx-3 mb-5">
    

    <!-- 프로필 -->
    <div id="profile_image" class="mb-5 mx-3">
      <form @submit.prevent="imageUpload" enctype="multipart/form-data">
        <div v-if="user.profile_image">
          <img
          :src="user.profile_image"
          class="rounded-circle shadow"
          style="width: 200px; height: 200px;"
          >
        </div>
        <div v-else>
          <img
          class="rounded-circle shadow"
          style="width: 200px; height: 200px;"
          id="preview-image"
          src="https://dummyimage.com/500x500/ffffff/000000.png&text=preview+image"
          >
        </div><br>
        <input type="file" id="file" value="프로필 이미지 수정" @change="onChange"><br><br>
        <input type="submit" value="제출">
      </form>

      <h2 class="mt-3">{{ user.username }}</h2>
    </div>

    <!-- 좋아하는 영화 -->
    <div class="mb-5">
      <details class="mx-3">
        <summary>좋아하는 영화 목록</summary>
        <div
          v-for="movie in user.like_movies"
          :key=movie.movie_id
        >
          <router-link :to="{ name: 'DetailView', params: { id: movie.movie_id } }" style="text-decoration: none;" class="mx-3">
            {{ movie.title }}
          </router-link>
        </div>
      </details>
    </div>

    <!-- 좋아하는 게시글 -->
    <div class="mb-5">
      <details class="mx-3">
        <summary>좋아하는 게시글</summary>
        <div
          v-for="article in user.like_articles"
          :key=article.id
        >
          <router-link :to="{ name: 'ArticleDetailView', params: { id: article.id } }" style="text-decoration: none;" class="mx-3">
            {{ article.title }}
          </router-link>
        </div>
      </details>
    </div>

    <!-- 잔디 -->
    <calendar-heatmap
      :values="acts"
      :end-date="today"
      :max="max_count"
      class="w-100"
    />
    <br>

    <!-- 활동 내역 -->
    <details>
      <summary class="mx-3">상세보기</summary>
      <br>
      <br>
      <h3>Movie 댓글</h3>
      <div
        v-for="comment in user.comment_set"
        :key=comment.id
      >
        <router-link :to="{ name: 'DetailView', params: { id: comment.movie } }" style="text-decoration: none;">
          {{ comment.content }} - {{ comment.created_at.substr(0, 10) }}
        </router-link>
      </div>
      <hr>
      <h3>Community 게시글</h3>
      <div
        v-for="article in user.article_set"
        :key=article.id
      >
        <router-link :to="{ name: 'ArticleDetailView', params: { id: article.id } }" style="text-decoration: none;">
          {{ article.title }} - {{ article.created_at.substr(0, 10) }}
        </router-link>
      </div>
      <hr>
      <h3>Community 댓글</h3>
      <div
        v-for="articlecomment in user.articlecomment_set"
        :key=articlecomment.id
      >
        <router-link :to="{ name: 'ArticleDetailView', params: { id: articlecomment.article } }" style="text-decoration: none;">
          {{ articlecomment.content }} - {{ articlecomment.created_at.substr(0, 10) }}
        </router-link>
      </div>
    </details>
    
    
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ProfileView',

  data() {
    return {
      user: null,
      profileImage: null,

      // 잔디용
      max_count: 6,
      acts: [],
      today: '',
    }
  },

  created() {
    this.getUserInfo()
    const cur = new Date()
    this.today = cur.getFullYear() + '-' + (cur.getMonth() + 1) + '-' + cur.getDate()
  },

  methods: {
    getUserInfo() {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/profile/${ this.$store.state.userPk }/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
        .then((res) => {
          console.log(res)
          this.user = res.data.user
          this.acts = res.data.acts
        })
    },

    imageUpload() {
      console.log('imageUpload')
      axios({
        method: 'post',
        url: `${API_URL}/accounts/profile_image/${ this.$store.state.userPk }/`,
        data: {
          'profile_image': this.profileImage
        },
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
        .then((res) => {
          console.log(res.data.profile_image)
          this.getUserInfo()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 파일이 바뀌면 미리보기 시켜주는 함수
    onChange(event) {
      console.log('onChange')
      if (event.target.files && event.target.files[0]) {
        this.profileImage = event.target.files[0]
        console.log('profileImage:', this.profileImage)

        const reader = new FileReader()

        reader.onload = e => {
          const previewImage = document.getElementById("preview-image")
          previewImage.src = e.target.result
        }

        reader.readAsDataURL(event.target.files[0])
      }
    },
  }
}
</script>

<style>
  summary {
    display: block;
  }
</style>