<template>
  <div id="user-chart-div">
    <div id="user-chart-profile-div">
      <div id="profile-image-div">
        <div v-if="userProfile?.profile_image_url">
          <img
            :src="userProfile.profile_image_url"
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
      <div id="username">
        <h2 class="m-0 mt-3">{{ userProfile?.username }}</h2>
      </div>
      <div>
        <h4 class="m-0 mt-3"><span style="color: crimson">{{ userProfile?.followings_cnt }}</span> 명의 Following</h4>
        <h4 class="m-0 mt-3"><span style="color: crimson">{{ userProfile?.like_movies.length }}</span> 편의 찜한 영화</h4>
        <h4 class="m-0 mt-3"><span style="color: crimson">{{ userProfile?.comment_set.length }}</span> 개의 영화 감상평을</h4>
        <h4 class="m-0 mt-3">참고했어요!</h4>
      </div>
    </div>
    <div id="user-chart-info-div">
      <div style="width: 100%; height: 100%">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale, 
} from "chart.js";

Chart.register(BarElement, BarController, LinearScale, CategoryScale);
Chart.defaults.color = '#F5F5DC';
Chart.defaults.font.size = 12;
export default {
  name: "HomeUserChart",

  props: {
    userProfile: Object,
    userChartInfo: Object,
  },

  data() {
    return {
      Chart,
    };
  },

  methods: {
    fillData() {
      var ctx = document.querySelector("#myChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [... Object.keys(this.userChartInfo)],
          datasets: [
            {
              label: "# of Votes",
              data: [... Object.values(this.userChartInfo)],
              backgroundColor: [
                "rgba(245, 245, 220, 1.0)",
              ],
              borderColor: [
              ],
              borderWidth: 1,
            },
          ],
        },

        options: {
          maintainAspectRatio: true, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
          scales: {
            x: {
              min: 0,
              max: 18,
              grid: {
                display: false,
              },
              ticks: {},
            },
            y: {
              ticks: {},
              grid: {
                display: false,
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    this.fillData()
  }
};
</script>

<style>
#user-chart-div {
  width: 100%;
  height: 500px;
  margin: 20px;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
}

#user-chart-profile-div {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 500px;
  padding: 20px;
}

#user-chart-info-div {
  width: 100%;
  height: 100%;
  
  color: #f5f5dc;
}

#myChart {
  width: 800px !important;
  height: 100% !important;
  margin-left: auto;
  margin-right: auto;
}

.canvas {
  width: 300px;
}
</style>