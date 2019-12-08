import React, { Component } from 'react';
import Cookie from './../../Utility/Cookie';

class ShareForm extends Component {
    constructor(props){
        super(props);
        this.state = {title: "", tag: "", content: props.postID, closeForm: props.showShareForm};
        this.createPost = this.createPost.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    handleChange(event){
        event.preventDefault();
        this.setState({content: document.getElementById("postFormContent").value});
    }

    createPost(event){
        event.preventDefault();
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

            var body = {
                profileID: result._id,
                numLikes: 0,
                numDislikes: 0,
                tags: document.getElementById("postFormTag").value,
                comments: [],
                name: result.name,
                title: document.getElementById("postFormTitle").value,
                type: "post",
                content: this.state.content
            };
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
                },
                body: JSON.stringify(body)
            };

            fetch("http://"+ process.env.REACT_APP_API_HOST +"/posts/postPosts", options).then(result => {
                result.json()
            }).then(result => {
                location.reload();
            });
        });
    }

    closeForm(){
        this.state.closeForm();
    }

    render(){
        return (
            <div className="postForm d-block m-auto bg-primary p-fixed border-lg border-round-small" >
                <div className="d-flex space-between header"><h3 className="d-inline">Share Post:</h3><i onClick={this.closeForm} className="text-secondary cursor-pointer d-inline fas fa-times"></i></div>
                <hr />
                <form onSubmit={this.createPost}>
                    <label>Title:</label><br />
                    <input id="postFormTitle" className="d-block text-primary border-round-small bg-secondary border-lg w-100"></input>
                    <label>Tag:</label>
                    <input id="postFormTag" className="d-block text-primary border-round-small bg-secondary border-lg w-100" placeholder="Ex. Computer Science"></input>
                    <div className="text-right"><button className="btn-primary" type="submit">Post</button></div>
                </form>
            </div>
        );
    }
}

export default ShareForm;