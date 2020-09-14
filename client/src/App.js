import React from 'react';
import './App.css';

import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from 'react-router-dom';
// import Header from './components/header';
// import Footer from './components/footer';


// class FriendList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {}
//     console.log('--constructor1--');
//   }
//   componentDidMount() {
//     console.log('--componentDidMount1--');
//   }

//   static getDerivedStateFromProps(props, state) {
//     console.log('--getDerivedStateFromProps1--');
//     return null;
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     console.log('--shouldComponentUpdate1--');
//     return true;
//   }

//   getSnapshotBeforeUpdate(prevProps, prevState) {
//     console.log('--getSnapshotBeforeUpdate1--');
//     return null;
//   }

//   componentDidUpdate() {
//     console.log('--componentDidUpdate1--');
//   }
//   render() {
//     console.log('--render1--')
//     const { friends, onRemoveFriend, onDeactivate } = this.props;
//     return (
//       <ul>
//         {
//           friends.map((name, index) => (
//             <li key={index}>
//               <span>{name}</span>
//               <button onClick={() => onRemoveFriend(name)}>Remove</button>
//               <button onClick={() => onDeactivate(name)}>Deactivate</button>
//             </li>
//           ))
//         }
//       </ul>
//     )
//   }
// }

// class Inactive extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {}
//     console.log('--constructor inactive--');
//   }
//   componentDidMount() {
//     console.log('--componentDidMount inactive--');
//   }

//   static getDerivedStateFromProps(props, state) {
//     console.log('--getDerivedStateFromProps inactive--');
//     return null;
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     console.log('--shouldComponentUpdate inactive--');
//     return true;
//   }

//   getSnapshotBeforeUpdate(prevProps, prevState) {
//     console.log('--getSnapshotBeforeUpdate inactive--');
//     return null;
//   }

//   componentDidUpdate() {
//     console.log('--componentDidUpdate inactive--');
//   }
//   render() {
//     console.log('-- inactive--');
//     return (
//       <ul>
//         {
//           this.props.friendList.map((list, index) => (
//             <li key={index}>
//               <span>{list}</span>
//               <button onClick={() => this.props.onActivate(list)}>Activate</button>
//             </li>
//           ))
//         }
//       </ul>
//     )
//   }
// }

// class Loader extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: 'Adding'
//     }
//   }

//   componentDidMount() {
//     console.log('--loader mount--');
//     this.interval = setInterval(() => {
//       let loading = '';
//       this.setState((prevState) => {
//         if (prevState.loading === 'Adding...') {
//           loading = 'Adding'
//         } else {
//           loading = prevState.loading + '.'
//         }
//         return {
//           loading: loading
//         }
//       })
//       console.log(`loading`);
//     }, 300);
//   }

//   componentWillUnmount() {
//     window.clearInterval(this.interval);
//   }
//   render() {
//     console.log('--Loader--');
//     return (
//       <p>{this.state.loading}</p>
//     )
//   }
// }
class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     'friends': ['vivan', 'ali', 'raj'],
  //     'input': '',
  //     'inactive': [],
  //     isLoading: false
  //   };
  //   this.handleRemove = this.handleRemove.bind(this);
  //   this.updateInput = this.updateInput.bind(this);
  //   this.handleAddFriend = this.handleAddFriend.bind(this);
  //   this.handleDeactivate = this.handleDeactivate.bind(this);
  //   this.handleActivate = this.handleActivate.bind(this);
  //   console.log('--constructor app--');
  // }


  // componentWillMount() {
  //   console.log('--componentWillMount--');
  // }
  // componentDidMount() {
  //   console.log('--componentDidMount app--');
  // }

  // static getDerivedStateFromProps(props, state) {
  //   console.log('--getDerivedStateFromProps app--');
  //   return null;
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('--shouldComponentUpdate app--');
  //   return true;
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log('--getSnapshotBeforeUpdate app--');
  //   return null;
  // }

  // componentDidUpdate() {
  //   console.log('--componentDidUpdate app--');
  // }


  // handleRemove(name) {
  //   this.setState(function (state) {
  //     return {
  //       friends: this.state.friends.filter(function (friend) {
  //         return name !== friend;
  //       })
  //     }
  //   })
  // }

  // handleAddFriend() {
  //   this.setState({
  //     isLoading: true
  //   })
  //   setTimeout(() => {
  //     this.setState({
  //       friends: [...this.state.friends, this.state.input],
  //       input: '',
  //       isLoading: false
  //     })
  //   }, 5000)

  //   // this.setState((prevState) => {
  //   //   return {
  //   //     friends: [...prevState.friends, prevState.input],
  //   //     input: ''
  //   //   }
  //   // })
  // }

  // updateInput(e) {
  //   this.setState({
  //     input: e.target.value
  //   })
  // }

  // handleDeactivate(name) {
  //   this.setState((prevState) => {
  //     return {
  //       friends: prevState.friends.filter((friend) => friend !== name),
  //       inactive: [...prevState.inactive, name]
  //     }
  //   })
  // }

  // handleActivate(name) {
  //   this.setState((prevState) => {
  //     return {
  //       friends: [...prevState.friends, name],
  //       inactive: prevState.inactive.filter((friend) => friend !== name)
  //     }
  //   })
  // }

  // render() {
  //   console.log('--render app--');
  //   return (
  //     <>
  //       {/* <Header/> */}
  //       {/* <Footer/> */}
  //       <input type="text" value={this.state.input} onChange={this.updateInput} />
  //       <button onClick={this.handleAddFriend}>Add</button>
  //       {this.state.isLoading ? <Loader /> : <FriendList friends={this.state.friends} onRemoveFriend={this.handleRemove} onDeactivate={this.handleDeactivate} />}
  //       {this.state.inactive.length > 0 ? <Inactive friendList={this.state.inactive} onActivate={this.handleActivate} /> : <div>No Inactive Friend</div>}
  //     </>
  //   );
  // }

  // router learning
  render() {
    return (
      <BrowserRouter>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>

        <Route exact path="/"><Home /></Route>
        <Route path="/about"><About /></Route>
        <Route path="/topics"><Topics /></Route>

      </BrowserRouter>
    )
  }

}

function Home() {
  return <div>Home Comp</div>
}

function About() {
  return <div>About Comp</div>
}

function Topics(props) {
  return (
    <BrowserRouter>
      <div>Topics Comp</div>
      <ul>
        <li><Link to="/topics/math">Maths</Link></li>
        <li><Link to="/topics/chem">Chemistry</Link></li>
        <li><Link to="/topics/bio">Biology</Link></li>
      </ul>


      <Route path="/topics/chem"><Subject /></Route>
    </BrowserRouter>

  )
}


function Subject() {
  return <div>SUbject</div>
}

export default App;
