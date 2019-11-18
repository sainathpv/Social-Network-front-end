import React, {Component} from 'react';
import './../css/login/login.css';
import SignInForm from './SignInForm';
import QRCode from './QRcode'
import Cookie from './../Utility/Cookie';
import logo from './../images/HC.svg';
import DropDownMenu from '../Utility/DropDown';
export default class SignUpForm extends Component{
    constructor(props){
        super(props);
        this.img = "";
        this.state = {fname: "", lname: "", email: "", password: "", signup: true, QRCode: false, accountType: "Student", userName: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.swapForm = this.swapForm.bind(this);
        this.changeType = this.changeType.bind(this);
    }

    handleChange(event){
        this.setState({
            fname: document.getElementById('signup_fname').value,
            lname: document.getElementById('signup_lname').value,
            email: document.getElementById('signup_email').value,
            userName: document.getElementById("username").value,
            password: document.getElementById('signup_pwd').value,
            signup: true,
            QRCode: this.state.QRCode
        });
    }

    handleSubmit(event){
        event.preventDefault();
        if(document.getElementById('signup_pwd').value ===
           document.getElementById('signup_pwd2').value){
            var options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: this.state.userName,
                    firstName: this.state.fname,
                    lastName: this.state.lname,
                    email: this.state.email,
                    password: this.state.password,
                    accountType: this.state.accountType
                })
            }

            fetch("http://"+ process.env.REACT_APP_API_HOST +"/users/signup", options).then( result =>{
            if(result.status === 200){
                return result.json();
            }else{
                console.log('failed');
                result.json().then(nr =>{
                    document.getElementById("warning").textContent = nr.message;
                })
                return null;
            }
        }).then( result => {
            if(result === null){

            }else{
                this.img = result.data_url;
                var date = new Date();
                console.log(result.token);
                Cookie.setCookie("HC_JWT", result.token,  new Date(date.getTime() + (60*60*1000))); 
                this.setState({
                    QRCode: true
                });
            }
        });
        }else{
            document.getElementById("warning").textContent = "Your Re-Enter Password is not the same";
        }
    }
    
    swapForm(){
        this.setState({signup: false});
    }

    changeType(type){
        event.preventDefault();
        this.setState({accountType: type});
    }
    getForm(){
        if(this.state.accountType === "Student"){
            return (
                <div>
                    <div className="label"><label>First Name:</label></div>
                    <input type="text" id="signup_fname" onChange={this.handleChange} placeholder="Ex. Jon" required></input><br/>
                    <div className="label"><label>Last Name:</label></div>
                    <input type="text" id="signup_lname" onChange={this.handleChange} placeholder="Ex. Smith" required></input><br/>
                </div>
            );
        }else{
            return (
                <div>
                    <div className="label"><label>Company:</label></div>
                    <input type="text" id="signup_company" onChange={this.handleChange} placeholder="Ex. Kroger" required></input><br/>
                </div>
            );
        }
         

    

    }
    render() {
        if(this.state.signup && !this.state.QRCode){
            return(
                <form id="SignUpForm" className="formBox" onSubmit={this.handleSubmit}>
                    <img src={logo} alt="" />
                    <h2>Sign Up</h2>
                    <div className="label"><label>Account Type:</label></div>
                    <DropDownMenu items={["Student", "Company"]} label="Student" handle={this.changeType}/><br />
                    <div className="label"><label>Email:</label></div>
                    <input type="text" id="signup_email" onChange={this.handleChange} placeholder="Ex. you@gmail.com" required></input><br/>
                    <div className="label"><label>Username:</label></div>
                    <input type="text" id="username" onChange={this.handleChange} placeholder="Ex. username5000" required></input><br/>
                    
                    {this.getForm()}
                    <div className="label"><label>Password:</label></div>
                    <input type="password" id="signup_pwd" onChange={this.handleChange}  required></input><br/>
                    <div className="label"><label>Re-Enter Password:</label></div>
                    <input type="password" id="signup_pwd2" onChange={this.handleChange} required></input><br/>
                    <p className="warning_msg" id="warning"></p>
                    <br/>
                    <span><button  type="submit">Sign Up</button><p onClick={this.swapForm}>Login</p></span>
                </form>
            );
        }else if(this.state.QRCode){
            return( <QRCode code={this.img} email={this.state.email} />);
        }else{
            return( <SignInForm />);
        }
    }
}
