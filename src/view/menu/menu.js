import React from "react";
import HttpClient from "../../api/httpClient";
import { ConfigUrls } from "../../api/apiConfig";
import Authority from "../system/index";
import Userinfo from "../user/Userinfo";

//菜单是否更新
let isPost = false;

const components = {
  View_Sys_Authinfo: Authority,
  View_Sys_User: Userinfo,
};

function dynamicView(name) {
  // Correct! JSX type can be a capitalized variable.
  const MyView = components[name];
  return <MyView />;
}

//菜单栏目
const sidebarMenu = [
  {
    id: "View_Sys",
    name: "系统菜单",
    childNode: [
      { id: "View_Sys_User", name: "用户信息", button: [], Component: null },
      {
        id: "View_Sys_Authinfo",
        name: "权限信息",
        button: [],
        Component: dynamicView("View_Sys_Authinfo"),
      },
      {
        id: "View_Sys_Roleinfo",
        name: "角色信息",
        button: [],
        Component: null,
      },
    ],
  },
];
let authMenus = [];

//获取
export function GetMenu(callback, get) {
  if (isPost == false || get) {
    HttpClient.get(ConfigUrls.menu.menus).then((response) => {
      if (response.success) {
        isPost = true;
        var authMenu = response.data;
        var find = (val, dom) => {
          for (var i = 0; i <= authMenu.length - 1; i++) {
            if (authMenu[i].viewcode == val) {
              if (dom) {
                dom.button = authMenu[i].button;
              }
              return true;
            }
          }
          return false;
        };
        authMenus = sidebarMenu.filter((value) => {
          if (find(value.id) == false) {
            return false;
          }
          value.childNode = value.childNode.filter((node) => {
            if (find(node.id, node) == false) {
              return false;
            } else {
              return true;
            }
          });
          return true;
        });

        if (callback) {
          callback.call(this, authMenus);
        }
      }
    });
  } else {
    if (callback) {
      callback.call(this, authMenus);
    }
  }
}
