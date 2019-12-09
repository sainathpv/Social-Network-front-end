import React from 'react';
import Post from './Post';
import PostForm from './PostForm';
import ShareForm from './ShareForm';
import EventPanel from './../Event/EventPanel';
import ChatPanel from './../Chat/ChatPanel';
import Cookie from '../../Utility/Cookie';
import SearchBox from '../../SearchBox/SearchBox';
import MiniProfile from '../../Profile/miniProfile';
import axios from 'axios';
class PostPanel extends React.Component {
  constructor(props) {
    super(props);
    
    console.log(props)
    this.state = {
      panel: 'post',
      posts: [],
      tags: [],
      showPostForm: props.showPostForm,
      showMiniProfilePage: props.showMiniProfilePage,
      isPostFormHidden: props.isPostFormHidden,
      isMiniProfileHidden: props.isMiniProfileHidden,
      showShareForm: false,
      changePanel: props.changePanel
    };
    this.getPosts = this.getPosts.bind(this);
    this.showShareForm = this.showShareForm.bind(this);
    this.changePanel = this.changePanel.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.profileIDHandler = this.profileIDHandler.bind(this);
    this.getProfile();
    this.postID = '';
  }

  profileIDHandler(profileID, name){
    console.log(profileID, name, "here is my print in postpanels")
    this.state.currentProfileID = profileID
  }

  componentDidMount() {}

  showShareForm(postID) {
    this.postID = postID;
    this.setState({ showShareForm: !this.state.showShareForm });
  }

  renderShareForm() {
    if (this.state.showShareForm) {
      return (
        <ShareForm postID={this.postID} showShareForm={this.showShareForm} />
      );
    } else {
      return '';
    }
  }

  getPosts(tags) {
    var options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
      }
    };
    fetch(
      'http://' +
        process.env.REACT_APP_API_HOST +
        '/posts/getPosts?tags=' +
        JSON.stringify(tags),
      options
    )
      .then(result => {
        return result.json();
      })
      .then(result => {
        this.setState({ posts: result.return });
        //this.state.posts = result.return;
      });
  }

  getProfile() {
    var options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
      }
    };

    fetch(
      'http://' + process.env.REACT_APP_API_HOST + '/profiles/profile',
      options
    )
      .then(result => {
        return result.json();
      })
      .then(result => {
        this.getPosts(result.interests);
      });
  }

  renderPostForm() {
    if (this.state.isPostFormHidden()) {
      return <PostForm closeForm={this.state.showPostForm} />;
    } else {
      return;
    }
  }

  renderMiniProfile() {
    if (this.state.isMiniProfileHidden()) {
      return <MiniProfile closeForm={this.state.showMiniProfilePage} currentProfileID={this.state.currentProfileID} profileID={this.state.currentProfileID}/>;
    } else {
      return;
    }
  }

  changePanel(event) {
    var panel = event.target.textContent.toLowerCase();
    if(panel === "home" || panel === "chats" || panel === "events"){
        this.state.changePanel(panel);
    }
  }

  async searchHandler(event) {
    const text = document.getElementById('search_text').value;
    //alert(text);
    const res = await axios.get(
      `http://localhost:8080/searchposts?text=${text}`
    );
    const searchedPosts = res.data.result;
    console.log(this.state.posts);
    console.log(searchedPosts);
    this.setState({ posts: searchedPosts });
  }

  render() {

      return (
        <div id='dash_postPanel'>
          <nav className="">
            <div className='p-fixed bg-navbar w-100'>
              <ul className='d-flex'>
                <li className='cursor-pointer active'>Home</li>
                <li className='cursor-pointer' onClick={this.changePanel}>
                  Chats
                </li>
                <li className='cursor-pointer' onClick={this.changePanel}>
                  Events
                </li>
                <SearchBox searchHandler={this.searchHandler} />
              </ul>
            </div>
          </nav>
          {this.renderMiniProfile()}
          {this.renderPostForm()}
          {this.renderShareForm()}
          <ul className='posts'>
            {this.state.posts.map((post, i) => (
              <Post
                id={post._id}
                title={post.title}
                key={i}
                tags={post.tags}
                dislikes={post.numDislikes}
                likes={post.numLikes}
                comments={post.comments}
                type={post.type}
                content={post.content}
                user={post.user}
                name={post.name}
                showShareForm={this.showShareForm}
                showMiniProfilePage = {this.state.showMiniProfilePage}
                shareable={true}
                vote={post.vote}
                profileIDHandler={this.profileIDHandler}
                currentProfileID={post.profileID}
              />
            ))}
          </ul>
        </div>
      );

  }
}
export default PostPanel;
