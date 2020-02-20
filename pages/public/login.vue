<template>
	<view class="content">
		<page-logo></page-logo>
		<view class="login-user">
			<view class="login-piece white-block">
				<navigator url="../registered/registered"><view class="jump">注册</view></navigator>
				<view class="piece-one">
					<view class="login-name">
						<view class="name-portrait"></view>
						<input class="name-put" type="text" placeholder="请输入手机号" value="user" v-model="uname"/>
					</view>
					<view class="login-name">
						<view class="password-portrait"></view>
						<input class="name-put"  password="true" type="text" placeholder="请输入密码" value="pass" v-model="passw"/>
					</view>
					<view class="login-name">
						<view class=" mui-input-row mui-checkbox ">
				            <!-- <input id="chkRem" type="checkbox" checked="checked" class="RememberCheck"  @change="checkboxChange" /> -->
				            <checkbox-group @change="checkboxChange">
				                <checkbox
				                    id="chkRem"
				                    type="checkbox"
				                    :checked="rememberPsw"
				                    @tap="rememberPsw = !rememberPsw"
				                    class="RememberCheck"
				                >
				                    记住密码
				                </checkbox>
				                <view class="RememberPass forget-right">记住密码?</view>
				            </checkbox-group>
							<!-- <view class="forget-right">忘记密码?</view> -->
				        </view>
						
					</view>
					<view class="login-name">
						<button class="btn" @tap="lands">登录</button>
					</view>
					<!-- #ifdef APP-PLUS -->
					<view class="login-name wachat">
						<view class="chat" @click="checkAuth"></view>
					</view>
					<!-- #endif -->
				</view>
			</view>
			<view class="copyright white-color">郑州科壮元信息技术有限公司</view>
		</view>
	</view>
	
</template>

<script>
import pageLogo from '../../components/logo/logo.vue';
import '../css/common-user.css';
	export default {
		components:{
			'page-logo':pageLogo
		},
		data() {
			return {
				title:'',
				uname: '',
				passw: '',
				rememberPsw: false
			}
		},
		// onLoad : function(){
		// 	var res = global.isLogin();
		// 	if(!res){
		// 		uni.showModal({
		// 			title:'提醒',
		// 			content:'请登录',
		// 			success:function(){
						
		// 			}
		// 		})
		// 	}
		// },
		// 页面初始加载
		mounted(){
			let that = this;
			
	        //缓存的账号
	        const Duname = uni.getStorageSync('WDuname');
	        //缓存的密码
	        const WDpassw = uni.getStorageSync('WDpassword');
	        //         console.log(WDpassw+"缓存的密码")
	        //         console.log(WDuname)
	        //有缓存就赋值给文本没有就清空
	        if (WDuname && WDpassw) {
	            that.uname = WDuname;
	            that.password = WDpassword;
	        } else {
	            that.uname = '';
	            that.password = '';
	        }
		},
		methods:{
//         	用户名：
//            	nameChange:function(e){
//               	this.uname=e.traget.value
//            	},
//           	//密码：
//           	passChange:function(e){
//              	this.passw=e.traget.value
//           	},
			lands() {
				if (this.uname.length <= 0 || this.passw.length <= 0) {
				    uni.showToast({
				       title: '账号或密码不能为空',
				       icon: 'none'
				     });
				      return;
				 } else {
				    let TFTwoName = this.uname.substring(0, 2);
				    let TFLastName = this.uname.substring(2);
				    let Passwd = this.passw;
					var that = this;
					// 链接登录 （这里是两次，第一次是获取链接地址，第二次才是登录）
					uni.request({
						url:'http链接地址',
						success:res => {
							var sabb = [];
							//  console.log(webapiaddress+'链接地址')
							// 打印链接地址
							
							// 这里是登录
							
							var that = this;
							uni.request({
								url:"webapiaddress+'/api/user'",//链接地址
								data:{
									strUser:TFLastName,
									strPwdord:Passwdord
								},
								dataType:'json',
								success:res => {
									if(res.data.lsSuccess == true){
										 //缓存账号和密码
	                                    if (that.rememberPsw) {
											uni.setStorageSync('nameId', that.nameId);
	                                        uni.setStorageSync('WDuname', that.uname);
	                                        uni.setStorageSync('WDpassword', that.password);
	                                    } else {
											uni.removeStorageSync('nameId');
	                                        uni.removeStorageSync('WDuname');
	                                        uni.removeStorageSync('WDpassword');
	//                                         that.uname = '';
	//                                         that.passw = '';
	                                    }
	                                    uni.navigateTo({
	                                        url: '../index/index'
	                                    });
	                                } else {
	                                    uni.showToast({
	                                        title: '用户名或密码错误',
	                                        icon: 'none'
	                                    });
	                                }
									
								}
								
							})
						}
					})
				}
			},
			//复选框
	        checkboxChange: function(e) {
	        
	            console.log(e.detail.value.length);
	            if (e.detail.value.length == 1) {
	    
	                //获取缓存的账号
	                 uni.getStorageSync('WDuname',this.uname);
	                 uni.getStorageSync('WDpassword',this.passw);
	            } else {
	                  uni.removeStorageSync('WDuname');
	                  uni.removeStorageSync('WDpassword');              
	            }
	        },
			// app微信登录
			checkAuth:function() {
				uni.getProvider({
					service: 'oaut',
					success:function(res){
						consoe.log(res.procider);
						if(res.provider.indexOf(weixin)){
							uni.login({
								provider:'weixin',
								success(res) {
									// 方案一
									uni.getUserInfo({
										provider:'weixin',
										success:function(infoRes){
											console.log(JSON.stringify(infoRes))
										}
									})
									// 方案二
									// let data = {}
									// data = {code:re.code}
									// data = {
									// 	type:1,
									// 	access_token:res.authResult.access_token,
									// 	openid: res.authResult.openid
									// }
									// res.code && PostactivityAppleftLogin(data).then(function (e){
									// 	if(e.access_token) {
									// 		uni.setStorageSync('access_token',e.access_token)
									// 		uni.setStorageSync('user',e.user)
									// 		resolve()
									// 	}
									// })
								},
								fail(err){
									reject()
									uni.showToast({
										icon:'none',
										title:'授权失败!'
									})
									uni.hideLoading()
								}
							});
						}
					}
				})
			}
		},
	}
</script>

<style lang='scss'>
	/* 背景 */
	page {
		background:url(../../static/nine/back03.jpg) no-repeat;
		    background-size:cover;
	}
	/* .login-user{
	    margin-top:5%;
	} */
	.white-block{
	  width:92%;
	  background:#fff;
	  margin:0 auto 10px;
	  border-radius:10px;
	  box-shadow: rgba(0,0,0,0.1) 0px 15px 35px 0px, rgba(0,0,0,0.07) 0px 3px 10px 0px;
	}
	.login-piece{
	    padding-bottom:3upx;
	}
	.jump{
	    float:right;
	    margin:20px 25px 0 0;
	    font-size:16px;
	}
	.piece-one{
	    padding-top:70px;
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
	.keep-left{
	    float:left;
	}
	.keep-left>input{
	    vertical-align:middle;
	}
	.forget-right{
	    float:right;
	}
	.wachat{
	    height:60upx;
	    margin-top:-20upx;
	}
	.chat{
	    width:70upx;
	    height:60upx;
	    position: relative;
	    left:50%;
	    margin-left:-35upx;
	}
	.chat:before{
	    content: " ";
	    position: absolute;
	    width:70upx;
		height:60upx;
	    background:url(../../static/weixin.png) no-repeat;
	    background-size:100% 100%;
	}
</style>
