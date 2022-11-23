<template>
  <div>
    <div style="display: flex; justify-content: space-between;" >
      <div style="display: flex;">
        <div style="padding: 0px 20px; width: 100px; ">
          글 번호
        </div>
        <div style="padding: 0px 20px; width: 100px; ">
          작성자
        </div>
        <div>
          제목
        </div>
      </div>
      <div style="padding: 0px 20px; width: 120px; ">
        작성시간
      </div>
    </div>
    <hr>
    <ArticleListItem
      v-for="(article, index) in searchedArticle"
      :key="index"
      :article="article"
      :index="index"
    />

  </div>
</template>

<script>
import ArticleListItem from "@/components/ArticleListItem.vue";

export default {
  name: "ArticleList",

  components: {
    ArticleListItem,
  },

  props: {
    searchedArticle: null,
  },

  data() {
    return {
      page: 1,
      articles: [],
    };
  },
};
</script>

<style>
.infinite-status-prompt{
  color: #F5F5DC !important;
}
</style>