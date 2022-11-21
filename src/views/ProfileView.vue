<template>
  <div id="profile" class="container show-grid mt-5">
    <div class="row">
      <div class="col-sm-12 col-md-4">
        <!-- 프로필 정보 -->
        <div id="ProfileInfo">
          <ProfileInfo
            :user="user"
            :profile-image-url="profileImageUrl"
            :follow-message="followMessage"
            @follow="follow"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-8">
        
        <!-- 좋아요한 영화, 게시글 -->
        <div id="ProfileLike">
          <ProfileLike
          :like-movies="user?.like_movies"
          :like-articles="user?.like_articles"
        />
        </div>
        
        <!-- 잔디 -->
        <div id="ProfileGrass">
          <ProfileGrass
            :max-count="maxCount"
            :acts="acts"
            :today="today" 
            :user="user"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProfileInfo from "@/components/ProfileInfo.vue";
import ProfileLike from "@/components/ProfileLike.vue";
import ProfileGrass from "@/components/ProfileGrass.vue";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "ProfileView",

  components: {
    ProfileInfo,
    ProfileLike,
    ProfileGrass,
  },

  data() {
    return {
      // for ProfileItem
      user: null,
      profileImageUrl: "",
      followMessage: "",

      // for ProfileGrass
      maxCount: 6,
      acts: [],
      today: "",
    };
  },

  created() {
    this.getUserInfo();
    const cur = new Date();
    this.today =
      cur.getFullYear() + "-" + (cur.getMonth() + 1) + "-" + cur.getDate();
  },

  computed: {
    userPk() {
      return this.$route.params.id;
    },
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
          if (this.user?.profile_image_url) {
            this.profileImageUrl = `http://127.0.0.1:8000${this.user?.profile_image_url}`;
          }
          this.followMessage = res.data.isFollowing ? "Unfollow" : "Follow";
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
  },
};
</script>

<style>
summary {
  display: block;
}
</style>
