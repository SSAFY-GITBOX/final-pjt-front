<template>
  <div id="like-articles-div">
    <!-- 좋아하는 게시글 -->
    <div v-for="article in orderdLikeArticles" :key="article.id" class="ms-2">
      <router-link
        :to="{ name: 'ArticleDetailView', params: { id: article.id } }"
				class="btn shadow p-3 mb-2 rounded"
      >
				<span style="font-size: 20px;">{{ article.title }}</span>
				<span>{{ article.created_at.substr(0, 10) }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import lodash from 'lodash'

export default {
  name: "ProfileLikeArticles",

  props: {
    likeArticles: Array,
  },

  computed: {
    orderdLikeArticles() {
      return lodash.orderBy(this.likeArticles, 'created_at', 'desc')
    }
  }
};
</script>

<style>
#like-articles-div {
  flex-direction: column;
  flex-wrap: wrap;
  background-color: rgba(51, 61, 81, 1.0);
  color: #F5F5DC;
  padding: 3% 3%;
  display: flex;

  box-shadow : rgba(0, 0, 0, 0.8) 0px 6px 12px -2px, rgba(0, 0, 0, 0.8) 0px 3px 7px -3px;
  border-radius: 20px;
}

#like-articles-div a {
	display: flex;
	justify-content: space-between;
	/* transition: all 0.2s linear; */
	background-color: #2e3133;
  color: #F5F5DC;
	text-decoration: none;
}

#like-articles-div a:hover {
	/* transform: scale(1.05); */
  background-color: #D3AC2B;
}
</style>
