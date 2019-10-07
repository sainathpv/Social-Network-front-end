import React, { Component } from 'react';

class QRcode extends Component{
    constructor(props){
        super(props);
        this.state = {code: props.code, email: props.email, password: props.pwd};
        this.sendCode = this.sendCode.bind(this);
    }

    sendCode(){
        window.location.href = "http://localhost:3000/2factor";
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