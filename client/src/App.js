import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/header';
import Footer from './components/footer';
import Authorization from './components/authorization';
import Home from './components/home';
import Error from './components/error';
import { getUser } from './actions/authActions';
class App extends Component {
  componentDidMount() {
    console.log('--componentDidMount app--');
    if (window.location.pathname === '/' || window.location.pathname === '/home')
      this.props.getUser();
  }
  render() {
    console.log(`%c${this.props}`, `color: blue; font-weight: normal; font-size: 15px;`);
    return (
      <BrowserRouter>
        <Header />
        <section className="px-5 py-3 app-bg">
          <div className="row justify-content-center">
            <Switch>
              <Route exact path="/" component={Authorization}></Route>
              <Route path="/home" component={Home}></Route>
              <Route component={Error}></Route>
            </Switch>
          </div>
        </section>
        <Footer />
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  console.log('mapState  in authorization called');
  console.log(`%c${JSON.stringify(state)}`, `color: blue; font-weight: normal; font-size: 15px;`);
  return { isAuth: state.auth.isAuth }
}

export default connect(mapStateToProps, { getUser })(App);
