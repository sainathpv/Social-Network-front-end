import React, {Component} from 'react';
import logo from './../images/HC.svg';
import './../css/ResetPassword.css';
import './../css/login.css';
import {BrowserRouter as Router, Switch, Route,Link} from "react-router-dom";
import './../css/main.css';
import SignInForm from './SignInForm';

export default class ResetPassword extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        window.location.href = "ResetPassword";
    }
    render() {
        
        
            return(
                <div id="ResetPassword">
             <form id="ResetPassword" onSubmit={this.handleSubmit}>  
                <div className="formBox">
                <span> <img src={logo} alt=""></img> <h4>Hoosier Connection</h4> </span><br/><br/>
                
                    <div className="label"><label>New Password:</label><br /></div>    
                    <input type="password" onChange={this.handleChange} id="login_password" required></input><br />
                    <div className="label"><label>Verify Password:</label><br /></div>    
                    <input type="password" onChange={this.handleChange} id="login_password" required></input><br />
                    
                   <Link to="/login"><span><input type="submit" className="button" value="Ok" /> </span>
                    </Link>
               
                </div>
                </form>
                </div>
            );
        
        }
    }



