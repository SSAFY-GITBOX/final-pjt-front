<template>
  <div id="article-view-div">
    <h1>GITBOX 커뮤니티</h1>
    <!-- 게시글작성 모달창 구현하는 부분 -->
    <div>
      <div style="text-align: end; padding-right: 20px;">
        <b-button v-b-modal.modal-center style="background-color: #2e3133; color: #F5F5DC;">게시글 작성</b-button>
      </div>

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
        <!-- 기존 모달 헤더 삭제-->
        <template #modal-header>
          <div></div>
        </template>

        <!-- 모달 바디 -->
        <template #default="{ close, ok, cancel }">
          <div id="article-modal-header">
            <h5>게시글 작성</h5>
            <b-button size="sm" id="header-button" @click="close()">
              <div style="width: 25px; height: 25px; border-radius: 15px; background-color: #F5F5DC;">
                <b-icon-x-circle-fill style="color: #D3AC2B; width: 100%; height: 100%;"></b-icon-x-circle-fill>
              </div>
            </b-button>
          </div>

          <b-form-group
            label="제목"
            label-for="article-title-input"
            invalid-feedback="Comment is required"
          >
            <!-- 제목 부분 -->
            <b-form-input
              id="article-title-input"
              v-model.trim="title"
              placeholder="게시글의 제목을 적어주세요"
              required
            ></b-form-input>
          </b-form-group>
          <div style="padding-top: 20px">
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
                  placeholder="고객님이 소통하고 싶은 내용을 적어주세요"
                  required
                  rows="20"
                ></b-form-textarea>
              </b-form-group>
            </form>
          </div>

          <!-- 푸터 -->
          <div id="article-modal-footer">
            <div style="padding-left: 16px; padding-top: 16px">
              <b-button size="sm" style="background-color:#D3AC2B; width: 56px;" @click="ok()">
                OK
              </b-button>
            </div>
            <div style="padding-left: 16px; padding-top: 16px">
              <b-button size="sm" style="background-color:#D3AC2B" @click="cancel()"
                >Cancel</b-button
              >
            </div>
          </div>
        </template>

        <!-- 기존 모달 푸터 삭제 -->
        <template #modal-footer>
          <div></div>
        </template>
      </b-modal>
    </div>

    <div id="articleview-articlelist-div">
      <ArticleList />
    </div>
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

  created() {
    if (!this.$store.getters.isLogin) {
      this.$router.push({ name: "LogInView" });
    }
  },

  methods: {
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetModal() {
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

.b-modal {
  width: 80vw;
  height: 80vh;
}

#article-view-div {
  background-color: #F5F5DC;
  padding: 3% 5%;
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #333D51
}

#modal-center___BV_modal_header_ {
  height: 0px;
  padding: 0px;
  border: 0;
}

#modal-center___BV_modal_footer_ {
  height: 0px;
  padding: 0px;
  border: 0;
}

#article-modal-header {
  display: flex;
  justify-content: space-between;
}

#article-modal-footer {
  display: flex;
  justify-content: flex-end;
}

#modal-center___BV_modal_body_ {
  background-color: rgba(51, 61, 81, 0.9);
  font-family: "DOHYEON";
  color: #F5F5DC;
}

#article-title-input {
  background-color: white;
}

#article-content-input {
  background-color: white;
}

#articleview-articlelist-div{
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 20px;
  padding:20px;
  background-color: rgba(46, 49, 51);
  margin-top: 20px;
  color: #F5F5DC;
}


</style>