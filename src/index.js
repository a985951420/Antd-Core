import React from 'react';
import ReactDOM from 'react-dom';
import Home from './view/index/index'
import WrappedNormalLoginForm from './view/login/index'
import NotFund from './view/nofound/index'
import { BrowserRouter, Route, Switch } from "react-router-dom";
ReactDOM.render((
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={WrappedNormalLoginForm} />
            <Route component={NotFund} />
        </Switch>
    </BrowserRouter>
), document.getElementById('app'))
