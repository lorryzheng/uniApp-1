<template>
	<view class="mpvue-picker">
		
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-color="#FFF" class="carousel">
			<swiper-item v-for="(item,index) in info" :key="index">
				<image class="sw-img" :src="item.content"></image>
			</swiper-item>
		</swiper>
		<!-- 九宫格 -->
		<!-- <view class="example-body">
			<grid :column="4" :highlight="true" @change="change">
				<gridItem v-for="(item, index) in list" :key="index">
					<view class="grid-item-box">
						<image :src="item.url" class="image" mode="aspectFill" />
						<text class="text">{{ item.text }}</text>
					</view>
				</gridItem>
			</grid>
		</view> -->
		<view class="gongge">
			<view class="long_ge">
				<view class="gongge-text" v-for="(item, index) in list" :key="index" @click="scratchable(index)">
					<image class="gongge_img" :src="item.url"></image>
					<view class="gongge_name">{{ item.text }}</view>
				</view>
			</view>
		</view>
		<!-- 底部校园新闻栏 -->
		<view class="content-module">
			<view class="content-level" v-for="(item,index) in part" :key='index' @tap="btnDepar(index)">
				<image :src="item.url"></image>
				<view class="level-name black-color">{{item.text}}</view>
			</view>
		</view>
		<mpvue-picker
			:themeColor="themeColor"
			ref="mpvuePicker"
			:mode="mode"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm"
			@onCancel="onCancel"
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
	</view>
</template>

<script>
import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
// import grid from '../../components/grid/grid.vue';
// import gridItem from '../../components/grid-item/grid-item.vue';
export default {
	components: {
		mpvuePicker
		// grid,
		// gridItem,
	},
	data() {
		return {
			// 轮播图
			info: [{
				content: '../../static/2.jpg'
			},{
				content: '../../static/11.jpg'
			},{
				content: '../../static/16.jpg'
			},{
				content: '../../static/17.jpg'
			},{
				content: '../../static/19.jpg'
			},],
			// 九宫格
			list: [{
					url: '../../static/nine/jieshao.png',
					text: '院系介绍',
					badge: '0'
				},{
					url: '../../static/nine/dongtai.png',
					text: '校园动态',
					badge: '1'
				},{
					url: '../../static/nine/tongzhi.png',
					text: '通知公告',
					badge: '2'
				},{
					url: '../../static/nine/ziliao.png',
					text: '个人资料',
					badge: '3'
				},{
					url: '../../static/nine/churu.png',
					text: '出入记录',
					badge: '4'
				},{
					url: '../../static/nine/mima.png',
					text: '修改密码',
					badge: '5'
				},{
					url: '../../static/nine/shenpi.png',
					text: '主动申请',
					badge: '6'
				},{
					url: '../../static/nine/jiaren.png',
					text: '家人来访',
					badge: '7'
				},{
					url: '../../static/nine/xiuli.png',
					text: '宿舍报修',
					badge: '8'
				}
			],
			// title: 'nav-city-dropdown',
			pickerValueArray: [
				{
					label: '龙子湖校区',
					value: 110000
				},
				{
					label: '北林校区',
					value: 120000
				},
				{
					label: '英才街校区',
					value: 440100
				}
			],
			themeColor: '#007AFF',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			part: [{
				url:'../../static/11.jpg',
				text:'理学部',
				badge:'0'
			},{
				url:'../../static/16.jpg',
				text:'理学部',
				badge:'1'
			},{
				url:'../../static/17.jpg',
				text:'理学部',
				badge:'2'
			},{
				url:'../../static/19.jpg',
				text:'理学部',
				badge:'3'
			}]
		};
	},
	onReady() {
		this.setStyle(1, '选择校区');
	},
	onLoad(){
		this.shuffling();
		this.forever();
		this.departments();
	},
	methods: {
		// 轮播图
		shuffling(){
			uni.request({
				url:'',
				data:{},
				dataType:'json',
				success:res =>{
					this.info == res.data
				}
			})
		},
		// 院系介绍
		departments(){
			uni.request({
				url:'',
				data:{},
				dataType:'json',
				success:res =>{
					this.part == res.data
				}
			})
		},
		// 页面加载前请求数据
		forever(){
			// uni.setStorageSync('HCuname', 'admin');
			// uni.setStorageSync('HCpassw', '123456');
			const nameId = uni.getStorageSync('nameId');
			// console.log(HCuname)
			if(nameId == undefined){
				uni.request({
					url:'',
					data:{nameId:nameId},
					dataType:'json',
					success:res =>{
						this.list == res.data
					}
				})
			}else{
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
			
		},
		// 九宫格导航{
		scratchable(e) {
			console.log(this.list[e].badge)
			if(this.list[e].badge == 0){//院系介绍
				uni.navigateTo({
					url:'../introduce/introduce'
				})
			}else if(this.list[e].badge == 1){//校园动态
				uni.navigateTo({
					url:'../campus-dynamic/campus-dynamic'
				})
			}else if(this.list[e].badge == 2){//通知公告
				uni.navigateTo({
					url:'../announcements/announcements'
				})
			}else if(this.list[e].badge == 3){//个人资料
				uni.navigateTo({
					url:'../personal/personal'
				})
			}else if(this.list[e].badge == 4){//修改密码
				uni.navigateTo({
					url:'../abnormal/abnormal-records'
				})
			}else if(this.list[e].badge == 5){//出入记录
				uni.navigateTo({
					url:'../change-pwd/change-pwd'
				})
			}else if(this.list[e].badge == 6){//主动申请
				uni.navigateTo({
					url:'../apply-suspension/apply-sespension'
				})
			}else if(this.list[e].badge == 7){//家人来访
				uni.navigateTo({
					url:'../visit-registration/visit-registration'
				})
			}else if(this.list[e].badge == 8){//宿舍报修
				uni.navigateTo({
					url:'../dormitory-service/dormitory-service'
				})
			}else if(this.list[e].badge == 9){//不在寝情况
				uni.navigateTo({
					url:'../not-bedroom/not-bedroom'
				})
			}else if(this.list[e].badge == 10){//异常通行
				uni.navigateTo({
					url:'abnormal/abnormal-records'
				})
			}else if(this.list[e].badge == 11){//数据统计
				uni.navigateTo({
					url:'../data-statistics/data-statistics'
				})
			}
		},
		onCancel(e) {
			console.log(e);
		},
		// 单列
		showSinglePicker() {
			this.mode = 'selector';
			this.deepLength = 1;
			this.pickerValueDefault = [0];
			this.$refs.mpvuePicker.show();
		},
		onConfirm(e) {
			console.log(e.label);
			this.setStyle(0, e.label);
		},
		/**
		 * 修改导航栏buttons
		 * index[number] 修改的buttons 下标索引，最右边索引为0
		 * text[string] 需要修改的text 内容
		 */
		setStyle(index, text) {
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			if (text.length > 4) {
				text = text.substr(0, 4) + '...';
			}
			// #ifdef APP-PLUS
			let currentWebview = page.$getAppWebview();
			let titleNView = currentWebview.getStyle().titleNView;
			// 添加文字过长截取为3个字符，请根据自己业务需求更改
			titleNView.buttons[0].text = text;
			currentWebview.setStyle({
				titleNView: titleNView
			});
			// #endif
			// #ifdef H5
			// h5 临时方案
			document.getElementsByClassName('uni-btn-icon')[2].innerText = text;
			// #endif
			// 下部新闻内容
			var attributeId = index;
			var attributeName = text;
			uni.request({
				url:'',
				data:{
					attributeId:attributeId,
					attributeName:attributeName
				},
				dataType:'json',
				success:res =>{
					this.part == res.data
				}
			})
		},
		// 底部校园新闻通知公告
		btnDepar(e){
			var badge = this.part[e].badge
			uni.navigateTo({
				url:'../details-page/details?badge='+badge
			})
		}
	},
	onBackPress() {
		if (this.$refs.mpvuePicker.showPicker) {
			this.$refs.mpvuePicker.pickerCancel();
			return true;
		}
	},
	onUnload() {
		if (this.$refs.mpvuePicker.showPicker) {
			this.$refs.mpvuePicker.pickerCancel();
		}
	},
	onNavigationBarButtonTap(e) {
		if (e.index === 1) {
			this.showSinglePicker();
		}else {
			const nameId = uni.getStorageSync('nameId');
			// console.log(nameId)
			// const access_token = uni.getStorageSync('access_token');
			// 点击导航我的，页面跳转
			if(nameId == undefined){
				//登录页面
				uni.navigateTo({
					url:'../public/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
			}else{
				// 跳转到个人信息页
				uni.navigateTo({
					url:'../personal/personal?nameId='+nameId,
				})
			}
			
		}
	},
};
</script>

<style lang='scss'>
	.carousel{
		width:100%;
		height:440upx;
	}
	.sw-img{
		width:750upx;
		height:440upx;
	}
	
	/* .example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	} */

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}
	/* .example-body {
		flex-direction: column;
		padding: 10px;
		background-color: #ffffff;
	}
 */
	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.image {
		width: 120rpx;
		height: 120rpx;
	}

	.text {
		font-size: 36rpx;
		margin-top: 10rpx;
	}

	.grid-item-box {
		flex: 1;
		/* position: relative;
*/
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 5px 0;
	}
	
	.gongge{
		width:100%;
		padding-bottom:30upx;
	}
	.long_ge{
	    width:100%;
	    display:flex;
	    flex-wrap: wrap;
	    /* justify-content: space-between; */
	}
	.gongge-text{
		width:25%;
		text-align:center;
	}
	.gongge_img{
		width:140upx;
		height:140upx;
		margin:30upx auto 0;
	}
	
	.content-module{
	    width:100%;
	    display:flex;
	    flex-wrap: wrap;
	    /* justify-content: space-around; */
	}
	.content-level{
	    width:45%;
	    height:8rem;
	    margin:10px 0 0 3%;
	}
	.content-level image{
	    width:100%;
	    height:6rem;
	    box-shadow: rgba(0,0,0,0.1) 0px 15px 35px 0px, rgba(0,0,0,0.07) 0px 3px 10px 0px;
	}
	.level-name{
	    height:2rem;
	    line-height:2rem;
	    text-align:center;
	    font-size:18px;
	}
</style>
