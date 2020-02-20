<template>
	<view class="transfer">
		<view>
			<!-- 图标-->
			<view class="identify-icon">
				<image class="identify-icon-lg" src="../../static/icon/zhuan.jpg"></image>
				<view class="identify-icon-text">我要复学</view>
			</view>
		</view>
		<!-- 信息提交 -->
		<view class="fill-information">
			<view class="fill-information-white">
				<view class="fill-information-head">
					<image class="fill-information-lg" src="../../static/nine/mint.png"></image>
					<view class="fill-information-text color-purple">登记信息</view>
				</view>
				<view class="fill-information-fill">
					<view class="fill-information-area">
						<text class="fill-information-area-title color-purple">姓名</text>
						<input class="fill-information-area-put" type="text" placeholder="请填写申请人姓名" value="" v-model="username"/>
					</view>
					<view class="fill-information-area">
						<text class="fill-information-area-title color-purple">学生证号</text>
						<input class="fill-information-area-put" type="text" placeholder="请填写学生证号" value="" v-model="studentId"/>
					</view>
					<view class="fill-information-area">
						<text class="fill-information-area-title color-purple">身份证号</text>
						<input class="fill-information-area-put" type="text" placeholder="请填写身份证号" value="" v-model="idCard"/>
					</view>
				</view>
			</view>
			 <view class="fill-information-btn">
				<button class="fill-information-submit" @tap="submitBtn">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			username:'',
			studentId:'',
			idCard:'',
			type:'复学'
		}
	},
	methods: {
		submitBtn(){
			// console.log(this.username + this.studentId + this.idCard)
			var card = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
			if(this.username == ''){
				uni.showToast({title: '请填写姓名',icon: 'none'});
				return;
			}else if(this.studentId == ''){
				uni.showToast({title: '请填写学生证号',icon: 'none'});
				return;
			}else if(this.idCard == ''){
				uni.showToast({title: '请填写身份证号',icon: 'none'});
				return;
			}else if(!card.test(this.idCard)){
				uni.showToast({title: '省份证号格式不正确',icon: 'none'});
				return;
			}else{
				uni.showLoading({
					title: "正在提交数据..",
					mask:true
				});
				uni.request({
					url:'',
					data:{
						username:this.username,
						studentId:this.studentId,
						idCard:this.idCard,
						type:this.type
					},
					dataType:'json',
					success:res => {
						uni.hideLoading();
						if(res.data.studentId == false){
							uni.showToast({title: '学生证号不存在',icon: 'none'});
							return;
						}else if(res.data.idCard == false){
							uni.showToast({title: '身份证号不存在',icon: 'none'});
							return;
						}else if(res.data.lsSuccess == true){
							uni.showToast({
                              title: '提交成功',
                              icon: 'none'
                           });
							uni.navigateTo({
                                url: ''//跳转页面
                           });
						}else{
							uni.showToast({
								title:'网络不好，请重试',
								icon:'none'
							})
						}
					}
				})
			}
		}
	}
}
</script>

<style lang="scss">
@import '../css/abnormal.css';
	page{
		background-color:#00a3e8,
	}
	.fill-information-head{
		text-align: center;
	}
	.fill-information-lg{
		width:100upx;
		height:100upx;
	}
	// 输入框区域
	.fill-information-area{
		width:100%;
		height:60upx;
		margin:10upx 0;
		line-height:60upx;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-start;
	}
	.fill-information-area-title{
		font-size:40upx;
		margin-left: 30upx;
	}
	.fill-information-area-put{
		height:100%;
		margin-left: 30upx;
		padding-left:15upx;
	}
</style>

