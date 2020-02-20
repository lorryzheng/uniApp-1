<template>
	<view class="service">
		<view>
			<!-- 图标-->
			<view class="identify-icon">
				<image class="identify-icon-lg" src="../../static/icon/weixiu.png"></image>
				<view class="identify-icon-text">宿舍报修</view>
			</view>
		</view>
		<view class="service-mian">
			<view class="fill-information-white">
				<view class="fill-information-head">
					<image class="fill-information-lg" src="../../static/nine/mint.png"></image>
					<view class="fill-information-text color-purple">报修人</view>
				</view>
				<!-- 输入框 -->
				<view class="fill-information-fill">
					<view class="fill-information-area">
						<text class="fill-information-area-title color-purple">联系人</text>
						<input class="fill-information-area-put" type="text" placeholder="请填写联系人姓名" value="" v-model="username"/>
					</view>
					<view class="fill-information-area">
						<text class="fill-information-area-title color-purple">联系电话</text>
						<input class="fill-information-area-put" type="text" placeholder="请填写联系电话" value="" v-model="phone"/>
					</view>
				</view>
			</view>
			<view class="fill-information-white">
				<view class="fill-information-head">
					<image class="fill-information-lg" src="../../static/nine/mints.png"></image>
					<view class="fill-information-text color-purple">报修内容</view>
				</view>
				<view class="fill-information-local">
					<textarea class="fill-information-area-text" name="" id="" placeholder="请描述来访目的" v-model="why"></textarea>
				</view>
				<view class="fill-information-local">
					<view class="upload-pictures">
						<view class="pload-pictures-picture" v-for="(image,index) in imageList" :key="index">
							<image class="pload-pictures-img" :src="image" :data-src="image" @tap="previewImage"></image>
						</view>
						<view class="upload-pictures-icon" @tap="chooseVideoImage"></view>
					</view>
				</view>
			</view>
			<view class="fill-information-btn">
				<button class="fill-information-submit" @tap="btnVisit">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
import { pathToBase64, base64ToPath } from '../../components/common/common.js'
export default{
	data() {
		return {
			username:'',
			phone:'',
			why:'',
			imageList:[],//图片
			imageBase64List:[]
		}
	},
	methods:{
		chooseVideoImage(){
		    uni.showActionSheet({
		        // title:"选择上传类型",
		        itemList: ['图片'],
		        success: (res) => {
		            // console.log(res)
		            // if(res.tapIndex == 0){
		                this.chooseImages()
		            // } else {
		            //     this.chooseVideo()
		            // }
		        }
		    })
		},
		chooseImages:async function(){
			if (this.imageList.length === 3){
				let isContinue = await this.isFullImg();
				console.log("是否继续?", isContinue);
				if (!isContinue) {
					return;
				}
			}
			uni.chooseImage({
				sourceType: ['album','camera'],
				sizeType: ['original', 'compressed'],
				count: 3,
				success: (res) => {
					this.imageList = this.imageList.concat(res.tempFilePaths);
					pathToBase64(res.tempFilePaths[0])
					.then(base64 => {
						this.imageBase64List = this.imageList.concat(base64);
						console.log(this.imageBase64List)
					 })
					 .catch(error => {
						console.error(error);
					 });
				},
			})
		    // 上传图片
		  //   uni.chooseImage({
		  //       count: 3, //默认9
		  //       sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		  //       sourceType: ['album','camera'], //从相册选择
		  //       success:(res)=> {
				// 	// var fileList = [];
				// 	// for(var i=0;i<this.imageList.length;i++){
				// 	// 	fileList.push(({url:res.tempFilePaths[i]}))
				// 	// }
				// 	// console.log(JSON.stringify(fileList))
		  //          this.imageList = this.imageList.concat(res.tempFilePaths);
		  //          pathToBase64(res.tempFilePaths[0])
		  //          	.then(base64 => {
		  //          		this.imageBase64List = base64;
		  //          	 })
		  //          	 .catch(error => {
		  //          		console.error(error);
		  //          	 });
		  //       },
				
		  //   });
		},
		isFullImg: function() {
			return new Promise((res) => {
				uni.showModal({
					content: "已经有3张图片了,是否清空现有图片？",
					success: (e) => {
						if (e.confirm) {
							this.imageList = [];
							res(true);
						} else {
							res(false)
						}
					},
					fail: () => {
						res(false)
					}
				})
			})
		},
		previewImage: function(e) {
			var current = e.target.dataset.src
			uni.previewImage({
				current: current,
				urls: this.imageList
			})
		},
		// 提交
		btnVisit(){
			uni.showLoading({
				title: "正在提交数据..",
				mask:true
			});
			var data = [this.username,this.phone,this.why,this.imageList]
			// console.log(data)
			uni.require({
				url:'',
				data:{
					information:data
				},
				dataType:'json',
				success:res =>{
					uni.hideLoading();
					if(res.data.studentId == true){
						uni.showToast({title: '提交成功',icon: 'none'});
						uni.navigateTo({
                                url: '../index/index'
                           });
					}else{
						uni.showToast({title: '提交失败',icon: 'none'});
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
	.fill-information-local{
		width:95%;
		// height:60upx;
		margin:10upx 0;
		line-height:60upx;
	}
	.fill-information-area-title{
		font-size:40upx;
		margin-left: 24upx;
	}
	.fill-information-area-put{
		height:100%;
		margin-left: 30upx;
		padding-left:15upx;
	}
	.fill-information-area-text{
		display:block;
		width:100%;
		padding:15upx;
		background:#e3e3e3;
	}
	uni-textarea{
		height:200upx;
	}
	.upload-pictures{
		width:95%;
		height:110upx;
		margin:10upx auto 0;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-start;
	}
	.pload-pictures-img{
		width:110upx;
		height:110upx;
		margin-right:15upx;
	}
	.upload-pictures-icon{
		width:110upx;
		height:110upx;
		position: relative;
	}
	.upload-pictures-icon:before{
	    content: " ";
	    position: absolute;
	    width:110upx;
	    height:110upx;
		background:url(../../static/icon/xiangji.png) no-repeat;
		background-size:100% 100%;
	}
</style>
