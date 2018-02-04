var Vue = require("vue/dist/vue.js");
var vheader = require("../_modules/components/header/header.vue")

new Vue({
	el: '#app',
	components: {
		vheader: vheader
	}
});