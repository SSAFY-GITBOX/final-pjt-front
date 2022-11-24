<template>
  <div id="follow-div">
    <h4 class="mt-3 ms-3">팔로우</h4>

    <div v-for="(user, index) in followList" :key="index">
      <!-- 팔로우 하는 유저 프로필로 이동할 수 있도록 router-link 사용 -->
      <router-link
        id="follow-link"
        :to="{
          name: 'ProfileView',
          params: { id: user.id },
        }"
        class="btn shadow p-2 mb-2 rounded d-flex flex-nowrap"
      >
        <!-- 팔로우하는 유저 이미지 -->
        <div id="follow-profile-img">
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
        <!-- 팔로우하는 유저 이름 -->
        <div id="follow-name">
          <p class="mb-0">{{ user.username }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileFollow",

  
  props: {
    followList: Array,
  },
  
  created() {
    this.preTreat();
  },

  methods: {
    preTreat() {
      this.followList.forEach((follow) => {
        if (
          follow.profile_image_url &&
          follow.profile_image_url.charAt(0) != "h"
        ) {
          follow.profile_image_url =
            "http://127.0.0.1:8000" + follow.profile_image_url;
        }
      });
    },
  },
};
</script>

<style>
#follow-div {
  flex-direction: column;
  flex-wrap: wrap;
  background-color: rgba(51, 61, 81, 1);
  color: #f5f5dc;
  padding: 3% 3%;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.8) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.8) 0px 3px 7px -3px;
  border-radius: 20px;
}

#follow-profile-img img {
  object-fit: cover;
  object-position: center center;
  width: 70px;
  height: 70px;
}

#follow-name {
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-weight: bold;
  font-size: 18px;
}

#follow-link {
  background-color: #2e3133;
  color: #f5f5dc;
  text-decoration: none;
}

#follow-link:hover {
  background-color: #d3ac2b;
}
</style>