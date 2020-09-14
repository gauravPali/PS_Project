import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        console.log('i am footer cons');
        super(props);
    }
    componentDidMount() {
        console.log('i am mount in footer');
    }
    render() {
        console.log('render footer');
        return (

            <>
                <div>Footer Section</div>
            </>
        )
    }

}

export default Footer;