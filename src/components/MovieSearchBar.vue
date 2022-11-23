<template>
    <b-nav-form @submit.prevent="getSearchMovie">
      <b-navbar-nav>
        <b-navbar-nav style="position: relative; text-align: center; width: 400px; margin: 0 auto;">
          <b-form-input size="lg" placeholder="영화를 검색하세요" v-model="inputData" style="border-radius: 100px; width: 100%; margin: 10px 0; padding: 10px 12px; padding-left: 20px;"></b-form-input>
          <b-icon-search type="submit" style="color: black; position: absolute; left: 350px; bottom: 25px; margin: 0;" @click="getSearchMovie"></b-icon-search>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-nav-form>
</template>

<script>
export default {
  name: 'MovieSearchBar',
  data() {
    return {
      inputData: null,
    }
  },
  
  methods: {
    getSearchMovie() {
      const content = this.inputData
      if (content != null) {
        if (this.$route.params.content != content && content != null && content.trim()) {
          this.$emit('get-search-movie', content)
          this.inputData = ''
        }
      }
    }
  }
}
</script>

<style>

</style>