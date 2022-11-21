<template>
  <div>
    <!-- 잔디 -->
    <div id="grass">
      <calendar-heatmap
        :values="acts"
        :end-date="today"
        :max="maxCount"
        class="w-75"
      />
    </div>

    <!-- 활동 내역 for 잔디 -->
    <div id="acts">
      <details>
        <summary class="my-3">상세보기</summary>

        <h3>Movie 댓글</h3>
        <div v-for="comment in user?.comment_set" :key="comment.id">
          <router-link
            :to="{ name: 'MovieDetailView', params: { id: comment.movie } }"
            style="text-decoration: none"
          >
            {{ comment.content }} - {{ comment.created_at.substr(0, 10) }}
          </router-link>
        </div>
        <hr />

        <h3>Community 게시글</h3>
        <div v-for="(article, index) in user?.article_set" :key="index">
          <router-link
            :to="{ name: 'ArticleDetailView', params: { id: article.id } }"
            style="text-decoration: none"
          >
            {{ article.title }} - {{ article.created_at.substr(0, 10) }}
          </router-link>
        </div>
        <hr />

        <h3>Community 댓글</h3>
        <div
          v-for="articlecomment in user?.articlecomment_set"
          :key="articlecomment.title"
        >
          <router-link
            :to="{
              name: 'ArticleDetailView',
              params: { id: articlecomment.article },
            }"
            style="text-decoration: none"
          >
            {{ articlecomment.content }} -
            {{ articlecomment.created_at.substr(0, 10) }}
          </router-link>
        </div>
      </details>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileGrass",

  props: {
    acts: Array,
    today: String,
    maxCount: Number,
    user: Object,
  },
};
</script>

<style></style>
