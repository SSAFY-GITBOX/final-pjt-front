<template>
  <div>
    <!-- 찜한 영화 -->
    <div class="mb-5">
      <details class="mx-3">
        <summary>좋아하는 영화 목록</summary>
        <div v-for="movie in likeMovies" :key="movie.movie_id">
          <router-link
            :to="{
              name: 'MovieDetailView',
              params: { id: movie.movie_id },
            }"
            style="text-decoration: none"
            class="mx-3"
          >
            {{ movie.title }}
          </router-link>
        </div>
      </details>
    </div>

    <!-- 좋아하는 게시글 -->
    <div class="mb-5">
      <details class="mx-3">
        <summary>좋아하는 게시글</summary>
        <div v-for="article in likeArticles" :key="article.id">
          <router-link
            :to="{ name: 'ArticleDetailView', params: { id: article.id } }"
            style="text-decoration: none"
            class="mx-3"
          >
            {{ article.title }}
          </router-link>
        </div>
      </details>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileLike',

  props: {
    likeMovies: Array,
    likeArticles: Array,
  }
};
</script>

<style></style>
