import React, { Component } from 'react';
import './../css/2factor.css';
import logo from "./../images/HC.svg";
class TwoFactorAuthentication extends Component{
    constructor(props){
        super(props);
        //TODO: check if there is a token redirect to login if invalid

        this.state = {key: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        console.log(event.target.value)
        this.setState({key: event.target.value});
    }
    
    handleSubmit(event){
        var data = {
            key: this.state.key
        }
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('JWT')
            },
            body: JSON.stringify(data)
        }
        fetch("localhost:8080/", options).then( data => {
            if(data.status === 200){
                return data.json()
            }else{
                return null;
            }
        }).then(result => {
            if(result === null){
                
            }else{
                localStorage.setItem('JWT', result.token);
                window.location.href = "http://localhost:3000/profile";
            }
        });
    }

    render(){
        return(
            <div id="twofactor">
                <div id="twoFactorLogoBox">
                    <img src={logo} alt=""></img>
                    <h1>Two Factor Authentication</h1>
                </div>
                <form id="twoFactorFormBox" onSubmit={this.handleSubmit}>
                    <h3>Authentication Code:</h3>
                    <input id="twoFactorAuthoCodeInput" value={this.state.key} onChange={this.handleChange}></input><br/>
                    <span><button type="submit">Verify</button></span>
                </form>
            </div>
        );
    }
}

export default TwoFactorAuthentication;