import React from 'react'
import { getStore } from '../utils/store'
import Navbar from './navbar'
import { withRouter } from 'react-router';

class Home extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      username: ""
    }
  }

  componentDidMount() {
    console.log(getStore())
    if (!getStore()) {
      this.props.history.push('/login')
    }
    this.setState({
      username: JSON.parse(localStorage.getItem("userData"))
    })
  }

  LogOut = () => {
    localStorage.removeItem("userData")
    this.props.history.push('/login')
  }

  render() {
    return (
      <>
        <Navbar showcenter={true} />
        <div className='flex flex-col mt-7 items-center'>
          <div className='w-[88%] mx-auto lg:w-[400px]'>
            <img className='success rounded-tl-lg rounded-tr-lg w-full  h-[180px]' src='images/success.svg' />
            <div className='flex flex-col px-8 pb-3 justify-center items-center pt-3 bg-white'>
              <span className='text-2xl text-[#FD7175] font-bold block mb-2 capitalize'>Welcome, {this.state.username?.fname}</span>
              <p className='text-xs text-center border-b pb-3'>We're glad to have you onboard. Woliba offers many educational resources, wellness challenges, fitness and recipe videos, and daily tips to help you reach your health and wellness goals. 💥 Woliba is here to help you on your Wellbeing Journey and work towards your wellness goals.
                👏🏻 Don't forget to download our iOS or Android app. Welcome to the Woliba family. 😁
              </p>
              <button className='w-[70%] mt-3 text-center mx-auto text-white py-2 text-sm rounded-sm bg-[#69C2FF]'>Let's Get Started</button>
            </div>
          </div>
          <button href='' className='w-[100px] mt-4 lg:mt-10 text-center mx-auto text-white py-2 text-sm rounded-sm bg-[#69C2FF]' onClick={this.LogOut}>Log Out</button>
        </div>
      </>
    )
  }
}
export default withRouter(Home)