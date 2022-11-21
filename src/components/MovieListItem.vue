<template>
  <div id="movie-list-item-div">
    <img :src="movie.poster_path" alt="" height="364" width="250" @click="goDetail">
  </div>
</template>

<script>
export default {
  name: 'MovieListItem',
  props: {
    movie: Object,
  },
  methods: {
    goDetail() {
      console.log(this.movie)
      this.$router.push({ name: "MovieDetailView", params: { id: this.movie.movie_id }})
    }
  }
}
</script>

<style>
#movie-list-item-div {
  padding-top: 20px;
  padding-right: 20px;

  padding: 20px;
} 

#movie-list-item-div img{
  box-shadow : rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 20px;

  -webkit-transform:scale(1);
  -moz-transform:scale(1);
  -ms-transform:scale(1); 
  -o-transform:scale(1);  
  transform:scale(1);
  -webkit-transition:.3s;
  -moz-transition:.3s;
  -ms-transition:.3s;
  -o-transition:.3s;
  transition:.3s;
}

#movie-list-item-div:hover{
  /* transform:scale(1.2); */
  
  cursor:pointer;
  transform:scale(1.1); /* 마우스 오버시 이미지 크기를 1.1 배만큼 확대 */
  -o-transform:scale(1.1); 
  -moz-transform:scale(1.1);
  -webkit-transform:scale(1.1);
  transition: transform .35s;  
  -o-transition: transform .35s;
  -moz-transition: transform .35s;
  -webkit-transition: transform .35s;
}
</style>