import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Login from './login';
import Register from './register';
import './auth.css';


class Authorization extends Component {
    render() {
        return (
            <div className="col-lg-6">
                <ul className="auth-group list-unstyled border">
                    <li className="auth-item"><Link to="/signup">Sign up </Link></li>
                    <li className="auth-item"><Link to="/login">Log in </Link></li>
                </ul>
                <div className="auth-content border px-4 py-4">
                    <Route path="/signup" component={Register}></Route>
                    <Route path="/login" component={Login}></Route>
                </div>
            </div>
        )
    }
}

export default Authorization;