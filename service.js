import axios from 'axios'
const service = axios.create();
service.defaults.baseURL = process.env.BASE_URL;
service.defaults.withCredentials = true;

export default service
