<template>
	<view class="approval">
		<view>
			<!-- 图标-->
			<view class="identify-icon">
				<image class="identify-icon-lg" src="../../static/icon/xiuxue.png"></image>
				<view class="identify-icon-text">学生申请</view>
			</view>
		</view>
		<!-- 审批详情 -->
		<view class="approval-outside">
			<view class="fill-information-white" v-for="(item , index) in list" :key="index">
				<view class="approval-every">
					<view class="approval-icon approval-type"></view>
					<view class="approval-centent tiny-purple">{{item.type}}</view>
				</view>
				<view class="approval-every">
					<view class="approval-icon approval-name"></view>
					<view class="approval-centent tiny-purple">{{item.name}}</view>
				</view>
				<view class="approval-every">
					<view class="approval-icon approval-why"></view>
					<view class="approval-details tiny-purple">{{item.details}}</view>
				</view>
				<view class="approval-btn">
					<button class="fill-information-submit approval-submit" @tap="approval(index)">提交</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list:[{
				nameId:0,
				type:'休学申请',
				name:'王浩宇',
				details:'说明此图为CSS加粗实例片段代码和结果图。这里通过CSS来控制加粗文字方式来加粗对象。所以一般对文字对象加粗标题加粗即可使用此方法对其加粗'
			},{
				nameId:1,
				type:'休学申请',
				name:'王浩宇',
				details:'说明此图为CSS加粗实例片段代码和结果图。这里通过CSS来控制加粗文字方式来加粗对象。所以一般对文字对象加粗标题加粗即可使用此方法对其加粗'
			},{
				nameId:2,
				type:'休学申请',
				name:'王浩宇',
				details:'说明此图为CSS加粗实例片段代码和结果图。这里通过CSS来控制加粗文字方式来加粗对象。所以一般对文字对象加粗标题加粗即可使用此方法对其加粗'
			},{
				nameId:3,
				type:'休学申请',
				name:'王浩宇',
				details:'说明此图为CSS加粗实例片段代码和结果图。这里通过CSS来控制加粗文字方式来加粗对象。所以一般对文字对象加粗标题加粗即可使用此方法对其加粗'
			}]
		}
		
	},
	onLoad() {
		this.loading();
		console.log(1235)
	},
	methods:{
		loading(){
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
		},
		// 点击处理按钮
		approval(e){
			uni.showLoading({
				title: "正在提交数据..",
				mask:true
			});
			console.log(this.list[e].name)
			var nameId = this.list[e].nameId;
			var name = this.list[e].name;
			uni.request({
				url:'',
				data:{
					nameId:nameId,
					name:name
				},
				dataType:'json',
				success:res =>{
					uni.hideLoading();
					if(res.data.lsSuccess == true){
						uni.showToast({title: '修理成功',icon: 'none'});
					}else{
						uni.showToast({title: '处理失败，请重试',icon: 'none'});
					}
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
	.approval-every{
		height:100%;
		margin-top:30upx;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-start;
	}
	.approval-icon{
		width:10%;
		height:50upx;
		text-align: center;
		position: relative;
	}
	.approval-icon:before{
	    content: " ";
	    position: absolute;
	    width:50upx;
	    height:50upx;
	}
	.approval-type:before{
		background:url(../../static/nine/cai.png) no-repeat;
		background-size:100% 100%;
	}
	.approval-name:before{
		background:url(../../static/nine/mint.png) no-repeat;
		background-size:100% 100%;
	}
	.approval-why:before{
		background:url(../../static/nine/mints.png) no-repeat;
		background-size:100% 100%;
	}
	.approval-centent{
		width:80%;
		height:50upx;
		line-height:50upx;
		margin-left:5%;
	}
	.approval-details{
		width:80%;
		margin-left:5%;
	}
	// 按钮
	.approval-btn{
		width:70%;
		margin:20upx auto 0;
	}
	
</style>
