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
	display: flex;
	flex-wrap: wrap;

  background-color: plum;
}
</style>