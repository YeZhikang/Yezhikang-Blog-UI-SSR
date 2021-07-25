import Vue from 'vue'
import axios from 'axios'
import marked from 'marked';

const service = axios.create();
service.defaults.baseURL = process.env.BASE_URL;


axios.defaults.baseURL = 'http://121.43.155.100:8081/';
Vue.prototype.$axios = axios;
Vue.prototype.$marked = marked;
Vue.prototype.$service = service;


