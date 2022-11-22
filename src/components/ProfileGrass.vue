<template>
  <div id="grass-div">
		<!-- 총 활동 수 -->
		<p class="ms-3">
			<span style="font-weight: bold; font-size: 22px;">{{ actsTotalCnt }}</span> 개의 활동 내역이 있습니다.
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
      <details class="ms-3">
        <summary class="mb-3">상세 보기</summary>

        <h4>Movie 댓글</h4>
        <div v-for="comment in user?.comment_set" :key="comment.id">
          <router-link
            :to="{ name: 'MovieDetailView', params: { id: comment.movie } }"
						class="btn shadow-sm p-1 mb-2 rounded"
          >
            {{ comment.content }} - {{ comment.created_at.substr(0, 10) }}
          </router-link>
        </div>
				<br>

        <h4>Community 게시글</h4>
        <div v-for="(article, index) in user?.article_set" :key="index">
          <router-link
            :to="{ name: 'ArticleDetailView', params: { id: article.id } }"
						class="btn shadow-sm p-1 mb-2 rounded"
          >
            {{ article.title }} - {{ article.created_at.substr(0, 10) }}
          </router-link>
        </div>
				<br>

        <h4>Community 댓글</h4>
        <div
          v-for="articlecomment in user?.articlecomment_set"
          :key="articlecomment.title"
        >
          <router-link
            :to="{
              name: 'ArticleDetailView',
              params: { id: articlecomment.article },
            }"
						class="btn shadow-sm p-1 mb-2 rounded"
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
		actsTotalCnt: Number,
    acts: Array,
    today: String,
    maxCount: Number,
    user: Object,
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

#acts a {
	text-decoration: none;
	color: black;
	margin-left: 1rem;
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
