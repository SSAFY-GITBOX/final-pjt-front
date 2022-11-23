<template>
  <div
    style="
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <div id="article-search-div" class="visible-lg">
      <b-form-input
        @keyup.enter="getSearchArticle"
        size="lg"
        placeholder="게시글 제목을 검색하세요"
        v-model="inputData"
        style="
          border-radius: 100px;
          width: 100%;
          margin: 10px 0;
          padding: 0px 12px;
          padding-left: 20px;
        "
      >
    </b-form-input>
      <div style="position: relative; width: 0px; right: 40px">
        <b-icon-search
          type="submit"
          style="
            color: black;
            left: 350px;
            bottom: 25px;
            margin: 0;
            width: 20px;
            height: 20px;
          "
          @click="getSearchArticle"
        ></b-icon-search>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleSearchBar",

  data() {
    return {
      inputData: null,
    };
  },

  methods: {
    getSearchArticle() {
      const content = this.inputData;
      this.$emit("get-search-article", content);
    },
  },
};
</script>

<style>
@media (max-width: 768px) {
  .visible-lg {
    visibility: hidden;
  }
}

#article-search-div {
  display: flex;
  align-items: center;
  position: relative;
  top: 20px;
  height: 0px;
  width: 400px;
}

</style>