import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import Login from "./login";
import Signup from "./signUp";
import "./auth.css";

class Authorization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'signup'
    }
    console.log('--constructor authoriztion--');
  }


  componentDidMount() {
    console.log('--componentDidMount authoriztion--');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('--getDerivedStateFromProps authoriztion--');
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('--shouldComponentUpdate authoriztion--');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('--getSnapshotBeforeUpdate authoriztion--');
    return null;
  }

  componentDidUpdate(prevProps) {
    console.log('--componentDidUpdate authoriztion--');
  }

  render() {
    console.log('--render app--');
    console.log(this.props);
    return (
      <div className="col-lg-4">
        <div className="auth-form">
          <ul className="auth-group list-unstyled">
            <li>
              <NavLink className="auth-tab text-decoration-none" activeClassName="active" to="/auth/signup">Sign up </NavLink>
            </li>
            <li>
              <NavLink className="auth-tab text-decoration-none" activeClassName="active" to="/auth/login">Log in </NavLink>
            </li>
          </ul>
          <Route path="/auth/signup" component={Signup}></Route>
          <Route path="/auth/login" component={Login}></Route>
        </div>
      </div>
    );
  }
}

export default Authorization;
