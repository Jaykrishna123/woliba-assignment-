import React from 'react'

export default class Interest extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    onClickInterestShow = (title) => {
        this.props.onClickIntrestCheck(title)
    }

    render() {
        return (
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 border-[#D8DFE9] border rounded-md p-3 mb-3'>
                {this.props.data.map((el, index) =>
                    <a key={index} className='flex justify-between items-center border border-[#D8DFE9] rounded-md p-2'
                        onClick={() => this.props.onClickIntrestCheck(el.name)}
                    >
                        <div className='flex items-center'>
                            <div className='bg-gr p-2 rounded-sm mr-3'>
                                <img className='w-7 h-7' src={el.source} />
                            </div>
                            <span className='text-xs text-[#002F47] font-semibold'>{el.name}</span>
                        </div>
                        {this.props.interestcheck === el.name ?
                            <img src='images/check.svg' className='w-4 h-4' /> :
                            <div className='border border-[#D8DFE9] cursor-pointer border-gray w-4 h-4 rounded-full'>
                            </div>}
                    </a>
                )}
            </div>
        )
    }
}
