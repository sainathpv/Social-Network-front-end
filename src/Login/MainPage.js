import React from 'react';
import logo from './../images/HC.svg';
import './../css/login/main.css';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { Container } from 'react-bootstrap';
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: false };
  }

  render() {
    return (
      <div id='MainPage'>
        <div>
          <div className='titleBox'>
            <div>
              <h1>Hoosier Connection</h1>
              <Container>
                <h3>A social network.</h3>
                <Container>
                  <h4>For the students, by the students!</h4>
                </Container>
              </Container>
            </div>
          </div>
        </div>

        {!this.state.login ? <SignInForm /> : <SignUpForm />}
      </div>
    );
  }
}

export default MainPage;

// WEBPACK FOOTER //
// src/Login/MainPage.js
