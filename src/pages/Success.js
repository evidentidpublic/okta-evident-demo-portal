import React from 'react';
import './success.css';
const companyLogo = require('../images/StandardOfficeSupplies.png');



class Success extends React.Component {

  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  handleChange(event) {
    return;
  }

  handleSubmit(event) {
    alert('Continue with portal/application');
  }

  render() {
    return (
      <div class="main-container">
        <div class="topbar" >       
          <img class="logo" src={companyLogo} alt='task-cheetah-logo'/>
        </div>
        <div className="main-entry-box">
          <div className="success-message">
            Thanks For Verifying Your Identity.
          </div>
          <button className='continue-button' onClick={this.handleSubmit}>
            Continue
          </button>
        </div>
      </div>
    );
  }
}

export default Success;