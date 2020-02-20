<template>
	<view class="mian">
		<view class="access-header">
			<text class="superior" @tap="navigateBack"></text>
		</view>
		<view class="access-title">
			<image style="width:300upx;height:120upx;" src="../../static/nine/logo.png"></image>
		</view>
		<!-- 注册 -->
		<view class="user-registration">
			<view class="new-user white-block">
				<view class="choose-identity black-color">选择您的身份</view>
				
				<view class="uni-list">
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						
							<radio :value="item.value" :checked="index === current" />
							
							<text>{{item.name}}</text>
						</label>
					</radio-group>
				</view>
				
				<view class="piece-one">
					<view class="login-name">
						<text class="password-portrait one-icon"></text>
						<input class="name-put" type="password" placeholder="请输入密码" value="" v-model="pwd"/>
					</view>
					<view class="login-name">
						<text class="password-portrait one-icon"></text>
						<input class="name-put" type="password" placeholder="请再次输入密码" value="" v-model="upwd"/>
					</view>
					<view class="login-name">
						<text class="card one-icon"></text>
						<input class="name-put" type="text" placeholder="请再次输入身份证号" value="" v-model="idCard"/>
					</view>
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
						<button class="btn btn-registered" @tap="note">注册</button>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			items: [{
					value: 'SCH',
					name: '学生'
				},
				{
					value: 'TCR',
					name: '辅导员',
					checked: 'true'
				},
				{
					value: 'DAR',
					name: '宿管'
				},
				{
					value: 'PTS',
					name: '家长'
				},
				{
					value: 'SAO',
					name: '学生处'
				},
			],
			current: 0,
			pwd:'',
			upwd:'',
			idCard:'',
			phone:'',
			code:'',
			countdown:'获取验证码',
			disabled:false,
			timestatus:false,
			rememberPsw:true,
			clear:''
		}
	},
	methods: {
		navigateBack(){//返回上一页按钮
			uni.navigateBack()
		},
		radioChange(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
		},
		// 获取验证码
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
		// 注册
		note() {
			console.log(this.current)
			var password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
			var card = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
			var uphone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
			if(!password.test(this.pwd)){
				uni.showToast({title: '8位数字加字母和字符',icon: 'none'});
				return;
			}else if(this.pwd != this.upwd){
				uni.showToast({title: '两次密码不一致',icon: 'none'});
				return;
			}else if(!card.test(this.idCard)){
				uni.showToast({title: '身份证格式不正确',icon: 'none'});
				return;
			}else if(!uphone.test(this.phone)){
				uni.showToast({title: '手机号格式不正确',icon: 'none'});
				return;
			}else{
				uni.showLoading({
					title: "正在注册..",
					mask:true
				});
				uni.request({
					url:"",//链接地址
					data:{
						current:this.current,
						pwd:this.pwd,
						idCard:this.idCard,
						phone:this.phone
					},
					dataType:'json',
					success:res => {
						if(res.data.lsSuccess == true){
							uni.hideLoading();
							uni.showToast({
                              title: '注册成功',
                              icon: 'none'
                           });
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

<style lang='scss'>
	@import '../css/common-user.css';
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
	.new-user{
	    margin-top:2%;
		padding-bottom:5upx;
	}
	.choose-identity{
	    height:80upx;
	    line-height:80upx;
	    text-align:center;
	    font-size:22px;
	    padding-top:60upx;
	}
	.uni-list{
	    width:95%;
	    margin:10px auto;
	    display:flex;
	    flex-wrap:wrap;
	    justify-content:space-around;
	}
	.uni-list-cell{
		font-size:26upx;
	}
	
	.piece-one{
	    padding-top:60upx;
	}
	.login-name{
	    width:80%;
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
	.password-portrait:before{
	    background:url(../../static/password.png) no-repeat;
	    background-size:100% 100%;
	}
	.card:before{
	    background:url(../../static/identity.png) no-repeat;
	    background-size:100% 100%;
	}
	.phone:before{
	    background:url(../../static/number.png) no-repeat;
	    background-size:100% 100%;
	}
	.verification:before{
	    background:url(../../static/verification.png) no-repeat;
	    background-size:100% 100%;
	}
	.btn-registered{
	    margin-top:-10px;
	}
	.phone-vtion{
	    float:right;
	    padding:5px;
	    border-radius:8px;
	    background: -webkit-linear-gradient(left,#3be1be 0,#1781d7 100%);
	    background: -moz-linear-gradient(left,#3be1be 0,#1781d7 100%);
	    background: -o-linear-gradient(left,#3be1be 0,#1781d7 100%);
	    background: linear-gradient(to left,#3be1be,#1781d7 100%);
	    font-size:14px;
	    margin-top:-28px;
	}
</style>
