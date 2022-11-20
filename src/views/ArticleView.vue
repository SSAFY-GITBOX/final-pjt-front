<template>
  <div>
    <h1>GITBOX 커뮤니티</h1>
    <!-- <router-link :to="{ name: 'ArticleCreateView' }">[게시글 작성]</router-link> -->
    <!-- 게시글작성 모달창 구현하는 부분 -->
    <div>
      <div style="text-align: center">
        <b-button v-b-modal.modal-center>게시글 작성</b-button>
      </div>


      <!-- 여기부터 모달창 -->
      <b-modal
        class="b-modal"
        id="modal-center"
        centered
        ref="modal"
        title="게시글작성"
        size="xl"
        @show="resetModal"
        @hidden="resetModal"
        @ok="createArticle"
      >
        <template #modal-header="{ close }">
          <!-- Emulate built in modal header close button action -->
          <h5>게시글 작성</h5>
          <b-button size="sm" id="header-button" @click="close()">
            ❌
          </b-button>
        </template>
        <b-form-group
          label="제목"
          label-for="article-title-input"
          invalid-feedback="Comment is required"
        >
          <!-- 제목 부분 -->
          <b-form-input
            id="article-title-input"
            v-model.trim="title"
            required
          ></b-form-input>
        </b-form-group>
        <form ref="form">
          <b-form-group
            class="modal-text"
            label="내용"
            label-for="article-content-input"
            invalid-feedback="Comment is required"
          >
            <!-- 내용 부분은 textarea로 바꿔줬음 -->
            <b-form-textarea
              id="article-content-input"
              v-model.trim="content"
              required
              rows="20"
            ></b-form-textarea>
          </b-form-group>
        </form>
      </b-modal>
    </div>
    <hr />
    <ArticleList />
  </div>
</template>

<script>
import ArticleList from "@/components/ArticleList.vue";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "ArticleView",

  data() {
    return {
      title: null,
      content: null,
    };
  },

  components: {
    ArticleList,
  },

  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },

  // created() {
  //   this.getArticles();
  // },

  methods: {
    // getArticles() {
    //   if (this.isLogin === true) {
    //     this.$store.dispatch("getArticles");
    //   } else {
    //     alert("로그인이 필요한 서비스입니다.");
    //     this.$router.push({ name: "LogInView" });
    //   }
    // },
    createArticle() {
      const title = this.title;
      const content = this.content;
      if (!title) {
        alert("제목을 입력해주세요");
        return;
      } else if (!content) {
        alert("내용을 입력해주세요");
        return;
      }
      axios({
        method: "post",
        url: `${API_URL}/api/v2/`,
        data: {
          title: title,
          content: content,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.$router.go();
          //   this.$router.push({ name: "ArticleView" });
          // this.getArticles();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetModal() {
      // 모달창 닫히거나 하면 input 값 초기화시키는 메서드
      this.title = null;
      this.content = null;
    },
    hideModal() {
      this.$root.$emit("bv::hide::modal", "modal-1", "#btnShow");
    },
  },
};
</script>

<style>
#header-button {
  background-color: rgba(0, 0, 0, 0);
  border: none;
}

.b-modal{
  width: 80vw;
  height: 80vh;
}
</style>