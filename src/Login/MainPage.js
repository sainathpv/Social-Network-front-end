import React from 'react';
import logo from './../images/HC.svg';
import './../css/main.css';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
class MainPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {login: false};
  }

  render(){
      return(
        <div id="MainPage">
          <div>
            <div className="titleBox">
              <h1>Hoosier Connection</h1>
              <h3>A social network.</h3>
              <h4>For the students, by the students!</h4>
            </div>
          </div>
          <div>
            <div className="formBox">
              <span> <img src={logo} alt=""></img> <h4>Hoosier Connection</h4> </span>
              { !this.state.login ? <SignUpForm /> : <SignInForm /> }
            </div>
          </div>
        </div> 
      );
  }
}

export default MainPage;