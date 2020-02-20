<template>
	<view class="introduce">
		<view class="introduce-title">院系介绍</view>
		<departments></departments>
	</view>
</template>

<script>
import departments from '../../components/departments/departments.vue';
export default {
	components: {
		departments
	},
	data(){
		return {
			
		}
	}
}
</script>

<style>
	.introduce-title{
		width:100%;
		height:80upx;
		text-align: center;
		line-height:80upx;
		background:#f3f3f3;
	}
</style>
