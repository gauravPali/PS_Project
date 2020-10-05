import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from './errors';
import { validateForm, removeErrorsOfTab } from '../../actions/authActions';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        console.log('--constructor login--');
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.validateForm(this.state, e.target.id);
    }

    componentWillUnmount() {
        console.log('i am unmount in login');
        if (this.props.loginErrors) {
            this.props.removeErrorsOfTab('login');
        }
    }

    render() {
        const { email, password } = this.state;
        const { isLoading, loginErrors } = this.props;
        console.log(`%c${JSON.stringify(this.props)}`, `color: red; font-weight: bold; font-size: 16px;`);
        console.log('--render login--');
        return (
            <>
                <div className="auth-content">
                    <p className="text-white text-center auth-helper-text">Welcome Back !</p>
                    <form id="login" onSubmit={(e) => { this.handleSubmit(e) }}>
                        <div className="form-group">
                            <input type="email" className={`form-control ${loginErrors && loginErrors.email ? 'form-error' : ''}`} name="email" placeholder="Email" value={email} onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group">
                            <input type="password" className={`form-control ${loginErrors && loginErrors.password ? 'form-error' : ''}`} name="password" placeholder="Password" value={password} onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group text-right mb-0">
                            <button className="btn app-btn-primary" disabled={isLoading}>Log in</button>
                        </div>
                    </form>
                </div>
                {loginErrors && loginErrors.messages.length ? <Error errors={loginErrors.messages} /> : ''}
            </>
        )
    }
}

const mapStateToProps = state => {
    console.log(`%c${JSON.stringify(state)}`, `color: red; font-weight: bold; font-size: 16px;`);
    return {
        isLoading: state.auth.isLoading,
        loginErrors: state.auth.loginErrors,
    }
}

export default connect(mapStateToProps, { validateForm, removeErrorsOfTab })(Login);