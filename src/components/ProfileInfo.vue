<template class="w-100">
  <div id="profile w-100">
    <!-- 프로필 이미지 -->
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
    
    <!-- 유저 이름 -->
    <div id="username">
      <h2 class="my-3">{{ user?.username }}</h2>
    </div>

    <!-- 반응형 버튼 - 본인일 때는 프로필 수정, 아닐 때는 팔로우 버튼 -->
    <div id="responsive-botton" class="mb-3">
      <div v-if="$store.state.userPk != user?.id">
        <button class="btn btn-secondary" @click="follow">
          {{ followMessage }}
        </button>
      </div>
      <div v-else>
        <button class="btn btn-secondary" @click="editProfile">
          Edit profile
        </button>
      </div>
    </div>

    <!-- 팔로우, 팔로워 수 -->
    <div id="friends" class="mb-5">
      <button style="border: none; background: none">
        {{ user?.followers_cnt }} followers
      </button>
      &nbsp; • &nbsp;
      <button style="border: none; background: none">
        {{ user?.followings_cnt }} followings
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileItem",

  props: {
    user: Object,
    profileImageUrl: String,
    followMessage: String,
  },

  created() {
    console.log(this.user);
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
  },
};
</script>

<style>
#profile-image {
  object-fit: cover;
  object-position: center center;
  width: 250px;
  height: 250px;
}
</style>
