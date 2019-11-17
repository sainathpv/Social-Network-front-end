import React, {Component} from 'react';
import Recaptcha from "react-recaptcha";
import {Helmet} from "react-helmet";
import './../css/login/login.css';
import SignUpForm from './SignUpForm';
import Cookie from '../Utility/Cookie';
import TwoFactor from './TwoFactor';
import logo from './../images/HC.svg';


export default class SignInForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "", 
            password: "", 
            signin: true, 
            twofactor: false, 
            isResetted: props.isResetted};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.swapForm = this.swapForm.bind(this);
        this.callback = this.callback.bind(this);
        this.setCaptcha = this.setCaptcha.bind(this);
        this.captcha = "";
        this.warning_message = "Everything works fine";
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
                password: this.state.password,
                captcha: this.captcha
            })
        };

        fetch("http://"+ process.env.REACT_APP_API_HOST +"/users/login", options).then( result =>{
            
            if(result.status === 200){
                return result.json();
            }else{
                result.json().then(nr =>{
                    document.getElementById("warning").textContent = nr.message;
                })
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

                //redirect directly to dashboard if the user does not reset the password
                //if(!this.state.isResetted){
                //    window.location.href = "../";
                //}
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

    callback = function () {

    };
       
    // specifying verify callback function
    setCaptcha(response) {
        console.log(response)
        this.captcha = response
    };
    
    render() {
        if(this.state.twofactor){
            return (<TwoFactor email={this.state.email}></TwoFactor>);
        }else if(this.state.signin){
            return(
                <form id="SignInForm" className="formBox" onSubmit={this.handleSubmit}>  
                    <Helmet>
                        <script src='https://www.google.com/recaptcha/api.js'>aha</script>
                    </Helmet>
                    <img src={logo} alt="" />
                    <h2>Login In</h2>
                    <div className="label"><label>Email:</label><br /></div>    
                    <input type="text" id="login_email" onChange={this.handleChange} placeholder="Ex. you@gmail.com" required></input><br/>
                    <div className="label"><label>Password:</label><br /></div>
                    <input type="password" onChange={this.handleChange} id="login_password" required></input><br />
        
                    <div className="google-cap">
                        <Recaptcha
                            sitekey="6LeACsAUAAAAAPfVJZqfoO7qLeefTB5qlcjHuOQE"
                            render="explicit"
                            verifyCallback={this.setCaptcha}
                            onloadCallback={this.callback}
                        />
                    </div>

                    <p className="warning_msg" id="warning"></p>
                    <br/>
                    <span>
                        <a href="SendResetEmail">Forgot Password?</a>
                        <br />
                        <button  type="submit">Log In</button>
                        <p onClick={this.swapForm}>Sign up</p>
                        
                        
                    </span>
                </form>
            );
            
        }else{
            console.log("here2");
           return ( <SignUpForm /> ); 
        }
        
    }
}