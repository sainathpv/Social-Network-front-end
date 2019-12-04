import React from 'react';
import './../css/login/main.css';
import logo from './../images/HC.svg';
import Cookie from './../Utility/Cookie';
import QRCode from './QRcode';
class QuestionForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            QRCode: false,
            QRimg: props.QRimg,
            question1: "",
            question2: "",
            question3: "",
            answer1: "",
            answer2: "",
            answer3: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(){
        this.setState({
            question1: document.getElementById("signup_question1").value,
            question2: document.getElementById("signup_question2").value,
            question3: document.getElementById("signup_question3").value,
            answer1: document.getElementById("signup_answer1").value,
            answer2: document.getElementById("signup_answer2").value,
            answer3: document.getElementById("signup_answer3").value
        })
    }

    onSubmit(event){
        event.preventDefault();
              
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            },
            body: JSON.stringify({
                questions: [{
                    question: this.state.question1,
                    answer: this.state.answer1
                },
                {
                    question: this.state.question2,
                    answer: this.state.answer2
                },
                {
                    question: this.state.question3,
                    answer: this.state.answer3
                }],
            })
        };
        
        fetch("http://"+ process.env.REACT_APP_API_HOST +"/users/questions", options).then( result => {
           if(result.status === 200){
               return result.json();
           }else{
               return null;
           }
        }).then(result => {
            if(result !== null){
                this.setState({QRCode: true});
            }
        });
    }

    render() {
        if(!this.state.QRCode){
            return (
                <form id="signup_SecQuestions" onSubmit={this.onSubmit}>
                    <img src={logo}  alt=""/>
                    <h2>Security Questions</h2>
                    <div className="questionBox m-auto text-left">
                        <h4>Question 1</h4>
                        <div className="input m-auto  text-left">
                            <label>QUESTION 1</label>
                            <input id="signup_question1" onChange={this.onChange} spellCheck="false" className="border-lg border-round-small" type="text" required></input>
                        </div>
                        <div className="input m-auto  text-left">
                            <label>ANSWER</label>
                            <input id="signup_answer1" onChange={this.onChange} spellCheck="false" className="border-lg border-round-small" type="password" required></input>
                        </div>
                    </div>
                    <br />
                    <div className="questionBox m-auto text-left">
                    <h4>Question 2</h4>
                        <div className="input m-auto  text-left">
                            <label>QUESTION 2</label>
                            <input id="signup_question2" onChange={this.onChange} spellCheck="false" className="border-lg border-round-small" type="text" required></input>
                        </div>
                        <div className="input m-auto  text-left">
                            <label>ANSWER</label>
                            <input id="signup_answer2" onChange={this.onChange} spellCheck="false" className="border-lg border-round-small" type="password" required></input>
                        </div>
                    </div>
                    <br />
                    <div className="questionBox m-auto text-left">
                        <h4>Question 3</h4>
                        <div className="input m-auto  text-left">
                            <label>QUESTION 3</label>
                            <input id="signup_question3" onChange={this.onChange} spellCheck="false" className="border-lg border-round-small" type="text" required></input>
                        </div>
                        <div className="input m-auto  text-left">
                            <label>ANSWER</label>
                            <input id="signup_answer3" onChange={this.onChange} spellCheck="false" className="border-lg border-round-small" type="password" required></input>
                        </div>
                    </div>
                    <div className="p-relative button"><button type="submit">Submit</button></div>
                </form>
            );
        }else{
            return (<QRCode code={this.state.QRimg} />);
        }
    }
}

export default QuestionForm;
