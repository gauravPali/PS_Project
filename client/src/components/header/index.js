import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {
    state = {
        isAdmin: true
    }
    render() {
        return (
            <header className="px-5 py-2 d-flex justify-content-between align-items-center">
                <h2 className="app-logo"><Link to="/">Ability</Link></h2>
                {
                    this.state.isAdmin ?
                        <nav>
                            <Link to="/categories" className="header-nav">Categories</Link>
                        </nav>
                        :
                        <nav>
                            <Link to="/about" className="header-nav">About</Link>
                            <Link to="/sampletest" className="header-nav">Try Out</Link>
                        </nav>
                }

            </header>
        )
    }
}

export default Header;