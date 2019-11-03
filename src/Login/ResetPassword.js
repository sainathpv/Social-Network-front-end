import React, {Component} from 'react';
import logo from './../images/HC.svg';
import './../css/login/ResetPassword.css';


export default class ResetPassword extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        var url = window.location.href.split("/");
        var token = url[url.length-1];
        console.log(token);
        if(document.getElementById("reset_password1").value !== document.getElementById("reset_password2").value){ return; }
        console.log("pwd are same");
        var data = {
            password: document.getElementById("reset_password1").value
        }
        
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        };

        fetch("http://localhost:8080/forget_psw/reset", options).then( result =>{
            if(result.status === 200){
                return result.json();
            }else{
                return null;
            }
        }).then( result => {
            if(result === null){
                console.log("pwd are same");
            }else{
                window.location.href = "../login";
            }
        });
    }

    render() {
        return(
            <div id="resetPassword">
                <form onSubmit={this.handleSubmit}>  
                    <img src={logo} alt="" />
                    <h1>Hoosier Connection</h1>
                    <hr />
                    <h2>Reset Password</h2>
                    <div className="label"><label>New Password:</label></div>   
                    <input type="password" onChange={this.handleChange} id="reset_password1" required></input><br />
                    <div className="label"><label>Re-Enter Password:</label></div>
                    <input type="password" onChange={this.handleChange} id="reset_password2" required></input><br />
                    <div className="text-right"><button type="submit">Reset Password</button></div>
                </form>
            </div>
        );
    }
}



// WEBPACK FOOTER //
// src/Login/ResetPassword.js