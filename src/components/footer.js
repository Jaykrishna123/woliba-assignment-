import React from 'react'

export default class Footer extends React.PureComponent {
    render() {
        return (
            <div className='hidden lg:flex absolute bottom-0 px-3 py-2 w-full lg:w-[60%] text-xs font-semibold justify-between items-center bg-[#9C9C9C]/30'>
                <ul className='flex text-[#9C9C9C] gap-x-4'>
                   <li>Terms Of Use</li>
                   <li>Plans</li>
                   <li>Contact Us</li>
                </ul>
                <div className='flex'>
                    <span className='text-[#9C9C9C] mr-2'>© 2023</span>
                    <span className='text-[#002F47]'>Training Amigo LLC. All Rights Reserved</span>
                </div>
            </div>
        )
    }
}
