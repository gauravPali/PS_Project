import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Error from './errors';
import signUpValidator from './signUpValidator';
import { signUpWithEmail } from '../../actions/signUpActions';


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            },
            fieldErrors: {
                firstName: false,
                lastName: false,
                email: false,
                password: false,
                errors: []
            }
        }
    }

    handleInputChange = (e) => {
        const { fields } = this.state;
        fields[e.target.name] = e.target.value
        this.setState({ fields })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        signUpValidator.validate(this.state.fields, { abortEarly: false })
            .then(res => {
                console.log(res);
                console.log(this.state);
                this.props.signUpWithEmail(this.state);
                this.setState({
                    fields: {
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                    }
                });
            })
            .catch(err => {
                debugger
                console.log(this.state);
                const fieldErrors = {
                    firstName: false,
                    lastName: false,
                    email: false,
                    password: false,
                    errors: []
                };
                err.inner.forEach(({ path, errors }) => {
                    fieldErrors[path] = true;
                    fieldErrors.errors.push(errors[0]);
                })
                this.setState({ fieldErrors });
            })
        console.log('submitted end')
    }

    render() {
        console.log('--render--');
        console.log(this.state);
        const { fields: { firstName, lastName, email, password }, fieldErrors } = this.state;
        console.log(fieldErrors);
        return (
            <>
                <div className="auth-content">
                    <p className="text-white text-center auth-helper-text">Register Here</p>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <Row>
                                <Col>
                                    <input type="text" className={`form-control ${fieldErrors.firstName ? 'form-error' : ''}`} placeholder="First Name" name="firstName" value={firstName} onChange={(e) => this.handleInputChange(e)} />
                                </Col>
                                <Col>
                                    <input type="text" className={`form-control ${fieldErrors.lastName ? 'form-error' : ''}`} placeholder="Last Name" name="lastName" value={lastName} onChange={(e) => this.handleInputChange(e)} />
                                </Col>
                            </Row>
                        </div>
                        <div className="form-group">
                            <input type="email" className={`form-control ${fieldErrors.email ? 'form-error' : ''}`} placeholder="Email" name="email" value={email} onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group">
                            <input type="password" className={`form-control ${fieldErrors.password ? 'form-error' : ''}`} placeholder="Password" name="password" value={password} onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group text-right mb-0">
                            <button type="submit" className="btn app-btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
                {fieldErrors.errors.length ? <Error errors={fieldErrors.errors} /> : ''}
            </>
        )
    }
}

export default connect(null, { signUpWithEmail })(Signup);