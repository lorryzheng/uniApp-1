<template>
	<view class="statistics">
		<view>
			<!-- 图标-->
			<view class="identify-icon">
				<image class="identify-icon-lg" src="../../static/icon/shuju.png"></image>
				<view class="identify-icon-text">数据统计</view>
			</view>
		</view>
		<view class="statistics-mian">
			<view class="statistics-head">
				<view class="right-date" @click="arrowDown" >
					<!-- <uni-icon type="arrowdown" size="20"></uni-icon> -->
					<p style="font-size: 32upx;" title="请选择">{{unitName}}</p>
					<view class="statistics-icon"></view>
				</view>
				<view class="right-date" @click="arrowBowm" >
					<!-- <uni-icon type="arrowdown" size="20"></uni-icon> -->
					<p style="font-size: 32upx;" title="请选择">{{unitType}}</p>
					<view class="statistics-icon"></view>
				</view>
			</view>
			<!-- 数据 -->
			<view style="margin-top:30upx;">
				<view id="main" style="width: 720rpx;height: 600rpx;"></view>
			</view>
		</view>
		<view class="selectBox_list" v-show="isShowSelect">
			<view class="selectBox_listLi" v-for="(item, index) in dataList" :key="index" @click.stop="select(item, index)">{{item.value}}
			 </view>
		</view>
		<view class="selectBox_list" v-show="isShowFerver">
			<view class="selectBox_listLi" v-for="(item, index) in attribute" :key="index" @click.stop="ferver(item, index)">{{item.value}}
			 </view>
		</view>
	</view>
</template>

<script>
import echarts from 'echarts'
export default{
	data() {
		return{
			isShowSelect: false,
			isShowFerver:false,
			dataList: [
				{key: 1, value: "一周"},
				{key: 30, value: "一月"},
				{key: 365, value: "一年"}
			],
			attribute: [
				{key:11, value: "早出"},
				{key:22, value: "晚归"},
				{key:33, value: "彻夜未归"},
				{key:44, value: "无通行"}
			],
			unitName:'一周',
			unitType:'早出',
			name: '',
			charts: '',
			opinionData: ["100", "300", "211", "321"],
			attributeData:["第一周","第二周","第三周","第四周"],
			timeData:1,
			typeData:11
		}
	},
	methods:{
		arrowDown() {
			this.isShowSelect = !this.isShowSelect;
			this.isShowFerver = false;
		 },
		 select(item, index) {
			this.isShowSelect = false;
			this.unitName = item.value;
			this.timeData = item.key;
			console.log(this.timeData,this.typeData)
			uni.request({
				url:"",//链接地址
				data:{
					timeData:this.timeData,
					typeData:this.typeData
				},
				dataType:'json',
				success:res =>{
					this.opinionData = res.data.opinionData;
					this.attributeData = res.data.attributeData;
				}
			})
		},
		 arrowBowm(){
			this.isShowFerver = !this.isShowFerver;
			this.isShowSelect = false;
		 },
		ferver(item, index) {
			this.isShowFerver = false;
			this.unitType = item.value;
			this.type = item.key;
			this.typeData = item.key;
			uni.request({
				url:"",//链接地址
				data:{
					timeData:this.timeData,
					typeData:this.typeData
				},
				dataType:'json',
				success:res =>{
					this.opinionData = res.data.opinionData;
					this.attributeData = res.data.attributeData;
				}
			})
		},
		 
		drawLine(id) {
			this.charts = echarts.init(document.getElementById(id))
			this.charts.setOption({
				tooltip: {
					// trigger: 'axis'
				},
				legend: {
					data: ['通行异常趋势']
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: this.attributeData
				},
				yAxis: {
					type: 'value'
				},

				series: [{
					name: '通行异常趋势',
					type: 'line',
					// stack: '总量',
					// color:["#D92E2E"],
					data: this.opinionData,
					label:{
						normal:{
							show:true,
							position:'top',//柱状图头顶显示数据
							color:'#fff'
						}
					},
					itemStyle: {
						normal: {
			
							color: new echarts.graphic.LinearGradient(//柱状图颜色渐变
							0, 0,0,1,
							[
							{offset: 0, color: '#58b9ed'},
							{offset: 0.5, color: '#203dda'},
							{offset: 1, color: '#3e28d7'}
							])
						}
					}
				}]
			})
		}
	},
	  //调用
	mounted() {
		this.$nextTick(function() {
			this.drawLine('main')
		})
	}
}
</script>

<style lang="scss">
@import '../css/abnormal.css';
	page{
		background-color:#00a3e8,
	}
	.statistics-head{
		width:100%;
		height:80upx;
		line-height: 80upx;
		margin-top:20upx;
		display:flex;
		flex-wrap:wrap;
		justify-content:space-around;
	}
	.right-date{
		width:150upx;
		height:80upx;
		display:flex;
		flex-wrap:wrap;
		justify-content:space-between;
		background-color: #00a3a0;
		text-align: center;
		line-height:80upx;
		padding:0 20upx;
		font-size:32upx;
		color:#fff;
		border-radius: 20upx;
		// margin-left:30upx;
	}
	.selectBox_list{
		width:100%;
		position:fixed;
		bottom: 0;
		background-color: #fff;
	}
	.selectBox_listLi{
		width:100%;
		height:60upx;
		border-bottom: #e8e8e8 solid 2upx;
		text-align: center;
		line-height: 60upx;
		font-size:32upx;
		color:#000;
	}
	.statistics-icon{
	    width:25upx;
	    height:25upx;
	    position: relative;
		top:50%;
		right:10upx;
		margin-top:-12.5upx;
	}
	.statistics-icon:before{
	    content: " ";
	    position: absolute;
	    width:25upx;
	    height:25upx;
	    background:url(../../static/icon/sanjiao.png) no-repeat;
	    background-size:100% 100%;
	}
</style>
