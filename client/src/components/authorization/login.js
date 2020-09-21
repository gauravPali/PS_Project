import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


class Login extends Component {
    render() {
        return (
            <form>
                <div class="form-group">
                    <input type="email" class="form-control" id="formGroupExampleInput2" placeholder="Email" />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" id="formGroupExampleInput2" placeholder="Password" />
                </div>
                <Button>Log in</Button>
            </form>
        )
    }
}

export default Login;