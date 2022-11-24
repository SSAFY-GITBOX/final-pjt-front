<template>
  <div id="home-user-movie-div">
    <div id="recommeded-movie-list-body">
      <MovieListItem
        v-for="(movie, index) in recommendMovies"
        :key="index"
        :movie="movie"
      />
    </div>
    <div id="scroll-btn-div">
        <div class="genre-icon-div" @click="recoLeftScroll">
          <i class="fas fa-angle-left fa-2x" style="padding-left: 4px"></i>
        </div>
        <div class="genre-icon-div" @click="recoRightScroll">
          <i class="fas fa-angle-right fa-2x" style="padding-left: 4px"></i>
        </div>
      </div>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'

export default {
  name: 'HomeUserMovie',

  components: {
    MovieListItem,
  },

  props: {
    recommendMovies: Array,
  },

  methods: {
    recoLeftScroll() {
      const bodyDiv = document.querySelector("#recommeded-movie-list-body");
      bodyDiv.scrollLeft -= bodyDiv.clientWidth;
    },

    recoRightScroll() {
      const bodyDiv = document.querySelector("#recommeded-movie-list-body");
      bodyDiv.scrollLeft += bodyDiv.clientWidth;
    },
  }
}
</script>

<style>
#home-user-movie-div {
  width: 100%;
  padding: 20px;
}

#recommeded-movie-list-body {
  width: 100%;
  display: flex;
  overflow: auto;
  scroll-behavior: smooth;
}

/* 스크롤바 숨기기 */
#recommeded-movie-list-body::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
}
</style>