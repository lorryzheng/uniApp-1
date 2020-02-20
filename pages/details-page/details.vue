<template>
	<view>
		<view class="banner">
			<image class="banner-img" :src="banner.cover"></image>
			<view class="banner-title">{{banner.title}}</view>
		</view>
		<view class="article-meta">
			<text class="article-author">{{banner.author_name}}</text>
			<text class="article-text">发表于</text>
			<text class="article-time">{{banner.published_at}}</text>
		</view>
		<view class="article-content">
			<!-- <rich-text :nodes="htmlNodes"></rich-text> -->
			<view class="content-title">{{banner.text}}</view>
		</view>
		<!-- #ifdef MP-WEIXIN || MP-QQ -->
		<!-- <ad v-if="htmlNodes.length > 0" unit-id="adunit-01b7a010bf53d74e"></ad> -->
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// title: '',
				banner: {
					cover : '../../static/16.jpg',
					title : '致力于占领全球市场，日本虚拟货币交易初创公司 [Huobi Japan] 获456万美元融资',
					author_name : '土木工程系',
					published_at : '一小时前',
					text : '致力于占领全球市场，日本虚拟货币交易初创公司致力于占领全球市场，日本虚拟货币交易初创公司致力于占领全球市场，日本虚拟货币交易初创公司致力于占领全球市场，日本虚拟货币交易初创公司致力于占领全球市场，日本虚拟货币交易初创公司致力于占领全球市场，日本虚拟货币交易初创公司致力于占领全球市场，日本虚拟货币交易初创公司致力于占领全球市场，日本虚拟货币交易初创公司致力于占领全球市场，日本虚拟货币交易初创公司致力于占领全球市场，日本虚拟货币交易初创公司致力于占领全球市场，日本虚拟货币交易初创公司致力于占领全球市场，日本虚拟货币交易初创公司致力于占领全球市场，日本虚拟货币交易初创公司致力于占领全球市场，日本虚拟货币交易初创公司致力于占领全球市场，日本虚拟货币交易初创公司致力于占领全球市场，日本虚拟货币交易初创公司'
				},
				parameter:''
			}
		},
		onLoad:function(option){
			console.log(option.badge);//url传的参数
			this.parameter = option.badge;
			this.getDetail()
		},
		methods: {
			getDetail() {
				uni.request({
					url: '',
					data:{
						parameter:this.parameter
					},
					dataType:'json',
					success: (data) => {
						if (data.statusCode == true) {
							this.banner = data.banner
						}
					},
					fail: () => {
						console.log('fail');
					}
				});
			}
		}
	}
</script>

<style>
	.banner {
		height: 400upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
	}

	.article-meta {
		padding: 20upx 40upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 30upx;
		line-height: 40upx;
		margin: 0 20upx;
	}

	.article-author,
	.article-time {
		font-size: 30upx;
	}

	.article-content {
		padding: 0 30upx;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
</style>

