import React from 'react'
import Footer from './footer'
import { getStore, isValidEmail, setStore } from '../utils/store';
import { withRouter } from 'react-router';


class Login extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            submitted: false,
            loginStatus: '',
            isPasswordShown: false,
            errors: {
                email: 'Enter Email Address',
                password: 'Enter Password'
            },

        }
    }

    componentDidMount() {
        if (getStore()) {
            this.props.history.replace('/home');
        }
    }

    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.validationErrorMessage(e);
    }

    validationErrorMessage = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'email':
                errors.email = isValidEmail(value) ? '' : 'Enter valid Email Address!';
                break;
            case 'password':
                errors.password = value.length < 1 ? 'Enter Password' : '';
                break;
            default:
                break;
        }
        this.setState({ errors });
    }

    validateForm = (errors) => {
        let valid = true;
        console.log(errors)
        Object.entries(errors).forEach(item => {
            console.log(item)
            item && item[1].length > 0 && (valid = false)
        })
        console.log(valid)
        return valid;
    }

    loginForm = async (event) => {
        this.setState({ submitted: true });
        event.preventDefault();
        console.log(this.state)
        if (this.validateForm(this.state.errors)) {
            console.info('Valid Form')
            const user = getStore()
            if (this.state.email === "woliba@gmail.com" && this.state.password === "123456") {
                setStore('userData', { email: this.state.email, fname: "Woliba" })
                this.props.history.push('/home')
            } else {
                this.setState({ loginStatus: 'Login Failed! Invalid Email and Password' })
            }
        } else {
            console.log('Invalid Form')
        }
    }

    togglePasswordVisiblity = () => {
        this.setState((prevState) => ({
            isPasswordShown: !prevState.isPasswordShown,
        }));
    };


    render() {
        const { isPasswordShown } = this.state;
        const iconClass = isPasswordShown ? <img className='w-6 h-6' src='images/eye.svg' /> : <div><img className='w-6 h-6' src="images/eye.svg" /><div className='shown'></div></div>;
        const inputType = isPasswordShown ? "text" : "password";

        return (
            <div className="flex">
                <div className="hidden lg:block lg:w-[40%] bg-color h-screen">
                    <span className='text-center text-white text-4xl block font-bold w-[50%] mx-auto mt-10 mb-16 uppercase'>It's Work Life Balance</span>
                    <div className='bg-image'>
                        <img src="images/background.svg" alt='bg-image' />
                    </div>
                </div>
                <div className="w-full lg:w-[60%] bg-white flex flex-col lg:pt-10 justify-center items-center h-screen">
                    <div className='flex flex-col w-[324px] items-start'>
                        <img className='w-36 mb-9' src='images/logo.svg' />
                        <span className='text-xl text-[#002F47] font-bold '>Login To Your Account</span>
                        <span className='text-[#9C9C9C] text-xs font-medium'>New to Woliba? <a href="/register" className='text-[#69C2FF] text-sm'>Create An Account</a></span>
                    </div>
                    <div className='mt-10 w-[324px]'>
                        <div className='flex flex-col mb-4'>
                            <label className='text-[#002F47] text-sm mb-3'>Your Email</label>
                            <input placeholder='Enter Email address' className='text-sm' value={this.state.email} onChange={this.inputChange} type='email' name='email' />
                            {this.state.submitted && this.state.errors.email.length > 0 && <span className='text-sm text-red-600 block mt-1'>{this.state.errors.email}</span>}

                        </div>
                        <div className='flex flex-col mb-6 relative'>
                            <label className='text-[#002F47] text-sm mb-3'>Password</label>
                            <input placeholder='Enter Password' className='text-sm' type={inputType} value={this.state.password} onChange={this.inputChange} name='password' />
                            <a className='absolute top-10 right-3'
                                onClick={this.togglePasswordVisiblity}
                            >
                                <div className='eye-cl'></div>
                                {iconClass}
                            </a>
                            {this.state.submitted && this.state.errors.password.length > 0 && <span className='text-sm text-red-600 block mt-1'>{this.state.errors.password}</span>}
                        </div>
                        <a className='bg-[#FD7175] py-[8px] text-white rounded-sm block text-center' onClick={this.loginForm}>Login</a>
                    </div>
                    <div className="col-sm-12 center mt-1">
                        {this.state.submitted && this.state.loginStatus.length > 0 && <span className='text-sm text-red-600 block mt-1'>{this.state.loginStatus}</span>}
                    </div>
                    <Footer />
                </div>
            </div>)
    }
}
export default withRouter(Login)