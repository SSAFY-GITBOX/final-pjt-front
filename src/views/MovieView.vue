<!-- 전체보기 버튼 미구현 -->
<template>
  <div>
    <PopularMovie/>
  </div>
</template>

<script>
import PopularMovie from '@/components/PopularMovie.vue'
// import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MovieView',
  components: {
    PopularMovie
  }
}
</script>

<style>

</style>