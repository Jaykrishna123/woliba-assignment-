import React from 'react'

export default class Sidebar extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='hidden lg:block bg-white w-64 p-5'>
                <div className='flex items-center relative mb-[24px]'>
                    {this.props.stepper === "login" ?
                        <img src='images/check.svg' className='w-4 h-4 mr-4' />
                        : <div className='bg-[#9C9C9C]/30 text-[#002F47] rounded-full p-2 mr-3'>
                        </div>
                    }
                    <img className='absolute top-5 left-2' src='images/seperator.svg' />
                    <span className='text-xs font-bold text-[#002F47]'>Login Credentials</span>
                </div>
                <div className='flex items-center relative mb-[24px]'>
                    {this.props.stepper === "login" && this.props.legal ?
                        <img src='images/check.svg' className='w-4 h-4 mr-4' />
                        : <div className='bg-[#9C9C9C]/30 text-[#002F47] rounded-full p-2 mr-3'>
                        </div>
                    }
                    <img className='absolute top-5 left-2' src='images/seperator.svg' />
                    <span className={`text-xs font-bold ${this.props.legal ? 'text-[#002F47]' : this.props.createuser ? "text-gray-400" :  'text-[#002f47]'}`}>Wellness Interest</span>
                </div>
                <div className='flex items-center relative mb-[24px]'>
                    <div className='bg-[#9C9C9C]/30 rounded-full p-2 mr-3'></div>
                    <span className={`text-xs font-bold ${this.props.legal ? 'text-[#002F47]' : 'text-gray-400'}`}>Legal Updates</span>
                </div>
            </div>
        )
    }
}
