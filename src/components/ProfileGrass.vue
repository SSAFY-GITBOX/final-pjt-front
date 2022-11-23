<template>
  <div id="grass-div">
    <!-- 총 활동 수 -->
    <p class="ms-3">
      <span style="font-weight: bold; font-size: 22px">{{ actsTotalCnt }}</span>
      개의 활동 내역이 있습니다.
    </p>

    <!-- 잔디 -->
    <div id="grass" class="shadow p-3 mb-4 bg-white rounded">
      <calendar-heatmap
        :values="acts"
        :end-date="today"
        :max="maxCount"
        class="m-2"
      />
    </div>

    <!-- 활동 내역 for 잔디 -->
    <div id="acts">
			<h4 class="ms-2">상세 활동 내역</h4>
			<!-- 영화 감상평 -->
      <details>
        <summary>영화 감상평</summary>
        <div v-for="comment in orderdMovieComments" :key="comment.id">
          <router-link
            :to="{ name: 'MovieDetailView', params: { id: comment.movie } }"
            class="btn shadow-sm p-1 mt-1 mb-2 rounded"
          >
            <span id="movie-title">{{ comment.movie_title }}</span>
            {{ comment.content }} - {{ comment.created_at.substr(0, 10) }}
          </router-link>
        </div>
        <br />
      </details>
			<!-- 작성 게시글 -->
      <details>
        <summary>작성 게시글</summary>
        <div v-for="(article, index) in orderdArticles" :key="index">
          <router-link
            :to="{ name: 'ArticleDetailView', params: { id: article.id } }"
            class="btn shadow-sm p-1 mt-1 mb-2 rounded"
          >
            {{ article.title }} - {{ article.created_at.substr(0, 10) }}
          </router-link>
        </div>
        <br />
      </details>
			<!-- 작성 댓글 -->
      <details>
        <summary>작성 댓글</summary>
        <div
          v-for="articlecomment in orderdArticleComments"
          :key="articlecomment.title"
        >
          <router-link
            :to="{
              name: 'ArticleDetailView',
              params: { id: articlecomment.article },
            }"
            class="btn shadow-sm p-1 mt-1 mb-2 rounded"
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
import lodash from "lodash";

export default {
  name: "ProfileGrass",

  props: {
    actsTotalCnt: Number,
    acts: Array,
    today: String,
    maxCount: Number,
    user: Object,
  },

  created() {
    console.log(this.user);
  },

  computed: {
    orderdMovieComments() {
      return lodash.orderBy(this.user?.comment_set, "created_at", "desc");
    },

    orderdArticles() {
      return lodash.orderBy(this.user?.article_set, "created_at", "desc");
    },

    orderdArticleComments() {
      return lodash.orderBy(
        this.user?.articlecomment_set,
        "created_at",
        "desc"
      );
    },
  },
};
</script>

<style>
#grass-div {
  background-color: plum;
  padding: 3% 5%;
  display: flex;
  flex-direction: column;
  text-align: start;
}

#acts details {
	margin-left: 1rem;
}

#acts a {
  text-decoration: none;
  color: black;
  margin-left: 2rem;
}

#acts #movie-title {
  font-size: 19px;
  color: blue;
  margin-right: 0.5rem;
}

#grass {
  transition: all 0.2s linear;
}

#grass:hover {
  transform: scale(1.07);
}

#acts a:hover {
  transform: scale(1.02);
}
</style>
