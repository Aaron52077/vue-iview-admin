/* eslint-disable */
import Vue from 'vue'
import store from '@/store'

// you can set only in production env show the error-log
if (process.env.NODE_ENV === 'production') {
    Vue.config.errorHandler = function (error, vm, info) {
		// Don't ask me why I use Vue.nextTick, it just a hack.
		// detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
		Vue.nextTick(() => {
			store.dispatch('errorLog/addErrorLog', {
				error,
				vm,
				info,
				url: window.location.href,
				time: new Date()
			})
		})
		console.error(`Error: ${error}\nInfo: ${info}`);
    }
}