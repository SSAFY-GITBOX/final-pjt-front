<template>
  <div id="profile-div">
    <!-- 프로필 이미지 -->
    <div id="profile-image-div">
      <div v-if="profileImageUrl">
        <img
          :src="profileImageUrl"
          id="profile-image"
          class="rounded-circle shadow"
        />
      </div>
      <div v-else>
        <img
          src="../assets/default_profile_image.png"
          id="profile-image"
          class="rounded-circle shadow"
        />
      </div>
    </div>

    <!-- 유저 이름 -->
    <div id="username">
      <h2 class="mt-4">{{ user?.username }}</h2>
    </div>

    <!-- 반응형 버튼 - 본인일 때는 프로필 수정, 아닐 때는 팔로우 버튼 -->
    <div id="responsive-botton">
      <div v-if="$store.state.userPk != user?.id">
        <button class="btn btn-secondary" @click="follow">
          {{ followMessage }}
        </button>
      </div>
      <div v-else>
        <button class="genre-btn" @click="editProfile">
          프로필 수정
        </button>
      </div>
    </div>

    <!-- 팔로우, 팔로워 수 -->
    <div id="friends" class="mt-2 mb-5">
      <button @click="viewFollowerList">
        <span>{{ user?.followers_cnt }}</span> followers
      </button>
      •
      <button @click="viewFollowList" class="ms-1">
        <span>{{ user?.followings_cnt }}</span> followings
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileInfo",

  props: {
    user: Object,
    profileImageUrl: String,
    followMessage: String,
  },

  methods: {
    // 팔로우
    follow() {
      this.$emit("follow");
    },

    // 프로필 수정
    editProfile() {
      this.$router.push({ name: "EditProfileView" });
    },

    viewFollowerList() {
      this.$emit("view-follower-list");
    },

    viewFollowList() {
      this.$emit("view-follow-list");
    },
  },
};
</script>

<style>
#profile-div {
  /* background-color: plum; */
  padding: 3% 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2e3133;
}

#profile-div button:hover {
	transform: scale(1.02);
}

#profile-image {
  object-fit: cover;
  object-position: center center;
  width: 230px;
  height: 230px;
}

#friends button {
  border: none;
  background: none;
  padding-bottom: 10px;
  padding-left: 0px;
  color: rgb(50, 50, 50);
}

#friends button span {
  font-weight: bold;
  font-size: 18px;
}
</style>
