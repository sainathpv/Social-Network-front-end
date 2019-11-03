import React from 'react';
import Post from './Post';
import PostForm from'./PostForm';
import person from './../images/person-generic.jpg';
import Cookie from './../Utility/Cookie';
class PostPanel extends React.Component{
    constructor(props){
        super(props);
        console.log(props.isPostFormHidden());
        this.state = {posts: [], tags: [], showPostForm: props.showPostForm, isPostFormHidden: props.isPostFormHidden};
        this.getPosts = this.getPosts.bind(this);
        this.getProfile = this.getProfile(this);
    }

    getPosts(tags){
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch("http://localhost:8080/posts/getPosts?tags=" + JSON.stringify(tags), options).then( result => {
            return result.json();
        }).then(result => {
            this.setState({posts: result.return});
        });
    }

    getProfile(){
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            }
        };

        fetch("http://localhost:8080/profiles/profile", options).then( result => {
            return result.json();
        }).then( result => {
            this.getPosts(result.interests);
        });
    }
    renderPostForm(){

        if(this.state.isPostFormHidden()){
            return <PostForm closeForm={this.state.showPostForm} />
        }else{
            return;
        }
        
    }

    render(){
        var user = {
            name: "User Name",
            profileID: null,
            profileIMG: person
        }
        var tags = ["Tag 1", "Tag 2", "Tag 3", "Tag 4"];
        var comments = [
            {
                comment: "Commenting Something",
                user: "User Name",
                profile  : "adsodoj345fa",

            },
            {
                comment: "Commenting Something",
                user: "User Name",
                profile: "adsodoj345fa",

            },
            {
                comment: "Commenting Something",
                user: "User Name",
                profile: "adsodoj345fa",

            }
        ]
        
        return (
        <div id="dash_postPanel">
            <nav>
                <div className="p-fixed bg-primary w-100">
                    <ul className="d-flex">
                        <li className="active">Home</li>
                        <li>Chats</li>
                        <li>Events</li>
                    </ul>
                </div>
            </nav>
            {this.renderPostForm()}
            <ul className="posts" >
                {
                    this.state.posts.map((post, i) => 
                    <Post title={post.title} key={i}
                    tags={post.tags} dislikes={post.numDislikes}
                    likes={post.numLikes} comments={post.comments}
                    type={post.type} content={post.content}
                    user={post.user} name={post.name}
                />)
                }
            </ul>
        </div>
        );
    }
}
export default PostPanel;


// WEBPACK FOOTER //
// src/Dashboard/PostPanel.js