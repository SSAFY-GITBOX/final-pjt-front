<template>
  <div id="articlelist-item-div">
    <div style="display: flex; justify-content: space-between;" >
      <!-- 유저이름 -->
      <!-- 프로필 페이 -->
      <div style="display: flex;" >
        <div style="padding: 0px 20px; width: 100px; ">
          {{ articleNum }}
        </div>
        <div style="padding: 0px 20px; width: 100px; ">
          <router-link
            :to="{ name: 'ProfileView', params: { id: article.user } }"
            style="text-decoration: none"
          >
            {{ article.username }}
          </router-link>
        </div>
        <!-- 제목 -->
        <div>
          <router-link
            :to="{ name: 'ArticleDetailView', params: { id: article.id } }"
            style="text-decoration: none"
          >
            {{ article.title }}
          </router-link>
        </div>
      </div>
      <!-- 작성시간 -->
      <div style="padding: 0px 20px; width: 130px; ">
        {{ article.created_at.substr(0, 10) }}
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "ArticleListItem",
  props: {
    article: Object,
    index: Number
  },
  computed: {
    articleNum() {
      return this.index + 1
    }
  }
};
</script>

<style>
#articlelist-item-div a{
  color: #F5F5DC;
}
</style>