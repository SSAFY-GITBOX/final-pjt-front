<template>
  <div>
    <textarea
      name=""
      id="create-textarea"
      v-model.trim="inputData"
      placeholder="댓글을 작성해 보세요"
      @keydown="resize($event)"
      @keyup="resize($event)"
    >
    </textarea>
    <div style="display: flex; justify-content: flex-end">
      <button id="comment-create-submit" @click="createComment">작성</button>
    </div>
    <hr />
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
      const content = this.inputData;
      if (content != null && content.trim()) {
        this.$emit("create-comment", content);
        this.inputData = "";
      }
    },

    resize(event) {
      const obj = event.target;
      obj.style.height = "1px";
      obj.style.height = 12 + obj.scrollHeight + "px";
    },
  },
};
</script>

<style>
#create-textarea {
  width: 100%;
  resize: none;
  overflow-y: hidden;
  border: none;
  border-radius: 20px;
  padding: 10px;
  min-height: 72px;

  color: #F5F5DC;
  background-color: rgba(51, 61, 81, 1.0);
}

#comment-create-submit{
  width: 64px;
  height: 32px;

  border-radius: 20px;
  border: none;
  background-color: #2e3133;
  color: #F5F5DC;
}

#comment-create-submit:hover{
  cursor: pointer;
  background-color: #D3AC2B;
  color: #F5F5DC;
  transform: none;
}
</style>