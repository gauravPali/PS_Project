import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class AlertMessage extends Component {
    render() {
        const { errors, message, classProp, status } = this.props;
        const renderErrors = () => {
            return <ul className="mb-0 mt-1 list-unstyled">
                {
                    Object.keys(errors).map((key, i) => {
                        return <li key={key}>{errors[key]}</li>
                    })
                }
            </ul>
        }
        return (
            <Alert variant={status ? 'success' : 'danger'} className={classProp ? classProp : ''} show={true}>
                <Alert.Heading>{message}</Alert.Heading>
                {errors && renderErrors()}
            </Alert>
        )
    }
}

export default AlertMessage;

