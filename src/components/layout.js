import React from 'react'
import Navbar from './navbar';

export default class layout extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}
