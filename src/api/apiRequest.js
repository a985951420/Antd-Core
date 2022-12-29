import axios from "axios";
import { message } from "antd";
import { GetStorage, RemoveStorage, Log } from "../tools/tools";
import { LoginConfig } from "../api/apiConfig";
const antdMessage = message;

// axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.headers.post["Accept"] = "*/*";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST';
// axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.post["Content-Type"] = ("application/x-www-form-urlencoded");
axios.interceptors.request.use(
  (config) => {
    const token = GetStorage(LoginConfig.token);
    if (token != null && token != "null") {
      config.headers.common = { Authorization: `Bearer ${token}` };
    } else {
      //window.location.href = '/';
    }
    return config;
  },
  (err) => {
    console.error("请求超时!");
    return Promise.resolve(err);
  }
);
axios.interceptors.response.use(
  (data) => {
    if (data.status && data.status == 200 && data.data.status == "error") {
      console.error("error!");
      return;
    }
    return data;
  },
  (err) => {
    var mgs = "";
    if (err.response == undefined || err.response == null) {
      mgs = "服务器请求错误！";
    } else if (err.response.status == 504 || err.response.status == 404) {
      mgs = "服务器找不到！";
    } else if (err.response.status == 403) {
      mgs = "权限不足！";
    } else if (err.response.status == 401) {
      window.location.href = "/login";
    } else {
      mgs = "未知错误！";
    }
    antdMessage.error("服务器正在开小差请稍后再试😭😭😭😭😭");
    var response = {
      success: false,
      message: mgs,
      totalPage: 0,
      totalNumber: 0,
      pageIndex: 0,
      pageSize: 0,
      hasMorePage: false,
      data: null,
    };
    return Promise.resolve({ data: response });
  }
);

export default axios;
