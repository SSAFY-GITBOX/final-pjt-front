<template>
  <div>
    <MovieCommentListItem
      v-for="(comment, index) in movie.comment_set"
      :key="index"
      :comment="comment"
    />
  </div>
</template>

<script>
import MovieCommentListItem from '@/components/MovieCommentListItem'

export default {
  name: 'MovieCommentList',
  components: {
    MovieCommentListItem
  },
  props: {
    movie: Object,
  }
}
</script>

<style>

</style>