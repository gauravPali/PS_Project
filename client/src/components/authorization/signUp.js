import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Error from './errors';
import { validateForm } from '../../actions/signUpActions';


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
        this.props.validateForm(this.state.fields);
    }

    render() {
        console.log('--render signup below props --');
        console.log(this.props.signUp);
        const { isLoading, errors } = this.props.signUp;
        console.log(`i am fname ${errors}`);
        const { fields: { firstName, lastName, email, password } } = this.state;
        return (
            <>
                <div className="auth-content">
                    <p className="text-white text-center auth-helper-text">Register Here</p>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <Row>
                                <Col>
                                    <input type="text" className={`form-control ${errors && errors.firstName ? 'form-error' : ''}`} placeholder="First Name" name="firstName" value={firstName} onChange={(e) => this.handleInputChange(e)} />
                                </Col>
                                <Col>
                                    <input type="text" className={`form-control ${errors && errors.lastName ? 'form-error' : ''}`} placeholder="Last Name" name="lastName" value={lastName} onChange={(e) => this.handleInputChange(e)} />
                                </Col>
                            </Row>
                        </div>
                        <div className="form-group">
                            <input type="email" className={`form-control ${errors && errors.email ? 'form-error' : ''}`} placeholder="Email" name="email" value={email} onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group">
                            <input type="password" className={`form-control ${errors && errors.password ? 'form-error' : ''}`} placeholder="Password" name="password" value={password} onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group text-right mb-0">
                            <button type="submit" className="btn app-btn-primary" disabled={isLoading}>Sign Up</button>
                        </div>
                    </form>
                </div>
                {(errors && errors.messages.length) ? <Error errors={errors.messages} /> : ''}
            </>
        )
    }
}

const mapStateToProps = state => {
    console.log('mapState called');
    console.log(state);
    return {
        signUp: state.signUp
    }
}

export default connect(mapStateToProps, { validateForm })(Signup);