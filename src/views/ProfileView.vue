<template>
  <div class="w-100 h-100 mx-3 mb-5">
    <!-- 프로필 -->
    <div id="profile" class="mb-5 mx-3">
			<div v-if="profileImageUrl">
				<img
				:src="profileImageUrl"
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
			</div>

      <h2 class="my-3">{{ user?.username }}</h2>

      <div v-if="$store.state.userPk != userPk">
        <button class="btn btn-secondary" @click="follow">
          {{ followMessage }}
        </button>
      </div>
			<div v-else>
				<button class="btn btn-secondary" @click="editProfile">
          Edit profile
        </button>
			</div>

      <br>
      <p>{{ user?.followers_cnt }} followers &nbsp; • &nbsp; {{ user?.followings_cnt }} followings</p>
    </div>

    <!-- 좋아하는 영화 -->
    <div class="mb-5">
      <details class="mx-3">
        <summary>좋아하는 영화 목록</summary>
        <div
          v-for="movie in user?.like_movies"
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
          v-for="article in user?.like_articles"
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
      class="w-75"
    />
    <br>

    <!-- 활동 내역 -->
    <details>
      <summary class="mx-3">상세보기</summary>
      <br>
      <br>
      <h3>Movie 댓글</h3>
      <div
        v-for="comment in user?.comment_set"
        :key=comment.id
      >
        <router-link :to="{ name: 'DetailView', params: { id: comment.movie } }" style="text-decoration: none;">
          {{ comment.content }} - {{ comment.created_at.substr(0, 10) }}
        </router-link>
      </div>
      <hr>
      <h3>Community 게시글</h3>
      <div
        v-for="(article, index) in user?.article_set"
        :key=index
      >
        <router-link :to="{ name: 'ArticleDetailView', params: { id: article.id } }" style="text-decoration: none;">
          {{ article.title }} - {{ article.created_at.substr(0, 10) }}
        </router-link>
      </div>
      <hr>
      <h3>Community 댓글</h3>
      <div
        v-for="articlecomment in user?.articlecomment_set"
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
			profileImageUrl: '',
      followMessage: '',

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

  computed: {
    userPk() {
      return this.$route.params.id
    }
  },

  methods: {
    getUserInfo() {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/profile/${ this.userPk }/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
        .then((res) => {
          this.user = res.data.user
          this.acts = res.data.acts
					this.profileImageUrl = `http://127.0.0.1:8000${this.user?.profile_image_url}`
          this.followMessage = res.data.isFollowing? "Unfollow" : "Follow"
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 팔로우
    follow() {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/profile/${ this.userPk }/follow/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
      })
        .then((res) => {
          this.followMessage = res.data.isFollowing? "Unfollow" : "Follow"
          this.getUserInfo()
        })
        .catch((err) => {
          console.log(err)
        })
    },

		// 유저 프로필 수정
		editProfile() {
			this.$router.push({ name: 'EditProfileView' })
		}
  }
}
</script>

<style>
  summary {
    display: block;
  }
</style>