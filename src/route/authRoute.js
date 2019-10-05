import React from 'react'
import { GetStorage } from '../tools/tools'

class AuthRoute extends React.Component {
    render() {
        debugger;
        var token = GetStorage('token');
        if (token != null && token != undefined && token != '') {
            return (
                <Redirect to="/" />
            );
        }else{
            return (
                <Redirect to="/login" />
            );
        }
    }
}

export default AuthRoute;