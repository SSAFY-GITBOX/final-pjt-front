<template>
  <div>
    <div style="display: flex; justify-content: space-between;" >
      <div style="display: flex;">
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
      v-for="(article, article_id) in articles"
      :key="article_id"
      :article="article"
    />

    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import ArticleListItem from "@/components/ArticleListItem.vue";
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: "ArticleList",

  components: {
    ArticleListItem,
    InfiniteLoading,
  },

  data() {
    return {
      page: 1,
      articles: [],
    };
  },

  methods: {
    infiniteHandler($state) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v2/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        },
        params: {
          page: this.page,
        },
      })
      .then(({ data }) => {
        console.log(data)
        if (data.length) {
          this.page += 1;
          this.articles.push(...data);
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
  },
};
</script>

<style>
</style>