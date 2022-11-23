<template>
  <div>
    <!-- {{ comment }} -->
    <!-- <p>{{ comment.rating}}</p> -->
    <star-rating
      :increment="0.5"
      :show-rating="false"
      :read-only="true"
      :border-width="4"
      :star-size="25"
      border-color="#d8d8d8"
      :rounded-corners="true"
      :star-points="[
        23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46,
        19, 31, 17,
      ]"
      style="justify-content: left"
      v-model="rating"
    >
    </star-rating><br>
    <p style="margin-left: 3px; font-size: x-large; white-space: pre-wrap;">{{ comment.content }}</p>
    <p style="font-size: large; margin-left: 2px;">{{ comment.username }} | {{ comment.created_at.substr(0, 10) }}</p>
    <div v-if="$store.state.userPk === comment.user">
      <button class="genre-btn" @click="updateComment" style="margin-right: 10px;">수정</button>
      <button class="genre-btn" @click="deleteComment">삭제</button>
      <span style="padding: 10px"></span>
    </div>
    <br><br><br><br>
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
      this.rating = this.comment.rating / 2
    }
  }
}
</script>

<style>

</style>