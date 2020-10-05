import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Login from "./login";
import SignUp from "./signUp";
import "./auth.css";
class Authorization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'login'
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

  handleActiveTab = (activeTab) => {
    this.setState({ activeTab });
  }

  render() {
    console.log(`%c${JSON.stringify(this.props)}`, `color: blue; font-weight: bold; font-size: 16px;`);
    console.log('--render authorization--');
    const { activeTab } = this.state;
    if (this.props.isAuth)
      return <Redirect to="/home" />;
    return (
      <div className="col-lg-4">
        <div className="auth-form">
          <ul className="auth-group list-unstyled">
            <li className={`auth-tab ${activeTab === 'signUp' ? 'active' : ''}`} onClick={() => this.handleActiveTab('signUp')}>
              Sign up
            </li>
            <li className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => this.handleActiveTab('login')}>
              Log in
            </li>
          </ul>
          {
            activeTab === 'login' ? <Login /> : <SignUp />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(`%c${JSON.stringify(state)}`, `color: blue; font-weight: normal; font-size: 15px;`);
  return { isAuth: state.auth.isAuth }
}

export default connect(mapStateToProps)(Authorization);
