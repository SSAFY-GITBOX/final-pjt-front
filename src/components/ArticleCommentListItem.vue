<template>
  <div>
    <div v-if="!isUpdate">
      {{ comment.username }} : {{ comment.content }}
      <div v-if="$store.state.userPk === comment?.user" style="display: inline-block;">
        <button @click="clickUpdateBtn">수정</button>
        <button @click="deleteComment" style="margin-left: 5px">삭제</button>
      </div>
    </div>
    <div v-else>
      <textarea name="" id="" cols="100" rows="3" v-model.trim="inputData">
      </textarea>
      <button @click="clickUpdateCencelBtn">취소</button>
      <button @click="updateComment">완료</button>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: "ArticleCommentListItem",

  props: {
    comment: Object,
  },

  data() {
    return {
      isUpdate: false,
      inputData: this.comment.content,
    }
  },

  computed: {
    getComment() {
      return this.comment;
    },
  },

  methods: {
    clickUpdateBtn() {
      this.isUpdate = true
    },

    clickUpdateCencelBtn() {
      this.inputData = this.comment.content,
      this.isUpdate = false
    },

    updateComment() {
      const content = this.inputData
      if (!content.trim()) {
        alert('내용이 없습니다!')
        return
      }
      
      if (this.comment.content != content) {
        const payload = {
          commentId: this.comment.id,
          content: content,
        }
        this.$emit("update-comment", payload);
      }
      this.isUpdate = false
    },

    deleteComment() {
      this.$emit("delete-comment", this.comment.id);
    },
  },
};
</script>

<style>
</style>