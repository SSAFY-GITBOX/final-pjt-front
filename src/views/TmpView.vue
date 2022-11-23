<template>
  <div>
    
  </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: 'TmpView',

  created() {
    this.getRecommendMovies()
  },

  methods: {
    getRecommendMovies() {
      axios({
        method: 'get',
        url: `${ API_URL }/api/v1/movies/recommend/${ this.$route.params.id }/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>