import React, {Component} from 'react';
import logo from './../images/HC.svg';
import './../css/EnterEmail.css';
import './../css/login.css';
import {BrowserRouter as Router, Switch, Route,Link} from "react-router-dom";
import './../css/main.css';
import SignInForm from './SignInForm';
import ResetPassword from './ResetPassword';

export default class EnterEmail extends Component{
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
                <div id="EnterEmail">
                <form id="EnterEmail" onSubmit={this.handleSubmit}>  
                <div className="formBox">
                    <span> <img src={logo} alt=""></img> <h4>Hoosier Connection</h4> </span><br/><br/>
                    
                    <div className="label"><label>Enter your Email id:</label><br /></div>    
                    <input type="text" id="login_email" onChange={this.handleChange} placeholder="Ex. you@gmail.com" required></input><br/>
                    <span><input type="submit" className="button" value="Reset Password"/></span>
                </div>
                </form>
                </div>
            );
        
        }
    }



