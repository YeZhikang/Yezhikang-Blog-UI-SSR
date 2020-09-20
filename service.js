import axios from 'axios'
const service = axios.create();
service.defaults.baseURL = process.env.BASE_URL;

export default service
