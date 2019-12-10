import React, { Component } from 'react';
import '../css/profileMini.css';
import logo from '../images/HC.svg';
import Cookie from '.././Utility/Cookie';

//interest field, because of the dynamic adding of interest tags
//it is more convinient to put the interest field out of the class

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileID: props.profileID,
      closeForm: props.closeForm, 
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
      accountType: "student", 
      currentProfileID: props.currentProfileID
    };

    console.log(props)

    //TODO: check if there is a token redirect to login if invalid

    this.getMiniProfile = this.getMiniProfile.bind(this);
    this.closeMiniProfile = this.closeMiniProfile.bind(this);
    this.getMiniProfile();
    
  }

  getMiniProfile(){
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
      },
      body: JSON.stringify({profileID: this.state.profileID})
    };
    try {
      fetch(
        'http://' + process.env.REACT_APP_API_HOST + '/profiles/miniProfile',
        options
      ).then(result => {
          return result.json();
        }).then(result => {
          console.log(result.result.bio)
          this.setState({
            name: result.result.name,
            profileImageUrl: result.result.profileImageUrl,
            major: result.result.major,
            studentType: result.result.studentType,
            studentYear: result.result.year,
            bio: result.result.bio,
            trueName: result.result.trueName,
            //interests: result.result.interests,
          });
          console.log(result)
          console.log(this.state)

          document.getElementById('nameTitle').textContent = result.result.name;
          
          if (result.result.bio) {
            document.getElementById('profileBio').innerHTML = result.result.bio;
          } else {
            document.getElementById('profileBio').innerHTML =
              'The user has nothing to say lol';
          }
          console.log("my true name is here", result.result.trueName)
          if (result.result.trueName) {
            if (result.result.trueName !== 'No') {
              document.getElementById('trueName').innerHTML = result.result.trueName;
            } else {

              document.getElementById('tnFields').style.display = 'none'
            }
          } else {
            document.getElementById('trueName').innerHTML = "Full name not mentioned";
          }

          if (result.result.major) {
            if (result.result.major !== 'No') {
              document.getElementById('major').innerHTML = result.result.major;
            } else {
              document.getElementById('majorFields').style.display = 'none'
            }
          } else {
            document.getElementById('major').innerHTML = 'Major not mentioned';
          }

          if (result.result.studentType) {
            if (result.result.major !== 'No') {
              document.getElementById('studentType').innerHTML = result.result.studentType
            } else {
              document.getElementById('tFields').style.display = 'none'
            }
          } else {
            document.getElementById('studentType').innerHTML = 'Degree not mentioned'
          }

          if (result.result.year) {
            if (result.result.major !== 'No') {
              document.getElementById('studentYear').innerHTML = result.result.year
            } else {
              document.getElementById('yearFields').style.display = 'none'
            }
          } else {
            document.getElementById('studentYear').innerHTML = "Year not mentioned"
          }

          if (!result.result.interests || result.result.interests === 'No') {
            document.getElementById('interestCollection').style.display = 'none'
            this.setState({
              interests: [],
            });
          } else {
            this.setState({
              interests: result.result.interests
            })
          }

        });
    } catch (err) {
      console.log(err);
    }
  }

  closeMiniProfile(){
    this.state.closeForm();
  }



  //TO DO, for some reason the button part does not work
  //TO DO, when jump to another page, the another page seems to losing all its css.
  render() {
    return (
      <div id='profilePageMini' className='d-block m-auto bg-primary p-fixed border-lg border-round-small'>
        {' '}
        <div className='heading'>
          <div><img src={logo} alt='' width='50px' /> <h1>Hoosier Connection</h1></div>
          <i onClick={this.closeMiniProfile} className="text-secondary cursor-pointer d-inline fas fa-times"></i>
        </div>
        <hr />
        <div className='headshot p-10'>
          <img id='profileImageUrl' src={'http://' + process.env.REACT_APP_API_HOST + this.state.profileImageUrl } alt='' />
          <div className='profileName container'>
            <h1 id='nameTitle'>Undefined</h1>
            <button onClick={this.logout} className='btn-primary'>
              Add Friends
              </button>
          </div>

        </div>

        <div className='profilebio p-10'>
          
          <h3>About {this.state.name}: </h3>
          <h4 id='profileBio'>{this.state.bio}</h4>
        </div>

        <ul className='basicInfo p-10 text-roboto'>
          <li id="tnFields" className="space-between nameFields">
            <h3>{this.state.name}'s Name: </h3>
            <h4 id='trueName'></h4>
          </li>
          <li id="tFields" className="space-between degreeFields">
            <h3>{this.state.name}'s Degree:</h3>
            <h4 id='studentType'></h4>
          </li>
          <li id="yearFields" className="space-between yearFields">
            <h3>{this.state.name}'s Year:</h3>
            <h4 id="studentYear"></h4>
          </li>
          <li id="majorFields" className="space-between majorFields">
            <h3>{this.state.name}'s Major: </h3>
            <h4 id='major'></h4>
          </li>
        </ul>
          
          <div id="interestCollection" className='interest p-10'>
              <h3>Your Interests: </h3>
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
          </div>
        
        <div className='p-10'>
          
        </div>
      </div>
    );
  }
}

export default Profile;

