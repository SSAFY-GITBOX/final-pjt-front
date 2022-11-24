<template>
  <div id="home-movie-recommend-div">
    <div style="padding-top: 40px; padding-left: 40px">
      <h4 class="mb-0">
        <span style="color: crimson">{{ userInfo[0]?.username }}</span
        >님의 선호 장르 정보에요!
      </h4>
    </div>

    <HomeUserChart v-if="userInfo[1]" :userProfile="userInfo[0]" :userChartInfo="userInfo[1]" />

    <div style="padding-top: 40px; padding-left: 40px">
      <h4 class="mb-0">
        <span style="color: crimson">{{ userInfo[0]?.username }}</span
        >님에게 딱 맞는 영화를 추천해드려요!
      </h4>
    </div>

    <HomeUserMovie :recommendMovies="recommendMovies" />
  </div>
</template>

<script>
import HomeUserChart from "@/components/HomeUserChart.vue";
import HomeUserMovie from "@/components/HomeUserMovie.vue";

export default {
  name: "HomeMovieRecommend",

  components: {
    HomeUserChart,
    HomeUserMovie,
  },

  props: {
    userInfo: Array,
    recommendMovies: Array,
  },
};
</script>

<style>
#home-movie-recommend-div {
  width: 100%;
  color: #f5f5dc;
  background-color: rgba(51, 61, 81, 1);
  box-shadow: rgba(0, 0, 0, 0.8) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.8) 0px 3px 7px -3px;
  border-radius: 20px;
  overflow: hidden;
  text-align: start;
}
</style>