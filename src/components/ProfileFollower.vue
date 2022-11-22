<template>
  <div id="follower-div">
    <h4 class="mt-3 ms-3">팔로워</h4>

    <div v-for="user in followerList" :key="user.id">
      <!-- 팔로워 프로필로 이동할 수 있도록 router-link 사용 -->
      <router-link
        :to="{
          name: 'ProfileView',
          params: { id: user.id },
        }"
        class="btn shadow-sm p-2 mb-2 rounded d-flex flex-nowrap"
      >
        <!-- 팔로워 유저 이미지 -->
        <div id="follower-profile-img">
          <div v-if="user.profile_image_url">
            <img :src="user.profile_image_url" class="rounded-circle shadow" />
          </div>
          <div v-else>
            <img
              src="../assets/default_profile_image.png"
              class="rounded-circle shadow"
            />
          </div>
        </div>
        <!-- 팔로워 유저 이름 -->
        <div id="follwer-name">
          <p class="mb-0">{{ user.username }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileFollower",

  created() {
    this.preTreat();
  },

  props: {
    followerList: Array,
  },

  methods: {
    preTreat() {
      this.followerList.forEach((follower) => {
        if (
          follower.profile_image_url &&
          follower.profile_image_url.charAt(0) != "h"
        ) {
          follower.profile_image_url =
            "http://127.0.0.1:8000" + follower.profile_image_url;
        }
      });
    },
  },
};
</script>

<style>
#follower-div {
  background-color: rgb(250, 167, 206);
  padding: 3% 5%;
  display: flex;
  flex-direction: column;
  text-align: start;
  border-radius: 15px;
}

#follower-div a:hover {
  transform: scale(1.02);
}

#follower-profile-img img {
  object-fit: cover;
  object-position: center center;
  width: 70px;
  height: 70px;
}

#follwer-name {
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-weight: bold;
  font-size: 18px;
}
</style>