import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import './home.css';
import AddQuestion from '../questions/add';
import QuestionBank from '../questions/collection';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabId: '0'
        }
        console.log('--constructor home--');
    }


    handleTabState = (e) => {
        e.preventDefault();
        console.log(e.target);
        console.log(typeof e.target.id);
        this.setState({ tabId: e.target.id });
    }


    componentDidMount() {
        console.log('--componentDidMount Home--');
    }

    static getDerivedStateFromProps(props, state) {
        console.log('--getDerivedStateFromProps Home--');
        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('--shouldComponentUpdate Home--');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('--getSnapshotBeforeUpdate Home--');
        return null;
    }

    componentDidUpdate(prevProps) {
        console.log('--componentDidUpdate Home--');
    }

    render() {
        console.log('--render home--');

        console.log(this.props.isAuth);
        const { tabId } = this.state;
        console.log(tabId);
        if (!this.props.isAuth)
            return <Redirect to="/" />;
        return (
            <div className="col-lg-8">
                <div className="px-4 py-3 questions-tab-container">
                    <ul className="mx-n4 nav nav-tabs">
                        <li className="nav-item pl-4">
                            <a href="#" id="0" className={`nav-link ${tabId === '0' ? 'active' : ''}`} onClick={(e) => { this.handleTabState(e) }}>Add Question</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" tabIndex="-1" id="1" className={`nav-link ${tabId === '1' ? 'active' : ''}`} onClick={(e) => { this.handleTabState(e) }}>Question Bank</a>
                        </li>
                    </ul>
                    {tabId == 0 && <AddQuestion />}
                    {tabId == 1 && <QuestionBank />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(`%c${JSON.stringify(state)}`, `color: blue; font-weight: normal; font-size: 15px;`);
    return { isAuth: state.auth.isAuth, user: state.auth.user }
}

export default connect(mapStateToProps)(Home);
