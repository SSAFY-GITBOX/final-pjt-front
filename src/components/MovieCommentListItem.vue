<template>
  <div>
    <p>댓글: {{ comment.content }}</p>
    <p>평점: {{ comment.rating }}</p>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'MovieCommentListItem',
  props: {
    comment: Object,
  }
}
</script>

<style>

</style>