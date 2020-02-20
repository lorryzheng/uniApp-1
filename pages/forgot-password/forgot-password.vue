<template>
	<view class="forgot">
		<view class="access-header">
			<text class="superior" @tap="navigateBack"></text>
		</view>
		<view class="access-title">
			<image style="width:300upx;height:120upx;" src="../../static/nine/logo.png"></image>
		</view>
		<view class="fill-information-white">
			<view class="login-name">
				<text class="phone one-icon"></text>
				<input class="name-put" type="text" placeholder="请再次输入手机号" value="" v-model="phone"/>
				<button @click="getCode" :disabled="disabled" class="phone-vtion white-color">{{countdown}}<text v-show="timestatus">秒重获</text></button>
			</view>
			<view class="login-name">
				<text class="verification one-icon"></text>
				<input class="name-put" type="text" placeholder="请再次输入验证码" value="" v-model="code"/>
			</view>
			 <view class="login-name">
				<button class="btn btn-registered" @tap="validation">验证</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data(){
		return {
			phone:'',
			code:'',
			countdown:'获取验证码',
			disabled:false,
			timestatus:false,
			rememberPsw:true,
			clear:''
		}
	},
	methods:{
		navigateBack(){//返回上一页按钮
			uni.navigateBack()
		},
		getCode(){
			var uphone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
			if(this.phone == ''){
				uni.showToast({
					title:'请填写手机号',
					icon:'none'
				})
				return;
			}else if(!uphone.test(this.phone)){
				uni.showToast({title: '手机号格式不正确',icon: 'none'});
				return;
			}else{
				this.disabled = true;//进制点击
				uni.request({
					url:'',
					method:'GET',
					data:{
						phone:phone,
						type:1
					},
					success:res => {
						if(res.data.lsSuccess = true){
							uni.showToast({
								title:res.data.info,
								icon:'none'
							});
							this.countdown = 60;
							this.timestatus = true;
							this.clear = setInterval(this.countDown,1000);
						}else{
							this.disabled = false;
						}
					}
				})
			}
		},
		countDown(){
			if(!this.countdown){
				this.disabled = false;
				this.timestatus = false;
				this.countdown = '获取验证码';
				clearInterval(this.clear)
			}else{
				this.countdown
			}
		},
		// 验证提交
		validation(){
			var uphone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
			if(!uphone.test(this.phone)){
				uni.showToast({title: '手机号格式不正确',icon: 'none'});
				return;
			}else{
				uni.request({
					url:"",//链接地址
					data:{
						phone:phone
					},
					dataType:'json',
					success:res => {
						if(res.data.lsSuccess == true){
							uni.showToast({
                              title: '验证通过',
                              icon: 'none'
                           });
							uni.navigateTo({
                                url: '../change-pwd/forget-pwd'
                           });
						}else{
							uni.showToast({
								title:'验证失败，请重试',
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

<style lang='scss'>
	@import '../css/common-user.css';
	/* 背景 */
	page {
		background:url(../../static/nine/back03.jpg) no-repeat;
		    background-size:cover;
	}
	.fill-information-white{
		width:90%;
		margin:15upx auto;
		background:#fff;
		border-radius: 15upx;
		padding:70upx 0 40upx;
		box-shadow: rgba(0,0,0,0.1) 0px 15px 35px 0px, rgba(0,0,0,0.07) 0px 3px 10px 0px;
	}
	.access-header .superior{
	  display:block;
	  width:56upx;
	  height:60upx;
	  position: relative;
	  top:40upx;
	  margin-left:40upx;
	}
	.access-header .superior:before{
	  content: " ";
	  position: absolute;
	  width:56upx;
	  height:60upx;
	  background:url(../../static/e_icon1.png) no-repeat;
	  background-size:cover;
	}
	.login-name{
	    width:80%;
		height:80upx;
	    margin:0 auto 35px;
	    font-size:16px;
	}
	.name-put{
	    width:90%;
	    height:50upx;
	    padding-left:30px;
	}
	.one-icon{
	    width:40upx;
	    height:50upx;
	    position: relative;
	}
	.one-icon:before{
	    content: " ";
	    position: absolute;
	    width:40upx;
	    height:50upx;
	}
	.phone:before{
	    background:url(../../static/number.png) no-repeat;
	    background-size:100% 100%;
	}
	.verification:before{
	    background:url(../../static/verification.png) no-repeat;
	    background-size:100% 100%;
	}
	.phone-vtion{
		float:right;
		/* margin-top: -20upx; */
		/* padding:5px; */
		border-radius:8px;
		background: -webkit-linear-gradient(left,#3be1be 0,#1781d7 100%);
		background: -moz-linear-gradient(left,#3be1be 0,#1781d7 100%);
		background: -o-linear-gradient(left,#3be1be 0,#1781d7 100%);
		background: linear-gradient(to left,#3be1be,#1781d7 100%);
		font-size:14px;
		margin-top:-28px;
	}
</style>
