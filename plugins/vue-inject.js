import Vue from 'vue'
import axios from 'axios'
import marked from 'marked';

const service = axios.create();
service.defaults.baseURL = process.env.BASE_URL;


axios.defaults.baseURL = 'http://www.yezhikang.site:8081/';
Vue.prototype.$axios = axios;
Vue.prototype.$marked = marked;
Vue.prototype.$service = service;


