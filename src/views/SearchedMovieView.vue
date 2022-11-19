<template>
  <div>{{ content }}</div>
</template>

<script>
import axios from 'axios'

const API_URL = "http://127.0.0.1:8000";

export default {
  name: 'SearchedMovieView',
  data() {
    return {
      content: this.$route.params.content
    }
  },
  methods: {
    getSearchedMovie() {
      const content = this.$route.params.content

      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/search`,
        params: {
          content: content
        },
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
  },
  created() {
    this.getSearchedMovie()
  },
  updated() {
    this.getSearchedMovie()
  }
}
</script>

<style>

</style>