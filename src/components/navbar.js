import React from 'react'

export default class Navbar extends React.PureComponent {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className={`flex ${this.props.showcenter ? 'justify-center' : 'justify-start'} shadow-lg py-3 sticky top-0 w-full z-10 bg-white`}>
                <img className='w-28 ml-7' src="images/logo.svg" />
            </div>
        )
    }
}
