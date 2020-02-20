<template>
	<view class="change-pwd">
		<view class="fill-information-white">
			<view class="fill-information-fill">
				<view class="change-pwd-area">
					<text class="change-pwd-area-title">原密码</text>
					<input class="change-pwd-area-put" type="password" placeholder="请填写原密码" value="" v-model="original"/>
				</view>
				<view class="change-pwd-area">
					<text class="change-pwd-area-title">新密码</text>
					<input class="change-pwd-area-put" type="password" placeholder="请填写新密码" value="" v-model="newpwd"/>
				</view>
				<view class="change-pwd-area">
					<text class="change-pwd-area-title">请确认</text>
					<input class="change-pwd-area-put" type="password" placeholder="请确认密码" value="" v-model="confirmpwd"/>
				</view>
			</view>
			<view class="approval-btn">
				<button class="fill-information-submit approval-submit" @tap="confirm">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			original:'',
			newpwd:'',
			confirmpwd:''
		}
	},
	methods:{
		confirm() {
			const nameId = uni.getStorageSync('nameId');
			var password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
			if(!password.test(this.original)){
				uni.showToast({title: '原密码错误',icon: 'none'});
				return;
			}else if(!password.test(this.newpwd)){
				uni.showToast({title: '8位数字加字母和字符',icon: 'none'});
				return;
			}else if(this.newpwd != this.confirmpwd){
				uni.showToast({title: '两次密码不一致',icon: 'none'});
				return;
			}else{
				uni.showLoading({
					title: "正在提交数据..",
					mask:true
				});
				uni.request({
					url:'',
					data:{
						nameId:nameId,
						newpwd:newpwd
					},
					dataType:'json',
					success:res =>{
						uni.hideLoading();
						if(res.data.lsSuccess == true){
							uni.showToast({title: '修改成功',icon: 'none'});
							uni.navigateTo({
                                url: '../public/login'
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
	.change-pwd-area{
		width:100%;
		height:60upx;
		margin:10upx 0;
		line-height:60upx;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-start;
	}
	.change-pwd-area-title{
		margin-left:40upx;
		font-size:40upx;
		color:#000;
		font-weight: normal;
	}
	.change-pwd-area-put{
		margin-left:50upx;
		height:60upx;
		color:#333;
	}
	// 按钮
	.approval-btn{
		width:70%;
		margin:20upx auto 0;
	}
</style>
