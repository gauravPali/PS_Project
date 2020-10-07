import React, { Component } from "react";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button } from 'react-bootstrap';

class AppModal extends Component {
    render() {
        const { showModal, hideModal } = this.props;
        return (
            <Modal show={showModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">
                        Update
                            </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AppModal;
