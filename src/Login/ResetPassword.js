import React, { Component } from 'react';
import logo from './../images/HC.svg';
import './../css/login/login.css';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.isResetted = false;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var url = window.location.href.split("/");
        var token = url[url.length - 1];
        console.log(token);
        if (document.getElementById("reset_password1").value !== document.getElementById("reset_password2").value) { return; }
        console.log("pwd are same");
        var data = {
            password: document.getElementById("reset_password1").value,
            token: token
        }

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch("http://" + process.env.REACT_APP_API_HOST + "/forgot_psw/reset", options).then(result => {
            if (result.status === 200) {
                window.location.href = "../login";
            }
        });
    }

    render() {
        return (
            <form id="resetPassword" onSubmit={this.handleSubmit}>
                <div className="container">
                    <img src={logo} alt="" />
                    <h2 className="text-center">Reset Password</h2>
                    <div className="input m-auto  text-left">
                        <label>PASSWORD</label>
                        <input id="reset_password1" onChange={this.handleChange} spellCheck="false" className="border-lg border-round-small" type="password" required></input>
                    </div>
                    <div className="input m-auto  text-left">
                        <label>RE-ENTER PASSWORD</label>
                        <input id="reset_password2" onChange={this.handleChange} spellCheck="false" className="border-lg border-round-small" type="password" required></input>
                    </div><br />
                    <div className="submitBox m-auto d-flex space-between"><button type="submit">Reset Password</button></div>
                </div>
            </form>

        );
    }
}
