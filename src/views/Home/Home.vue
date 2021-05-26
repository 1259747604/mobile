<template>
	<div class="home">
		<!-- 功能列表-->
		<div class="item" v-for="(item, index) of list" @click="goPage(item.route)">
			{{ item.name }}
		</div>
	</div>
</template>

<script>
import list from './config'

export default {
	name: 'Home',
	components: {},
	data() {
		return {
			list,
		}
	},
	methods: {
		goPage(route) {
			this.$router.push(route)
		},
	},
}
</script>

<style lang="scss" scoped>
.home {
	font-size: 36px;
	font-weight: 600;
	.item {
		height: 50px;
		color: #883782;
		animation: rubberBand;
		animation-delay: 1s;
		animation-duration: 1s;
	}
}
</style>
