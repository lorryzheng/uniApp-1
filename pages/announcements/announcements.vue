<template>
	<view class="announcements">
		<view class="fill-information-white" v-for="(item, index) in cement" :key="index">
			<!-- 头部 -->
			<view class="announcements-head">
				<view class="announcements-head-left">
					<view class="announcements-head-icon announcements-head-icon-left"></view>
					<view>
						<text>发布人：</text>
						<text>{{item.user_name}}</text>
					</view>
				</view>
				<!-- 时间 -->
				<view class="announcements-head-right">
					<view class="announcements-head-icon announcements-head-icon-right"></view>
					<view>{{item.release_time}}</view>
				</view>
			</view>
			<view class="announcements-title">
				<view class="announcements-head-icon announcements-title-icon"></view>
				<text class="announcements-title-name">{{item.content_title}}</text>
			</view>
			<view class="container">
				<view class="topic_cont_text" :class="item.isFload ? 'hide' : 'show'">    
					<text class="container-text">{{item.content_details}}</text>
				</view>
				<view class="ondisplay" @tap="fload(index)" v-if="item.isFload">
					<view class="show-icon show-icon-open"></view>
					<text>展开全部</text>
				</view>
				<view class="ondisplay" @tap="fload(index)" v-if="!item.isFload">
					<view class="show-icon show-icon-small"></view>
					<text>点击收起</text>
				</view>
			</view>
		</view>
		<view class="loading">{{loadingTXT}}</view>
	</view>
</template>

<script>
var page = 1, timer = null;
export default{
	data() {
		return {
			loadingTXT:'加载更多...',
			cement:[{
				isFload: true,
				user_name:'学生处',
				release_time:'2020.01.13',
				content_title:'宿舍整改通知',
				content_details:'2019年7月18日 - 一开始以为uni-app想自定义导航是需要像原生小程序那样子实现的,但看了一下文档发现并不是,只需要在pages.json里面修改app-plus 详情:app-plus需要'
			},{
				isFload: true,
				user_name:'教务处',
				release_time:'2020.01.13',
				content_title:'春节放假通知',
				content_details:"春节放假通知范文 - 春节放假通知范文 春节放假通知范文篇一 公司全体员工: 根据国务院办公厅通知,2019 年春节放假安排如下: 2 月 4 日(星期 一、农历.春节放假通知范文 - 春节放假通知范文 春节放假通知范文篇一 公司全体员工: 根据国务院办公厅通知,2019 年春节放假安排如下: 2 月 4 日(星期 一、农历."
			},{
				isFload: true,
				user_name:'教务处',
				release_time:'2020.01.13',
				content_title:'春节放假通知',
				content_details:"春节放假通知范文 - 春节放假通知范文 春节放假通知范文篇一 公司全体员工: 根据国务院办公厅通知,2019 年春节放假安排如下: 2 月 4 日(星期 一、农历.春节放假通知范文 - 春节放假通知范文 春节放假通知范文篇一 公司全体员工: 根据国务院办公厅通知,2019 年春节放假安排如下: 2 月 4 日(星期 一、农历."
			},{
				isFload: true,
				user_name:'教务处',
				release_time:'2020.01.13',
				content_title:'春节放假通知',
				content_details:"春节放假通知范文 - 春节放假通知范文 春节放假通知范文篇一 公司全体员工: 根据国务院办公厅通知,2019 年春节放假安排如下: 2 月 4 日(星期 一、农历.春节放假通知范文 - 春节放假通知范文 春节放假通知范文篇一 公司全体员工: 根据国务院办公厅通知,2019 年春节放假安排如下: 2 月 4 日(星期 一、农历."
			},{
				isFload: true,
				user_name:'教务处',
				release_time:'2020.01.13',
				content_title:'春节放假通知',
				content_details:"春节放假通知范文 - 春节放假通知范文 春节放假通知范文篇一 公司全体员工: 根据国务院办公厅通知,2019 年春节放假安排如下: 2 月 4 日(星期 一、农历.春节放假通知范文 - 春节放假通知范文 春节放假通知范文篇一 公司全体员工: 根据国务院办公厅通知,2019 年春节放假安排如下: 2 月 4 日(星期 一、农历."
			},{
				isFload: true,
				user_name:'教务处',
				release_time:'2020.01.13',
				content_title:'春节放假通知',
				content_details:"春节放假通知范文 - 春节放假通知范文 春节放假通知范文篇一 公司全体员工: 根据国务院办公厅通知,2019 年春节放假安排如下: 2 月 4 日(星期 一、农历.春节放假通知范文 - 春节放假通知范文 春节放假通知范文篇一 公司全体员工: 根据国务院办公厅通知,2019 年春节放假安排如下: 2 月 4 日(星期 一、农历."
			}],
			
		}
	},
	onLoad : function () {
		this.announcements();
	},
	onPullDownRefresh : function () {
		this.announcements();
	},
	onReachBottom : function () {
		this.getMoreNews();
		if(timer != null){clearTimeout(timer);}
		timer = setTimeout(function(){this.getMoreNews();},500)
	},
	methods:{
		getMoreNews : function(){
			if(this.loadingTXT == '已全部加载完毕'){return false;S}
			this.loadingTXT = '加载中...'
			uni.showNavigationBarLoading();
			uni.request({
				url: 'http://?page='+page,
				success: data =>{
					uni.showNavigationBarLoading();
					if(res.data == null){
						this.loadingTXT = '已全部加载完毕'
						return false;
					}
					this.cement = this.cement.concat(res.cement);
					uni.stopPullDownRefresh();
					page++;
					this.loadingTXT = '加载更多...'
				}
			})
		},
		announcements : function(){
			page = 1;
			uni.request({
				url: 'http://?page='+page,
				success: res =>{
					if (res.statusCode == true) {
						this.cement = res.cement;
						page++;
					}else if(res.statusCode == 400){
						uni.showToast({
							icon:'none',
							title:'网络异常'
						})
					}
				}
			})
		},
		fload(e){
			console.log(e)
			//改变isFload的状态
			this.cement[e].isFload = !this.cement[e].isFload;
		}
	}
}
</script>

<style lang="scss">
@import '../css/abnormal.css';
	page{
		background-color:#00a3e8,
	}
	.announcements-head{
		width:95%;
		height:60upx;
		line-height:60upx;
		margin:0 auto;
		display:flex;
		flex-wrap:wrap;
		justify-content:space-between;
		color:#4d4d4d;
		font-size: 30upx;
	}
	.announcements-head-left{
		width:60%;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-start;
	}
	.announcements-head-right{
		width:40%;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-end;
	}
	.announcements-head-icon{
	    width:40upx;
	    height:40upx;
		margin-right:10upx;
	    position: relative;
	}
	.announcements-head-icon:before{
	    content: " ";
	    position: absolute;
	    width:40upx;
	    height:40upx;
		top:20%;
		// margin-top:25upx;
	}
	.announcements-head-icon-left:before{
		background:url(../../static/icon/tou.png) no-repeat;
		background-size:100% 100%;
	}
	.announcements-head-icon-right:before{
		background:url(../../static/icon/time.png) no-repeat;
		background-size:100% 100%;
	}
	.announcements-title{
		width:95%;
		margin:0 auto;
		height:70upx;
		line-height:70upx;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-start;
	}
	.announcements-title-icon:before{
		position: absolute;
		top:46%;
		background:url(../../static/icon/zui.png) no-repeat;
		background-size:100% 100%;
	}
	.announcements-title-name{
		color:#000;
		font-size:36upx;
		font-weight: 700;
	}
	// .container{
	// 	width:95%;
	// 	margin:0 auto;
	// }
	.topic_cont_text{
		width:95%;
		margin:0 auto;
		height: auto;
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		/* 要显示多少行就改变line-clamp的数据,此处折叠起来显示一行*/
		-webkit-line-clamp: 3;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.hide{
		display: -webkit-box;
	}
	.show{
		display: block;
	}
	.container-text{
		font-size:38upx;
	}
	.ondisplay{
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-end;
		margin-right:30upx;
		color:#00a3e8;
		font-size:30upx;
	}
	.show-icon{
		width:40upx;
		height:25upx;
		margin-right:10upx;
		position: relative;
	}
	.show-icon:before{
	    content: " ";
	    position: absolute;
	    width:40upx;
	    height:25upx;
		top:40%;
		// margin-top:25upx;
	}
	.show-icon-open:before{
		background:url(../../static/icon/open.png) no-repeat;
		background-size:100% 100%;
	}
	.show-icon-small:before{
		background:url(../../static/icon/small.png) no-repeat;
		background-size:100% 100%;
	}
	.loading{
		line-height: 2em;
		text-align: center;
		color:#888;
		margin-top:60upx;
	}
</style>
