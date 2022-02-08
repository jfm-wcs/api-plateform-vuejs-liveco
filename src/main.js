import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import axios from 'axios'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$domain = 'http://localhost:8000/api';

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
