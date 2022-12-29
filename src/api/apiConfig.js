let prefix = "http://localhost:5184";

//V1 接口
export let ConfigUrls = {
  account: {
    login: prefix + "/authorization/login", //登录接口
    account: prefix + "/account/userInfo", //账号信息
  },
  menu: {
    accountMenus: prefix + "/system/menus", //账号菜单
    menus: prefix + "/system/menulist", //菜单列表
  },
};

//登录标记
export let LoginConfig = {
  Login_USERNAME: "username",
  Login_PASSWORD: "password",
  Login_REMEMBER: "remember",
  TOKEN: "token",
};

//开发环境 debug/production
export let Environment = "debug";
