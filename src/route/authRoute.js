import React from 'react'
import { GetStorage } from '../tools/tools'
import { Redirect } from "react-router-dom";
class AuthRoute extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var token = GetStorage('token');
        if (token != null && token != undefined && token != '') {
            return <Redirect to='/' />;
        } else {
            return (
                <Redirect to="/login" />
            );
        }
    }
}

export default AuthRoute;