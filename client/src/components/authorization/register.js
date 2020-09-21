import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';


class Register extends Component {
    render() {
        return (
            <form>
                <div class="form-group">
                    <Row>
                        <Col>
                            <input type="text" class="form-control" id="" placeholder="First Name" />
                        </Col>
                        <Col>
                            <input type="text" class="form-control" id="" placeholder="Last Name" />
                        </Col>
                    </Row>
                </div>
                <div class="form-group">
                    <input type="email" class="form-control" id="formGroupExampleInput2" placeholder="Email" />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" id="formGroupExampleInput2" placeholder="Password" />
                </div>
                <Button>Sign Up</Button>
            </form>
        )
    }
}

export default Register;