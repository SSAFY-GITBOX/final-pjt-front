<template>
  <div>
    <!-- {{ comment }} -->
    <!-- <p>{{ comment.rating}}</p> -->
    <star-rating
      :increment="0.5"
      :show-rating="false"
      :read-only="true"
      :border-width="4"
      :star-size="15"
      border-color="#d8d8d8"
      :rounded-corners="true"
      :star-points="[
        23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46,
        19, 31, 17,
      ]"
      style="justify-content: left"
      v-model="rating"
    >
    </star-rating>
    <p style="margin-left: 3px;">{{comment.username}}: {{ comment.content }}</p>
    <div v-if="$store.state.userPk === comment.user">
      <button @click="updateComment" class="mx-1">수정</button>
      <button @click="deleteComment">삭제</button>
    </div>
    <br>
  </div>

</template>

<script>
import StarRating from "vue-star-rating";

export default {
  name: 'MovieCommentListItem',
  components: {
    StarRating,
  },
  data() {
    return {
      rating: null,
    }
  },
  props: {
    comment: Object,
  },
  created() {
    this.getRating()
  },
  methods: {
    deleteComment() {
      this.$emit('delete-comment', this.comment)
    },
    updateComment() {
      this.$emit('update-comment', this.comment)
    },
    getRating() {
      // console.log(this.comment)
      this.rating = this.comment.rating / 2
    }
  }
}
</script>

<style>

</style>