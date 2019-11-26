import React, {Component} from 'react';
import './../css/login/login.css';
import Cookie from './../Utility/Cookie';
import logo from './../images/HC.svg';

export default class TwoFactor extends Component{
    constructor(props){
        super(props);
        this.state = {email: props.email,};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            },
            body: JSON.stringify({
                token: document.getElementById("login_2f").value
            })
        };

        fetch("http://"+ process.env.REACT_APP_API_HOST +"/twoFA/twoFALogin", options).then( data => {
            if(data.status === 200){
                return data.json();
            }else{
                return null;
            }
        }).then(result => {
            if(result === null){
                //TODO: handle failed login
            }else{
                var date = new Date();
                date = new Date(date.getTime() + (60*60*1000));
                Cookie.setCookie('HC_JWT', result.token, date); 
                window.location.href = "../";
            }
        });    
    }

    render() {
        return(
            <form id="login_2fForm" onSubmit={this.handleSubmit}>  
                <img src={logo} alt="" />
                <h2>Two Factor</h2>   
                <div className="input m-auto  text-left">
                    <label>CODE</label>
                    <input id="login_2f" autoComplete="off" onChange={this.handleChange} spellCheck="false" className="border-lg border-round-small" type="text" required></input>
                </div>
                <div className="submitBox d-flex space-between m-auto"><button type="submit">Submit</button></div>
            </form>
        );

    }
}
