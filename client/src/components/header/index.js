import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class Header extends Component {

    render() {
        const { isAuth, user } = this.props;


        return (
            <header className="px-5 py-3 d-flex justify-content-between align-items-center">
                <h2 className="app-logo"><Link to="/">Ability</Link></h2>
                {
                    isAuth &&
                    <nav className="nav">
                        {
                            isAuth && (user && user.isUser) ? <a href="" className="nav-link text-white">Questions</a> : ''
                        }
                        {
                            isAuth ? <a href="" className="nav-link text-white">{user.fullName}</a> : ''
                        }
                    </nav>
                }
            </header>
        )
    }
}

const mapStateToProps = state => {
    console.log('mapState  in header called');
    console.log(`%c${JSON.stringify(state)}`, `color: blue; font-weight: normal; font-size: 15px;`);
    return { isAuth: state.auth.isAuth, user: state.auth.user }
}

export default connect(mapStateToProps)(Header);
