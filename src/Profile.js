import React, { Component } from 'react';
import profileIMG from './images/college.jpg';
import './css/profile.css';
import logo from './images/HC.svg';
import { Redirect } from 'react-router-dom';
import DropDownMenu from './Utility/DropDown';
import Cookie from './Utility/Cookie';

//TODO: check if there is a token redirect to signin if invalid

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
        name: "",
        profileIMG: "",
        major: "",
        studentType: "",
        year: "",
        bio: "",
        fname: "",
        lname: "",
        interests: [],
        posts: [],
        events: [],
        friends: [],
        chats: [],
        changed: false,
    }
    //TODO: check if there is a token redirect to login if invalid

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getProfileData = this.getProfileData.bind(this);
    this.getProfileData();
  }
  

  handleChange(event) {
    this.setState({
      bio: document.getElementById('profileBio').value,
      fname: document.getElementById('firstName').value,
      lname: document.getElementById('lastName').value,
      name: document.getElementById('userName').value,
      major: document.getElementById('major').value,
      changed: true,
    });
    
  }
  
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.changed) {
      var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
        },
        body: JSON.stringify({
          bio: this.state.bio,
          fname: this.state.fname,
          lname: this.state.lname,
          name: this.state.name,
          major: this.state.major,
        })
      };

      fetch('http://' + process.env.REACT_APP_API_HOST + '/profiles/editprofile', options)
        .then(result => {
          if (result.status == 201) {
            return result.json();
          } else {
            console.log('failed');
            return null;
          }
        })
        .then(result => {
        });
    } else {
      //TODO notify the user of the bad match
    }

    //TODO: post request to Sai's route with contents of key
  }

  getProfileData() {
    var options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
      }
    }
    try {
      fetch("http://" + process.env.REACT_APP_API_HOST + "/profiles/profile", options).then(result => {
        return result.json();
      }).then(result => {
        var friends = [
          { name: "John Smith", profileImageURL: "/assets/images/profiles/person1.jpg", accepted: true },
          { name: "Sally Sue", profileImageURL: "/assets/images/profiles/person2.png", accepted: true },
          { name: "Tex Mex", profileImageURL: "/assets/images/profiles/person3.png", accepted: true },
          { name: "Frank Ocean", profileImageURL: "/assets/images/profiles/person4.jpg", accepted: true },
          { name: "Davis Lee", profileImageURL: "/assets/images/profiles/person5.jpg", accepted: true },
          { name: "Alan Jons", profileImageURL: "/assets/images/profiles/person1.jpg", accepted: true },
          { name: "Michelle Zimmer", profileImageURL: "/assets/images/profiles/person2.png", accepted: true },
          { name: "Quinn Joy", profileImageURL: "/assets/images/profiles/person1.jpg", accepted: true },
          { name: "James Smith", profileImageURL: "/assets/images/profiles/person1.jpg", accepted: false },
          { name: "Hal Lee", profileImageURL: "/assets/images/profiles/person1.jpg", accepted: false }
        ]
        if (result.settings.darkMode) {
          document.body.className = "darkMode";
        } else {
          document.body.className = "";
        }
        console.log(result)
        this.setState({
          name: result.name,
          profileIMG: result.profileImageUrl,
          major: result.major,
          studentType: result.studentType,
          year: result.year,
          settings: result.settings,
          interests: result.interests,
          posts: result.posts,
          events: result.events,
          friends: friends,
          chats: result.chats,
          bio: result.bio,
          fname: result.fname,
          lname: result.lname,
        });

        document.getElementById("username").textContent = result.name;
        document.getElementById("lastName").placeholder = result.lname;
        document.getElementById("firstName").placeholder = result.fname;
        document.getElementById("userName").placeholder = result.name;
      
        if(result.bio != ""){
          document.getElementById("profileBio").placeholder = result.bio;
        } else {
          document.getElementById("profileBio").placeholder = "This dud have nothing on his/her discription";
        }

        if(result.major != ""){
          document.getElementById("major").placeholder = result.bio;
        } else {
          document.getElementById("major").placeholder = "Major Unknown";
        }

      });
    } catch (err) {
      console.log(err);
    }
  }

  swapToHome() {
    window.location.href = "http://localhost:3000/";
   }
  changeImg() {

  }
  addInterest() { }
  delInterest() { }
  delAccount() { }
  changeStudentType() { }
  changeStudentYear() { }

  //TO DO, for some reason the button part does not work
  //TO DO, when jump to another page, the another page seems to losing all its css.
  render() {
    return (
        <div id="profilePage">

          <div className="heading">
            <div>
              <img src={logo} alt='' width='50px' />
              <h1>Hoosier Connection</h1>
            </div>
            <div>
              <button className="return" onClick={this.swapToHome}> Back To Dashboard </button>
            </div>
          </div>

          <hr />
          <p id="username">This is my super long username with no reason so sorry I have to restrict the display</p>

          <div className="imgAndBio">
            <div className="profileimg">
              <img id="profileIMG" src={"http://" + process.env.REACT_APP_API_HOST + this.state.profileIMG} alt='' />
              <button className="changeImg" onClick={this.changeImg}> Choose File </button>

            </div>

            <div className="profilebio">
              <h3>Bio: </h3>
              <textarea id="profileBio" onChange={this.handleChange} placeholder='A little section dedicated to you!'></textarea>
            </div>
          </div>

          <hr />

          <div className="basicInfo">
            <div>
              <h3>First Name: </h3>
              <input type="text" id="lastName" onChange={this.handleChange} placeholder="John" required></input>

              <h3>Last Name: </h3>
              <input type="text" id="firstName" onChange={this.handleChange} placeholder="Smith" required></input>
              
              <h3>Username: </h3>
              <input type="text" id="userName" onChange={this.handleChange} placeholder="johnsmith" required></input>
              
              
              <div className="dropDownMenu">
                <h3>Student Type:</h3>
                <DropDownMenu items={["Undergraduate", "Master", "Ph.D."]} label="Undergraduate" handle={this.changeStudentType} />
                <h3>Current Year:</h3>
                <DropDownMenu items={["Freshman", "Sophomore", "Junior", "Senior"]} label="Freshman" handle={this.changeStudentYear} />
              </div>
            </div>

            <br />

            <div className="interestHeading">
            <h3>Major: </h3>
              <input type="text" id="major" onChange={this.handleChange} placeholder="Computer Science" required></input>
              
              <br/><br/>
              <h3>Your Interests: </h3>
              <input type="text" id="interest" onChange={this.handleChange} placeholder="play fortnite" required></input>
              
              
              <button onClick={this.addInterest} className="addInterest">Add Interest</button>
              <br />
              <ul id="interestsList" className="myList">
                <li><button onClick={this.delInterest}>Computer Science</button></li>
                <li><button onClick={this.delInterest}>AI</button></li>
                <li><button onClick={this.delInterest}>Play Fortnite</button></li>
                <li><button onClick={this.delInterest}>ok Boomer</button></li>
                <li><button onClick={this.delInterest}>BringBackNationalDex</button></li>
                <li><button onClick={this.delInterest}>hos mad</button></li>
              </ul>
            </div>
          </div>

          <hr />

          <div className="criticalInfo">
            <h3>Reset Email</h3>
            <input type="text" id="reEmail" onChange={this.handleChange} placeholder="johnsmith@gg.com" required></input>

            <h3>Current Password</h3>
            <input type="text" id="rePassword" onChange={this.handleChange} placeholder="123456" required></input>

            <div>
              <h3>Reset Password</h3>
              <input type="text" id="password" onChange={this.handleChange} placeholder="123456" required></input>

              <h3>Re-enter Password</h3>
              <input type="text" id="rePassword" onChange={this.handleChange} placeholder="123456" required></input>
            </div>
          </div>

          <hr />

          <button type="submit" onClick={this.handleSubmit} className="editButton">Edit Account</button>
          <button onClick={this.delAccount} className="delButton">Delete Account</button>



        </div>
      )
  }
}

export default Profile;