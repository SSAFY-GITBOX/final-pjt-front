<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><button class="page-link" @click="clickPagenation">1</button></li>
        <li class="page-item"><button class="page-link" >2</button></li>
        <li class="page-item"><button class="page-link" >3</button></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "MovieListPagenation",
  props: {
    page: Number,
  }, 
  data() {
    return {
      start_index: this.page > 2 ? this.page-2 : 1,
      end_index: this.page > 2 ? this.page+2 : 5, 
    }
  },
  
  methods: {
    clickPagenation() {
      // this.$emit('click-pagenation')
    }
  }
};
</script>

<style>
</style>