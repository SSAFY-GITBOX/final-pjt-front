<template>
  <div>
    <div v-if="!isUpdate">
      <div style="display: flex; flex-direction: column">
        <div style="padding-bottom: 10px">
          {{ comment.username }} | {{ comment.created_at.substr(0, 10)}}
        </div>

        <div
          v-if="$store.state.userPk === comment?.user"
          class="article-comment-option-div"
        >
          <div class="my-article-option-item">
            <b-icon
              icon="pencil-fill"
              style="
                width: 100%;
                height: 100%;
                padding: 2px;
                margin-right: 10px;
              "
              @click="clickUpdateBtn"
            ></b-icon>
          </div>
          <div class="my-article-option-item">
            <b-icon
              icon="trash-fill"
              style="width: 100%; height: 100%; padding: 2px"
              @click="deleteComment"
            ></b-icon>
          </div>
        </div>

        <div id="read-comment-div">{{ comment.content }}</div>
      </div>
    </div>
    <div v-else>
      <div style="padding-bottom: 10px">
        {{ comment.username }} | {{ comment.created_at.substr(0, 10)}}
      </div>
      <div>
        <textarea
          name=""
          id="update-textarea"
          v-model.trim="inputData"
          @keydown="resize($event)"
          @keyup="resize($event)"
          @click="resize($event)"
        >
        </textarea>
      </div>
      <div style="display: flex; justify-content: end">
        <div>
          <button id="comment-update-submit" @click="clickUpdateCencelBtn">
            취소
          </button>
        </div>
        <div>
          <button
            id="comment-update-submit"
            @click="updateComment"
            style="margin-left: 10px"
          >
            완료
          </button>
        </div>
      </div>
    </div>
    <hr />
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
    };
  },

  computed: {
    getComment() {
      return this.comment;
    },
  },

  methods: {
    clickUpdateBtn() {
      this.isUpdate = true;
    },

    clickUpdateCencelBtn() {
      (this.inputData = this.comment.content), (this.isUpdate = false);
    },

    resize(event) {
      const obj = event.target;
      obj.style.height = "1px";
      obj.style.height = 12 + obj.scrollHeight + "px";
    },

    updateComment() {
      const content = this.inputData;
      if (!content.trim()) {
        alert("내용이 없습니다!");
        return;
      }

      if (this.comment.content != content) {
        const payload = {
          commentId: this.comment.id,
          content: content,
        };
        this.$emit("update-comment", payload);
      }
      this.isUpdate = false;
    },

    deleteComment() {
      this.$emit("delete-comment", this.comment.id);
    },
  },
};
</script>

<style>
#read-comment-div {
  width: 100%;
  white-space: pre-wrap;
  border-radius: 20px;
  padding: 10px;

  background-color: rgba(255, 255, 255, 0.2);
}

.article-comment-option-div {
  width: 100%;
  height: 0px;
  display: flex;
  justify-content: flex-end;
  position: relative;
  top: 10px;
  right: 10px;
}

.my-article-option-item {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-article-option-item:hover {
  cursor: pointer;
}

#update-textarea {
  width: 100%;
  resize: none;
  overflow-y: hidden;
  border: none;
  border-radius: 20px;
  padding: 10px;
  min-height: 72px;

  background-color: rgba(51, 61, 81, 1.0);
  color: #F5F5DC;
  /* background-color: rgba(255, 255, 255, 0.5); */
}

#comment-update-submit {
  width: 64px;
  height: 32px;

  border-radius: 20px;
  border: none;
  background-color: #2e3133;
  color: #F5F5DC;
}

#comment-update-submit:hover {
  cursor: pointer;
  background-color: #D3AC2B;
  color: #F5F5DC;
  transform: none;
}
</style>