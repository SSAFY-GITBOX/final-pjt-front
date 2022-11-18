<template>
  <div>
    <div v-if="(comments)">
      <MovieCommentListItem
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
      />
    </div>
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
    comments: Array,
  },
}
</script>

<style>

</style>