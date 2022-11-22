<template>
  <div>
    <!-- <input type="textarea" v-model.trim="inputData" @keyup.enter="createComment"> -->
    <textarea name="" id="" style="width:100%;" rows="3" v-model.trim="inputData">
    </textarea>
    <button @click="createComment">작성</button>
    <hr>
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