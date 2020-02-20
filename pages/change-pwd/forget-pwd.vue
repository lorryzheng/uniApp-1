<template>
	<view class="forget">
		<view class="access-header">
			<text class="superior" @tap="navigateBack"></text>
		</view>
		<view class="access-title">
			<image style="width:300upx;height:120upx;" src="../../static/nine/logo.png"></image>
		</view>
		<view class="forget-mian">
			<view class="forget-mian-white">
				<view class="login-name">
					<view class="password-portrait"></view>
					<input class="name-put"  password="true" type="text" placeholder="请输入密码" value="pass" v-model="passwd"/>
				</view>
				<view class="login-name">
					<view class="password-portrait"></view>
					<input class="name-put"  password="true" type="text" placeholder="请输入密码" value="pass" v-model="passwds"/>
				</view>
				<view class="fill-information-btn">
					<button class="fill-information-submit" @tap="submitPwd">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			passwd:'',
			passwds:''
		}
	},
	methods:{
		navigateBack(){//返回上一页按钮
			uni.navigateBack()
		},
		submitPwd(){
			const nameId = uni.getStorageSync('nameId');
			var password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
			if(!password.test(this.passwd)){
				uni.showToast({title: '8位数字加字母和字符',icon: 'none'});
				return;
			}else if(this.passwd != this.passwds){
				uni.showToast({title: '两次密码不一致',icon: 'none'});
				return;
			}else{
				uni.showLoading({
					title: "正在提交数据..",
					mask:true
				});
				uni.request({
					url:"",//链接地址
					data:{
						nameId:nameId,
						passwd:passwd
					},
					dataType:'json',
					success:res =>{
						uni.hideLoading();
						if(res.data.lsSuccess == true){
							uni.showToast({
                              title: '修改成功',
                              icon: 'none'
                           });
							uni.navigateTo({
                                url: '../public/login'
                           });
						}else{
							uni.showToast({
								title:'修改失败，请重试',
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
	@import '../css/abnormal.css';
	/* 背景 */
	page {
		background:url(../../static/nine/back03.jpg) no-repeat;
		    background-size:cover;
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
	.forget-mian{
		margin-top:10%;
	}
	.forget-mian-white{
		width:90%;
		margin:15upx auto;
		background:#fff;
		border-radius: 15upx;
		padding:25upx 0;
		box-shadow: rgba(0,0,0,0.1) 0px 15px 35px 0px, rgba(0,0,0,0.07) 0px 3px 10px 0px;
	}
	.login-name{
	    width:80%;
	    margin:0 auto 32px;
	    font-size:16px;
	}
	.name-portrait{
	    width:40upx;
	    height:50upx;
	    position: relative;
	}
	.name-portrait:before{
	    content: " ";
	    position: absolute;
	    width:40upx;
	    height:50upx;
		top:50%;
		margin-top:25upx;
	    background:url(../../static/number.png) no-repeat;
	    background-size:100% 100%;
	}
	.name-put{
	    width:90%;
	    height:50upx;
	    padding-left:60upx;
	}
	.password-portrait{
	    width:40upx;
	    height:50upx;
	    position: relative;
	}
	.password-portrait:before{
	    content: " ";
	    position: absolute;
	    width:40upx;
	    height:50upx;
		top:50%;
		margin-top:25upx;
	    background:url(../../static/password.png) no-repeat;
	    background-size:100% 100%;
	}
</style>
