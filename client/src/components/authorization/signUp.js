import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Error from './errors';
import { validateForm, removeErrorsOfTab } from '../../actions/authActions';
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            },
        }
        console.log('--constructor Signup--');
    }

    componentDidMount() {
        console.log('--componentDidMount Signup--');
    }

    static getDerivedStateFromProps(props, state) {
        console.log('--getDerivedStateFromProps Signup--');
        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('--shouldComponentUpdate Signup--');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('--getSnapshotBeforeUpdate Signup--');
        return null;
    }

    componentDidUpdate(prevProps) {
        console.log('--componentDidUpdate Signup--');
        console.log(prevProps);
        console.log(this.props);
    }

    handleInputChange = (e) => {
        const { fields } = this.state;
        const newFields = fields
        newFields[e.target.name] = e.target.value
        this.setState({ newFields })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.fields);
        this.props.validateForm(this.state.fields, e.target.id);
    }

    componentWillUnmount() {
        console.log('--unmount signup--');
        console.log(this.props.signUpErrors);
        if (this.props.signUpErrors) {
            this.props.removeErrorsOfTab('signUp');
        }
    }

    render() {
        console.log('--render signup below props --');
        const { isLoading, signUpErrors } = this.props;
        console.log(`%c${JSON.stringify(this.props)}`, `color: green; font-weight: bold; font-size: 16px;`);
        const { fields: { firstName, lastName, email, password } } = this.state;
        return (
            <>
                <div className="auth-content">
                    <p className="text-white text-center auth-helper-text">Register Here</p>
                    <form id="signUp" onSubmit={(e) => { this.handleSubmit(e) }}>
                        <div className="form-group">
                            <Row>
                                <Col>
                                    <input type="text" className={`form-control ${signUpErrors && signUpErrors.firstName ? 'form-error' : ''}`} placeholder="First Name" name="firstName" value={firstName} onChange={(e) => this.handleInputChange(e)} />
                                </Col>
                                <Col>
                                    <input type="text" className={`form-control ${signUpErrors && signUpErrors.lastName ? 'form-error' : ''}`} placeholder="Last Name" name="lastName" value={lastName} onChange={(e) => this.handleInputChange(e)} />
                                </Col>
                            </Row>
                        </div>
                        <div className="form-group">
                            <input type="email" className={`form-control ${signUpErrors && signUpErrors.email ? 'form-error' : ''}`} placeholder="Email" name="email" value={email} onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group">
                            <input type="password" className={`form-control ${signUpErrors && signUpErrors.password ? 'form-error' : ''}`} placeholder="Password" name="password" value={password} onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group text-right mb-0">
                            <button type="submit" className="btn app-btn-primary" disabled={isLoading}>Sign Up</button>
                        </div>
                    </form>
                </div>
                {(signUpErrors && signUpErrors.messages.length) ? <Error errors={signUpErrors.messages} /> : ''}
            </>
        )
    }
}

const mapStateToProps = state => {
    console.log(`%c${JSON.stringify(state)}`, `color: green; font-weight: normal; font-size: 15px;`);
    return {
        isLoading: state.auth.isLoading,
        signUpErrors: state.auth.signUpErrors,
    }
}

export default connect(mapStateToProps, { validateForm, removeErrorsOfTab })(SignUp);