import React from 'react';
import logo from './logo.svg';
import './App.css';
import IU_Gates from "./IU_Gates.jpg";
import SignUpForm from './SignUpForm.js';
import SignInForm from './SignInForm.js';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';

class MainPage extends React.Component{
  render(){
      return(
        
        <body>
          <div class="bg">
          

        </div>
        <div className="row"> <div className="col-3 mt-5">
        <span className="description ml-3 mt-5 pt-5 "><h1 className='font-weight-bold text-light'>Hoosier Connection</h1>
        <h3 className='font-weight-bold text-light'> A social network.</h3>
        <h3 className='font-weight-bold text-light width-50%'>For the students, by the students!</h3>
        </span>
        </div>
        <div className="col-9">
          <Router>
        
       

       
      
      <Route exact path="/" component={SignUpForm}/>
      <Route path="/SignInForm" component={SignInForm}/>
  
<Route path="/SignUpForm" component={SignUpForm}/>
     

      </Router>  
      </div></div> 
      </body> 
      );
  }
}

export default MainPage;