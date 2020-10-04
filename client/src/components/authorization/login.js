import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from './errors';
import { validateForm } from '../../actions/loginActions'

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
        this.props.validateForm(this.state);
    }

    render() {
        const { email, password } = this.state;
        const { isLoading, errors } = this.props.login;
        return (
            <>
                <div className="auth-content">
                    <p className="text-white text-center auth-helper-text">Welcome Back !</p>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="email" className={`form-control ${errors && errors.email ? 'form-error' : ''}`} name="email" placeholder="Email" value={email} onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group">
                            <input type="password" className={`form-control ${errors && errors.password ? 'form-error' : ''}`} name="password" placeholder="Password" value={password} onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group text-right mb-0">
                            <button className="btn app-btn-primary" disabled={isLoading}>Log in</button>
                        </div>
                    </form>
                </div>
                {errors && errors.messages.length ? <Error errors={errors.messages} /> : ''}
            </>
        )
    }
}

const mapStateToProps = state => {
    console.log('mapState called');
    console.log(state);
    return {
        login: state.login
    }
}

export default connect(mapStateToProps, { validateForm })(Login);