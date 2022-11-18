<template>
  <div>
    {{ comment.username }} : {{ comment.content }}
    <button @click="updateComment">수정</button>
    <button @click="deleteComment" style="margin-left: 5px">삭제</button>
  </div>
</template>

<script>
export default {
  name: 'ArticleCommentListItem',

  props: {
    comment: Object,
  },

  computed: {
    getComment() {
      return this.comment
    }
  },

  methods: {
    updateComment() {
      this.$emit('update-comment', this.comment.id)
    },

    deleteComment() {
      this.$emit('delete-comment', this.comment.id)
    }
  }
}
</script>

<style>

</style>