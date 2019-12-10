import React, { Component } from 'react';
import '../css/profile.css';
import logo from './../images/hc_white.png';
import DropDownMenu from '../Utility/DropDown';
import Cookie from '.././Utility/Cookie';
import person from '../images/person-generic.jpg';
import show from '../images/show.png';
import hide from '../images/hide.png';

//interest field, because of the dynamic adding of interest tags
//it is more convinient to put the interest field out of the class

var changedOutSide = false

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      profileImageUrl: '',
      major: '',
      studentType: '',
      studentYear: '',
      bio: '',
      trueName: '',
      posts: [],
      events: [],
      friends: [],
      chats: [],
      interests: [],
      changed: false,
      profileImageChanged: false,
      profileImage: '',
      curPsw: '',
      newPsw: '',
      reNewPsw: '',
      curEmail: '',
      varifyCode: '',
      newEmail: '',
      hided: {
        trueName: false,
        name: false,
        major: false,
        studentType: false,
        year: false,
        interests: false
      },
      accountType: "student",
      setting: "",
      darkmode: 'Off',
      showOnlyToFriends: 'to All',
      censor: 'Off'
    };
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
    this.resetEmail = this.resetEmail.bind(this);
    this.getFriendsData = this.getFriendsData.bind(this);
    this.delAccount = this.delAccount.bind(this);
    this.hideShowtrueName = this.hideShowtrueName.bind(this);
    this.hideShowMajor = this.hideShowMajor.bind(this);
    this.hideShowDegree = this.hideShowDegree.bind(this);
    this.hideShowYear = this.hideShowYear.bind(this);
    this.hideShowInterest = this.hideShowInterest.bind(this);
    this.switchDarkMode = this.switchDarkMode.bind(this);
    this.switchShowPost = this.switchShowPost.bind(this);
    this.switchCensor = this.switchCensor.bind(this)

    this.getProfileData();
    this.getFriendsData();
  }

  switchCensor() {
    console.log(this.state)
    this.setState({ changed: true });
    changedOutSide = true
    if (this.state.setting.censor) {
      this.setState({
        censor: 'Off'
      })
      this.setState({
        setting: {
          darkmode: this.state.setting.darkmode,
          postsSeenOnlyByFriends: this.state.setting.postsSeenOnlyByFriends,
          censor: false
        }
      });
    } else {
      this.setState({
        censor: 'On'
      })
      this.setState({
        setting: {
          darkmode: this.state.setting.darkmode,
          postsSeenOnlyByFriends: this.state.setting.postsSeenOnlyByFriends,
          censor: true
        }
      });
    }
  }


  switchDarkMode() {
    this.setState({ changed: true });
    changedOutSide = true
    if (this.state.setting.darkmode) {
      this.setState({
        darkmode: 'Off'
      })
      this.setState({
        setting: {
          darkmode: false,
          postsSeenOnlyByFriends: this.state.setting.postsSeenOnlyByFriends,
          censor: this.state.setting.censor
        }
      });
    } else {
      this.setState({
        darkmode: 'On'
      })
      this.setState({
        setting: {
          darkmode: true,
          postsSeenOnlyByFriends: this.state.setting.postsSeenOnlyByFriends,
          censor: this.state.setting.censor
        }
      });
    }
  }

  switchShowPost() {
    this.setState({ changed: true });
    changedOutSide = true
    if (this.state.setting.postsSeenOnlyByFriends) {
      this.setState({
        showOnlyToFriends: 'to All'
      })
      this.setState({
        setting: {
          darkmode: this.state.setting.darkmode,
          postsSeenOnlyByFriends: false,
          censor: this.state.setting.censor
        }
      });
    } else {
      this.setState({
        showOnlyToFriends: 'Only to Friends'
      })
      this.setState({
        setting: {
          darkmode: this.state.setting.darkmode,
          postsSeenOnlyByFriends: true,
          censor: this.state.setting.censor
        }
      });
    }
  }

  //Initialize the data in profile page
  getProfileData() {
    window.addEventListener('beforeunload', function (e) {
      if (changedOutSide) {
        document.getElementById("profileWarning").textContent = "Please Click This To Save Changes"
        //following two lines will cause the browser to ask the user if they
        //want to leave. The text of this dialog is controlled by the browser.
        e.preventDefault(); //per the standard
        e.returnValue = ''; //required for Chrome
      }
      //else: user is allowed to leave without a warning dialog
    });
    var options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
      }
    };
    try {
      fetch(
        'http://' + process.env.REACT_APP_API_HOST + '/profiles/profile',
        options
      )
        .then(result => {
          return result.json();
        })
        .then(result => {
          if (result.accountType == 'company') {
            window.location.href = '/profileCompany';
          }
          if (result.settings.darkmode) {
            document.body.className = 'darkmode';
          } else {
            document.body.className = '';
          }
          this.setState({
            name: result.name,
            profileImageUrl: result.profileImageUrl,
            major: result.major,
            studentType: result.studentType,
            studentYear: result.year,
            setting: result.settings,
            posts: result.posts,
            events: result.events,
            chats: result.chats,
            bio: result.bio,
            trueName: result.trueName,
            interests: result.interests
          });
          console.log(result)
          if (result.settings.darkmode) {
            console.log('dark mode on')
            this.setState({
              darkmode: 'On'
            })
          }

          if (result.settings.postsSeenOnlyByFriends) {
            this.setState({
              showOnlyToFriends: "Only to Friends"
            })
          }
          if (result.settings.censor) {
            this.setState({
              censor: "On"
            })
          }

          if (result.hided) {
            this.setState({
              hided: result.hided
            });
          }

          if (result.hided) {
            this.setState({
              hided: result.hided
            });
          }

          if (result.hided.trueName) {
            document.getElementById('trueNameFields').src = hide;
          }

          if (result.hided.studentType) {
            document.getElementById('degreeFields').src = hide;
          }

          if (result.hided.year) {
            document.getElementById('yearFields').src = hide;
          }

          if (result.hided.major) {
            document.getElementById('majorFields').src = hide;
          }

          if (result.hided.interests) {
            document.getElementById('interestFields').src = hide;
          }

          document.getElementById('nameTitle').textContent = result.name;
          document.getElementById('trueName').placeholder = result.trueName;
          document.getElementById('name').placeholder = result.name;
          var ddm = document.getElementById('ddm');
          console.log(ddm.innerHTML);
          if (result.bio !== '') {
            document.getElementById('profileBio').placeholder = result.bio;
          } else {
            document.getElementById('profileBio').placeholder =
              'A little section devoted to everything about you.';
          }

          if (result.major !== '') {
            document.getElementById('major').placeholder = result.major;
          } else {
            document.getElementById('major').placeholder = 'Major Unknown';
          }

          if (!result.studentType) {
            this.state.studentType = 'Undergraduate';
          }
          if (!result.studentYear) {
            this.state.studentYear = 'Freshman';
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
      changed: true
    });
    changedOutSide = true
  }

  //handle the 'edit profile' button, update all editted informaion
  handleSubmit(event) {
    var imageUrl = '';
    console.log(imageUrl);
    event.preventDefault();
    if (this.state.profileImageChanged) {
      const formdata = new FormData();
      formdata.append(
        'image',
        this.state.profileImage,
        this.state.profileImage.name
      );
      var reader = new FileReader();
      reader.readAsDataURL(this.state.profileImage);
      reader.onload = eventImg => {
        var options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
          },
          body: JSON.stringify({ image: eventImg.target.result })
        };
        fetch(
          'http://' +
          process.env.REACT_APP_API_HOST +
          '/profiles/editProfileImage',
          options
        )
          .then(result => {
            return result.json();
          })
          .then(result => {
            imageUrl = result.url;
          })
          .catch(err => {
            document.getElementById('profileImgWarning').textContent =
              'Your image is too large!';
          });
      };
    }

    console.log(imageUrl);

    if (this.state.changed) {
      var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
        },
        body: JSON.stringify({
          bio: this.state.bio,
          trueName: this.state.trueName,
          name: this.state.name,
          major: this.state.major,
          studentType: this.state.studentType,
          studentYear: this.state.studentYear,
          profileImageUrl: imageUrl,
          hided: this.state.hided,
          settings: this.state.setting
        })
      };
      fetch(
        'http://' + process.env.REACT_APP_API_HOST + '/profiles/editprofile',
        options
      )
        .then(result => {
          if (result.status === 201) {
            return result.json();
          } else {
            console.log('failed');
            return null;
          }
        })
        .then(result => {
          this.setState({
            changed: false
          })
          changedOutSide = false 
          location.reload();
        });
    } else {
      /*TODO notify the user of the bad match*/
    }
    //TODO: post request to Sai's route with contents of key
  }

  //add interest to html and backend database
  addInterest() {
    document.getElementById('interestWarning').textContent = '';
    var newInterest = document.getElementById('inputInterest').value;
    if (this.state.interests.includes(newInterest)) {
      document.getElementById('interestWarning').textContent =
        'Your new interest already exists in the list';
    } else if (newInterest === '') {
      document.getElementById('interestWarning').textContent =
        'Your input interest is empty';
    } else {
      document.getElementById('inputInterest').value = '';
      this.state.interests.push(newInterest);
      this.setState({ changed: true });
      changedOutSide = true
      console.log(this.state.interests);
      var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
        },
        body: JSON.stringify({
          interests: this.state.interests
        })
      };
      fetch(
        'http://' +
        process.env.REACT_APP_API_HOST +
        '/profiles/editprofile_interest',
        options
      )
        .then(result => {
          if (result.status === 201) {
            return result.json();
          } else {
            console.log('failed');
            return null;
          }
        })
        .then(result => { });
    }
  }

  delInterest(i) {
    var currentInterest = document.getElementById('interest' + i);
    currentInterest.parentElement.removeChild(currentInterest);

    this.state.interests.splice(i, 1);

    console.log(this.state.interests);

    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
      },
      body: JSON.stringify({
        interests: this.state.interests
      })
    };

    fetch(
      'http://' +
      process.env.REACT_APP_API_HOST +
      '/profiles/editprofile_interest',
      options
    )
      .then(result => {
        if (result.status === 201) {
          return result.json();
        } else {
          console.log('failed');
          return null;
        }
      })
      .then(result => { });
  }

  handleInterestChange(event) {
    document.getElementById('interestWarning').textContent = '';
    if (event.key === 'Enter') {
      document.getElementById('addInterestButton').click();
    }
  }

  changeStudentType(sType) {
    event.preventDefault();

    if (sType == 'ph.d.') {
      sType = 'Ph.D.';
    } else {
      sType = sType[0].toUpperCase() + sType.slice(1);
    }
    this.setState({ studentType: sType });
    this.state.changed = true;
    changedOutSide = true
  }

  changeStudentYear(sYear) {
    event.preventDefault();
    this.setState({ studentYear: sYear });
    this.state.changed = true;
    changedOutSide = true
  }

  changeImg(event) {
    var inputImg = event.target.files[0];
    var acceptedimages = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!acceptedimages.includes(inputImg.type)) {
      document.getElementById('profileImgWarning').textContent =
        'NOT a valid image file!';
    } else {
      this.setState({ profileImage: inputImg });
      var reader = new FileReader();

      var profileImg = document.getElementById('profileImageUrl');

      reader.onload = function (event) {
        profileImg.src = event.target.result;
      };
      reader.readAsDataURL(inputImg);
      this.state.profileImageChanged = true;
      this.state.changed = true;
      changedOutSide = true
    }
  }

  //jump back to homepage, the href link needs to be changed to server after
  swapToHome() {
    window.location.href = 'http://localhost:3000/';
  }

  handlePswChange(event) {
    document.getElementById('resetPswWarning').textContent = '';
    this.setState({
      curPsw: document.getElementById('curPassword').value,
      newPsw: document.getElementById('newPassword').value,
      reNewPsw: document.getElementById('rePassword').value
    });
  }

  resetPsw() {
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
      },
      body: JSON.stringify({
        password: this.state.curPsw
      })
    };
    fetch(
      'http://' + process.env.REACT_APP_API_HOST + '/resetCritical/confirmPsw',
      options
    )
      .then(result => {
        if (result.status === 200) {
          return result.json();
        } else {
          result.json().then(nr => {
            document.getElementById('resetPswWarning').textContent = nr.message;
          });
          console.log('failed');
          return null;
        }
      })
      .then(result => {
        if (result) {
          if (this.state.newPsw === this.state.reNewPsw) {
            var options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
              },
              body: JSON.stringify({
                password: this.state.newPsw
              })
            };
            fetch(
              'http://' +
              process.env.REACT_APP_API_HOST +
              '/resetCritical/resetPsw',
              options
            )
              .then(result => {
                if (result.status === 200) {
                  return result.json();
                } else {
                  result.json().then(nr => {
                    document.getElementById('resetPswWarning').textContent =
                      nr.message;
                  });
                  console.log(result);
                  return null;
                }
              })
              .then(result => {
                if (result) {
                  document.getElementById('resetPswWarning').textContent =
                    'Password changed!';
                }
              });
          } else {
            document.getElementById('resetPswWarning').textContent =
              're-entered password mismatched!';
          }
        }
      });
  }

  handleEmailChange(event) {
    this.setState({
      curEmail: document.getElementById('curEmail').value
    });
  }

  handleCodeChange(event) {
    this.setState({
      varifyCode: document.getElementById('varifyCode').value
    });
  }

  handleNewEmailChange(event) {
    this.setState({
      newEmail: document.getElementById('newEmail').value
    });
  }

  sendCode() {
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
      },
      body: JSON.stringify({
        email: this.state.curEmail
      })
    };
    fetch(
      'http://' +
      process.env.REACT_APP_API_HOST +
      '/resetCritical/sendEmailValCode',
      options
    )
      .then(result => {
        if (result.status === 200) {
          return result.json();
        } else {
          result.json().then(nr => {
            document.getElementById('resetEmailWarning').textContent =
              nr.message;
          });
          console.log(result);
          return null;
        }
      })
      .then(result => {
        if (result) {
          console.log('we did it');
        }
      });
  }

  resetEmail() {
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
      },
      body: JSON.stringify({
        resetEmailToken: this.state.varifyCode,
        email: this.state.newEmail
      })
    };
    fetch(
      'http://' + process.env.REACT_APP_API_HOST + '/resetCritical/resetEmail',
      options
    )
      .then(result => {
        if (result.status === 200) {
          return result.json();
        } else {
          result.json().then(nr => {
            document.getElementById('resetEmailWarning').textContent =
              nr.message;
          });
          console.log(result);
          return null;
        }
      })
      .then(result => {
        if (result) {
          console.log('we did it');
        }
      });
  }

  getFriendsData() {
    try {
      var options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
        }
      };
      fetch('http://' + process.env.REACT_APP_API_HOST + '/friends', options)
        .then(result => {
          return result.json();
        })
        .then(result => {
          console.log(result.friends);
          this.setState({
            friends: result.friends
          });
        });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  logout() {
    console.log('logout successful');
    Cookie.deleteCookie('HC_JWT');
    window.location.href = '/login';
  }

  delAccount() {
    if (
      confirm(
        'Are you sure you want to delete your account? \nAll your data will be deleted and there will be no way to retrieve them!'
      )
    ) {
      try {
        var options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
          }
        };
        fetch(
          'http://' + process.env.REACT_APP_API_HOST + '/users/deleteUser',
          options
        )
          .then(result => {
            if (result.status === 200) {
              return result.json();
            } else {
              result.json().then(nr => {
                document.getElementById('resetEmailWarning').textContent =
                  nr.message;
              });
              console.log(result);
              return null;
            }
          })
          .then(result => {
            if (result) {
              alert(result.message, '\n\nPlease refresh the page');
              window.location.href = '/login';
            }
          });
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }

  hideShowtrueName() {
    if (this.state.hided.trueName) {
      this.state.hided.trueName = false;
      document.getElementById('trueNameFields').src = show;
    } else {
      this.state.hided.trueName = true;
      document.getElementById('trueNameFields').src = hide;
    }
    console.log(this.state.hided);
    this.state.changed = true;
    changedOutSide = true
  }

  hideShowMajor() {
    if (this.state.hided.major) {
      this.state.hided.major = false;
      document.getElementById('majorFields').src = show;
    } else {
      this.state.hided.major = true;
      document.getElementById('majorFields').src = hide;
    }
    console.log(this.state.hided);
    this.state.changed = true;
    changedOutSide = true

  }

  hideShowDegree() {
    if (this.state.hided.studentType) {
      this.state.hided.studentType = false;
      document.getElementById('degreeFields').src = show;
    } else {
      this.state.hided.studentType = true;
      document.getElementById('degreeFields').src = hide;
    }
    console.log(this.state.hided);
    this.state.changed = true;
    changedOutSide = true
  }

  hideShowYear() {
    if (this.state.hided.year) {
      this.state.hided.year = false;
      document.getElementById('yearFields').src = show;
    } else {
      this.state.hided.year = true;
      document.getElementById('yearFields').src = hide;
    }
    console.log(this.state.hided);
    this.state.changed = true;
    changedOutSide = true
  }

  hideShowInterest() {
    if (this.state.hided.interests) {
      this.state.hided.interests = false;
      document.getElementById('interestFields').src = show;
    } else {
      this.state.hided.interests = true;
      document.getElementById('interestFields').src = hide;
    }
    console.log(this.state.hided);
    this.state.changed = true;
    changedOutSide = true
  }
  //TO DO, for some reason the button part does not work
  //TO DO, when jump to another page, the another page seems to losing all its css.
  render() {
    return (
      <div id='profilePage' className='bg-primary text-primary'>
        {' '}
        <div className='heading'>
          <div>
            <img src={logo} alt='' width='50px' /> <h1>Hoosier Connection</h1>
          </div>
          <div>
            <a className='text-white' href='../'>
              <i className='fas fa-arrow-left'></i> Back To Dashboard
            </a>
          </div>
        </div>
        <hr />
        <br />
        <div className='imgAndBio p-10'>
          <div className='profileimg'>
            <img
              id='profileImageUrl'
              src={
                'http://' +
                process.env.REACT_APP_API_HOST +
                this.state.profileImageUrl
              }
              alt=''
            />
            <div className='container'>
              <h1 id='nameTitle'>Undefined</h1>
            </div>

            <div class='upload-btn-wrapper'>
              <button class='btn'>Upload photo</button>
              <input type='file' name='myfile' onChange={this.changeImg} />
            </div>

            <br />
            <br />
            <h4 id='profileImgWarning'></h4>
          </div>
          <div className='profilebio'>
            <h3>
              {' '}
              <b>About You: </b>
            </h3>
            <textarea
              id='profileBio'
              onChange={this.handleChange}
              placeholder='Ex: A little section dedicated to you!'
            ></textarea>

            <div className="setting">
              <button id="darkmode" className="darkmode" onClick={this.switchDarkMode}>Darkmode {this.state.darkmode}</button>
              <button id="showPostToFriend" className="showPostToFriend" onClick={this.switchShowPost}>Show Post {this.state.showOnlyToFriends}</button>
              <button id="censor" className="censor" onClick={this.switchCensor}>Language Censor {this.state.censor}</button>
            </div>
          </div>
        </div>
        <hr />
        <div className='basicInfo d-flex space-between p-10'>
          <div className='studentInfo'>
            <h3>Username: </h3>
            <input
              className='text-input'
              type='text'
              id='name'
              onChange={this.handleChange}
              placeholder='Ex: johnsmith'
              required
            ></input>
            <div className='fields'>
              <input
                type='image'
                id='trueNameFields'
                src={show}
                onClick={this.hideShowtrueName}
              ></input>
              <h3>Your Name: </h3>
            </div>
            <input
              className='text-input'
              type='text'
              id='trueName'
              onChange={this.handleChange}
              placeholder='Ex: John Smith'
              required
            ></input>

            <div className='dropDownMenu' id='ddm'>
              <div>
                <div className='fields'>
                  <input
                    type='image'
                    id='degreeFields'
                    src={show}
                    onClick={this.hideShowDegree}
                  ></input>
                  <h3>Degree:</h3>
                </div>
                {this.state.studentType != '' ? (
                  <DropDownMenu
                    items={['Undergraduate', 'Master', 'Ph.D.']}
                    label={this.state.studentType}
                    handle={this.changeStudentType}
                  />
                ) : (
                    ''
                  )}
              </div>
              <div>
                <div className='fields'>
                  <input
                    type='image'
                    id='yearFields'
                    src={show}
                    onClick={this.hideShowYear}
                  ></input>
                  <h3>Year:</h3>
                </div>
                {this.state.studentYear != '' ? (
                  <DropDownMenu
                    items={['Freshman', 'Sophomore', 'Junior', 'Senior']}
                    label={this.state.studentYear}
                    handle={this.changeStudentYear}
                  />
                ) : (
                    ''
                  )}
              </div>
            </div>
          </div>
          <br />
          <div className='interestHeading'>
            <div className='fields'>
              <input
                type='image'
                id='majorFields'
                src={show}
                onClick={this.hideShowMajor}
              ></input>
              <h3>Major: </h3>
            </div>
            <input
              className='text-input'
              type='text'
              id='major'
              onChange={this.handleChange}
              placeholder='Ex: Computer Science'
              required
            ></input>
            <div className='fields'>
              <input
                type='image'
                id='interestFields'
                src={show}
                onClick={this.hideShowInterest}
              ></input>
              <h3>Your Interests: </h3>
            </div>
            <input
              className='text-input'
              type='text'
              id='inputInterest'
              onKeyDown={this.handleInterestChange}
              placeholder='Ex: Fortnite'
              required
            ></input>
            <button
              onClick={this.addInterest}
              className='btn-primary'
              id='addInterestButton'
            >
              Add Interest
            </button>
            <br />
            <ul
              id='interestsList'
              className='myList border-lg border-round-small'
            >
              {this.state.interests.map((interest, i) => {
                return (
                  <button
                    onClick={() => this.delInterest(i)}
                    id={'interest' + i}
                    key={i}
                  >
                    {interest}
                  </button>
                );
              })}
            </ul>
            <br />
            <br />
            <h4 id='interestWarning'> </h4>
          </div>
        </div>
        <div className='p-10'>
          <button
            type='submit'
            onClick={this.handleSubmit}
            className='btn-primary'
          >
            Update Profile
          </button>
          <p id="profileWarning"></p>
        </div>
        <hr />
        <div className='criticalInfo p-10'>
          <div className='resetPsw'>
            <h3>Current Password:</h3>
            <input
              className='text-input'
              type='text'
              id='curPassword'
              onChange={this.handlePswChange}
              placeholder='Ex: 123456'
              required
            ></input>
            <h3>New Password:</h3>
            <input
              className='text-input'
              type='text'
              id='newPassword'
              onChange={this.handlePswChange}
              placeholder='Ex: 123456'
              required
            ></input>
            <h3>Re-enter New Password:</h3>
            <input
              className='text-input'
              type='text'
              id='rePassword'
              onChange={this.handlePswChange}
              placeholder='Ex: 123456'
              required
            ></input>
            <br />

            <br />
            <button onClick={this.resetPsw} className='btn-primary'>
              Reset Password
            </button>
            <br />
            <h4 id='resetPswWarning'></h4>
          </div>
          <div className='resetEml'>
            <h3>Current Email:</h3>
            <input
              className='text-input'
              type='text'
              id='curEmail'
              onChange={this.handleEmailChange}
              placeholder='Ex: johnsmith@gg.com'
              required
            ></input>
            <button onClick={this.sendCode} className='btn-primary'>
              Send
            </button>
            <h3>Varification:</h3>
            <input
              className='text-input'
              type='text'
              id='varifyCode'
              onChange={this.handleCodeChange}
              placeholder='Code from your email'
              required
            ></input>

            <h3>New Email:</h3>
            <input
              className='text-input'
              type='text'
              id='newEmail'
              onChange={this.handleNewEmailChange}
              placeholder='Ex: johnsmith@gg.com'
              required
            ></input>

            <br />
            <br />
            <button onClick={this.resetEmail} className='btn-primary'>
              Reset Email
            </button>
            <br />
            <h4 id='resetEmailWarning'></h4>
          </div>
        </div>
        <hr />
        <div className='friends_heading'>
          <h3>List of Friends: </h3>
        </div>
        <div className='friends'>
          <ul className='d-grid'>
            {
              //this.state.friends !== null prevents it from attempting to view profiles prior to fetching the friends object
            }
            {this.state.friends !== null && this.state.friends.profiles
              ? this.state.friends.profiles.map((friend, i) => {
                if (i < 9 && friend.status === 'accepted') {
                  return (
                    <li key={i}>
                      <img
                        height='50px'
                        width='50px'
                        className='d-block border-lg border-round m-auto'
                        src={
                          'http://' +
                          process.env.REACT_APP_API_HOST +
                          friend.profileIMG
                        }
                        alt={person}
                      />
                      <h5 className='text-center'>{friend.name}</h5>
                    </li>
                  );
                } else {
                  return '';
                }
              })
              : ''}
          </ul>
        </div>
        <hr />
        <div className='p-10'>
          <button onClick={this.logout} className='btn-primary'>
            Logout
          </button>
          <button onClick={this.delAccount} className='btn-warn'>
            Delete Profile
          </button>
        </div>
      </div>
    );
  }
}

export default Profile;
