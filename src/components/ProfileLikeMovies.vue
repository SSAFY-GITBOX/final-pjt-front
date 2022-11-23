<template>
  <div id="like-movies-div">
    <!-- 찜한 영화 -->
    <div v-for="movie in likeMovies" :key="movie.movie_id">
			<MovieListItem :movie="movie"/>
    </div>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'

export default {
  name: "ProfileLikeMovies",

	components: {
		MovieListItem,
	},

  props: {
    likeMovies: Array,
  },
};
</script>

<style>
#like-movies-div{
	flex-wrap: wrap;
  background-color: rgba(51, 61, 81, 1.0);
  color: #F5F5DC;
  padding: 3% 3%;
  display: flex;

  box-shadow : rgba(0, 0, 0, 0.8) 0px 6px 12px -2px, rgba(0, 0, 0, 0.8) 0px 3px 7px -3px;
  border-radius: 20px;
}
</style>