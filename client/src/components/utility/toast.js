import React, { Component } from "react";
import { Toast, ToastBody } from 'react-bootstrap'

class ToastMsg extends Component {
    state = {
        show: true
    }

    handleClose = () => {
        this.setState({ show: !this.state.show })
    }

    render() {
        const { body, toastClass } = this.props;
        return (
            <Toast show={this.state.show} delay={5000} className={toastClass} autohide onClose={this.handleClose}>
                <Toast.Body>{body}</Toast.Body>
            </Toast>
        )
    }
}

export default ToastMsg;