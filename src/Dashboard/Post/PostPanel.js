import React from 'react';
import ReactDOM from 'react-dom'
import Post from './Post';
import PostForm from './PostForm';
import ShareForm from './ShareForm';
import Cookie from '../../Utility/Cookie';
import MiniProfile from '../../Profile/miniProfile';
import searchBoxIcon from '../../images/search.png';
import ReactHTMLConverter from 'react-html-converter/node'

var searchedPosts = [];
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
      changePanel: props.changePanel,
      searchedPosts: [],
      searched: false,
      searchedPostDisplay: [],
    };
    this.getPosts = this.getPosts.bind(this);
    this.showShareForm = this.showShareForm.bind(this);
    this.changePanel = this.changePanel.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.profileIDHandler = this.profileIDHandler.bind(this);
    this.getProfile();
    this.deleteOldPosts = this.deleteOldPosts.bind(this);
    this.switchToPost = this.switchToPost.bind(this);
    this.swtichAllPosts = this.swtichAllPosts.bind(this);
    //this.getContentPosts = this.getContentPosts.bind(this);
    this.postID = '';
  }

  /*getContentPosts(post, i) {
    console.log("it works here in get")
    if (post.type == 'poll') {
      var options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
        }
      };
      fetch("http://" + process.env.REACT_APP_API_HOST + "/posts/postGetPollVote/" + post.content, options).then(result => {
        return result.json();
      }).then(vote => {
        var totalCategory = []
        for(var i = 0; i <vote.categories.length; i++){
          totalCategory.push(vote.categories[i].category)
        }
        console.log(totalCategory)
        console.log(vote.categories);
        post.content = "Categories Include: " + totalCategory.toString()
        this.setState({
          searchedPostDisplay: this.state.searchedPostDisplay.splice(i, 1, post)
        })
                //console.log(vote)
        //this.state.searchedPostDisplay[i] = "Categories Include: " + vote.categories.toString()
        //this.setState({ searchedPostDisplay: "Categories Include: " + vote.categories.toString()});
      });
    }

    if(post.type == 'image'){
      post.content = "An image about " + post.tags.toString()
      this.setState({
        searchedPostDisplay: this.state.searchedPostDisplay.splice(i, 1, post)
      })
      //this.state.searchedPostDisplay[i] = "An image about " + post.tags.toString()
      //this.setState({searchedPostDisplay: "An image about " + post.tags.toString()})
    }

    if(post.type == 'text'){
      post.content = post.content
      this.setState({
        searchedPostDisplay: this.state.searchedPostDisplay.splice(i, 1, post)
      })
      //this.state.searchedPostDisplay[i] = post.content
      //this.setState({searchedPostDisplay: post.content});
    }
    //console.log("my individual test for searchedPost", this.state.searchedPostDisplay);
  }*/

  deleteOldPosts(){
    var listOfPosts = document.getElementById("listOfPosts");
    console.log("this is the first child of single post", listOfPosts.firstChild)
    //listOfPosts.removeChild(listOfPosts.firstChild);
    while(listOfPosts.firstChild){
      console.log("this is the child I removed", listOfPosts.firstChild.state)
      listOfPosts.removeChild(listOfPosts.firstChild);
    }
  }

  switchToPost(post){
    var listOfPosts = document.getElementById("listOfPosts");
    ReactDOM.unmountComponentAtNode(listOfPosts)
    console.log("this is the first child of single post", listOfPosts.firstChild)
    while (listOfPosts.firstChild) {
      console.log("this is the child I removed", listOfPosts.firstChild.state)
      listOfPosts.removeChild(listOfPosts.firstChild);
    }

    var newPost = <Post
      id={post._id}
      title={post.title}
      key={1}
      tags={post.tags}
      dislikes={post.numDislikes}
      likes={post.numLikes}
      comments={post.comments}
      type={post.type}
      content={post.content}
      user={post.user}
      name={post.name}
      showShareForm={this.showShareForm}
      showMiniProfilePage={this.state.showMiniProfilePage}
      shareable={true}
      vote={post.vote}
      profileIDHandler={this.profileIDHandler}
      currentProfileID={post.profileID}
    />
    ReactDOM.render(newPost, listOfPosts)
    document.getElementById("postList").style.display = 'none';
  }

  swtichAllPosts(){
    var listOfPosts = document.getElementById("listOfPosts")
    ReactDOM.unmountComponentAtNode(listOfPosts)
    console.log("swtichAllPosts is executed")
    
    while(listOfPosts.firstChild){
      console.log("this is the child I removed", listOfPosts.firstChild.state)
      listOfPosts.removeChild(listOfPosts.firstChild);
    }
    ReactDOM.render(
      <div>
        {this.state.searchedPosts.map((post, i) => (
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
            showMiniProfilePage={this.state.showMiniProfilePage}
            shareable={true}
            vote={post.vote}
            profileIDHandler={this.profileIDHandler}
            currentProfileID={post.profileID}
          />
        ))}
      </div>, listOfPosts)
      document.getElementById("postList").style.display = 'none';
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

  searchHandler(event) {
    document.getElementById("postList").style.display = "block";
    const text = document.getElementById('search_text').value;
    console.log(text);
    if (text != "") {
      var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
        },
        body: JSON.stringify({ text: text }),
      }
      try {
        fetch(
          'http://' +
          process.env.REACT_APP_API_HOST +
          '/search/searchposts',
          options
        ).then(result => {
          if (result.status === 200) {
            return result.json();
          } else {
            result.json().then(nr => {
              console.log(nr.message)
            });
          }
        }).then(result => {
          /*var zeroList = []
          for(var i = 0; i <result.result.length; i++){
            zeroList.push(0);
          }
          console.log("this is my 0 list", zeroList)*/
          this.setState({
            searchedPosts: result.result, 
          });
          /*for(var i = 0; i <result.result.length; i++){
            this.getContentPosts(this.state.searchedPosts[i], i);
          }*/
        }).catch(err => {
          this.setState({
            searchedPosts: []
          });
          console.log(err)
        });
      } catch (err) {
        this.setState({
          searchedPosts: []
        });
        console.log(err);
        return false;
      }
      console.log(this.state.searchedPosts);
    } else {
      this.setState({
        searchedPosts: []
      });
    }
    console.log("I have my test printed at here", this.state.searchedPostDisplay)
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
                <li className='cursor-pointer search' onClick={this.changePanel}>
                  <input className="searchBar" onChange={this.searchHandler} placeholder='Search posts' id="search_text" />
                  <input className="searchImg" type="image"
                    src={searchBoxIcon}
                    alt="searchbox Icon"
                    onClick={this.swtichAllPosts}
                  />
                  <ul id='postList' className="postList">
                    {this.state.searchedPosts.map((post, i) => 
                        <li
                          key={i.toString()}
                          onClick={() => this.switchToPost(post)}>
                          <p>By {post.name}: [{post.title}] Type:{post.type}</p>
                        </li>
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
          {this.renderMiniProfile()}
          {this.renderPostForm()}
          {this.renderShareForm()}
          <ul id="listOfPosts" className='posts'>
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
