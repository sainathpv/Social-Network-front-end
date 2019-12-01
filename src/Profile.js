import React, { Component } from 'react';
import './css/profile.css';
import logo from './images/HC.svg';
import DropDownMenu from './Utility/DropDown';
import Cookie from './Utility/Cookie';

//interest field, because of the dynamic adding of interest tags
//it is more convinient to put the interest field out of the class

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "", profileImageUrl: "", major: "", studentType: "", studentYear: "", bio: "", trueName: "",
      posts: [], events: [], friends: [], chats: [], interests: [],
      changed: false, profileImageChanged: false, profileImage: "",
      curPsw: "", newPsw: "", reNewPsw: "",
      curEmail: "", varifyCode: "", newEmail: "",
    }
    //TODO: check if there is a token redirect to login if invalid

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getProfileData = this.getProfileData.bind(this);

    this.addInterest = this.addInterest.bind(this);
    this.handleInterestChange = this.handleInterestChange.bind(this);
    this.delInterest = this.delInterest.bind(this);
    this.changeStudentType = this.changeStudentType.bind(this);
    this.changeStudentYear = this.changeStudentYear.bind(this);
    this.changeImg = this.changeImg.bind(this);
    this.handlePswChange = this.handlePswChange.bind(this);
    this.resetPsw = this.resetPsw.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleNewEmailChange = this.handleNewEmailChange.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.getProfileData();

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

        this.setState({
          name: result.name,
          profileImageUrl: result.profileImageUrl,
          major: result.major,
          studentType: result.studentType,
          studentYear: result.year,
          settings: result.settings,
          posts: result.posts,
          events: result.events,
          friends: friends,
          chats: result.chats,
          bio: result.bio,
          trueName: result.trueName,
          interests: result.interests
        });

        //console.log(result)
        //console.log("my student type: " + this.state.studentType);
        //console.log("my student year: " + this.state.studentYear);
        console.log(result.profileImageUrl)
        document.getElementById("nameTitle").textContent = result.name;
        document.getElementById("trueName").placeholder = result.trueName;
        document.getElementById("name").placeholder = result.name;
        var ddm = document.getElementById("ddm")
        console.log(ddm.innerHTML)
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

        if (!result.studentType) {
          this.state.studentType = "Undergraduate";
        }
        if (!result.studentYear) {
          this.state.studentYear = "Freshman";
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
      trueName: document.getElementById('trueName').value,
      name: document.getElementById('name').value,
      major: document.getElementById('major').value,
      changed: true,
    });
  }

  //handle the 'edit profile' button, update all editted informaion
  handleSubmit(event) {
    var imageUrl = "";
    console.log(imageUrl)
    event.preventDefault();
    if (this.state.profileImageChanged) {
      const formdata = new FormData();
      formdata.append('image', this.state.profileImage, this.state.profileImage.name);
      var reader = new FileReader();
      reader.readAsDataURL(this.state.profileImage);
      reader.onload = (eventImg) => {

        var options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
          },
          body: JSON.stringify({ image: eventImg.target.result })
        };
        fetch("http://" + process.env.REACT_APP_API_HOST + "/profiles/editProfileImage", options).then(result => {
          return result.json();
        }).then(result => {
          imageUrl = result.url
        }).catch(err => {
          document.getElementById("profileImgWarning").textContent = "Your image is too large!";
        });
      }
    }

    console.log(imageUrl)


    if (this.state.changed) {
      var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
        },
        body: JSON.stringify({
          bio: this.state.bio,
          trueName: this.state.trueName,
          name: this.state.name,
          major: this.state.major,
          studentType: this.state.studentType,
          studentYear: this.state.studentYear,
          profileImageUrl: imageUrl,
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
          //location.reload();

        });
    } else {/*TODO notify the user of the bad match*/ }
    //TODO: post request to Sai's route with contents of key
  }

  //add interest to html and backend database
  addInterest() {
    document.getElementById("interestWarning").textContent = "";
    var newInterest = document.getElementById('inputInterest').value
    if (this.state.interests.includes(newInterest)) {
      document.getElementById("interestWarning").textContent = "Your new interest already exists in the list";
    } else if (newInterest === "") {
      document.getElementById("interestWarning").textContent = "Your input interest is empty";
    } else {
      document.getElementById('inputInterest').value = ''
      this.state.interests.push(newInterest);
      this.setState({ changed: true });
      console.log(this.state.interests)
      var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
        },
        body: JSON.stringify({
          interests: this.state.interests
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


  delInterest(i) {
    var currentInterest = document.getElementById("interest" + i)
    currentInterest.parentElement.removeChild(currentInterest)

    this.state.interests.splice(i, 1);

    console.log(this.state.interests)

    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
      },
      body: JSON.stringify({
        interests: this.state.interests
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

  handleInterestChange(event) {
    document.getElementById("interestWarning").textContent = "";
    if (event.key === 'Enter') {
      document.getElementById("addInterestButton").click();
    }
  }




  changeStudentType(sType) {
    event.preventDefault();

    if (sType == 'ph.d.') {
      sType = 'Ph.D.'
    } else {
      sType = sType[0].toUpperCase() + sType.slice(1);
    }
    this.setState({ studentType: sType });
    this.state.changed = true
  }

  changeStudentYear(sYear) {
    event.preventDefault();
    this.setState({ studentYear: sYear });
    this.state.changed = true
  }

  changeImg(event) {
    var inputImg = event.target.files[0];
    var acceptedimages = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!acceptedimages.includes(inputImg.type)) {
      document.getElementById("profileImgWarning").textContent = "NOT a valid image file!";
    } else {
      this.setState({ profileImage: inputImg });
      var reader = new FileReader();

      var profileImg = document.getElementById("profileImageUrl");

      reader.onload = function (event) {
        profileImg.src = event.target.result
      };
      reader.readAsDataURL(inputImg);
      this.state.profileImageChanged = true;
      this.state.changed = true;
    }
  }

  //jump back to homepage, the href link needs to be changed to server after
  swapToHome() { window.location.href = "http://localhost:3000/"; }

  handlePswChange(event) {
    document.getElementById("resetPswWarning").textContent = "";
    this.setState({
      curPsw: document.getElementById("curPassword").value,
      newPsw: document.getElementById("newPassword").value,
      reNewPsw: document.getElementById("rePassword").value,
    });

  }

  resetPsw() {
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
      },
      body: JSON.stringify({
        password: this.state.curPsw
      })
    };
    fetch('http://' + process.env.REACT_APP_API_HOST + '/resetCritical/confirmPsw', options)
      .then(result => {
        if (result.status === 200) {
          return result.json();
        } else {
          result.json().then(nr => {
            document.getElementById("resetPswWarning").textContent = nr.message;
          })
          console.log('failed');
          return null;
        }
      }).then(result => {
        if (result) {
          if (this.state.newPsw === this.state.reNewPsw) {
            var options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
              },
              body: JSON.stringify({
                password: this.state.newPsw
              })
            };
            fetch('http://' + process.env.REACT_APP_API_HOST + '/resetCritical/resetPsw', options)
              .then(result => {
                if (result.status === 200) {
                  return result.json();
                } else {
                  result.json().then(nr => {
                    document.getElementById("resetPswWarning").textContent = nr.message;
                  })
                  console.log(result);
                  return null;
                }
              }).then(result => {
                if (result) {
                  console.log("we did it");
                }
              });
          } else {
            document.getElementById("resetPswWarning").textContent = "re-entered password mismatched!";
          }
        }
      });
  }

  handleEmailChange(event) {
    this.setState({
      curEmail: document.getElementById("curEmail").value,
    });
  }

  handleCodeChange(event) {
    this.setState({
      varifyCode: document.getElementById("varifyCode").value,
    });
  }

  handleNewEmailChange(event) {
    this.setState({
      newEmail: document.getElementById("newEmail").value,
    });
  }

  sendCode() {
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
      },
      body: JSON.stringify({
        email: this.state.curEmail
      })
    };
    fetch('http://' + process.env.REACT_APP_API_HOST + '/resetCritical/sendEmailValCode', options)
      .then(result => {
        if (result.status === 200) {
          return result.json();
        } else {
          result.json().then(nr => {
            document.getElementById("resetEmailWarning").textContent = nr.message;
          })
          console.log(result);
          return null;
        }
      }).then(result => {
        if (result) {
          console.log("we did it");
        }
      });
  }

  delAccount() { }

  logout() { }



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
            <img id="profileImageUrl" src={"http://" + process.env.REACT_APP_API_HOST + this.state.profileImageUrl} alt='' />
            <div className="container">
              <h1 id="nameTitle">Undefined</h1>
              <br />
            </div>
            <input type="file" onChange={this.changeImg}></input>
            <br /><br />
            <h4 id="profileImgWarning"></h4>
          </div>
          <div className="profilebio">
            <h3>Bio: </h3>
            <textarea id="profileBio" onChange={this.handleChange} placeholder='Ex: A little section dedicated to you!'></textarea>
          </div>
        </div>
        <hr />
        <div className="basicInfo d-flex space-between p-10">
          <div className="studentInfo">
            <h3>Your Name: </h3>
            <input className="text-input" type="text" id="trueName" onChange={this.handleChange} placeholder="Ex: John Smith" required></input>
            <h3>Username: </h3>
            <input className="text-input" type="text" id="name" onChange={this.handleChange} placeholder="Ex: johnsmith" required></input>
            <h3>Major: </h3>
            <input className="text-input" type="text" id="major" onChange={this.handleChange} placeholder="Ex: Computer Science" required></input>
            <div className="dropDownMenu" id="ddm">
              <h3>Student Type:</h3>
              {this.state.studentType != "" ?
                <DropDownMenu items={["Undergraduate", "Master", "Ph.D."]} label={this.state.studentType} handle={this.changeStudentType} /> : ""}
              <h3>Current Year:</h3>
              {this.state.studentYear != "" ?
                <DropDownMenu items={["Freshman", "Sophomore", "Junior", "Senior"]} label={this.state.studentYear} handle={this.changeStudentYear} /> : ""}
            </div>
          </div>
          <br />
          <div className="interestHeading">
            <h3>Your Interests: </h3>
            <input className="text-input" type="text" id="inputInterest" onKeyDown={this.handleInterestChange} placeholder="Ex: Fortnite" required></input>
            <button onClick={this.addInterest} className="btn-primary" id="addInterestButton">Add Interest</button>
            <br />
            <ul id="interestsList" className="myList border-lg border-round-small">
              {
                this.state.interests.map((interest, i) => {
                  return (
                    <button onClick={() => this.delInterest(i)} id={"interest" + i} key={i}>{interest}</button>)
                })
              }
            </ul>
            <br /><br />
            <h4 id="interestWarning"> </h4>
          </div>
        </div>
        <div className="p-10">
          <button type="submit" onClick={this.handleSubmit} className="btn-primary">Update Profile</button>
        </div>
        <hr />
        <div className="criticalInfo p-10">
          <div className="resetPsw">
            <h3>Current Password:</h3>
            <input className="text-input" type="text" id="curPassword" onChange={this.handlePswChange} placeholder="Ex: 123456" required></input>
            <h3>New Password:</h3>
            <input className="text-input" type="text" id="newPassword" onChange={this.handlePswChange} placeholder="Ex: 123456" required></input>
            <h3>Re-enter New Password:</h3>
            <input className="text-input" type="text" id="rePassword" onChange={this.handlePswChange} placeholder="Ex: 123456" required></input>
            <br />
            <h4 id="resetPswWarning"></h4>
            <br />
            <button onClick={this.resetPsw} className="btn-primary">Reset Password</button>
          </div>
          <div className="resetEml">
            <h3>Current Email:</h3>
            <input className="text-input" type="text" id="curEmail" onChange={this.handleEmailChange} placeholder="Ex: johnsmith@gg.com" required></input>
            <button onClick={this.sendCode} className="btn-primary">Send</button>
            <h3>Varification:</h3>
            <input className="text-input" type="text" id="varifyCode" onChange={this.handleCodeChange} placeholder="Code from your email" required></input>
            
            <h3>New Email:</h3>
            <input className="text-input" type="text" id="newEmail" onChange={this.handleNewEmailChange} placeholder="Ex: johnsmith@gg.com" required></input>
            
            <br /><h4 id="resetEmailWarning"></h4><br />
            <button onClick={this.resetEmail} className="btn-primary">Reset Email</button>
          </div>
        </div>
        <hr />
        <div className="p-10">
          <button onClick={this.delAccount} className="btn-warn">Delete Profile</button>
        </div>
      </div>
    )
  }
}

export default Profile;
