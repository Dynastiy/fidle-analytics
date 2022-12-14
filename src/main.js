import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import '@/assets/css/fidle.css'
import '@/assets/css/media-query.css'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')