<template>
	<view class="abnormal">
		<!-- 顶部标识 -->
		<view class="return-identify">
			<!-- 图标-->
			<view class="identify-icon">
				<image class="identify-icon-lg" src="../../static/icon/yichang.png"></image>
				<view class="identify-icon-text">不正常通行</view>
			</view>
			<view class="avigation-icon">
				<view class="avigation-icon-layer" v-for="(item,index) in layer" :key="index" @tap="goDetail(index)">
					<image class="avigation-icon-lg" :src="item.url"></image>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
export default{
	data() {
		return {
			layer:[
				{url:'../../static/icon/chey.png'},
				{url:'../../static/icon/wang.png'},
				{url:'../../static/icon/zaog.png'},
				{url:'../../static/icon/yizhou.png'}
			]
		}
	},
	methods:{
		goDetail(e){
			// console.log(e);
			if(e==0){
				uni.navigateTo({
					url:'',
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
			};
			if(e==1){
				uni.navigateTo({
					url:'',
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
			};
			if(e==2){
				uni.navigateTo({
					url:'',
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
			};
			if(e==3){
				uni.navigateTo({
					url:'',
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
			};
		}
	}
}
</script>

<style lang="scss">
	@import '../css/abnormal.css';
	page{
		background-color:#00a3e8,
	}
	.return-identify{
		width:100%;
		height:260upx;
	}
	.avigation-icon{
		width:100%;
		// height:500upx;
		margin-top:30upx;
		display:flex;
		flex-wrap:wrap;
		justify-content:space-around;
	}
	.avigation-icon-layer{
		width:40%;
		height:300upx;
	}
	.avigation-icon-lg{
		width:300upx;
		height:300upx;
	}
</style>
