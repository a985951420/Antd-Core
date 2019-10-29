import React from 'react';
import ReactDOM from 'react-dom';
import Home from './view/index/index'
import WrappedNormalLoginForm from './view/login/index'
import NotFund from './view/nofound/index'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthRoute from './route/authRoute'
ReactDOM.render((
    <BrowserRouter >
        <AuthRoute />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={WrappedNormalLoginForm} />
            <Route component={NotFund} />
        </Switch>
    </BrowserRouter>
), document.getElementById('app'))
