import React from 'react';
import logo from './../images/HC.svg';
import './../css/main.css';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import EnterEmail from './EnterEmail';
import {BrowserRouter as Router, Switch, Route,Link} from "react-router-dom";


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
              
              { !this.state.login ? <SignInForm /> : <SignUpForm /> }
           
             </div>
          </div>
        </div> 
        
      );
  }
}

export default MainPage;