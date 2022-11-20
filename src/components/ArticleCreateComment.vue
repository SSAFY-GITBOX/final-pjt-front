<template>
  <div>
    <!-- <input type="textarea" v-model.trim="inputData" @keyup.enter="createComment"> -->
    <textarea name="" id="" cols="100" rows="3" v-model.trim="inputData">
    </textarea>
    <button @click="createComment">작성</button>
  </div>
</template>

<script>
export default {
  name: "ArticleCreateComment",
  data() {
    return {
      inputData: null,
    };
  },

  methods: {
    createComment() {
      const content = this.inputData
      if (content.trim()) {
        this.$emit("create-comment", content);
        this.inputData = ''
      }
    },
  },
};
</script>

<style>
</style>