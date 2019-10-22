import React, {Component} from 'react';
import './../css/login/login.css';
import SignUpForm from './SignUpForm';
import Cookie from '../Utility/Cookie';
import TwoFactor from './TwoFactor';
export default class SignInForm extends Component{
    constructor(props){
        super(props);
        this.state = {email: "", password: "", signin: true, twofactor: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.swapForm = this.swapForm.bind(this);
        
    }

    handleChange(event){

        this.setState({
            email: document.getElementById('login_email').value, 
            password: document.getElementById('login_password').value,
        });
    }

    handleSubmit(event){
        event.preventDefault();
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        };

        fetch("http://localhost:8080/users/login", options).then( result =>{
            if(result.status === 200){
                return result.json();
            }else{
                console.log('failed');
                return null;
            }
        }).then( result => {
            if(result === null){

            }else{
                //add cookie
                var date = new Date();
                date = new Date(date.getTime() + (60*60*1000));
                Cookie.setCookie('HC_JWT', result.token, date); 
                //redirect to 2factor
                this.setState({twofactor: true});
            }
        });
    }

    swapForm(){
        this.setState({
            email: this.state.email,
            password: this.state.password,
            signin: false
        });
    }

    render() {
        if(this.state.twofactor){
            console.log("here");
            return (<TwoFactor email={this.state.email}></TwoFactor>);
        }else if(this.state.signin){
            return(
                <form id="SignInForm" onSubmit={this.handleSubmit}>  
                    <h2>Login In</h2>
                    <div className="label"><label>Email:</label><br /></div>    
                    <input type="text" id="login_email" onChange={this.handleChange} placeholder="Ex. you@gmail.com" required></input><br/>
                    <div className="label"><label>Password:</label><br /></div>
                    <input type="password" onChange={this.handleChange} id="login_password" required></input><br />
                    <a href="SendResetEmail">Forgot Password?</a>
                    <span><input type="submit" className="button" value="Login" /> <p onClick={this.swapForm}>Sign up?</p></span>
                </form>
            );
        }else{
            console.log("here2");
           return ( <SignUpForm /> ); 
        }
    }
}