<template>
  <div id="pagenation-div">
    <div class="outer-div">
      <ul class="pagination">
      <!-- 처음 -->
      <li class="page-item">
        <span id="pageBtn" class="page-link" @click="clickPagenation(1)">
          <i class="fas fa-angle-double-left"></i>
        </span>
      </li>
      
      <!-- 페이지들 -->
      <li v-for="(page_num, index) in pages" :key="index" class="page-item" >
        <span id="pageBtn" :class="{selectedBtn: page_num == page}" class="page-link"  @click="clickPagenation(page_num)">{{ page_num }}</span>
      </li>
      
      <!-- 끝 -->
      <li class="page-item">
        <span id="pageBtn" class="page-link" @click="clickPagenation($store.getters.selectedMoviePageEndIndex)">
          <i class="fas fa-angle-double-right"></i>
        </span>
      </li>
    </ul>
  </div>
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
#pagenation-div{
  width: 100%;
}

.outer-div {
  margin-top: 20px;
  margin-right: 20px;
  padding-top: 16px;
  /* background-color : yellow; */
  display : flex;
  justify-content: center;
  align-items : center;
}

#pageBtn{
  background-color: #2e3133;
  border: 0;
  color: #F5F5DC;
}

#pageBtn:hover{
  background-color: #D3AC2B;
}

.selectedBtn{
  font-weight: 700;
}
</style>