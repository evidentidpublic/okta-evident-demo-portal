import axios from 'axios'
import React from 'react';
import './signup.css';
import Field from './Field'
import StepProgressBar from './ProgressBar'
import "react-step-progress-bar/styles.css";
import * as Config from './Config'

const companyLogo = require('../images/StandardOfficeSupplies.png');

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        firstname: '',
        lastname: '',
        submitted: false, 
        buttonText: 'Submit',
        totalSteps: 3,
        progress: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  async updateProgress(buttonText) {
    const increaseAmount = 100 / this.state.totalSteps;
    this.setState({progress: this.state.progress + increaseAmount, 
                   buttonText: buttonText})
 }

  handleChange = (id, value) => {
    if (id === 'email-input') {
      this.setState({email: value});
    }
    if (id === 'firstname-input') {
      this.setState({firstname: value});
    }
    if (id === 'lastname-input') {
      this.setState({lastname: value});
    }
  }

async createOktaRequest() {
    return axios({
      method: 'POST',
      url: Config.oktaUrl + '/api/v1/users?activate=false',
      data: {
        "profile": {
          "firstName": this.state.firstname,
          "lastName": this.state.lastname,
          "email": this.state.email,
          "login": this.state.email,
          "evidentid_verification": "requested"
        }
      },
      headers: {
        'Authorization': 'SSWS ' + Config.oktaApiToken, 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(response => {
      let oktaUserId = response.data.id
      return oktaUserId
    })
   }

async createEvidentRequest(oktaUserId) {
  return axios({
    method: 'POST',
    url: 'https://verify.api.demo.evidentid.com/api/v1/verify/requests',
    data: {
      "email": this.state.email,
      "notes": '{"okta_context": {"user_id": "'+ oktaUserId + '"}}',
      "templateId" : Config.evidentTemplateId
    },
    auth: {
      username: Config.evidentVerifyApiUsername,
      password: Config.evidentVerifyApiPassword,
    },
    responseType: 'application/json'
  })
  .then(response => {
    let authToken = response.data.userIdentityToken
    let redirect_url = 'https://idoweb.api.demo.evidentid.com/api/v1/auth?auth_token=' + authToken;
    return redirect_url
  })
 }
  
 async handleSubmit(event) {
  const initialSleep = async (milliseconds=10) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
  
  // Generic email validation to create user in Okta
  if (!this.state.email || !this.state.email.includes('@')) {
    alert('Please provide a valid email address. \'@\' sign is required');
    return;
  }
  // We need first name and unique last name for okta piece.
  // Okta users must be unique by name. If user with same name exists, endpiont 400's
  if (!this.state.firstname) {
    alert('Please provide a first name');
    return;
  }
  if (!this.state.lastname) {
    alert('Please provide a last name (Must be unique to okta tenant)');
    return;
  }

  // Create okta request, then use oktaID to request Evident request, then reidrect user to Evident
  this.setState({submitted: true})
  await initialSleep() // needed to help load the progress bar properly
  await this.updateProgress('Creating Okta User')
  const oktaUserId = await this.createOktaRequest()
  await this.updateProgress('Creating Evident Request')
  const evidentUrl =  await this.createEvidentRequest(oktaUserId)
  await this.updateProgress('Redirecting User')
  window.location.replace(evidentUrl)
}


  render() {
    const loadingImg = this.state.submitted ? <StepProgressBar percentComplete={this.state.progress} /> : null;
    return (
      <div className="main-container">
        <div className="topbar" >       
          <img className="logo" src={companyLogo} alt='company-logo'/>
        </div>
        <div className="main-entry-box">
          <div className="create-account">
            Create a new account
          </div>
          <Field label='Email Address' id='email-input' type="text" onChange={this.handleChange}/>
          <Field label='First Name' id='firstname-input' type="text" onChange={this.handleChange}/>
          <Field label='Last Name' id='lastname-input' type="text"  onChange={this.handleChange}/>
          <button className={this.state.submitted ? "clicked-button" : "submit-button"} disabled={this.state.submitted} onClick={this.handleSubmit}>
            {this.state.buttonText}
          </button>
          <div className='loading-image'>
              {loadingImg}
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;