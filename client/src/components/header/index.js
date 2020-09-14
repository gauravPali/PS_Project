import React from 'react';

class Header extends React.Component {
    constructor(props) {
        console.log('i am header cons');
        super(props);
        this.state = { val: 1, val1: 2 };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange() {
        this.setState({
            val:2
        })
    }
    componentDidMount() {
        console.log('i am mount inheader');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('--shouldComponentUpdate HEader--');
        return true;
      }
    componentDidUpdate() {
        console.log('--componentDidUpdate HEader--');
      }
    render() {
        console.log('render header');
        return (
            <>
                <div>Header Section-</div>
                <div>Value is {this.state.val}</div>
                <div>Value is {this.state.val1}</div>
                <button onClick={this.handleChange}>Chnage Value</button>
                <BelowHeader/>
            </>
        )
    }
}

class BelowHeader extends React.Component {
    constructor(props) {
        super(props);
        console.log('i am BelowHeader cons');
    }
    
   
    componentDidMount() {
        console.log('i am mount in BelowHeader');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('--shouldComponentUpdate BelowHeader--');
        return true;
      }
    componentDidUpdate() {
        console.log('--componentDidUpdate BelowHeader--');
      }
    render() {
        console.log('render BelowHeader');
        return (
            <>
                below header
            </>
        )
    }
}



export default Header;