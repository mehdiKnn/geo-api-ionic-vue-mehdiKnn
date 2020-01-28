import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';
import './registerServiceWorker'

Vue.use(Ionic);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');