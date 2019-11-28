import React, { Component } from 'react';
import Cookie from './../Utility/Cookie';
import logo from './../images/HC.svg';

class QRcode extends Component{
    constructor(props){
        super(props);
        this.state = {code: props.code};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({key: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        var data = {
            token: document.getElementById('qr_code').value
        }

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            },
            body: JSON.stringify(data)
        }
        
        fetch("http://"+ process.env.REACT_APP_API_HOST +"/twoFA/twoFALogin", options).then( data => {
            if(data.status === 200){
                return data.json();
            }else{
                data.json().then(nr =>{
                    document.getElementById("warning").textContent = nr.message;
                })
                return null;
            }
        }).then(result => {
            if(result !== null){
                var date = new Date();
                date = new Date(date.getTime() + (60*60*1000));
                Cookie.setCookie('HC_JWT', result.token, date); 
                window.location.href = "../";
            }
        });
    }

    render(){

        return(
            <form id="loginQRCode"  onSubmit={this.handleSubmit}>
                <img src={logo} alt="" />
                <h3 >Use your phone to scan the QR code.</h3>
                <p id="qr_errorMessage"></p>
                <img style={{width: "350px"}} src={this.state.code} alt="" /><br />
                <div className="label text-left m-auto"><label>Enter Code:</label></div>
                <div className="input m-auto  text-left">
                    <label>CODE:</label>
                    <input id="qr_code" onChange={this.handleChange} autoComplete="off" spellCheck="false" className="border-lg border-round-small" type="text" required></input>
                </div>
                <p id="warning"></p>
                <div className="m-auto submitBox"> <button type="submit" >Verify</button></div>
            </form>
        );
    }
}

export default QRcode;
