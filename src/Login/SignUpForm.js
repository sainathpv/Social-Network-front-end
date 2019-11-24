import React, {Component} from 'react';
import './../css/login/login.css';
import SignInForm from './SignInForm';
import Cookie from './../Utility/Cookie';
import logo from './../images/HC.svg';
import QuestionForm from './QuestionForm';
import {Helmet} from "react-helmet";

export default class SignUpForm extends Component{
    constructor(props){
        super(props);
        this.img = "";
        this.state = {
            name: "",
            email: "",
            password: "",
            signup: true,
            accountType: "student",
            userName: "",
            securityQuestions: false,
            QRimg: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.swapForm = this.swapForm.bind(this);
        this.changeType = this.changeType.bind(this);
    }

    handleChange(event){
        this.setState({
            userName: document.getElementById('signup_username').value,
            name: document.getElementById('signup_name').value,
            email: document.getElementById('signup_email').value,
            password: document.getElementById('signup_pwd1').value,
            signup: true,
            securityQuestions: false
        });
    }

    handleSubmit(event){
        event.preventDefault();
        if(document.getElementById('signup_pwd1').value ===
        document.getElementById('signup_pwd2').value){
            var options;
            console.log(this.state);
            if(this.state.accountType === "student"){
                options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        userName: this.state.userName,
                        firstName: this.state.fname,
                        lastName: this.state.lname,
                        password: this.state.password,
                        accountType: this.state.accountType
                    })
                };
            }else{
                options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        userName: this.state.userName,
                        company: this.state.company,
                        password: this.state.password,
                        accountType: this.state.accountType
                    })
                };
            }
    
    
            fetch("http://"+ process.env.REACT_APP_API_HOST +"/users/signup", options).then( result =>{
                if(result.status === 200){
                    return result.json();
                }else{
                    result.json().then(nr =>{
                        document.getElementById("signup_warning").textContent = nr.message;
                    });
                    return null;
                }
            }).then( result => {
                if(result !== null){
                    var date = new Date();
                    console.log(result.token);
                    Cookie.setCookie("HC_JWT", result.token,  new Date(date.getTime() + (60*60*1000))); 
                    this.setState({QRimg: result.data_url, signup: false, securityQuestions: true});
                }
            });
        }else{
            document.getElementById("signup_warning").textContent = "Your Re-Enter Password is not the same";
        }
    }

    swapForm(event){
        event.preventDefault();
        this.setState({signup: false});
    }

    changeType(event){
        this.setState({accountType: event.target.value});
    }

    render() {
        if(this.state.signup){
            return(
                <form id="SignUpForm" onSubmit={this.handleSubmit}>
                    <Helmet>
                        <title>Hoosier Connection - Sign Up</title>
                    </Helmet>
                    <img src={logo} alt=""/> 
                    <h2>Create an account</h2>
                    <p id="signup_warning"></p>
                    <div className="input m-auto  text-left">
                        <label>USER NAME</label>
                        <input id="signup_username" onChange={this.handleChange} spellCheck="false" className="border-lg border-round-small" type="text" required></input>
                    </div>
                    <div className="input m-auto  text-left">
                        <label>EMAIL</label>
                        <input id="signup_email" onChange={this.handleChange} spellCheck="false" className="border-lg border-round-small" type="email" required></input>
                    </div>
                    <div className="input m-auto  text-left">
                        <label>PASSWORD</label>
                        <input id="signup_pwd1" onChange={this.handleChange} spellCheck="false" className="border-lg border-round-small" type="password" required></input>
                    </div>
                    <div className="input m-auto  text-left">
                        <label>RE-ENTER PASSWORD</label>
                        <input id="signup_pwd2" onChange={this.handleChange} spellCheck="false" className="border-lg border-round-small" type="password" required></input>
                    </div>
                    <br />
                    <label>Account Type</label>
                    <div className="radio_btn"><input name="accountType" onChange={this.changeType}  type="radio" value="student" checked={this.state.accountType === "student"}/> Student </div>
                    <div className="radio_btn"><input name="accountType" onChange={this.changeType} type="radio" value="company" checked={this.state.accountType === "company"}/> Company </div> <br/>
                    <div className="input m-auto  text-left">
                        <label>{this.state.accountType === "student" ? "FULL NAME" : "COMPANY" }</label>
                        <input  id="signup_name" onChange={this.handleChange} spellCheck="false" className="border-lg border-round-small" type="text" required></input>
                    </div>
                    <div className="submitBox d-flex space-between m-auto">
                        <button className="d-inline"  type="submit">Sign Up</button>
                        <p className="d-inline" onClick={this.swapForm}>Have an account?</p>
                    </div>
                </form>
            );
        }else if(this.state.securityQuestions){
            return (
                <QuestionForm QRimg={this.state.QRimg} />
            );
        }else{
            return( <SignInForm />);
        }
    }
}
