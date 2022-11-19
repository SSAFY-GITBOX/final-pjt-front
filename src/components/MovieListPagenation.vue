<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <!-- 처음 -->
        <li class="page-item">
            <span class="page-link" @click="clickPagenation(1)">처음</span>
        </li>

        <!-- 페이지들 -->
        <li v-for="(page_num, index) in pages" :key="index" class="page-item">
          <span class="page-link" @click="clickPagenation(page_num)">{{ page_num }}</span>
        </li>

        <!-- 끝 -->
        <li class="page-item">
            <span class="page-link" @click="clickPagenation($store.getters.selectedMoviePageEndIndex)">끝</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import lodash from 'lodash'

export default {
  name: "MovieListPagenation",
  props: {
    page: Number,
  }, 

  computed: {
    // 마지막 인덱스 구하기
    pages() {
      return lodash.range(Math.max(this.page -2, 1), Math.min(this.page +2, this.$store.getters.selectedMoviePageEndIndex)+1)
    },
  },
  
  methods: {
    //  클릭시 부모로 이벤트 전송
    clickPagenation(page) {
      if (page != this.page) {
        this.$emit('click-pagenation', page)
      }
    }
  }
};
</script>

<style>
</style>