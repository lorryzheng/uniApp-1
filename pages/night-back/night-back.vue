<template>
	<view class="night-back">
		<view class="fill-information-white" v-for="(item, index) in list" :key="index">
			<view class="night-back-title">
				<text class="night-back-grade tiny-purple">{{item.grade}}</text>
				<view class="tiny-purple digital-statistical">
					<text class="digital-red">{{item.number}}</text>
					人彻夜未归
				</view>
			</view>
			<view class="display-wall">
				<text class="display-wall-name" v-for="(orders, index) in list[index].wallname" :key="index">{{orders.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list:[{
				grade:'一班',
				number:5,
				wallname:[{
					name:'小乔'
				},{
					name:'大桥'
				},{
					name:'周瑜'
				},{
					name:'曹操'
				},{
					name:'刘备'
				},{
					name:'孙权'
				},{
					name:'诸葛亮'
				}]
			},{
				grade:'一班',
				number:5,
				wallname:[{
					name:'小乔'
				},{
					name:'大桥'
				},{
					name:'周瑜'
				},{
					name:'曹操'
				},{
					name:'刘备'
				},{
					name:'孙权'
				},{
					name:'诸葛亮'
				}]
			}]
		}
	},
	onLoad() {
		this.signature();
	},
	methods:{
		signature(){
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
		}
	}
}
</script>

<style lang="scss">
@import '../css/abnormal.css';
	page{
		background-color:#00a3e8,
	}
</style>
