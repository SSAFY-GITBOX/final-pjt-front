<template>
  <div id="like-articles-div">
    <!-- 좋아하는 게시글 -->
    <div v-for="article in orderdLikeArticles" :key="article.id" class="ms-2">
      <router-link
        :to="{ name: 'ArticleDetailView', params: { id: article.id } }"
				class="btn shadow-sm p-3 mb-2 rounded"
      >
				<span style="font-size: 20px; font-weight: bold;">{{ article.title }}</span>
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
  background-color: plum;
  padding: 3% 5%;
  display: flex;
  flex-direction: column;
  text-align: start;
	border-radius: 15px;
}

#like-articles-div a {
	display: flex;
	justify-content: space-between;
	transition: all 0.2s linear;
	background-color: palevioletred;
	text-decoration: none;
	color: rgb(50, 50, 50);
}

#like-articles-div a:hover {
	transform: scale(1.05);
}
</style>
