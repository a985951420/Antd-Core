import axios from 'axios';
import { GetStorage } from '../tools/tools'
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.headers.post['Accept'] = '*/*'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.request.use(config => {
    const token = GetStorage('token');
    if (token != null && token != 'null') {
        config.headers.common = { 'Authorization': `Bearer ${token}` };
    }
    return config;
}, err => {
    console.error('请求超时!')
    return Promise.resolve(err);
})
axios.interceptors.response.use(data => {
    if (data.status && data.status == 200 && data.data.status == 'error') {
        console.error('error!')
        return;
    }
    return data;
}, err => {
    var message = "";
    if (err.response == undefined || err.response == null) {
        message = ('服务器请求错误！')
    } else if (err.response.status == 504 || err.response.status == 404) {
        message = ('服务器找不到！')
    } else if (err.response.status == 403 || err.response.status == 401) {
        message = ('权限不足！')
    } else {
        message = ('未知错误！')
    }
    throw message;
    //return Promise.resolve(err.response);
})

export default axios;