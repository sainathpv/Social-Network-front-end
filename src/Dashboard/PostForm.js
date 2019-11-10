import React, { Component } from 'react';
import DropDownMenu from './../Utility/DropDown';

import Cookie from './../Utility/Cookie';

class PostForm extends Component {
    constructor(props){
        super(props);
        this.state = {type: "text", title: "", tag: "", content: "", closeForm: props.closeForm};
        this.changeType = this.changeType.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.createPost = this.createPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    changeType(type){
        event.preventDefault();
        this.setState({type: type});
        console.log(type);
    }

    fileSelectedHandler(event){
        this.setState({content: event.target.result});
    }
    
    handleChange(event){
        event.preventDefault();
        console.log(this.state.content);
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
            console.log(this.state);
            var body = {
                profileID: result._id,
                numLikes: 0,
                numDislikes: 0,
                tags: document.getElementById("postFormTag").value,
                comments: [],
                name: result.name,
                title: document.getElementById("postFormTitle").value,
                type: this.state.type,
                content: this.state.content
            }
            console.log(body);
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
                console.log(result);
            });
        });
    }

    getType(){
        if(this.state.type === "text"){
            return (
            <div>
                <label>Text Content:</label>
                <textarea onChange={this.handleChange} id="postFormContent" className="w-100 border-round-small border-lg"></textarea>
            </div>
            );
        }else if(this.state.type === "video"){

            return(
                <div>
                    <label>Youtube URL: </label>
                    <input onChange={this.handleChange} id="postFormContent" className="w-100 border-round-small border-lg d-block" type="text" placeholder="Ex. https://www.youtube.com/watch?v=Tzl0ELY_TiM"></input>
                </div>
            );
        }else{
            
            return(
                <div className="p-relative">
                    <input type="file" onChange={this.fileSelectedHandler}/>
                </div>
            );
        }
    }

    render(){
        return (
            <div className="postForm d-block m-auto bg-primary p-fixed border-lg border-round-small" >
                <div className="d-flex space-between header"><h3 className="d-inline">Create Post:</h3><i onClick={this.state.closeForm} className="text-secondary cursor-pointer d-inline fas fa-times"></i></div>
                <hr />
                <form onSubmit={this.createPost}>
                    <label>Title:</label><br />
                    <input id="postFormTitle" className="d-block border-round-small border-lg w-100"></input>
                    <label>Type Of Post:</label>
                    <DropDownMenu items={["Video","Image","Text"]} label="Text" handle={this.changeType}/><br/>
                    <label>Tag:</label>
                    <input id="postFormTag" className="d-block border-round-small border-lg w-100" placeholder="Ex. Computer Science"></input>
                    {this.getType()}
                    <div className="text-right"><button className="btn-primary" type="submit">Post</button></div>
                </form>
            </div>
        );
    }
}

export default PostForm;