<template>
  <div>
    <!-- {{ comment }} -->
    <p>⭐ {{ comment.rating }}</p>
    <p>댓글: {{ comment.content }}</p>
    <div v-if="$store.state.userPk === comment.user">
      <button @click="updateComment" class="mx-1">수정</button>
      <button @click="deleteComment">삭제</button>
    </div>
    <br>
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