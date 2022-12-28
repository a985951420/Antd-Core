let prefix = "http://localhost:5184";

//V1 接口
export let ConfigUrls = {
  account: {
    login: prefix + "/api/v1/authorization/login", //登录接口
    account: prefix + "/api/v1/Account/UserInfo", //账号信息
  },
  menu: {
    accountMenus: prefix + "/api/v1/system/menus", //账号菜单
    menus: prefix + "/api/v1/system/menulist", //菜单列表
  },
};
