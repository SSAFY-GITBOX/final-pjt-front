<template>
  <div>
    <!-- {{ comment }} -->
    <p>⭐ {{ comment.rating }}</p>
    <p>댓글: {{ comment.content }}</p>
    <button @click="updateComment">수정</button>
    <button @click="deleteComment">삭제</button>
    <br><br><br>
  </div>

</template>

<script>
export default {
  name: 'MovieCommentListItem',
  props: {
    comment: Object,
  },
  methods: {
    deleteComment() {
      this.$emit('delete-comment', this.comment)
    },
    updateComment() {
      this.$emit('update-comment', this.comment)
    }
  }
}
</script>

<style>

</style>