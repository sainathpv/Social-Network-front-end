import React, {Component} from 'react';
import './../css/login.css';
import SignInForm from './SignInForm';
import QRCode from './QRcode'
export default class SignUpForm extends Component{
    constructor(props){
        super(props);
        this.img = "";
        this.state = {fname: "", lname: "", email: "", password: "", signup: true, QRCode: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.swapForm = this.swapForm.bind(this);
    }

    handleChange(event){
        this.setState({
            fname: document.getElementById('signup_fname').value,
            lname: document.getElementById('signup_lname').value,
            email: document.getElementById('signup_email').value,
            password: document.getElementById('signup_pwd').value,
            signup: true,
            QRCode: this.state.QRCode
        });
    }

    handleSubmit(event){
        event.preventDefault();
        if(document.getElementById('signup_pwd').value ===
           document.getElementById('signup_pwd2').value){
            var options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: this.state.fname,
                    lastname: this.state.lname,
                    email: this.state.email,
                    password: this.state.password
                })
            }

            fetch("http://localhost:8080/users/signup", options).then( result =>{
            console.log(result.status);
            if(result.status === 200){
                return result.json();
            }else{
                console.log('failed');
                return null;
            }
        }).then( result => {
            if(result === null){

            }else{
                this.img = result;
                this.setState({
                    fname: document.getElementById('signup_fname').value,
                    lname: document.getElementById('signup_lname').value,
                    email: document.getElementById('signup_email').value,
                    password: document.getElementById('signup_pwd').value,
                    signup: true,
                    QRCode: true
                });
            }
        });
        }else{
            //TODO notify the user of the bad match
        }
    }
    
    swapForm(){
        this.setState({fname: this.state.fname, lname: this.state.lname, email: this.state.email, password: this.state.password, signup: false});
    }

    render() {
        if(this.state.signup && !this.state.QRCode){
            return(
                <form id="SignUpForm" onSubmit={this.handleSubmit}>
                    <div className="label"><label>First Name:</label></div>
                    <input type="text" id="signup_fname" onChange={this.handleChange} placeholder="Ex. Jon" required></input><br/>
                    <div className="label"><label>Last Name:</label></div>
                    <input type="text" id="signup_lname" onChange={this.handleChange} placeholder="Ex. Smith" required></input><br/>
                    <div className="label"><label>Email:</label></div>
                    <input type="text" id="signup_email" onChange={this.handleChange} placeholder="Ex. you@gmail.com" required></input><br/>
                    <div className="label"><label>Password:</label></div>
                    <input type="password" id="signup_pwd" onChange={this.handleChange}  required></input><br/>
                    <div className="label"><label>Re-Enter Password:</label></div>
                    <input type="password" id="signup_pwd2" onChange={this.handleChange} required></input><br/>
                    <span><input type="submit" className="button" value="Signup" /> <p onClick={this.swapForm}>Login?</p></span>
                </form>
            );
        }else if(this.state.QRCode){
            console.log(this.img);
            return( <QRCode code={this.img} email={this.state.email} pwd={this.state.pwd} />);
        }else{
            return( <SignInForm />);
        }
    }
}