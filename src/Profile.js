import React, { Component } from 'react';
import profileIMG from './images/college.jpg';
import './css/profile.css';
import logo from './images/HC.svg';
import { Redirect } from 'react-router-dom';
import DropDownMenu from './Utility/DropDown';
import Cookie from './Utility/Cookie';

import axios from 'axios';
//TODO: check if there is a token redirect to signin if invalid

class Profile extends Component {

  constructor(props) {
    


    super(props);
    this.state = {
      major: '',
      infomation: '',
      tags: '',
      profileIMG: '',
      pageStatus: 'profile'
    };
    this.toSignIn = this.toSignIn.bind(this);
    this.toHome = this.toHome.bind(this);
    this.toChat = this.toChat.bind(this);
    this.states = {
      items: props.items,
      showMenu: false,
      label: this.props.label,
      handle: props.handle
    };
    //TODO: check if there is a token redirect to login if invalid

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkProfile();
  }
  checkProfile = () => {
    axios.get('/profile').then(res => {
      console.log(res.data);
    });
  };
  getMenu(event) {
    if (this.states.showMenu) {
      return (
        <ul>
          {this.states.items.map((item, i) => (
            <li
              onClick={() => {
                this.states.handle(item.toLowerCase());
                this.showMenu();
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    } else {
      return '';
    }
  }

  showMenu() {
    event.preventDefault();
    this.setStates({ showMenu: !this.states.showMenu });
  }

  handleChange(event) {
    this.setState({
      major: document.getElementById('profile_major').value,
      infomation: document.getElementById('profile_info').value,
      tags: document.getElementById('profile_interests').value,
      profileIMG: document.getElementById('profile_image').value,
      pageStatus: 'profile'
    });
  }
  validateJWT(token) { }

  handleSubmit(event) {
    event.preventDefault();
    if (
      //TO DO: this should be checking if there are any state changed by user
      true
    ) {
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
      };

      fetch('http://' + process.env.REACT_APP_API_HOST + '/profiles/editprofile', options)
        .then(result => {
          if (result.status === 200) {
            return result.json();
          } else {
            console.log('failed');
            return null;
          }
        })
        .then(result => {
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
    } else {
      //TODO notify the user of the bad match
    }

    //TODO: post request to Sai's route with contents of key
  }

  //TO DO: Tried using the same method in SignUpForm, the page cannot change, need to be fixed
  toSignIn() {
    this.setState({
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      pageStatus: 'signin'
    });
  }

  toHome() {
    this.setState({
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      pageStatus: 'home'
    });
  }

  toChat() {
    this.setState({
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      pageStatus: 'chat'
    });
  }

  swapToHome() { }
  changeImg() { }
  addInterest() { }
  delInterest() { }
  delAccount() { }
  changeStudentType() { }

  //TO DO, for some reason the button part does not work
  //TO DO, when jump to another page, the another page seems to losing all its css.
  render() {
    console.log("it works here 1")
    var options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
      },
    };

    fetch("http://" + process.env.REACT_APP_API_HOST + "/profiles/profile", options).then(result => {
      if (result.status === 200) {
        console.log(result)
        return result.json();
      } else {
        result.json().then(nr => {
          document.getElementById("warning").textContent = nr.message;
        })
        return null;
      }
    }).then(result => {
      if (result === null) {
      } else {
      }
    });
    if (
      this.state.pageStatus === 'profile' ||
      this.state.pageStatus === 'home' ||
      this.state.pageStatus === 'chat') {
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
              <img id="profileIMG" src={profileIMG} alt='' />
              <button className="changeImg" onClick={this.changeImg}> Choose File </button>

            </div>

            <div className="profilebio">
              <h3>Bio: </h3>
              <textarea id="profileBio" onChange={this.handleChange} placeholder='A little section dedicated to you!'></textarea>
            </div>
          </div>


          <div className="basicInfo">
            <div className="labels">
              <h3>First Name: </h3>
              <h3>Last Name: </h3>
              <h3>Student Type:</h3>
              <h3>Current Year:</h3>
            </div>

            <div className="buttons">
              <input type="text" id="lastName" onChange={this.handleChange} placeholder="John" required></input>
              <br />
              <input type="text" id="lastName" onChange={this.handleChange} placeholder="Smith" required></input>
              <DropDownMenu items={["Undergraduate", "Master", "Ph.D."]} label="Undergraduate" handle={this.changeStudentType} />
              <DropDownMenu items={["freshman", "sophomore", "junior", "senior"]} label="freshman" handle={this.changeStudentType} />
            </div>

            <br />

            <div className="interestHeading">
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

          <button type="submit" className="editButton">Edit Account</button>
          <button onClick={this.delAccount} className="delButton">Delete Account</button>



        </div>
      );
    } else if (this.state.pageStatus === 'signin') {
      return <Redirect to='./Login/SignInForm' />;
    }
  }
}

export default Profile;

/*
          <br />
          <p>Profile: </p>
          <br />
          <h3>First Name</h3>
          <input type="text" id="lastName" onChange={this.handleChange} placeholder="John" required></input>

          <h3>Last Name</h3>
          <input type="text" id="lastName" onChange={this.handleChange} placeholder="Smith" required></input>

          <h3>Student Type</h3>
          <select id="studentType" onChange={this.handleChange}>
            <option value="undergraduate">Undergraduate</option>
            <option value="graduate">Graduate</option>
            <option value="phd">Ph.D.</option>
            <option value="others">Others</option>
          </select>

          <h3>Year</h3>
          <select id="year" onChange={this.handleChange}>
            <option value="freshman">Freshman</option>
            <option value="sophomore">Sophomore</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
          </select>


          <h3>Your Interests</h3>
          <input type="text" id="interest" onChange={this.handleChange} placeholder="play fortnite" required></input>
          <button onClick={this.addInterest}>Add Interest</button>


          <h3>Reset Password</h3>
          <h3>Re-enter Password</h3>
          <h3>Change Backgroup</h3>*/