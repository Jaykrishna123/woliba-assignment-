import React from 'react'
import { setStore } from '../utils/store'
import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { withRouter } from 'react-router';


class Legal extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            legalterms: false
        }
    }

    onGoBack = () => {
        this.props.onCloseLegalPage()
    }

    onClickLegalTerms = () => {
        this.setState({
            legalterms: !this.state.legalterms
        })
    }

    HandleSubmitForm = () => {
        let temp = this.props.data?.data.pop();
        if (this.state.legalterms && temp?.email === "") {
            alert("Please Add your email address")
        }
        else if (this.state.legalterms && temp?.email !== "") {
            setStore('userData', { email: temp?.email, fname: temp?.fname });
            this.props.history.push('/home');
        }
        else {
            alert("Please Accept Terms and Updates")
        }
    }

    render() {
        return (
            <div className='flex'>
                <div className='h-screen bg-white'>
                    <Sidebar stepper="login" legal={true} />
                </div>
                <div className='w-[88%] mx-auto lg:w-[69%] flex justify-center'>
                    <div className='bg-white h-[220px] w-[700px] py-5 mt-5'>
                        <div className='border-b flex flex-col pb-3'>
                            <span className='text-[#69C2FF] px-5 font-semibold'>Legal Updates</span>
                            <span className='px-5 text-xs text-gray-400 font-semibold'>Enter Your Location and Company Position</span>
                        </div>
                        <div className='flex items-center px-5 pt-5 border-b pb-5'>
                            <a className='w-4 h-4 mr-4 border rounded-full relative' onClick={this.onClickLegalTerms}>
                                {this.state.legalterms &&
                                    <img src='images/check.svg' className='w-4 h-4 mr-4 absolute' onClick={() => this.setState({
                                        legalterms: false
                                    })} />
                                }
                            </a>
                            <span className='text-xs text-gray-400 font-semibold relative -left-1'>I have read and agree to {this.props.intresetname} updated <span className='text-[#69C2FF]'>Privacy Policy</span> and <span className='text-[#69C2FF]'>Terms of Use</span>
                            </span>
                        </div>
                        <div className='flex justify-between px-5 border-t pt-5'>
                            <a className='bg-[#69C2FF]/10 text-[#69C2FF] py-2 px-10 text-sm rounded-sm font-semibold' onClick={this.onGoBack}>{"<"} Go Back</a>
                            <a className='bg-[#69C2FF] text-white py-2 px-10 text-sm rounded-sm font-semibold' onClick={this.HandleSubmitForm}>Submit {">"}</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        data: state,
    };
};

export default withRouter(connect(mapStateToProps)(Legal));