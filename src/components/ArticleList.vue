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

	components: {
		ArticleListItem
	},

	computed: {
		articles() {
			return this.$store.state.articles
		}
	}
}
</script>

<style>

</style>