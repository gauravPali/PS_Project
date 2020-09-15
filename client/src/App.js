import React from 'react';
import './App.css';

import {
  BrowserRouter,
  Link,
  Switch,
  Route,
  useParams
} from 'react-router-dom';
// import Header from './components/header';
// import Footer from './components/footer';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    console.log('--constructor app--');
  }


  componentDidMount() {
    console.log('--componentDidMount app--');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('--getDerivedStateFromProps app--');
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('--shouldComponentUpdate app--');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('--getSnapshotBeforeUpdate app--');
    return null;
  }

  componentDidUpdate(prevProps) {
    console.log('--componentDidUpdate app--');
    console.log(`in app du ${prevProps}`);
  }



  // router learning
  render() {
    console.log('--render--');
    return (
      <BrowserRouter>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>

        <Route exact path="/" component={Home}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/topics" component={Topics}></Route>

      </BrowserRouter>
    )
  }

}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    console.log('--constructor home--');
  }


  componentDidMount() {
    console.log('--componentDidMount home--');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('--getDerivedStateFromProps home--');
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('--shouldComponentUpdate home--');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('--getSnapshotBeforeUpdate home--');
    return null;
  }

  componentDidUpdate(prevProps) {
    console.log('--componentDidUpdate home--');
    console.log(prevProps);
    console.log('--componentDidUpdate home end--');

  }
  render() {
    console.log('--render home--');
    console.log(this.props);
    return <div>Home Comp</div>
  }
}

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    console.log('--constructor about--');
  }


  componentDidMount() {
    console.log('--componentDidMount about--');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('--getDerivedStateFromProps about--');
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('--shouldComponentUpdate about--');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('--getSnapshotBeforeUpdate about--');
    return null;
  }

  componentDidUpdate() {
    console.log('--componentDidUpdate about--');
  }
  render() {
    console.log('--render about--');
    return <div>About Comp</div>
  }
}

class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    console.log('--constructor topic--');
  }


  componentDidMount() {
    console.log('--componentDidMount topics--');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('--getDerivedStateFromProps topics--');
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('--shouldComponentUpdate topics--');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('--getSnapshotBeforeUpdate topics--');
    return null;
  }

  componentDidUpdate(prevProps) {
    console.log('--componentDidUpdate topics--');
    console.log(prevProps);
    console.log('--componentDidUpdate topics end--');
  }
  render() {
    console.log('--topics below--');
    console.log(this.props);
    const { match } = this.props;
    return (
      <>
        <div>Topics Comp</div>
        <ul>
          <li><Link to={`${match.url}/math`}>Maths</Link></li>
          <li><Link to={`${match.url}/chem`}>Chemistry</Link></li>
          <li><Link to={`${match.url}/bio`}>Biology</Link></li>
        </ul>


        <Route path={`${match.url}/:subject`} component={Subject}></Route>
      </>
    )
  }
}


class Subject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    console.log('--constructor Subject--');
  }


  componentDidMount() {
    console.log('--componentDidMount Subject--');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('--getDerivedStateFromProps Subject--');
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('--shouldComponentUpdate Subject--');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('--getSnapshotBeforeUpdate Subject--');
    return null;
  }

  componentDidUpdate(prevState) {
    console.log('--componentDidUpdate Subject--');
    console.log(prevState);
    console.log('--componentDidUpdate Subject end--');
  }
  render() {
    console.log('--render Subject--');
    console.log(this.props);
    const { match } = this.props;
    return (
      // <div>Subject Name: {match.params.subject}</div>
      <>
        <div>Subject Name: {match.url}</div>
        <ul>
          <li><Link to={`${match.url}/1`}>chapter 1</Link></li>
          <li><Link to={`${match.url}/2`}>chapter 2</Link></li>
          <li><Link to={`${match.url}/3`}>chapter 3</Link></li>
        </ul>


        <Route path={`${match.path}/:chapter`} component={Chapter}></Route>
      </>
    )
  }
}



class Chapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    console.log('--constructor Chapter--');
  }


  componentDidMount() {
    console.log('--componentDidMount Chapter--');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('--getDerivedStateFromProps Chapter--');
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('--shouldComponentUpdate Chapter--');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('--getSnapshotBeforeUpdate Chapter--');
    return null;
  }

  componentDidUpdate() {
    console.log('--componentDidUpdate Chapter--');
  }

  render() {
    console.log('--render Chapter--')
    const { match } = this.props;
    return (
      <div> This is chapter {match.params.chapter} of {match.params.subject} subject.</div>
    )
  }

}



const HomeF = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const AboutF = () => (
  <div>
    <h2>About</h2>
  </div>
)

const TopicF = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const TopicsF = ({ match }) => {
  console.log('--in topicsF--')
  console.log({ match })
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>
            Rendering with React
        </Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>
            Components
        </Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
        </Link>
        </li>
      </ul>

      <Route path={`${match.url}/:topicId`} component={TopicF} />
      {/* <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/> */}
    </div>
  )
}


export default App

// export default App;