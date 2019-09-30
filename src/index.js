import React from 'react';
import ReactDOM from 'react-dom';
import Home from './view/index/index'
import WrappedNormalLoginForm from './view/login/index'
import NotFund from './view/nofound/index'
import { BrowserRouter, Route } from "react-router-dom";
ReactDOM.render((
    <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={WrappedNormalLoginForm} />
        <Route component={NotFund} />
    </BrowserRouter>
), document.getElementById('app'))
