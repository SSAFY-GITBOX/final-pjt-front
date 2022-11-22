<template>
  <div id="profile-view-div" class="show-grid">
    <!-- 프로필 navbar -->
    <div class="row mb-4">
      <div class="col-4 col-offset-4"></div>
      <div class="col-8">
        <ProfileNavbar
          :on-grass="onGrass"
          :on-like-movies="onLikeMovies"
          :on-like-articles="onLikeArticles"
          @view-acts="viewActs"
          @view-liking-movies="viewLikingMovies"
          @view-liking-articles="viewLikingArticles"
        />
      </div>
    </div>

    <div class="row">
      <!-- 프로필 정보 -->
      <div class="col-sm-12 col-md-4">
        <div id="ProfileInfo">
          <ProfileInfo
            :user="user"
            :profile-image-url="profileImageUrl"
            :follow-message="followMessage"
            @follow="follow"
            @view-follower-list="viewFollowerList"
            @view-follow-list="viewFollowList"
          />
        </div>
      </div>

      <div class="col-sm-12 col-md-8">
        <!-- 잔디 -->
        <div id="ProfileGrass" v-if="onGrass">
          <ProfileGrass
            :acts-total-cnt="actsTotalCnt"
            :acts="acts"
            :max-count="maxCount"
            :today="today"
            :user="user"
          />
        </div>

        <!-- 찜한 영화 -->
        <div id="ProfileLikeMovies" v-if="onLikeMovies">
          <ProfileLikeMovies :like-movies="user?.like_movies" />
        </div>

        <!-- 좋아요한 게시글 -->
        <div id="ProfileLikeArticles" v-if="onLikeArticles">
          <ProfileLikeArticles :like-articles="user?.like_articles" />
        </div>

        <!-- 팔로워 목록 -->
        <div id="ProfileFollower" v-if="onFollowerList">
          <ProfileFollower
            :follower-list="user?.followers"
          />
        </div>

        <!-- 팔로우 목록 -->
        <div id="ProfileFollow" v-if="onFollowList">
          <ProfileFollow
						:follow-list="user?.followings"
					/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProfileInfo from "@/components/ProfileInfo.vue";
import ProfileLikeMovies from "@/components/ProfileLikeMovies.vue";
import ProfileLikeArticles from "@/components/ProfileLikeArticles.vue";
import ProfileGrass from "@/components/ProfileGrass.vue";
import ProfileNavbar from "@/components/ProfileNavbar.vue";
import ProfileFollower from "@/components/ProfileFollower.vue";
import ProfileFollow from "@/components/ProfileFollow.vue";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "ProfileView",

  components: {
    ProfileInfo,
    ProfileLikeMovies,
    ProfileLikeArticles,
    ProfileGrass,
    ProfileNavbar,
    ProfileFollower,
    ProfileFollow,
  },

  data() {
    return {
      // userPk
      userPk: "",

      // for ProfileItem
      user: null,
      profileImageUrl: "",
      followMessage: "",

      // for ProfileGrass
      actsTotalCnt: 0,
      acts: [],
      maxCount: 6,
      today: "",

      // on
      onGrass: true,
      onLikeMovies: false,
      onLikeArticles: false,
      onFollowerList: false,
      onFollowList: false,
    };
  },

  created() {
    this.userPk = this.$route.params.id;
    this.getUserInfo();
    const cur = new Date();
    this.today = cur.getFullYear() + "-" + (cur.getMonth() + 1) + "-" + cur.getDate();

    this.$watch(
      () => this.$route.params.id,
      () => {
        this.userPk = this.$route.params.id;
        this.getUserInfo();
        const cur = new Date();
        this.today =
          cur.getFullYear() + "-" + (cur.getMonth() + 1) + "-" + cur.getDate();
				this.$router.go()
      }
    )
  },

  methods: {
    getUserInfo() {
      axios({
        method: "get",
        url: `${API_URL}/accounts/profile/${this.userPk}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.user = res.data.user;
          this.acts = res.data.acts;
          this.actsTotalCnt = res.data.acts_total_cnt;
          if (
            this.user?.profile_image_url &&
            this.user?.profile_image_url.charAt(0) != "h"
          ) {
            this.profileImageUrl = `http://127.0.0.1:8000${this.user?.profile_image_url}`;
          }
          this.followMessage = res.data.isFollowing ? "Unfollow" : "Follow";
          this.user.like_movies.forEach((movie) => {
            movie.poster_path =
              "https://image.tmdb.org/t/p/original" + movie.poster_path;
          });
					console.log(this.user)
        })
        .catch((err) => {
          console.log(err);
        });
    },

    follow() {
      axios({
        method: "post",
        url: `${API_URL}/accounts/profile/${this.user.id}/follow/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.followMessage = res.data.isFollowing ? "Unfollow" : "Follow";
          this.getUserInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    viewActs() {
      this.onGrass = true;
      this.onLikeMovies = false;
      this.onLikeArticles = false;
      (this.onFollowerList = false), (this.onFollowList = false);
    },

    viewLikingMovies() {
      this.onGrass = false;
      this.onLikeMovies = true;
      this.onLikeArticles = false;
      (this.onFollowerList = false), (this.onFollowList = false);
    },

    viewLikingArticles() {
      this.onGrass = false;
      this.onLikeMovies = false;
      this.onLikeArticles = true;
      (this.onFollowerList = false), (this.onFollowList = false);
    },

    viewFollowerList() {
      this.onGrass = false;
      this.onLikeMovies = false;
      this.onLikeArticles = false;
      this.onFollowerList = true;
      this.onFollowList = false;
    },

    viewFollowList() {
      this.onGrass = false;
      this.onLikeMovies = false;
      this.onLikeArticles = false;
      this.onFollowerList = false;
      this.onFollowList = true;
    },
  },
};
</script>

<style>
summary {
  display: block;
}

#profile-view-div {
  background-color: pink;
  padding: 3% 5%;
  display: flex;
  flex-direction: column;
  text-align: start;
}
</style>
