import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'animate.css';
import 'lodash';
import { hammer } from './directive/hammer';
import VConsole from 'vconsole';

const vConsole = new VConsole();


Vue.directive('hammer', hammer);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
