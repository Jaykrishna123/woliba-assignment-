import React from 'react'
import Sidebar from './sidebar'
import Navbar from './navbar';
import Wellness from './wellness';
import { setData } from './reduxx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getStore, isValidEmail } from '../utils/store';

class Register extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      imageFile: '',
      imageBase64: 'images/usericon.svg',
      user: {
        fname: "",
        lname: "",
        email: "",
        confirmemail: "",
        password: "",
        confirmpass: "",
        dob: "",
        phoneno: "",
      },
      gonext: false,
      errors: {
        user: {
          fname: 'Enter First Name',
          lname: 'Enter Last Name',
          email: 'Enter Email Address!',
          confirmemail: 'Enter Confirm Email Address',
          password: "Enter a password",
          confirmpass: "Enter a confirm password",
          dob: 'Enter Date of Birth',
          phoneno: 'Enter Phone Number',
        }
      },
      submitted: false
    }
  }

  componentDidMount() {
    if (getStore()) {
      this.props.history.replace('/home');
    }
  }

  handleImageChange = (event) => {
    const file = event.target.files[0]
    // Convert the file to a base64 encoded string
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.setState({
        imageFile: file,
        imageBase64: reader.result
      })
    }
  }

  displayImage = () => {
    this.setState({
      imageBase64: this.state.imageBase64
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    }, () => this.validationErrorMessage(e))
  };

  handleSubmit = (e) => {
    this.setState({ submitted: true });
    e.preventDefault();
    if (this.validateForm(this.state.errors)) {
      console.info('Valid Form')
      this.props.dispatch(setData({
        fname: this.state.user.fname,
        lname: this.state.user.lname,
        email: this.state.user.email,
        password: this.state.user.password,
        confirmpass: this.state.user.confirmpass,
        dob: this.state.user.dob,
        phoneno: this.state.user.phoneno,
      }));
      this.setState({
        gonext: true
      })
    }
    else {
      console.log('Invalid Form')
    }
  };

  onCloseForm = () => {
    this.setState({
      gonext: false
    })
  }

  validationErrorMessage = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'fname':
        errors.user.fname = value.length < 1 ? 'Enter First Name' : '';
        break;
      case 'lname':
        errors.user.lname = value.length < 1 ? 'Enter Last Name' : '';
        break;
      case 'email':
        errors.user.email = isValidEmail(value) ? '' : 'Email is not valid!';
        break;
      case 'confirmemail':
        errors.user.confirmemail = isValidEmail(value) && (this.state.user.email === value) ? '' : 'Confirm Email is not valid!';
        console.log(this.state.user.email, this.state.user.confirmemail, 'confrim')
        break;
      case 'password':
        errors.user.password = value.length < 1 ? 'Enter Password' : '';
        break;
      case 'confirmpass':
        errors.user.confirmpass = value.length > 1 && (this.state.user.password === value) ? '' : 'Confirm Password is Not Valid';
        break;
      case 'dob':
        errors.user.dob = value.length < 1 ? 'Enter DOB' : '';
      case 'phoneno':
        console.log(value.length)
        errors.user.phoneno = value.length === 10 ? '' : 'Enter valid Phone number';
        break;
      default:
        break;
    }
    this.setState({ errors });
  }


  validateForm = (errors) => {
    let valid = true;
    Object.entries(errors.user).forEach(item => {
      console.log(item)
      item && item[1].length > 0 && (valid = false)
    })
    return valid;
  }

  resetErrorMsg = () => {
    let errors = this.state.errors;
    errors.user.fname = ''
    errors.user.lname = ''
    errors.user.email = ''
    errors.user.confirmemail = ''
    errors.user.password = ''
    errors.user.confirmpass = ''
    errors.user.phoneno = ''
    this.setState({ errors });
  }


  render() {
    return (
      <>
        <Navbar />
        {this.state.gonext ? <Wellness userdata={this.props.data} onCloseForm={this.onCloseForm} />
          :
          <div className='flex'>
            <Sidebar createuser={true} />
            <div className='w-full md:w-[88%] mx-auto lg:w-[69%] flex justify-center py-5'>
              <div className='bg-white w-full md:py-5 relative lg:w-[800px] 2xl:w-[1200px]'>
                <div className='border-b flex flex-col pb-3'>
                  <span className='text-[#69C2FF] px-5 font-semibold mb-2'>Let's get started by getting to know you</span>
                  <span className='px-5 text-xs text-gray-400'>Your personal information such as first name,
                    last name email, phone, and picture will be
                    visible to your clients as a means to contact you.</span>
                </div>
                <div className='flex ml-5 pt-3 items-center'>
                  <div className='mr-2 md:mr-6 lg:mr-14'>
                    <span className='text-xs font-semibold text-[#002F47]'>Select User Type <sup className='text-red-600 text-base relative top-[-1px] left-1'>*</sup></span>
                  </div>
                  <div className='flex items-center mr-2 lg:mr-4'>
                    <input type='radio' className='rounded-full w-8 h-4 relative top-[1px]' defaultChecked />
                    <label className='text-xs font-semibold text-[#002F47]'>Employee</label>
                  </div>
                  <div className='flex items-center mr-2 lg:mr-4'>
                    <input type='radio' className='rounded-full w-8 h-4 relative top-[1px]' disabled />
                    <label className='text-xs font-semibold text-[#002F47]'>Spouse</label>
                  </div>
                  <div className='flex items-center mr-2 lg:mr-4'>
                    <input type='radio' className='rounded-full w-8 h-4 relative top-[1px]' disabled />
                    <label className='text-xs font-semibold text-[#002F47]'>Depandent</label>
                  </div>
                </div>
                <div className='flex items-center mt-5 px-5'>
                  <div className='bg-[#9C9C9C]/20 mr-5 w-20 h-20 md:w-24 md:h-24 border border-black border-dashed flex justify-center items-center'>
                    <img src={this.state.imageBase64} className='w-14 h-14 lg:w-20 lg:h-20' />
                  </div>
                  <div className='file-input flex items-center'>
                    <label htmlFor="myFileInput" className='custom-file-input-label'>Upload Photo</label>
                    <input type='file' id="myFileInput" accept='image/*' onChange={this.handleImageChange}
                      onClick={this.displayImage} className='bg-[#69C2FF] py-2 px-4 text-sm  text-white custom-file-input' />
                    <img src='images/info.svg' className='ml-6 w-5 h-5' alt='info' />
                  </div>
                </div>
                <div className='px-5 mt-5 grid grid-cols-2 items-start gap-3 border-b pb-5'>
                  <div className='flex flex-col'>
                    <label className='text-[#002F47] text-sm mb-2'>First Name<sup className='text-red-600 text-base relative top-[-1px] left-1'>*</sup></label>
                    <input placeholder='Enter firstname' className='text-sm' value={this.state.user.fname} onChange={(e) => this.handleChange(e)} name='fname' type='text' />
                    {this.state.submitted && this.state.errors.user.fname.length > 0 && <span className='text-sm text-red-600 block mt-1'>{this.state.errors.user.fname}</span>}
                  </div>
                  <div className='flex flex-col'>
                    <label className='text-[#002F47] text-sm mb-2'>Last Name<sup className='text-red-600 text-base relative top-[-1px] left-1'>*</sup></label>
                    <input placeholder='Enter lastname' className='text-sm' value={this.state.user.lname} onChange={(e) => this.handleChange(e)} name='lname' type='text' />
                    {this.state.submitted && this.state.errors.user.lname.length > 0 && <span className='text-sm text-red-600 block mt-1'>{this.state.errors.user.lname}</span>}

                  </div>
                  <div className='flex flex-col'>
                    <label className='text-[#002F47] text-sm mb-2'>Email<sup className='text-red-600 text-base relative top-[-1px] left-1'>*</sup></label>
                    <input placeholder='Enter Email' className='text-sm' onChange={(e) => this.handleChange(e)} value={this.state.user.email} name='email' type='email' />
                    {this.state.submitted && this.state.errors.user.email.length > 0 && <span className='text-sm text-red-600 block mt-1'>{this.state.errors.user.email}</span>}
                  </div>
                  <div className='flex flex-col'>
                    <label className='text-[#002F47] text-sm mb-2'>Confirm Email<sup className='text-red-600 text-base relative top-[-1px] left-1'>*</sup></label>
                    <input placeholder='Enter Confirm Email Address' className='text-sm' onChange={(e) => this.handleChange(e)} value={this.state.user.confirmemail} name='confirmemail' type='text' />
                    {this.state.submitted && this.state.errors.user.confirmemail.length > 0 && <span className='text-sm text-red-600 block mt-1'>{this.state.errors.user.confirmemail}</span>}
                  </div>
                  <div className='flex flex-col'>
                    <label className='text-[#002F47] text-sm mb-2'>Password<sup className='text-red-600 text-base relative top-[-1px] left-1'>*</sup></label>
                    <input placeholder='Enter Password' className='text-sm' onChange={(e) => this.handleChange(e)} name='password' value={this.state.user.password} type='password' />
                    {this.state.submitted && this.state.errors.user.password.length > 0 && <span className='text-sm text-red-600 block mt-1'>{this.state.errors.user.password}</span>}
                  </div>
                  <div className='flex flex-col'>
                    <label className='text-[#002F47] text-sm mb-2'>Confirm Password<sup className='text-red-600 text-base relative top-[-1px] left-1'>*</sup></label>
                    <input placeholder='Enter Confirm Password' className='text-sm' onChange={(e) => this.handleChange(e)} value={this.state.user.confirmpass} name='confirmpass' type='password' />
                    {this.state.submitted && this.state.errors.user.confirmpass.length > 0 && <span className='text-sm text-red-600 block mt-1'>{this.state.errors.user.confirmpass}</span>}
                  </div>
                  <div className='flex flex-col relative'>
                    <label className='text-[#002F47] text-sm mb-2'>Birthday</label>
                    <input className='date-input text-sm' id="myDateInput" name='dob' onChange={(e) => this.handleChange(e)} type='date' value={this.state.user.dob} placeholder='Select DOB' />
                    <img className='absolute right-4 top-10 w-5' src='images/calendar.svg' />
                    {this.state.submitted && this.state.errors.user.dob.length > 0 && <span className='text-sm text-red-600 block mt-1'>{this.state.errors.user.dob}</span>}
                  </div>
                  <div className='flex flex-col'>
                    <label className='text-[#002F47] text-sm mb-3'>Phone no.</label>
                    <input placeholder='Enter Phone Number' className='text-sm' onChange={(e) => this.handleChange(e)} value={this.state.user.phoneno} name='phoneno' type='number' />
                    {this.state.submitted && this.state.errors.user.phoneno.length > 0 && <span className='text-sm text-red-600 block mt-1'>{this.state.errors.user.phoneno}</span>}
                  </div>
                </div>
                <a className='bg-[#69C2FF] text-white py-2 px-12 text-sm rounded-sm  mt-5 flex justify-end items-end w-[150px] float-right mr-6' onClick={this.handleSubmit}>Next {">"}</a>
              </div>
            </div>
          </div>
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

export default withRouter(connect(mapStateToProps)(Register)); 