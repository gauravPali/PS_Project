import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import './home.css';
import { logOut } from '../../actions/authActions';

class Home extends Component {
    render() {
        console.log(this.props.isAuth);
        if (!this.props.isAuth)
            return <Redirect to="/" />;
        console.log('--render home--');
        return (
            <div className="col-lg-4 test">
                {
                    this.props.user ? <div>Welcom On boards {this.props.user.fullName} <button type="button" onClick={() => this.props.dispatch(logOut())}>Log out</button></div> : <div>'viv'</div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(`%c${JSON.stringify(state)}`, `color: blue; font-weight: normal; font-size: 15px;`);
    return { isAuth: state.auth.isAuth, user: state.auth.user }
}

export default connect(mapStateToProps)(Home);
