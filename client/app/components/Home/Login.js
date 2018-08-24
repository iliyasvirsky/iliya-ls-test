import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

import 'whatwg-fetch';



class Login extends Component {
  constructor(props) {
    super(props);
    
    this.login = this.login.bind(this);  
  }
  
  login(event) {
    // create the facebook login
    const that = this;
    fetch('/api/login', { 
      headers:{
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(event)
    }).then((user) => {
      document.cookie = 'userID='+event.userID;
      document.cookie = 'token='+event.accessToken;
      that.props.history.push("/");
    }).catch(err => console.error(err));
  }


  render() {

    return (
      <main className="col-md-3 container">
        <FacebookLogin
          appId="2123881567876645"
          autoLoad={true}
          fields="name,email"
          scope="public_profile"
          callback={this.login}
        />
      </main>
    );
  }
}

// <label htmlFor="picture">upload new picture</label>
export default Login;
