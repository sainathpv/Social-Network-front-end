import React from 'react';
import './../css/login/main.css';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: false };
  }

  render() {
    return (
      <div id='MainPage'>
        <div className='titleBox'>
          <h1>Hoosier Connection</h1>
          <div>
            <h3>A social network.</h3>
            <div>
              <h4>For the students, by the students!</h4>
            </div>
          </div>
        </div>
        <div>{!this.state.login ? <SignInForm /> : <SignUpForm />}</div>
      </div>
    );
  }
}

export default MainPage;
