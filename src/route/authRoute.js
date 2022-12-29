import React from "react";
import { GetStorage, RemoveStorage, Log, LogObject } from "../tools/tools";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
class AuthRoute extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var token = GetStorage("token");
    if (token != null && token != undefined && token != "") {
      var auth = jwt_decode(token);
      LogObject("授权信息：", auth);
      const now = Math.floor(Date.now() / 1000);
      if (auth.exp > now) {
        return <Redirect to="/" />;
      } else {
        RemoveStorage("token");
        return <Redirect to="/login" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default AuthRoute;
