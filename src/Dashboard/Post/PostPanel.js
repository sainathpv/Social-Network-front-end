import React from 'react';
import Post from './Post';
import PostForm from './PostForm';
import ShareForm from './ShareForm';
import Cookie from '../../Utility/Cookie';
class PostPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            tags: [],
            showPostForm: props.showPostForm,
            isPostFormHidden: props.isPostFormHidden,
            showShareForm: false,
            changePanel: props.changePanel
        };
        this.getPosts = this.getPosts.bind(this);
        this.showShareForm = this.showShareForm.bind(this);
        this.changePanel = this.changePanel.bind(this);
        this.getProfile();
        this.postID = "";
    }

    showShareForm(postID){
        this.postID = postID;
        this.setState({showShareForm: !this.state.showShareForm});
    }

    renderShareForm(){
        if(this.state.showShareForm){
            return (
                <ShareForm postID={this.postID} showShareForm={this.showShareForm}/>
            );
        }else{
            return("");
        }
    }

    getPosts(tags){
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            }
        };
        fetch("http://"+ process.env.REACT_APP_API_HOST +"/posts/getPosts?tags=" + JSON.stringify(tags), options).then( result => {
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

        fetch("http://"+ process.env.REACT_APP_API_HOST +"/profiles/profile", options).then( result => {
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

    changePanel(event){
        var panel = event.target.textContent.toLowerCase();
        if(panel === "chats" || panel === "events"){
            this.state.changePanel(panel);
        }
    }

    render(){
        return (
        <div id="dash_postPanel">
            <nav>
                <div className="p-fixed bg-primary border-lg w-100">
                    <ul className="d-flex">
                        <li className="cursor-pointer active">Home</li>
                        <li className="cursor-pointer" onClick={this.changePanel}>Chats</li>
                        <li className="cursor-pointer" onClick={this.changePanel}>Events</li>
                    </ul>
                </div>
            </nav>
            {this.renderPostForm()}
            {this.renderShareForm()}
            <ul className="posts" >
                {
                    this.state.posts.map((post, i) => 
                    <Post id={post._id} title={post.title} key={i}
                        tags={post.tags} dislikes={post.numDislikes}
                        likes={post.numLikes} comments={post.comments}
                        type={post.type} content={post.content}
                        user={post.user} name={post.name}
                        showShareForm={this.showShareForm}
                        shareable={true} vote={post.vote}
                    />)
                }
            </ul>
        </div>
        );

    }
}
export default PostPanel;