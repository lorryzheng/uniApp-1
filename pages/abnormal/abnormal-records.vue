<template>
	<view class="abnormal-records">
		<view>
			<!-- 图标-->
			<view class="identify-icon">
				<image class="identify-icon-lg" src="../../static/icon/chr.png"></image>
				<view class="identify-icon-text">异常记录</view>
			</view>
		</view>
		<view class="records-article">
			<view class="article" v-for="item in list">
				<text class="article-information information-one">{{item.title}}</text>
				<text class="article-information information-two">日期：{{item.time}}</text>
			</view>
		</view> 
	</view>
</template>

<script>
export default{
	data() {
		return {
			list:[
				{title:'彻夜未归',time:'2016.01.25'},
				{title:'晚归',time:'2016.01.25'},
				{title:'早出',time:'2016.01.25'},
				{title:'晚归',time:'2016.01.25'},
				{title:'彻夜未归',time:'2016.01.25'},
				{title:'早出',time:'2016.01.25'},
				{title:'晚归',time:'2016.01.25'},
				{title:'彻夜未归',time:'2016.01.25'}
			]
		}
	},
	onLoad(){
		this.students_abnormal()
	},
	methods:{
		students_abnormal(){
			const nameId = uni.getStorageSync('nameId');
			uni.request({
				url:'',
				data:{
					nameId:nameId
				},
				dataType:'json',
				success:res =>{
					this.list == res.data
				}
			})
		}
	}
}
</script>

<style lang="scss">
	@import '../css/abnormal.css';
	page{
		background-color:#00a3e8,
	}
	.article{
		width:90%;
		height:80upx;
		margin:20upx auto;
		display:flex;
		flex-wrap:wrap;
		justify-content:space-between;
		background-color:#fff;
		line-height:80upx;
		border-radius: 15upx;
	}
	.article-information{
		font-size: 36upx;
		color:#000000;
	}
	.information-one{margin-left:20upx;}
	.information-two{margin-right:20upx;}
</style>
