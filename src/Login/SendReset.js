import React, {Component} from 'react';
import logo from './../images/HC.svg';
import './../css/login/SendReset.css';

export default class SendResetEmail extends Component{
    constructor(props){
        super(props);
        this.state = {sendResetEmail: true};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        document.getElementById("warning").textContent = "One Second!!";
        event.preventDefault();
        var data = {
            email: document.getElementById("reset_email").value
        }
        var url = window.location.href.split('/');
        var token = url[url.length-1];
        console.log(token);
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch("http://"+ process.env.REACT_APP_API_HOST +"/forgot_psw_email/forgot_psw_email", options).then( result =>{
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
                document.getElementById("warning").textContent = "A Reset Password Email has been send!!";
            }
        });
    }

    changeForm(event){
        event.preventDefault();
        this.setState({sendResetEmail: !this.state.sendResetEmail});
    }

    render() {
        if(this.state.sendResetEmail){
        return(
            <div id="SendResetEmail" >
                <form onSubmit={this.handleSubmit}>  
                    <img src={logo} alt="" />
                    <h1>Hoosier Connection</h1>
                    <hr />
                    <h2 className="text-center">Reset Password</h2>
                    <p className="text-center warning_msg" id="warning"></p> <br/>
                    <p id="reset_email_msg"></p>
                    <div className="label"><label>Email</label></div>   
                    <input type="text" placeholder="Ex. you@gmail.com" onChange={this.handleChange} id="reset_email" required></input><br />
                    <div className="text-center"> 
                        <p className="d-inline" onClick={this.changeForm.bind(this)}>Didn't get email?</p>
                        <button className="d-inline" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );   
        }else{
            return (
                <div id="SendResetQuestion" >
                    <form onSubmit={this.handleSubmit}>  
                        <img src={logo} alt="" />
                        <h1>Hoosier Connection</h1>
                        <hr />
                        <h2 className="text-center">Reset Password</h2>
                        <p className="warning_msg text-center" id="warning"></p> <br/>
                        <p id="reset_email_msg"></p>
                        <div className="label"><label>Email</label></div>   
                        <input type="text" placeholder="Ex. you@gmail.com" onChange={this.handleChange} id="reset_email" required></input><br />
                        <div className="text-left">
                            <label>Question</label>
                            <input className="radio_btn" type="radio" name="question" value="Where were you born?"/>
                                Where were you born?<br />
                            <input className="radio_btn" type="radio" name="question" value="What was your favourite pet?"/> 
                                What was your favourite pet?<br />
                            <input className="radio_btn" type="radio" name="question" value="What is your mother's maiden name?"/> What is your mother's maiden name?<br />
                        </div>
                        <div className="label"><label>Answer</label></div>   
                        <input type="text" placeholder="Ex. Bloomington" onChange={this.handleChange} id="reset_email" required></input><br />
                        <div className="text-center m-auto d-block w-100"> 
                            <p className="d-inline" onClick={this.changeForm.bind(this)}>Send Email?</p>
                            <button className="d-inline" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}
