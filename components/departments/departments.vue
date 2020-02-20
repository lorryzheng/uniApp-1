<template>
	<view class="content-module">
		<view class="content-level" v-for="(item,index) in part" :key='index' @tap="btnDepar(index)">
			<image :src="item.url"></image>
			<view class="level-name black-color">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				part: [{
					url:'../../static/11.jpg',
					text:'理学部',
					badge:'0'
				},{
					url:'../../static/16.jpg',
					text:'理学部',
					badge:'1'
				},{
					url:'../../static/16.jpg',
					text:'理学部',
					badge:'1'
				},{
					url:'../../static/17.jpg',
					text:'理学部',
					badge:'2'
				},{
					url:'../../static/16.jpg',
					text:'理学部',
					badge:'1'
				},{
					url:'../../static/17.jpg',
					text:'理学部',
					badge:'2'
				},{
					url:'../../static/16.jpg',
					text:'理学部',
					badge:'1'
				},{
					url:'../../static/17.jpg',
					text:'理学部',
					badge:'2'
				},{
					url:'../../static/16.jpg',
					text:'理学部',
					badge:'1'
				},{
					url:'../../static/17.jpg',
					text:'理学部',
					badge:'2'
				},{
					url:'../../static/17.jpg',
					text:'理学部',
					badge:'2'
				},{
					url:'../../static/19.jpg',
					text:'理学部',
					badge:'3'
				}]
			}
		},
		onLoad(){
			this.departments()
		},
		methods:{
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
			btnDepar(e){
				var deta = this.part[e].badge
				uni.navigateTo({
					url:'../details-page/details?deta='+deta
				})
			}
		}
	}
</script>

<style>
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
