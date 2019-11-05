import React, { Component } from 'react';
import Cookie from './../Utility/Cookie';

class QRcode extends Component{
    constructor(props){
        super(props);
        this.state = {code: props.code, email: props.email};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        console.log(event.target.value)
        this.setState({key: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        var data = {
            token: document.getElementById('qr_code').value
        }
        console.log(Cookie.getCookie('HC_JWT'));
        var options = {
        
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            },
            body: JSON.stringify(data)
        }
        
        fetch("http://localhost:8080/twoFA/twoFALogin", options).then( data => {
            if(data.status === 200){
                return data.json();
            }else{
                data.json().then(nr =>{
                    document.getElementById("warning").textContent = nr.message;
                })
                return null;
            }
        }).then(result => {
            if(result === null){
                //TODO: handle failed login
            }else{
                console.log(result.token);
                var date = new Date();
                date = new Date(date.getTime() + (60*60*1000));
                Cookie.setCookie('HC_JWT', result.token, date); 
                window.location.href = "../";
            }
        });
    }

    render(){
        const header = {
            color: '#474747',
            fontFamily: 'Sergoe UI',
            margin: '10px'
        }
        const button = {
            padding: '5px 20px',
            background: '#A20909',
            border: 'none',
            color: 'white',
            fontSize: '1.1em',
            borderRadius: '20px',
            marginLeft: '200px',
        }
        
        const image = {
            margin: '20px auto',
            display: 'block',
            width: '95%'
        }

        const form = {
            width: "80%",
            margin: "auto"
        }
        const input = {
            border: '.5px solid lightgrey',
            borderRadius: '4px',
            height: '35px',
            width: '250px',
            paddingLeft: '6px',
            margin: '10px'
        }

        const label = {
            textAlign: 'left',
        }
        const container = {
            width: '400px',
        }

        const warning_msg = {
            color: "red",
        }

        return(
            <div style={container}>
                <form id="loginQRCode" style={form} onSubmit={this.handleSubmit}>
                    <h3 style={header}>Use your phone to scan the QR code.</h3>
                    <p id="qr_errorMessage"></p>
                    <img style={image} src={this.state.code} alt="" />
                    <label style={label}>Enter Code:</label><br/>
                    <input style={input} type="text" id="qr_code" required placeholder="Ex. 234565"></input><br />
                    <p style={warning_msg} id="warning"></p> <br/>
                    <button type="submit" style={button}>Verify</button>
                </form>
            </div>
        );
    }
}

export default QRcode;


// WEBPACK FOOTER //
// src/Login/QRcode.js