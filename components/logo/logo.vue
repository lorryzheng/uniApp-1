<template>
	<view class="user-logo">
		<view class="logo-according"></view>
	</view>
</template>

<script>
	export default {
		data(){
			return {}
		}
	}
</script>

<style>
	.user-logo{
	    height:300upx;
	}
	.logo-according{
	    width:400upx;
	    height:180upx;
	    position: relative;
	    top:35%;
	    left:50%;
	    margin-left:-200upx;
	}
	.logo-according:before{
	    content: " ";
	    position: absolute;
	    width:400upx;
	    height:180upx;
	    background:url(../../static/nine/logo.png) no-repeat;
	    background-size:100% 100%;
	}
</style>
