import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="auth-content">
                <p className="text-white text-center auth-helper-text">Welcome Back !</p>
                <form>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" />
                    </div>
                    <div className="form-group text-right">
                        <button className="btn app-btn-primary">Log in</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;