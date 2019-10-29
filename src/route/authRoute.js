import React from 'react'
import { GetStorage, TimeCompare, RemoveStorage } from '../tools/tools'
import { Redirect } from "react-router-dom";
class AuthRoute extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // debugger;
        var token = GetStorage('token');
        if (token != null && token != undefined && token != '') {
            if (TimeCompare(token.exptime, new Date())) {
                return <Redirect to='/' />;
            } else {
                RemoveStorage('token');
                return <Redirect to="/login" />
            }
        } else {
            return <Redirect to="/login" />
        }
    }
}

export default AuthRoute;