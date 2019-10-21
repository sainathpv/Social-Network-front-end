import React, { Component } from 'react';
import profileIMG from './images/college.jpg';
import './css/profile.css';
import logo from "./images/HC.svg";
import { Helmet } from "react-helmet";
import {Redirect} from 'react-router-dom'
import SignInForm from './Login/SignInForm';

const TiTLE = "User Profile"

class Profile extends Component{
    
    constructor(props){
        super(props);
        this.state = {major: "", infomation: "", tags: "", profileIMG: "", pageStatus: "profile"};
        this.toSignIn = this.toSignIn.bind(this);
        this.toHome = this.toHome.bind(this);
        this.toChat = this.toChat.bind(this);
        //TODO: check if there is a token redirect to signin if invalid

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            major: document.getElementById('profile_major').value,
            infomation: document.getElementById('profile_info').value,
            tags: document.getElementById('profile_interests').value,
            profileIMG: document.getElementById('profile_image').value,
            pageStatus: "profile"

            //signup: true,
            //QRCode: this.state.QRCode
        });
    }
    
    handleSubmit(event){
        event.preventDefault();
        if(//TO DO: this should be checking if there are any state changed by user
            true){
            var options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    profileIMG: this.state.profileIMG,
                    basicInfo: this.state.infomation,
                    tags: this.state.tags,
                    major: this.state.major
                })
            }

            fetch("the route in backend", options).then( result =>{
            if(result.status === 200){
                return result.json();
            }else{
                console.log('failed');
                return null;
            }
        }).then( result => { 
            /*if(result === null){

            }else{
                this.img = result.img;
                localStorage.setItem("email", document.getElementById('signup_email').value);
                localStorage.setItem("JWT", result.token);
                this.setState({
                    fname: document.getElementById('signup_fname').value,
                    lname: document.getElementById('signup_lname').value,
                    email: document.getElementById('signup_email').value,
                    password: document.getElementById('signup_pwd').value,
                    signup: true,
                    QRCode: true
                });
            }*/
        });
        }else{
            //TODO notify the user of the bad match
        }

        //TODO: post request to Sai's route with contents of key
    }

    //TO DO: Tried using the same method in SignUpForm, the page cannot change, need to be fixed
    toSignIn(){
        this.setState({fname: this.state.fname, lname: this.state.lname, email: this.state.email, password: this.state.password, pageStatus: 'signin'});
    }

    toHome(){
        this.setState({fname: this.state.fname, lname: this.state.lname, email: this.state.email, password: this.state.password, pageStatus: 'home'});
    }

    toChat(){
        this.setState({fname: this.state.fname, lname: this.state.lname, email: this.state.email, password: this.state.password, pageStatus: 'chat'});
    }



    //TO DO, for some reason the button part does not work
    //TO DO, when jump to another page, the another page seems to losing all its css.
    render(){
        if(this.state.pageStatus === "profile" || this.state.pageStatus === "home" || this.state.pageStatus === "chat"){
            return(
                <div id="profileSettings">
                    <Helmet>
                        <title>{ TiTLE }</title>
                    </Helmet>
                    <div class="heading">
                        <div class="logo">
                            <img src={logo} alt="" width="50px"/>
                        </div>
                        <div class="title">
                            <h1>Hoosier Connection</h1>
                        </div>
                        <div class="buttonArea">
                            <input type="button" class="button button1" value="Profile" /> 
                            <input type="button" onClick={this.toHome} class="button button2" value="Home" /> 
                            <input type="button" onClick={this.toChat} class="button button3" value="Chat" /> 
                            <input type="button" onClick={this.toSignIn} class="button button4" value="Logout" /> 
                            <button class="button button5">Icon</button>
                        </div>
                    </div>
                    <hr />
                            
                    <div class="middle">
                        <img className="image" src={profileIMG} alt="): Something went wrong"></img>
                        <button class="uploadImg">Upload</button>

                        <textarea class="" id="profile_info" placeholder="A little section dedicated to you!"></textarea>




                        <form class="profile">
                            
                            <span className="flex justify-content-center">   
                                <div className="split">
                                        
                                        <span className="flex">
                                            <div className="profileField">
                                                <label>First Name</label><br />
                                                <input type="text"></input>
                                            </div>
                                            <div className="profileField">
                                                <label>Last Name</label><br />
                                                <input type="text"></input>
                                            </div>
                                        </span>
                                        <span className="flex">
                                            <div className="profileField">
                                                <label>Email</label><br />
                                                <input type="text"></input>
                                            </div>
                                        </span>
                                    <button className="field_button">Update</button>
                                </div>
                                
                            </span>
                            
                        </form>

                        <form className="security">
                            <h2>Security:</h2>
                            <hr />
                            <div class="center">
                                <span className="flex">
                                    <div className="profileField">
                                        <label className="p-10">Reset Password</label><br />
                                        <input type="text"></input>
                                    </div>
                                    <div className="profileField">
                                        <label className="p-10">Re-enter Password</label><br />
                                        <input type="text"></input>
                                    </div>
                                </span>
                                <button className="field_button">Reset</button>
                                <div className="profileField">
                                    <label className="no-padding">Delete Account</label>
                                    <button className="warn_button">Delete Account</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else if(this.state.pageStatus === "signin"){
            return(<Redirect to='./Login/SignInForm'/>);
        }
    }
}

export default Profile;