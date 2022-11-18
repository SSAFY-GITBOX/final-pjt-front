<template>
  <div>
    <div v-if="comments">
      <ArticleCommentListItemVue
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @update-comment="updateComment"
        @delete-comment="deleteComment"
      />
    </div>
  </div>
</template>

<script>
import ArticleCommentListItemVue from './ArticleCommentListItem.vue';

export default {
  name: 'ArticleCommentList',

  components: {
    ArticleCommentListItemVue
  },

  props: {
    comments: Array,
  },

  methods: {
    updateComment(commentId) {
      this.$emit('update-comment', commentId)
    },

    deleteComment(commentId) {
      this.$emit('delete-comment', commentId)
    }
  }
}
</script>

<style>

</style>