import Vue from 'vue'
import axios from 'axios'
import marked from 'marked'

axios.defaults.baseURL = 'http://www.yezhikang.site:8081/';
Vue.prototype.$axios = axios
Vue.prototype.$marked = marked

