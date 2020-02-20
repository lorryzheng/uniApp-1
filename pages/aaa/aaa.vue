<template>
    <view class="burst-wrap">
        <view class="burst-wrap-bg">
            <view>
                <!-- 信息提交 -->
                <view class="burst-info">
                    <view class="uni-uploader-body">
                        <view class="uni-uploader__files">
                            <!-- 图片 -->
                           <view v-for="(image,index) in imageList" :key="index">
                                <view class="uni-uploader__file">
                                    <view class="icon iconfont icon-cuo" @tap="delect(index)"></view>
                                    <image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
                                </view>
                            </view>
                            <!-- 视频 -->
                          <!--  <view class="uni-uploader__file" v-if="src">
                                <view class="uploader_video">
                                    <view class="icon iconfont icon-cuo" @tap="delectVideo"></view>
                                    <video :src="src" class="video"></video>
                                </view>
                            </view> -->
                            <view class="uni-uploader__input-box">
                                <view class="uni-uploader__input" @tap="chooseVideoImage">1236</view>
                            </view>
                        </view>
                    </view>


                </view>
            </view>
        </view>
    </view>
</template>

<script>
    var sourceType = [
            ['camera'],
            ['album'],
            ['camera', 'album']
        ]
    export default {
        data() {
            return {
                imageList:[],//图片
                // src:"",//视频存放
                sourceTypeIndex: 2,
                checkedValue:true,
                checkedIndex:0,
                sourceType: ['拍摄', '相册', '拍摄或相册'],
                cameraList: [{
                        value: 'back',
                        name: '后置摄像头',
                        checked: 'true'
                    },
                    {
                        value: 'front',
                        name: '前置摄像头'
                    },
                ],
                cameraIndex: 0,
                VideoOfImagesShow:true,
            }
        },
        onUnload() {
            this.src = '',
            this.sourceTypeIndex = 2,
            this.sourceType = ['拍摄', '相册', '拍摄或相册'];
        },
        methods: {
            chooseVideoImage(){
                uni.showActionSheet({
                    // title:"选择上传类型",
                    itemList: ['图片'],
                    success: (res) => {
                        console.log(res)
                        // if(res.tapIndex == 0){
                            this.chooseImages()
                        // } else {
                        //     this.chooseVideo()
                        // }
                    }
                })
            },
            chooseImages(){
                // 上传图片
                uni.chooseImage({
                    count: 1, //默认9
                    // sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album','camera'], //从相册选择
                    success:(res)=> {
                        let igmFile = res.tempFilePaths;
						this.imageList =igmFile 
						console.log(igmFile)
                        // uni.uploadFile({
                        //     url:'',
                        //     method:"POST",
                        //     header:{
                        //         'Authorization':'bearer '+ uni.getStorageSync('token'),
                        //         'Content-Type':'multipart/form-data'
                        //     },
                        //     filePath:igmFile[0],
                        //     name:'file',
                        //     success: (res) =>{
                        //         // let imgUrls = JSON.parse(res.data); //微信和头条支持
                        //         let imgUrls = res.data //百度支持
                        //         this.imagesUrlPath = this.imagesUrlPath.concat(imgUrls.result.filePath);
                        //         this.imageList = this.imageList.concat(imgUrls.result.filePath); //微信
                        //         if(this.imageList.length>=4) {
                        //             this.VideoOfImagesShow = false;
                        //         } else {
                        //             this.VideoOfImagesShow = true;
                        //         }
                        //     }
                        // })
                        // this.imageList = this.imageList.concat(res.tempFilePaths)  //头条
                    },
                });
            },
            previewImage: function(e) {
                //预览图片
                var current = e.target.dataset.src
                uni.previewImage({
                    current: current,
                    urls: this.imageList
                })
            },
            delect(index){
                uni.showModal({
                    title: "提示",
                    content: "是否要删除该图片",
                    success: (res) => {
                        if (res.confirm) {
                            this.imageList.splice(index, 1)
                        }
                    }
                })
            },
            delectVideo(){
                uni.showModal({
                    title:"提示",
                    content:"是否要删除此视频",
                    success:(res) =>{
                        if(res.confirm){
                            this.src = ''
                        }
                    }
                })
            }
        }
    }
</script>

<style>
.burst-wrap{
    width: 100%;
    height: 100%;
}
/* .burst-wrap .burst-wrap-bg{
    position: relative;
    width: 100%;
    height: 320upx;
    background:linear-gradient(90deg,rgba(251,91,80,1) 0%,rgba(240,45,51,1) 100%);
    border-bottom-right-radius: 80upx;
    border-bottom-left-radius: 80upx;
} */
.burst-wrap .burst-wrap-bg>view{
    width: 90%;
    height: 100%;
    margin: 0 auto;
    position: absolute;
    top: 65upx;
    left: 0;
    right: 0;
}

.form-item{
    width: 100%;
}
.form-item textarea{
    display: block;
    height: 220upx;
    width: 100%;
    color: #AAAAAA;
    font-size: 28upx;
}
.uni-uploader__file,.uploader_video{
    position: relative;
    z-index: 1;
    width: 200upx;
    height: 200upx;
}
.uni-uploader__img {
    width: 200upx;
    height: 200upx;
}
.icon-cuo {
    position: absolute;
    right: 0;
    top: 5upx;
    background: linear-gradient(90deg,rgba(251,91,80,1) 0%,rgba(240,45,51,1) 100%);
    color: #FFFFFF;
    z-index: 999;
    border-top-right-radius: 20upx;
    border-bottom-left-radius: 20upx;
}
.video{
    width: 100%;
    height: 100%;
}

.login-input-box{
    position: relative;
    border-bottom: 1upx solid #EEEEEE;
}
.login-input-box .forget,.login-input-box .phone{
    position: absolute;
    top: 0;
    height: 100%;
    z-index: 100;
}
.login-input-box .phone{
    width: 100upx;
    left: 0;
    color: #666666;
    font-weight: bold;
}
.login-input-box .phone-input{
    padding-left: 100upx;
}
.address-wrap,.open-info{
    margin-top: 20upx;
}
.open-info>view:last-child{
    font-size: 28upx;
    color: #999999;
}
.address-wrap .address {
    background: #F2F2F2;
    border-radius: 40upx;
    padding: 0 20upx;
}
.user-set-btn{
    margin: 40upx;
    background: linear-gradient(90deg,rgba(251,91,80,1) 0%,rgba(240,45,51,1) 100%);
    color: #FFFFFF;
    text-align: center;
    height: 88upx;
    line-height: 88upx;
}
</style>