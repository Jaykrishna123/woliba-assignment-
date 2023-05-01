import React from 'react'
import Interest from './interest'
import Legal from './legal';
import Sidebar from './sidebar';

const wellNessData = [
    { id: 1, name: "Individual Sports" },
    { id: 1, name: "Water Sports" },
    { id: 1, name: "Ball Sports" },
    { id: 1, name: "Wheel Sports" },
    { id: 1, name: "Winter Sports" },
    { id: 1, name: "Combat Sports" },
    { id: 1, name: "Resistance Sports" },
    { id: 1, name: "Other Sports" },

]

const interestData = [
    { id: 1, name: "Acrobatics", source: "images/acrobatics.svg" },
    { id: 2, name: "Aerial Art", source: "images/areial.svg" },
    { id: 3, name: "Aerobics", source: "images/aerobics.svg" },
    { id: 4, name: "Ballet", source: "images/ballet.svg" },
    { id: 5, name: "Callisthenics", source: "images/callisthetics.svg" },
    { id: 6, name: "Dance", source: "images/dance.svg" },
    { id: 7, name: "Elliptical", source: "images/ellipthitical.svg" },
    { id: 8, name: "Gymnatics", source: "images/gymnatics.svg" },
    { id: 9, name: "Hurdles", source: "images/hurddles.svg" },
    { id: 10, name: "Hiking", source: "images/hiking.svg" },
    { id: 11, name: "Parkour", source: "images/parkour.svg" },
    { id: 12, name: "Plates", source: "images/plates.svg" },
    { id: 13, name: "Rock Climbling", source: "images/rockclimbing.svg" },
    { id: 14, name: "Running", source: "images/running.svg" },
    { id: 15, name: "TrailRunning", source: "images/trailrunning.svg" },

]

export default class Wellness extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: wellNessData,
            interestmodal: "",
            legalpage: false,
            interestcheck: ""
        }
        this.onShowInterest = this.onShowInterest.bind(this)
    }

    onShowInterest(name) {
        if (name === "Individual Sports" && !this.state.interestmodal)
            this.setState({
                interestmodal: name
            })
        if (name === "Individual Sports" && this.state.interestmodal)
            this.setState({
                interestmodal: ""
            })
    }

    onClickGoBack = () => {
        this.props.onCloseForm()
    }

    onClickNext = () => {
        if (this.state.interestcheck) {
            this.setState({
                legalpage: true
            })
        }
        else {
            alert("Please Select Interest")
        }

    }

    onCloseLegalPage = () => {
        this.setState({
            legalpage: false
        })
    }

    onClickIntrestCheck = (name) => {
        this.setState({
            interestcheck: name,
        })
    }

    render() {
        return (
            <>
                {this.state.legalpage ?
                    <Legal userdata={this.props.userdata} intresetname={this.state.interestcheck} onCloseLegalPage={this.onCloseLegalPage} />
                    :
                    <div className='flex'>
                        <Sidebar stepper="login" />
                        <div className='w-full md:w-[88%] mx-auto lg:[w-69%] py-5 flex justify-center'>
                            <div className='bg-white w-[700px] py-5 lg:w-[800px] 2xl:w-[1200px]'>
                                <div className='border-b flex flex-col pb-3'>
                                    <span className='text-[#69C2FF] px-5 font-semibold'>Wellness Interest</span>
                                    <span className='px-5 text-xs font-semibold text-gray-400'>At least One Selection is Required. Select All That Apply.</span>
                                </div>
                                <div className='pb-5 mt-3 px-5'>
                                    {this.state.data.map((el, index) =>
                                        <React.Fragment key={index}>
                                            <a onClick={() => this.onShowInterest(el.name)} className='flex justify-between bg-[#e8e8e866] px-4 py-3 rounded-md mb-3'>
                                                <span className='text-sm text-[#002F47] font-semibold'>{el.name}</span>
                                                <img src='images/arrow.svg' className={this.state.interestmodal === el.name ? "active w-4 h-4" : "w-4 h-4"} />
                                            </a>
                                            {this.state.interestmodal === el.name && <Interest
                                                interestmodal={!this.state.interestmodal}
                                                interestcheck={this.state.interestcheck}
                                                onClickIntrestCheck={this.onClickIntrestCheck}
                                                data={interestData} />}
                                        </React.Fragment>
                                    )}
                                </div>
                                <div className='flex justify-between px-5 border-t pt-5'>
                                    <a className='bg-[#69C2FF]/10 text-[#69C2FF] py-2 px-12 text-sm rounded-sm font-semibold' onClick={this.onClickGoBack}>{"<"} Go Back</a>
                                    <a className='bg-[#9C9C9C] text-white py-2 px-12 text-sm rounded-sm font-semibold' onClick={this.onClickNext}>Next {">"}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>


        )
    }
}
