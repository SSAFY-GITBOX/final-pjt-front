<template>
	<div>
		<router-link :to="{ name: 'ArticleDetailView', params: { id: article.id } }" style="text-decoration: none;">
      <p>{{ article.id }}. &nbsp; {{ article.title }} &nbsp; - &nbsp; {{ article.username }}</p>
    </router-link>
	</div>
</template>

<script>
export default {
	name: 'ArticleListItem',
	props: {
		article: Object
	}
}
</script>

<style>

</style>