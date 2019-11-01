import React, { Component } from 'react';
import profileIMG from './images/college.jpg';
import './css/profile.css';
import logo from "./images/HC.svg";
<<<<<<< HEAD
import { Helmet } from "react-helmet";
import {Redirect} from 'react-router-dom'
import SignInForm from './Login/SignInForm';
import ReactBootstrap from 'react-bootstrap';
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Dropdown, DropdownButton} from "react-bootstrap";


import {FormControl, Container, Form, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, Row, Col, Grid} from 'react-bootstrap';


const TiTLE = "User Profile"

class Profile extends Component{
     
  
    constructor(props){
        
    super(props);
        this.state = {major: "", infomation: "", tags: "", profileIMG: "", pageStatus: "profile"};
        this.toSignIn = this.toSignIn.bind(this);
        this.toHome = this.toHome.bind(this);
        this.toChat = this.toChat.bind(this);
        this.states = {items: props.items, showMenu: false, label: this.props.label, handle: props.handle };
        
        //TODO: check if there is a token redirect to signin if invalid

=======
class Profile extends Component{
    constructor(props){
        super(props);
        //TODO: check if there is a token redirect to login if invalid
        if(!this.validateJWT()){
            window.location.href = "/login";
        }
>>>>>>> affc7376b5ee4371a538120073ab261f38df1b3c
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

     }
     getMenu(event){
        if(this.states.showMenu){
            return(
                <ul>
                    {this.states.items.map((item, i) => <li onClick={() => {
                        this.states.handle(item.toLowerCase());
                        this.showMenu();
                    }}>{item}</li>)}
                </ul>
            );
        }else{
            return("");
        }
    }

<<<<<<< HEAD
    showMenu(){
        event.preventDefault();
        this.setStates({showMenu: !this.states.showMenu});
    }
    
    handleChange(event){
        this.setState({
            major: document.getElementById('profile_major').value,
            infomation: document.getElementById('profile_info').value,
            tags: document.getElementById('profile_interests').value,
            profileIMG: document.getElementById('profile_image').value,
            pageStatus: "profile"
=======
    validateJWT(token){
>>>>>>> affc7376b5ee4371a538120073ab261f38df1b3c

    }

    handleChange(event){
       
    }
    
    handleSubmit(event){
        //TODO: post request to Sai's route with contents of key
    }

<<<<<<< HEAD
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
                        <div className= "middle">    
                    
 
                        
                        </div>
                        <br/><br/>
                        
                        
                        
                        <Container>
                            <h2 >Settings</h2>
                           <Container>
                            <h4 class="line">Profile</h4>
                        
                            <Container>
                            <h5>Bio</h5>
                            <img className="image" src={profileIMG} alt="): Something went wrong"></img>
                        <button class="uploadImg">Upload</button>
                                    <Form.Row> <textarea class="" id="profile_info" placeholder="A little section dedicated to you!"></textarea></Form.Row>
                         
                                  <Form.Row ><Row>
                                             <Form.Group as={Col} >
                                                <label>First Name</label><br/>
                                                <input type="text"></input>  
                                               
               
                                                </Form.Group> 

                                                <Form.Group as={Col} >
                                                <label>Last Name</label><br/>
                                                                  
                                                <input type="text"></input>  
                                                </Form.Group>
                                                </Row>
                                                </Form.Row>

                                                <Form.Row>
                                                <div className="dropdown">
                <button onClick={this.showMenu.bind(this)}>{this.states.label}</button>
                {this.getMenu()}
            </div>
                                                </Form.Row>
                                              
                     
                                                <Form.Row><button className="field_button"  >Update</button></Form.Row>
                                               
                       
                            <h4>Security:</h4>
                           
                           
                                <Form.Row><Row><Form.Group as={Col}>
                                        <label >Reset Password</label><br />
                                        <input type="password"></input></Form.Group>
                                    <Form.Group as={Col}>
                                        <label >Re-enter Password</label><br />
                                        <input type="password"></input></Form.Group>
                                        </Row></Form.Row>
                               
                                <button className="field_button">Reset</button>
=======
    render(){
        return(
            <div id="profileSettings">
                <nav>
                    <span>
                        <img class="logo" src={logo} alt="" width="50px"/>
                    </span>
                    <ul>
                        <li>Home</li>
                        <li>Events</li>
                        <li>Chats</li>
                    </ul>
                </nav>
                <div class="container">
                    <h1>Settings</h1>
                    <form class="profile">
                        <h2>Profile:</h2>
                        <hr />
                        
                        <span className="flex justify-content-center">    
                            <div className="split">
                                <div>
                                    <div className="profileField bio">
                                        <label>Bio</label><br />
                                        <textarea placeholder="A little section dedicated to you!"></textarea>
                                    </div>
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
                                </div>
                                <button className="field_button">Update</button>
                            </div>
                            <div className="profileField split">
                                <label>Profile Picture</label>
                                <div >
                                    <img src={profileIMG} alt="): Something went wrong"></img>
                                    <button>Upload</button>
                                </div>
                            </div>
                        </span>
                        
                    </form>

                    <form className="security">
                        <h2>Security:</h2>
                        <hr />
                        <div class="center">
                            <span className="flex">
>>>>>>> affc7376b5ee4371a538120073ab261f38df1b3c
                                <div className="profileField">
                                    <label className="p-10">Reset Password</label><br />
                                    <input type="text"></input>
                                </div>
<<<<<<< HEAD
                                </Container>
                                </Container>
                        </Container>
                </div>
            );
        } else if(this.state.pageStatus === "signin"){
            return(<Redirect to='./Login/SignInForm'/>);
        }
    
}
=======
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
    }
>>>>>>> affc7376b5ee4371a538120073ab261f38df1b3c
}

export default Profile;