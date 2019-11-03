import React, { Component } from 'react';
import profileIMG from './images/college.jpg';
import './css/profile.css';
import logo from "./images/HC.svg";
class Profile extends Component{
    constructor(props){
        super(props);
        //TODO: check if there is a token redirect to login if invalid
        if(!this.validateJWT()){
            window.location.href = "/login";
        }
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

    validateJWT(token){

    }

    handleChange(event){
       
    }
    
    handleSubmit(event){
        //TODO: post request to Sai's route with contents of key
    }

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
    }
}

export default Profile;