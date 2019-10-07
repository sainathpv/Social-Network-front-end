import React, { Component } from 'react';

class QRcode extends Component{
    constructor(props){
        super(props);
        this.state = {code: props.code, email: props.email, password: props.pwd};
        this.sendCode = this.sendCode.bind(this);
    }

    sendCode(){
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }

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
                //add cookie
                localStorage.setItem('JWT', result.token);
                //redirect to 2factor
                window.location.href = "http://localhost:3000/2factor";
            }else{
                console.log("successful");
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
            marginLeft: '20px',
            textDecoration: 'none'
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
        const container = {
            width: '400px',
        }

        return(
            <div style={container}>
                <div id="loginQRCode" style={form}>
                    <h3 style={header}>Use your phone to scan the QR code.</h3>
                    <img style={image} src={this.state.code} alt="" />
                    <a style={button} onClick={this.sendCode} href="2factor">Verify</a>
                </div>
            </div>
        );
    }
}

export default QRcode;