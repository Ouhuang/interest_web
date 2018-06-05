import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import Bundle from './bundle'
import Login from "../views/login/login";
import Top from "../views/layout/top";

import Test from '../test' //测试


export default class extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Top}></Route>
                <Route exact path='/test' component={Test}></Route>
                <Route path='/login' component={Bundle(() => import('../views/login/login'))}></Route>
                <Route path='/register' component={Bundle(() => import('../views/login/register'))}></Route>
            </Switch >
        )
    }
}