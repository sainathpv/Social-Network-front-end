import React, { Component } from 'react';
import profileIMG from './images/college.jpg';
import './css/profile.css';
import logo from './images/HC.svg';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import { Container, Form, Row, Col } from 'react-bootstrap';

const TiTLE = 'User Profile';

//TODO: check if there is a token redirect to signin if invalid

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      major: '',
      infomation: '',
      tags: '',
      profileIMG: '',
      pageStatus: 'profile'
    };
    this.toSignIn = this.toSignIn.bind(this);
    this.toHome = this.toHome.bind(this);
    this.toChat = this.toChat.bind(this);
    this.states = {
      items: props.items,
      showMenu: false,
      label: this.props.label,
      handle: props.handle
    };
    //TODO: check if there is a token redirect to login if invalid

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkProfile();
  }
  checkProfile = () => {
    axios.get('/profile').then(res => {
      console.log(res.data);
    });
  };
  getMenu(event) {
    if (this.states.showMenu) {
      return (
        <ul>
          {this.states.items.map((item, i) => (
            <li
              onClick={() => {
                this.states.handle(item.toLowerCase());
                this.showMenu();
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    } else {
      return '';
    }
  }

  showMenu() {
    event.preventDefault();
    this.setStates({ showMenu: !this.states.showMenu });
  }

  handleChange(event) {
    this.setState({
      major: document.getElementById('profile_major').value,
      infomation: document.getElementById('profile_info').value,
      tags: document.getElementById('profile_interests').value,
      profileIMG: document.getElementById('profile_image').value,
      pageStatus: 'profile'
    });
  }
  validateJWT(token) {}

  handleSubmit(event) {
    event.preventDefault();
    if (
      //TO DO: this should be checking if there are any state changed by user
      true
    ) {
      var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          profileIMG: this.state.profileIMG,
          basicInfo: this.state.infomation,
          tags: this.state.tags,
          major: this.state.major
        })
      };

      fetch('the route in backend', options)
        .then(result => {
          if (result.status === 200) {
            return result.json();
          } else {
            console.log('failed');
            return null;
          }
        })
        .then(result => {
          /*if(result === null){

            }else{
                this.img = result.img;
                localStorage.setItem("email", document.getElementById('signup_email').value);
                localStorage.setItem("JWT", result.token);
                this.setState({
                    fname: document.getElementById('signup_fname').value,
                    lname: document.getElementById('signup_lname').value,
                    email: document.getElementById('signup_email').value,
                    password: document.getElementById('signup_pwd').value,
                    signup: true,
                    QRCode: true
                });
            }*/
        });
    } else {
      //TODO notify the user of the bad match
    }

    //TODO: post request to Sai's route with contents of key
  }

  //TO DO: Tried using the same method in SignUpForm, the page cannot change, need to be fixed
  toSignIn() {
    this.setState({
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      pageStatus: 'signin'
    });
  }

  toHome() {
    this.setState({
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      pageStatus: 'home'
    });
  }

  toChat() {
    this.setState({
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      pageStatus: 'chat'
    });
  }

  //TO DO, for some reason the button part does not work
  //TO DO, when jump to another page, the another page seems to losing all its css.
  render() {
    if (
      this.state.pageStatus === 'profile' ||
      this.state.pageStatus === 'home' ||
      this.state.pageStatus === 'chat'
    ) {
      return (
        <div id='profileSettings'>
          <Helmet>
            <title>{TiTLE}</title>
          </Helmet>
          <div class='heading'>
            <div class='logo'>
              <img src={logo} alt='' width='50px' />
            </div>
            <div class='title'>
              <h1>Hoosier Connection</h1>
            </div>
            <div class='buttonArea'>
              <input type='button' class='button button1' value='Profile' />
              <input
                type='button'
                onClick={this.toHome}
                class='button button2'
                value='Home'
              />
              <input
                type='button'
                onClick={this.toChat}
                class='button button3'
                value='Chat'
              />
              <input
                type='button'
                onClick={this.toSignIn}
                class='button button4'
                value='Logout'
              />
              <button class='button button5'>Icon</button>
            </div>
          </div>
          <hr />
          <div className='middle'></div>
          <br />
          <br />

          <Container
            style={{ width: '1200px', display: 'block', margin: 'auto' }}
          >
            <h2>Settings</h2>
            <Container>
              <h4 class='line'>Profile</h4>

              <Container>
                <h5>Bio</h5>
                <img
                  className='image'
                  src={profileIMG}
                  alt='): Something went wrong'
                ></img>
                <button class='uploadImg'>Upload</button>
                <Form.Row>
                  {' '}
                  <textarea
                    class=''
                    id='profile_info'
                    placeholder='A little section dedicated to you!'
                  ></textarea>
                </Form.Row>

                <Form.Row>
                  <Row>
                    <Form.Group as={Col}>
                      <label>First Name</label>
                      <br />
                      <input type='text'></input>
                    </Form.Group>

                    <Form.Group as={Col}>
                      <label>Last Name</label>
                      <br />

                      <input type='text'></input>
                    </Form.Group>
                  </Row>
                </Form.Row>

                <Form.Row>
                  <div className='dropdown'>
                    <button onClick={this.showMenu.bind(this)}>
                      {this.states.label}
                    </button>
                    {this.getMenu()}
                  </div>
                </Form.Row>

                <Form.Row>
                  <button className='field_button'>Update</button>
                </Form.Row>
                <br />
                <Container>
                  <div>
                    <h4 class='line'>Security:</h4>

                    <Form.Row>
                      <Row>
                        <Form.Group as={Col}>
                          <label>Reset Password</label>
                          <br />
                          <input type='password'></input>
                        </Form.Group>
                        <Form.Group as={Col}>
                          <label>Re-enter Password</label>
                          <br />
                          <input type='password'></input>
                        </Form.Group>
                      </Row>
                    </Form.Row>

                    <Form.Row>
                      <button className='field_button'>Reset</button>
                    </Form.Row>
                    <div>
                      <br />

                      <button className='warn_button'>Delete Account</button>
                    </div>
                  </div>
                </Container>
              </Container>
            </Container>
          </Container>
        </div>
      );
    } else if (this.state.pageStatus === 'signin') {
      return <Redirect to='./Login/SignInForm' />;
    }
  }
}

export default Profile;
