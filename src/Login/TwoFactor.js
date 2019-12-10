import React, {Component} from 'react';
import './../css/login/login.css';
import Cookie from './../Utility/Cookie';
import logo from './../images/HC.svg';
import SignInForm from './SignInForm';

export default class TwoFactor extends Component{
    constructor(props){
        super(props);
        this.state = {email: props.email, onTFA: true};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.backToLogin = this.backToLogin.bind(this);
        
    }

    handleChange(event){
        document.getElementById('warning').textContent = "";
                
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
                document.getElementById('warning').textContent = "Your Two Factor Code is incorrect!";
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

    backToLogin(){
        console.log("I have been here")
        this.setState({
            onTFA: false
        })

    }

    render() {
        if (this.state.onTFA) {
            return (
                <form id="login_2fForm" onSubmit={this.handleSubmit}>
                    <img src={logo} alt="" />
                    <h2>Two Factor</h2>
                    <p id='warning'></p>
                    <div className="input m-auto  text-left">
                        <label>CODE</label>
                        <input id="login_2f" autoComplete="off" onChange={this.handleChange} spellCheck="false" className="border-lg border-round-small" type="text"></input>
                    </div>
                    <div className="buttons">
                        <div className="submitBox d-flex space-between m-auto"><button type="submit">Submit</button></div>
                        <div className="jumpback d-flex space-between m-auto"><button onClick={this.backToLogin}>Go Back</button></div>
                    </div>
                </form>

            );
        } else {
            return <SignInForm />;
        }

    }
}
