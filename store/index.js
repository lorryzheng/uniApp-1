import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin: false,
		memberInfo: {
			member_id: '',
			member_token: ''
		},
	},
	mutations: {
		login(state, member_info) {
			state.isLogin = true;
			state.memberInfo = member_info;
			uni.setStorageSync('member_info', member_info);
		},
		editMemberInfo(state,member_info){
			state.memberInfo = member_info;
			uni.setStorageSync('member_info', member_info);
		},
		logout(state) {
			state.isLogin = false;
			state.memberInfo = {
				member_id: '',
				member_token: ''
			};
			uni.clearStorageSync('member_info');
			uni.reLaunch({
				url: "/pages/public/login"
			})
		},
		ajax(state, config) {
			var url = Vue.prototype.$domain + Vue.prototype.$subapi + config.url;
			console.log(url);
			var data = config.data || {};
			if (state.memberInfo.member_id && state.memberInfo.member_token) {
				data['member_id'] = state.memberInfo.member_id;
				data['member_token'] = state.memberInfo.member_token;
			}
			var callback = config.callback || function() {};
			console.log(url);
			uni.request({
				url: url,
				data: data,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				dataType: 'json',
				success: (json) => {
					json = json.data;
			
					if (json.toerror) { 
						return uni.reLaunch({
							url: "/pages/error/error?msg=" + json.msg,
						});
					}
					if (json.haserror) {
						return uni.showToast({
							title: json.msg,
							complete: () => {
								if (json.relogin) {
									this.$store.logout();
								}
							},
							mask: true,
							icon: "none"
						});
					}
					callback(json); 
				},
				complete: config.complate || function() {}
			});
		}
	},
	actions: {

	}
})

export default store
