<template>
  <div>
    <div v-if="(comments)" style="text-align: left; margin-left: 30px;">
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