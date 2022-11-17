<template>
	<div>
		<h3>Article List</h3>
		<ArticleListItem
			v-for="article in this.articles"
			:key="article.id"
			:article="article"
		/>
	</div>
</template>

<script>
import ArticleListItem from '@/components/ArticleListItem.vue'

export default {
	name: 'ArticleList',

	data() {
		return {
			articles: [
				{
				"id": 1,
				"title": 'title1',
				"content": 'content1'
				},
				{
				"id": 2,
				"title": 'title2',
				"content": 'content2'
				}
			]
		}
	},

	components: {
		ArticleListItem
	}
}
</script>

<style>

</style>