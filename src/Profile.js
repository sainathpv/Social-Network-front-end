import React, { Component } from 'react';
import './css/profile.css';
import logo from './images/HC.svg';
import DropDownMenu from './Utility/DropDown';
import Cookie from './Utility/Cookie';

//interest field, because of the dynamic adding of interest tags
//it is more convinient to put the interest field out of the class
var interests = []

function delInterest(i) {
  var currentInterest = document.getElementById("interest" + i)
  currentInterest.parentElement.removeChild(currentInterest)

  interests.splice(i, 1);

  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
    },
    body: JSON.stringify({
      interests: interests
    })
  };

  fetch('http://' + process.env.REACT_APP_API_HOST + '/profiles/editprofile_interest', options)
    .then(result => {
      if (result.status === 201) {
        return result.json();
      } else {
        console.log('failed');
        return null;
      }
    }).then(result => {
    });
}


class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "", profileIMG: "", major: "", studentType: "", year: "", bio: "", fname: "", lname: "",
      posts: [], events: [], friends: [], chats: [],
      changed: false,
    }
    //TODO: check if there is a token redirect to login if invalid

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getProfileData = this.getProfileData.bind(this);
    this.getProfileData();
    this.addInterest = this.addInterest.bind(this);
  }


  //Initialize the data in profile page
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

        if (result.settings.darkmode) {
          document.body.className = "darkmode";
        } else {
          document.body.className = "";
        }

        interests = result.interests

        this.setState({
          name: result.name,
          profileIMG: result.profileImageUrl,
          major: result.major,
          studentType: result.studentType,
          year: result.year,
          settings: result.settings,
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

        if (result.bio !== "") {
          document.getElementById("profileBio").placeholder = result.bio;
        } else {
          document.getElementById("profileBio").placeholder = "A little section devoted to everything about you.";
        }

        if (result.major !== "") {
          document.getElementById("major").placeholder = result.major;
        } else {
          document.getElementById("major").placeholder = "Major Unknown";
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  //handle changes of the input / textarea in html
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

  //handle the 'edit profile' button, update all editted informaion
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
          if (result.status === 201) {
            return result.json();
          } else {
            console.log('failed');
            return null;
          }
        }).then(result => {

        });
    } else {/*TODO notify the user of the bad match*/ }
    //TODO: post request to Sai's route with contents of key
  }

  //jump back to homepage, the href link needs to be changed to server after
  swapToHome() {
    window.location.href = "http://localhost:3000/";
  }

  changeImg() {

  }

  //add interest to html and backend database
  addInterest() {
    var newInterest = document.getElementById('interest').value
    if (interests.includes(newInterest)) {
      document.getElementById("interestWarning").textContent = "Your new interest already exists in the list";
    } else if (newInterest === "") {
      document.getElementById("interestWarning").textContent = "Your input interest is empty";
    } else {
      var currentLength = interests.length
      interests.push(newInterest);
      var interestButton = document.createElement("BUTTON");
      interestButton.onclick = function delInterest() {
        console.log(currentLength)
        this.parentElement.removeChild(this);
        interests.splice(currentLength, 1);
        console.log(interests)
      }
      var interestText = document.createTextNode(newInterest);
      interestButton.appendChild(interestText);
      document.getElementById("interestsList").appendChild(interestButton);
      this.setState({changed: true});

      var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
        },
        body: JSON.stringify({
          interests: interests
        })
      };

      fetch('http://' + process.env.REACT_APP_API_HOST + '/profiles/editprofile_interest', options)
        .then(result => {
          if (result.status === 201) {
            return result.json();
          } else {
            console.log('failed');
            return null;
          }
        }).then(result => {
        });
    }
  }

  delAccount() { }
  changeStudentType() { }
  changeStudentYear() { }

  //TO DO, for some reason the button part does not work
  //TO DO, when jump to another page, the another page seems to losing all its css.
  render() {
    return (
      <div id="profilePage" className="bg-primary text-primary">

        <div className="heading">
          <div>
            <img src={logo} alt='' width='50px' />
            <h1>Hoosier Connection</h1>
          </div>
          <div>
            <a className="text-primary" href="../">
              <i className="fas fa-arrow-left"></i> Back To Dashboard
            </a>
          </div>
        </div>

        <hr />

        <div className="imgAndBio p-10" >
          <div className="profileimg">
            <img id="profileIMG" src={"http://" + process.env.REACT_APP_API_HOST + this.state.profileIMG} alt='' />
            <div className="container">
              <h1 id="username">Undefined</h1>
              <br />
            </div>
            <input type="file"></input>
          </div>

          <div className="profilebio">
            <h3>Bio: </h3>
            <textarea id="profileBio" onChange={this.handleChange} placeholder='Ex: A little section dedicated to you!'></textarea>
          </div>

        </div>

        <hr />

        <div className="basicInfo d-flex space-between p-10">
          <div className="studentInfo">
            <h3>First Name: </h3>
            <input className="text-input" type="text" id="lastName" onChange={this.handleChange} placeholder="Ex: John" required></input>

            <h3>Last Name: </h3>
            <input className="text-input" type="text" id="firstName" onChange={this.handleChange} placeholder="Ex: Smith" required></input>

            <h3>Username: </h3>
            <input className="text-input" type="text" id="userName" onChange={this.handleChange} placeholder="Ex: johnsmith" required></input>

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
            <input className="text-input" type="text" id="major" onChange={this.handleChange} placeholder="Ex: Computer Science" required></input>

            <h3>Your Interests: </h3>
            <input className="text-input" type="text" id="interest" placeholder="Ex: Fortnite" required></input>
            <button onClick={this.addInterest} className="btn-primary">Add Interest</button>
            <br />
            <ul id="interestsList" className="myList border-lg border-round-small">
              {
                interests.map((interest, i) => {
                  return (
                    <button onClick={() => delInterest(i)} id={"interest" + i} key={i}>{interest}</button>)
                })
              }
            </ul>
            <br /><br />
            <h4 id="interestWarning"> </h4>
          </div>
        </div>

        <hr />

        <div className="criticalInfo p-10">
          <div className="resetPsw">
            <h3>Current Password:</h3>
            <input className="text-input" type="text" id="rePassword" onChange={this.handleChange} placeholder="The Current Password. Ex: 123456" required></input>
            <h3>Reset Password:</h3>
            <input className="text-input" type="text" id="password" onChange={this.handleChange} placeholder="Your New Password.Ex: 123456" required></input>
            <h3>Re-enter Password:</h3>
            <input className="text-input" type="text" id="rePassword" onChange={this.handleChange} placeholder="Plz Repeat. Ex: 123456" required></input>
          </div>

          <div className="resetEml">
            <h3>Current Email:</h3>
            <input className="text-input" type="text" id="curEmail" onChange={this.handleChange} placeholder="Ex: johnsmith@gg.com" required></input>
            <h3>New Email:</h3>
            <input className="text-input" type="text" id="reEmail" onChange={this.handleChange} placeholder="Ex: johnsmith@gg.com" required></input>
          </div>

        </div>

        <hr />
        <div className="p-10">
          <button type="submit" onClick={this.handleSubmit} className="btn-primary">Update Account</button>
          <button onClick={this.delAccount} className="btn-warn">Delete Account</button>
        </div>
      </div>
    )
  }
}

export default Profile;
