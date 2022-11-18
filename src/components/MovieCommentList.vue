<template>
  <div>
    <div v-if="(comments)">
      <MovieCommentListItem
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
        @delete-comment="deleteComment"
        @update-comment="updateComment"
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
  methods: {
    deleteComment(comment) {
      this.$emit('delete-comment', comment)
    },
    updateComment(comment) {
      this.$emit('update-comment', comment)
    }
  }
}
</script>

<style>

</style>