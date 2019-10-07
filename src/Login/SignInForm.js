import React, {Component} from 'react';
import './../css/login.css';
import SignUpForm from './SignUpForm';

export default class SignInForm extends Component{
    constructor(props){
        super(props);
        this.state = {email: "", password: "", signin: true};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.swapForm = this.swapForm.bind(this);
        
    }

    handleChange(event){

        this.setState({
            email: document.getElementById('login_email').value, 
            password: document.getElementById('login_password').value,
            signin: this.state.signin
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
        console.log(JSON.stringify({
            email: this.state.email,
            password: this.state.password
        }));
        fetch("http://localhost:8080/users/login", options).then( result =>{
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
                console.log("successful cookie");
                //add cookie
                localStorage.setItem('JWT', result.token);
                //redirect to 2factor
                window.location.href = "http://localhost:3000/2factor";
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
       if(this.state.signin){
            return(
                <form id="SignInForm" onSubmit={this.handleSubmit}>  
                    <div className="label"><label>Email:</label><br /></div>    
                    <input type="text" id="login_email" onChange={this.handleChange} placeholder="Ex. you@gmail.com" required></input><br/>
                    <div className="label"><label>Password:</label><br /></div>
                    <input type="password" onChange={this.handleChange} id="login_password" required></input><br />
                    <span><input type="submit" className="button" value="Login" /> <p onClick={this.swapForm}>Sign up?</p></span>
                </form>
            );
        }else{
           return ( <SignUpForm /> ); 
        }
    }
}