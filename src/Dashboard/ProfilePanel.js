import React from 'react';
import logo from './../images/hc_white.png';
import person from './../images/person-generic.jpg';
import Cookie from './../Utility/Cookie';
class ProfilePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPostForm: props.showPostForm,
      tabOpened: false,
      panel: props.panel,
      name: '',
      profileIMG: '',
      major: '',
      studentType: '',
      year: '',
      interests: [],
      posts: [],
      events: [],
      friends: [],
      chats: []
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.expandPanel = this.expandPanel.bind(this);
    this.closePanel = this.closePanel.bind(this);
    this.findFriend = this.findFriend.bind(this);
    this.getProfileData = this.getProfileData.bind(this);
    this.getProfileData();
  }

  getProfileData() {
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
          if (result.settings.darkmode) {
            document.body.className = 'darkmode';
          } else {
            document.body.className = '';
          }
          this.setState({
            name: result.name,
            accountType: result.accountType,
            profileIMG: result.profileImageUrl,
            major: result.major,
            studentType: result.studentType,
            year: result.year,
            settings: result.settings,
            interests: result.interests,
            posts: result.posts,
            events: result.events,
            chats: result.chats
          });

          var options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
            }
          };

          fetch(
            'http://' + process.env.REACT_APP_API_HOST + '/friends',
            options
          )
            .then(result => {
              return result.json();
            })
            .then(result => {
              this.setState({
                friends: result.friends
              });
            });
        });
    } catch (err) {
      console.log(err);
    }
  }

  updateWindowDimensions() {
    if (this.state.tabOpened && window.innerWidth <= 1600) {
      this.closePanel();
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  expandPanel() {
    this.setState({ tabOpened: true });
    var tab = document.getElementById('tab_profilePanel');
    var panel = document.getElementById('dash_profilePanel');
    var post = document.getElementById('dash_postPanel');
    var network = document.getElementById('dash_networkPanel');
    var icon = document.getElementById('dash_profilePanelCloseIcon');
    var child = panel.getElementsByClassName('p-fixed')[0];
    child.style.width = '100%';
    icon.style.display = 'block';
    tab.style.display = 'none';
    panel.style.display = 'inherit';
    post.style.display = 'none';
    network.style.display = 'none';
    panel.style.width = '100vw';
  }

  closePanel() {
    this.setState({ tabOpened: false });
    var tab = document.getElementById('tab_profilePanel');
    var panel = document.getElementById('dash_profilePanel');
    var post = document.getElementById('dash_postPanel');
    var network = document.getElementById('dash_networkPanel');
    var icon = document.getElementById('dash_profilePanelCloseIcon');
    var child = panel.getElementsByClassName('p-fixed')[0];
    child.style.width = '';
    icon.style.display = '';
    tab.style.display = '';
    panel.style.display = '';
    post.style.display = '';
    network.style.display = '';
    panel.style.width = '';
  }

  goToProfile() {
    window.location.href = 'profile';
  }

  findFriend(event) {
    event.preventDefault();
    var data = {
      userName: document.getElementById('dash_findFriend').value
    };
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
      },
      body: JSON.stringify(data)
    };
    fetch(
      'http://' + process.env.REACT_APP_API_HOST + '/friends/addfriend',
      options
    ).then(result => {
      if (result.status === 200) {
        document.getElementById('dash_findFriendNotify').textContent = 'Sent!';
      } else if (result.status === 404) {
        document.getElementById('dash_findFriendNotify').textContent =
          'Not Found!';
      } else if (result.status === 409) {
        document.getElementById('dash_findFriendNotify').textContent =
          'Already Sent!';
      } else {
        document.getElementById('dash_findFriendNotify').textContent = 'Error!';
      }
    });
  }

  acceptFriend(friend) {
    event.preventDefault();
    var data = {
      friend: {
        profileID: friend.profileID,
        status: 'accepted'
      }
    };

    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
      },
      body: JSON.stringify(data)
    };

    fetch(
      'http://' + process.env.REACT_APP_API_HOST + '/friends/editfriends',
      options
    ).then(result => {
      if (result.status === 200) {
      } else {
      }
    });
  }

  getFormButton(){
    if(this.state.panel === "chats"){
      return (
        <button id='dash_createPost' className='btn-primary d-block' onClick={this.state.showPostForm}>
        Create A Chat Group
        </button>
      );
    }else if(this.state.panel === "home"){
      return (<button id='dash_createPost' className='btn-primary d-block' onClick={this.state.showPostForm}>
      Create A Post
      </button>);
    }else{
      if(this.state.accountType === "company"){
        return (<button id='dash_createPost' className='btn-primary d-block' onClick={this.state.showPostForm}>
        Create An Event
        </button>);
      }else{
        return "";
      }
    }
  }

  rejectFriend(friend) {
    event.preventDefault();
    var data = {
      friend: {
        profileID: friend.profileID,
        status: 'rejected'
      }
    };

    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
      },
      body: JSON.stringify(data)
    };

    fetch(
      'http://' + process.env.REACT_APP_API_HOST + '/friends/editfriends',
      options
    ).then(result => {
      if (result.status === 200) {
      } else {
      }
    });
  }

  render() {
    return (
      <div>
        <div id='dash_profilePanel'>
          <div className='p-fixed h-100vh bg-primary'>
            <div className='d-flex logobox'>
              <img src={logo} alt=''></img>
              <h1 className='text-nunito color-red text-bold'>
                Hoosier Connection
              </h1>
              <i
                onClick={this.closePanel}
                id='dash_profilePanelCloseIcon'
                className='p-absolute d-none fas fa-times'
              ></i>
            </div>
            <div className="box-shadow">
              <div className='profile d-flex'>
                <img
                  onClick={this.goToProfile}
                  className='cursor-pointer border-lg border-round'
                  src={
                    'http://' +
                    process.env.REACT_APP_API_HOST +
                    this.state.profileIMG
                  }
                  alt=''
                />
                <div className='color-grey description'>
                  <h3 className='text-nunito text-bold'>{this.state.name}</h3>
                  <div className='text-roboto '>
                    <h4>{this.state.studentType}</h4>
                    <h5>{this.state.major}</h5>
                    <h5>{this.state.year}</h5>
                  </div>
                  <i
                    onClick={this.goToProfile}
                    id='dash_profilePanelEditIcon'
                    className='cursor-pointer text-secondary fas fa-pen'
                  ></i>
                </div>
              </div>
              <ul className='activity text-roboto'>
                <li className='space-between'>
                  <a className='description'>Posts</a>
                  <a className='color-red text-bold'>{this.state.posts.length}</a>
                </li>
                <li className='space-between'>
                  <a className='description'>Events</a>
                  <a className='color-red text-bold'>
                    {this.state.events.length}
                  </a>
                </li>
                <li className='space-between'>
                  <a className='description'>Friends</a>
                  <a className='color-red text-bold'>
                    {this.state.friends.profiles
                      ? this.state.friends.profiles.filter(
                          friend => friend.accepted
                        ).length
                      : 0}
                  </a>
                </li>
                <li className='space-between'>
                  <a className='description'>Messages</a>
                  <a className='color-red text-bold'>{this.state.chats.length}</a>
                </li>
              </ul>
              {this.getFormButton()}
              <hr />
              <form className='findFriend' onSubmit={this.findFriend}>
                <p id='dash_findFriendNotify'></p>
                <h3>Send a friend request</h3>
                <div className="findFriendInput">
                  <input
                    id='dash_findFriend'
                    className='d-inline m-auto text-primary border-lg border-round-small bg-secondary width'
                    placeholder='Username'
                  ></input>
                  <button
                    className='btn-primary d-inline sendbutton'
                    id='btn_findFriend'
                  >
                    Send
                  </button>
                </div>

              </form>
              <form className='activeFriendRequests'>
                <h3>Current Friend Requests</h3>
                <ul>
                  {this.state.friends.profiles
                    ? this.state.friends.profiles
                        .filter(friend => friend.status === 'requestee')
                        .map((friend, i) => {
                          return (
                            <li key={i} className='d-flex space-between'>
                              <div>
                                <img
                                  className='border-round border-lg d-inline'
                                  src={
                                    'http://' +
                                    process.env.REACT_APP_API_HOST +
                                    friend.profileIMG
                                  }
                                  alt={person}
                                />
                                <h5 className='d-inline'>{friend.name}</h5>
                              </div>
                              <span>
                                <button
                                  onClick={() => this.acceptFriend(friend)}
                                  className='btn-primary'
                                >
                                  Accept
                                </button>
                                <i
                                  onClick={() => this.rejectFriend(friend)}
                                  className='cursor-pointer text-secondary  fas fa-times'
                                ></i>
                              </span>
                            </li>
                          );
                        })
                    : ''}
                </ul>
              </form>
            </div>
          </div>
        </div>
        <div
          id='tab_profilePanel'
          className='border-lg bg-primary'
          onClick={this.expandPanel}
        >
          <h2>Profile</h2>
        </div>
      </div>
    );
  }
}
export default ProfilePanel;
