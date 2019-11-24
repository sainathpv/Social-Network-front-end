import React, {Component} from 'react';
import logo from './../images/HC.svg';
import {Helmet} from "react-helmet";
export default class SendResetEmail extends Component{
    constructor(props){
        super(props);
        this.state = {
            sendResetEmail: true,
            email: "",
            questions: false,
            question1: "",
            question2: "",
            question3: ""
        };
        this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
        this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    }

    handleQuestionSubmit(event){
        event.preventDefault();
        if(this.state.questions){
            var data = {
                questions: [
                    {
                        question: this.state.question1,
                        answer: document.getElementById("reset_answer1").value
                    },
                    {
                        question: this.state.question2,
                        answer: document.getElementById("reset_answer2").value
                    },
                    {
                        question: this.state.question3,
                        answer: document.getElementById("reset_answer3").value
                    }
                ],
                email: this.state.email
            }
            var options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            fetch("http://"+ process.env.REACT_APP_API_HOST
                + "/forgot_psw/forgot_psw_questions", options).then(result =>{
                return result.json();
            }).then( result => {
                window.location.href = "ResetPassword/" + result.token;
            });
        }else{
            var email = document.getElementById("reset_email").value;
            this.setState({email:  email});
            fetch("http://"+ process.env.REACT_APP_API_HOST
                + "/forgot_psw/forgot_psw_questions/" + email).then(result =>{
                return result.json();
            }).then( result => {

                this.setState({
                    questions: true,
                    question1: result.questions[0],
                    question2: result.questions[1],
                    question3: result.questions[2]
                });
            });
        }
    }

    handleEmailSubmit(event){
        document.getElementById("warning").textContent = "Sending!";
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

        fetch("http://"+ process.env.REACT_APP_API_HOST +"/forgot_psw/forgot_psw_email", options).then( result =>{
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

    getQuestions(){
        if(!this.state.questions){
            return (
                <div className="input m-auto  text-left">
                    <label>EMAIL</label>
                    <input id="reset_email" onChange={this.handleChange} spellCheck="false" className="border-lg border-round-small" type="email" required></input>
                </div>
            );
        }else{
            return (
                <div>
                    <div className="question m-auto"><p className="question" id="reset_question1">{this.state.question1}</p></div>
                    <div className="input m-auto  text-left">
                        <label>ANSWER 1</label>
                        <input id="reset_answer1" onChange={this.handleChange} spellCheck="false" className="border-lg border-round-small" type="password" required></input>
                    </div>
                    <div className="question m-auto"><p className="question" id="reset_question2">{this.state.question2}</p></div>
                    <div className="input m-auto  text-left">
                        <label>ANSWER 2</label>
                        <input id="reset_answer2" onChange={this.handleChange} spellCheck="false" className="border-lg border-round-small" type="password" required></input>
                    </div>
                    <div className="question m-auto"><p  id="reset_question3">{this.state.question3}</p></div>
                    <div className="input m-auto  text-left">
                        <label>ANSWER 3</label>
                        <input id="reset_answer3" onChange={this.handleChange} spellCheck="false" className="border-lg border-round-small" type="password" required></input>
                    </div>
                </div>
            );
        }
    }

    changeForm(event){
        event.preventDefault();
        this.setState({sendResetEmail: !this.state.sendResetEmail});
    }

    render() {
        if(this.state.sendResetEmail){
        return(
            <form id="SendResetEmail" className="m-auto border-round-small"  onSubmit={this.handleEmailSubmit}>
                <div className="container">
                    <Helmet>
                        <title>Hoosier Connection - Reset Password</title>
                    </Helmet>
                    <img src={logo} alt="" />
                    <h2 className="text-center">Reset Password With Email</h2>
                    <div className="text-center">
                        <p className="warning_msg" id="warning"></p>
                        <p id="reset_email_msg"></p>
                    </div>
                    <div className="input m-auto  text-left">
                        <label>EMAIL</label>
                        <input id="reset_email" onChange={this.handleChange} spellCheck="false" className="border-lg border-round-small" type="text" required></input>
                    </div>
                    <br />
                    <div className="submitBox m-auto d-flex space-between">
                        <button className="d-inline" type="submit">Send Email</button>
                        <p className="d-inline" onClick={this.changeForm.bind(this)}>Can't access email?</p>
                    </div>
                </div>
            </form>

        );
        }else{
            return (
                <form id="SendResetQuestion" onSubmit={this.handleQuestionSubmit}>
                    <div className="container">
                        <img src={logo} alt="" />
                        <h2 className="text-center">Reset Password With Security Questions</h2>
                        <p id="warning"></p> <br/>
                        <p id="reset_email_msg"></p>
                        {this.getQuestions()}
                        <br />
                        <div className="submitBox m-auto d-flex space-between">
                            <button className="d-inline" type="submit">Get Questions</button>
                            <p className="d-inline" onClick={this.changeForm.bind(this)}>Send Email?</p>
                        </div>
                    </div>
                </form>
            )
        }
    }
}
