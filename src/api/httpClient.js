import Ax from "./apiRequest";
//Base 基础请求类
class HttpClient {
  constructor() {}
  //Post 请求
  post(url, data) {
    return new Promise((resolve, reject) => {
      Ax.post(url, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch(function (error) {
          throw error;
        });
    });
  }
  //Get 请求
  get(url, data) {
    return new Promise((resolve, reject) => {
      Ax.get(url, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch(function (error) {
          throw error;
        });
    });
  }
}
export default new HttpClient();
