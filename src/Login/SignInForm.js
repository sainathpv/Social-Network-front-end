import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import { Helmet } from 'react-helmet';
import './../css/login/login.css';
import SignUpForm from './SignUpForm';
import Cookie from '../Utility/Cookie';
import TwoFactor from './TwoFactor';
import logo from './../images/HC.svg';
import GoogleLogin from 'react-google-login';

export default class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signin: true,
      twofactor: false,
      captcha: false,
      forgotpassword: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.swapForm = this.swapForm.bind(this);
    this.callback = this.callback.bind(this);
    this.setCaptcha = this.setCaptcha.bind(this);
    this.forgotPasswordForm = this.forgotPasswordForm.bind(this);
    this.captcha = '';
    this.warning_message = '';
  }

  handleChange(event) {
    this.setState({
      email: document.getElementById('login_email').value,
      password: document.getElementById('login_password').value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        captcha: this.captcha
      })
    };

    fetch('http://' + process.env.REACT_APP_API_HOST + '/users/login', options)
      .then(result => {
        if (result.status === 200) {
          return result.json();
        } else {
          result.json().then(nr => {
            document.getElementById('warning').textContent = nr.message;
          });
          if (result.status === 412) {
            this.setState({ captcha: true });
          }
          return null;
        }
      })
      .then(result => {
        if (result === null) {
        } else {
          //add cookie
          var date = new Date();
          date = new Date(date.getTime() + 60 * 60 * 1000);
          Cookie.setCookie('HC_JWT', result.token, date);
          //redirect to 2factor
          this.setState({ twofactor: true });
        }
      });
  }

  swapForm() {
    this.setState({
      email: this.state.email,
      password: this.state.password,
      signin: false
    });
  }

  callback = function() {};

  // specifying verify callback function
  setCaptcha(response) {
    console.log(response);
    this.captcha = response;
  }

  forgotPasswordForm() {
    this.setState({ forgotpassword: true, signin: false });
  }
  responseGoogle = response => {
    console.log(response);
    if (response) {
      sessionStorage.setItem('jwt', response['accessToken']);
      sessionStorage.setItem('name', response['w3']['ig']);
      console.log(response);
      this.tryToGoogleLogin(response);
      //this.setState({firstName: response.name, newEmail:response.email, fbAccessToken: response.accessToken},
      //()=>{      this.tryToLogin(response);
      //});
    }
  };
  render() {
    if (this.state.twofactor) {
      return <TwoFactor email={this.state.email}></TwoFactor>;
    } else if (this.state.signin) {
      return (
        <form id='SignInForm' onSubmit={this.handleSubmit}>
          <Helmet>
            <title>Hoosier Connection - Login</title>
          </Helmet>
          <img src={logo} alt='' />
          <h2 className='text-center'>Log In</h2>
          <div className='text-center'>
            <p id='warning'></p>
          </div>
          <div className='input m-auto  text-left'>
            <label>EMAIL</label>
            <input
              id='login_email'
              onChange={this.handleChange}
              spellCheck='false'
              className='border-lg border-round-small'
              type='text'
              required
            ></input>
          </div>
          <div className='input m-auto  text-left'>
            <label>PASSWORD</label>
            <input
              id='login_password'
              onChange={this.handleChange}
              spellCheck='false'
              className='border-lg border-round-small'
              type='password'
              required
            ></input>
          </div>
          {this.state.captcha ? (
            <div className='google-cap text-center'>
              <Recaptcha
                className='d-inline m-auto'
                sitekey='6LeACsAUAAAAAPfVJZqfoO7qLeefTB5qlcjHuOQE'
                render='explicit'
                verifyCallback={this.setCaptcha}
                onloadCallback={this.callback}
              />
            </div>
          ) : (
            <br />
          )}
          <div className='text-center'>
            <a href='SendReset'>Forgot Password?</a>
          </div>
          <div className='submitBox m-auto d-flex space-between'>
            <button type='submit'>Log In</button>
            <p onClick={this.swapForm}>
              <br />
              Need an account?
            </p>
          </div>
          <div
            style={{
              marginTop: 16,
              alignCenter: 'center'
            }}
            className='text-center '
          >
            <GoogleLogin
              clientId='722327594409-hh0pobkmlnqqpnrm9m8nrni7fsfhrcqm.apps.googleusercontent.com'
              buttonText='Login with Google'
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </form>
      );
    } else {
      return <SignUpForm />;
    }
  }
}
