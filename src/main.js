import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios';
import treetable from 'vue-table-with-tree-grid'
import vueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.authorization = window.sessionStorage.getItem('token');
  return config;
})
Vue.prototype.$http = axios
Vue.use(vueQuillEditor)
Vue.config.productionTip = false

Vue.component('tree-table',treetable);

Vue.filter('dataFormat',function(originVal){
  const dt = new Date(originVal);
  const y = dt.getFullYear();
  const m = (dt.getMonth()+1+'').padStart(2,'0');
  const d = (dt.getDate()+'').padStart(2,'0');
  const hh = (dt.getHours()+'').padStart(2,'0');
  const mm = (dt.getMinutes()+'').padStart(2,'0');
  const ss = (dt.getSeconds()+'').padStart(2,'0');

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
