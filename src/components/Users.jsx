import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import UsersList from './UsersList'
import UserDetail from './UserDetail'
import LoginComponent from './LoginComponent'
import AccessDenied from './AccessDenied'

 class Users extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { pathname } = window.location.pathname;
        if (pathname === '/' || pathname === '/login') {
          sessionStorage.clear();
        }
      }

      render() {
        return (
            <BrowserRouter>
              <Switch>
                <Route exact path="/login" component={LoginComponent} />
                <Route exact path="/" component={LoginComponent} />
                <Route exact path="/user" component={UsersList} />
                <Route path="/user/:email" component={UserDetail} /> 
                <Route exact path="/access-denied" component={AccessDenied} />
              </Switch>
            </BrowserRouter>
        );
    }
}

export default Users;