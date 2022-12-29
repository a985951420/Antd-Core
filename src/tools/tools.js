import { Environment } from "../api/apiConfig";

//获取Storage值
export function GetStorage(key) {
  var val = localStorage.getItem(key);
  if (isJSON(val)) {
    return JSON.parse(val);
  }
  return val;
}
//赋值Storage值
export function SetStorage(key, value) {
  var val = "";
  if (isObject(value)) {
    val = JSON.stringify(value);
  } else {
    val = value;
  }
  localStorage.setItem(key, val);
}

//删除Key
export function RemoveStorage(key) {
  Log("删除Key:" + key);
  localStorage.removeItem(key);
}

function isObject(val) {
  return val instanceof Object;
}

function isJSON(str) {
  if (typeof str == "string") {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      //console.log('error：' + str + '!!!' + e);
      return false;
    }
  }
  //console.log('It is not a string!')
}

//打印日志
export function Log(message) {
  switch (Environment) {
    case "debug":
      console.info(message);
      break;
    case "production":
    default:
      break;
  }
}
//打印日志
export function LogObject(message, model) {
  switch (Environment) {
    case "debug":
      console.info(message, model);
      break;
    case "production":
    default:
      break;
  }
}
