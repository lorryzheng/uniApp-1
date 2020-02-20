<template>
	<view class="dynamic">
		<view class="introduce-title">校园动态</view>
		<view>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value, key) in listData" :key="key" @click="goDetail(value)">
					<view class="uni-media-list">
						<image class="uni-media-list-logo" :src="value.cover"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{ value.title }}</view>
							<view class="uni-media-list-text-bottom">
								<text>{{ value.author_name }}</text>
								<text>{{ value.published_at }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status"  :icon-size="16" :content-text="contentText" />
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
export default{
	components: {
		uniLoadMore
	},
	data() {
		return {
			listData: [{
				id:110440,
				post_id:'5284545',
				title:'电力电池市场洗牌焦距，利特时代仍股占据一半份额',
				author_name:'未来汽贸日报',
				cover:'../../static/05.jpg',
				published_at:'2020-01-13 08:51:20',
				content:''
			},{
				id:110440,
				post_id:'5284545',
				title:'电力电池市场洗牌焦距，利特时代仍股占据一半份额',
				author_name:'未来汽贸日报',
				cover:'../../static/05.jpg',
				published_at:'2020-01-13 08:51:20',
				content:''
			},{
				id:110440,
				post_id:'5284545',
				title:'电力电池市场洗牌焦距，利特时代仍股占据一半份额',
				author_name:'未来汽贸日报',
				cover:'../../static/05.jpg',
				published_at:'2020-01-13 08:51:20',
				content:''
			},{
				id:110440,
				post_id:'5284545',
				title:'电力电池市场洗牌焦距，利特时代仍股占据一半份额',
				author_name:'未来汽贸日报',
				cover:'../../static/05.jpg',
				published_at:'2020-01-13 08:51:20',
				content:''
			},{
				id:110440,
				post_id:'5284545',
				title:'电力电池市场洗牌焦距，利特时代仍股占据一半份额',
				author_name:'未来汽贸日报',
				cover:'../../static/05.jpg',
				published_at:'2020-01-13 08:51:20',
				content:''
			},{
				id:110440,
				post_id:'5284545',
				title:'电力电池市场洗牌焦距，利特时代仍股占据一半份额',
				author_name:'未来汽贸日报',
				cover:'../../static/05.jpg',
				published_at:'2020-01-13 08:51:20',
				content:''
			},{
				id:110440,
				post_id:'5284545',
				title:'电力电池市场洗牌焦距，利特时代仍股占据一半份额',
				author_name:'未来汽贸日报',
				cover:'../../static/05.jpg',
				published_at:'2020-01-13 08:51:20',
				content:''
			},{
				id:110440,
				post_id:'5284545',
				title:'电力电池市场洗牌焦距，利特时代仍股占据一半份额',
				author_name:'未来汽贸日报',
				cover:'../../static/05.jpg',
				published_at:'2020-01-13 08:51:20',
				content:''
			},{
				id:110440,
				post_id:'5284545',
				title:'电力电池市场洗牌焦距，利特时代仍股占据一半份额',
				author_name:'未来汽贸日报',
				cover:'../../static/05.jpg',
				published_at:'2020-01-13 08:51:20',
				content:''
			},{
				id:110440,
				post_id:'5284545',
				title:'电力电池市场洗牌焦距，利特时代仍股占据一半份额',
				author_name:'未来汽贸日报',
				cover:'../../static/05.jpg',
				published_at:'2020-01-13 08:51:20',
				content:''
			}],
			last_id: '',
			reload: false,
			status: 'more',
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			}
		}
	},
	onLoad() {
		// this.getBanner();
		this.getList();
	},
	onPullDownRefresh() {
		this.reload = true;
		this.last_id = '';
		// this.getBanner();
		this.getList();
	},
	onReachBottom() {
		this.status = 'more';
		this.getList();
	},
	methods:{
		getList() {
			var data = {
				column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
			};
			if (this.last_id) {
				//说明已有数据，目前处于上拉加载
				this.status = 'loading';
				data.minId = this.last_id;
				data.time = new Date().getTime() + '';
				data.pageSize = 10;
			}
			uni.request({
				url: '',
				data: data,
				success: data => {
					if (data.statusCode == true) {
						let list = this.setTime(data.data);
						this.listData = this.reload ? list : this.listData.concat(list);
						this.last_id = list[list.length - 1].id;
						this.reload = false;
					}
				},
				fail: (data, code) => {
					console.log('fail' + JSON.stringify(data));
				}
			});
		},
		goDetail: function(e) {
			// 				if (!/前|刚刚/.test(e.published_at)) {
			// 					e.published_at = dateUtils.format(e.published_at);
			// 				}
			uni.navigateTo({
				url: '../details-page/details'
			});
			let detail = {
				author_name: e.author_name,
				cover: e.cover,
				id: e.id,
				post_id: e.post_id,
				published_at: e.published_at,
				title: e.title
			};
			uni.navigateTo({
				url: '../details-page/details?detailDate=' + encodeURIComponent(JSON.stringify(detail))
			});
		},
		setTime: function(items) {
			var newItems = [];
			items.forEach(e => {
				newItems.push({
					author_name: e.author_name,
					cover: e.cover,
					id: e.id,
					post_id: e.post_id,
					published_at: dateUtils.format(e.published_at),
					title: e.title
				});
			});
			return newItems;
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
	.uni-list {
	    background-color: #FFFFFF;
	    position: relative;
	    width: 100%;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: vertical;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: column;
	    flex-direction: column;
	}
	.uni-list-cell {
	    position: relative;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	    -webkit-box-pack: justify;
	    -webkit-justify-content: space-between;
	    justify-content: space-between;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	}
	.uni-media-list {
	    padding: 11px 15px;
	    box-sizing: border-box;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    width: 100%;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	}
	.uni-media-list-logo {
		width: 180upx;
		height: 140upx;
		margin-right: 10px;
	}
	.uni-media-list-body {
	    height: auto;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
	    -webkit-box-orient: vertical;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: column;
	    flex-direction: column;
	    -webkit-box-pack: justify;
		-webkit-justify-content: space-around;
		justify-content: space-around;
	    -webkit-box-align: start;
	    -webkit-align-items: flex-start;
	    align-items: flex-start;
	    overflow: hidden;
	}
	.uni-media-list-text-bottom{
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	    -webkit-box-pack: justify;
	    -webkit-justify-content: space-between;
	    justify-content: space-between;
	}
	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}
	
	.uni-media-list-text-top {
		width: 100%;
		height: 74upx;
		line-height: 18px;
		font-size: 28upx;
		overflow: hidden;
	}
	
	.uni-media-list-text-bottom {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		line-height: 15px;
		font-size: 13px;
		color: #8f8f94;
	}
</style>
