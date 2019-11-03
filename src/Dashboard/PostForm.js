import React, { Component } from 'react';
import DropDownMenu from './../Utility/DropDown';
import sample from '../images/sample.jpg';
import Cookie from './../Utility/Cookie';

class PostForm extends Component {
    constructor(props){
        super(props);
        this.state = {type: "text", title: "", tag: "", content: "", closeForm: props.closeForm};
        this.changeType = this.changeType.bind(this);
    }

    changeType(type){
        event.preventDefault();
        this.setState({type: type});
        console.log(type);
    }

    getType(){
        if(this.state.type === "text"){
            return (
            <div>
                <label>Text Content:</label>
                <textarea id="postFormContent" className="w-100 border-round-small border-lg" id="postform_text"></textarea>
            </div>
            );
        }else if(this.state.type === "video"){

            return(
                <div>
                    <label>Youtube URL: </label>
                    <input id="postFormContent" className="w-100 border-round-small border-lg d-block" id="postform_vidURL" type="text" placeholder="Ex. https://www.youtube.com/watch?v=Tzl0ELY_TiM"></input>
                </div>
            );
        }else{
            var img = {
                margin: "10px auto",
                display: "block"
            };

            var button = {
                bottom: "10px",
                left: "0"
            };
            
            return(
                <div className="p-relative">
                    <img style={img} className="w-100" src={sample} alt=""></img>
                    <button style={button} className="btn-primary p-absolute">Upload</button>
                </div>
            );
        }
    }

    createPost(){

        var profileOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            }
        };

        var postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            },
            body: JSON.stringify()
        };

        fetch("http://localhost:8080/profiles/profile", profileOptions).then( result => {
            return result.json();
        }).then( result => {
            fetch("http://localhost:8080/posts/postPosts", postOptions).then(result => {
                return result.json();
            }).then( result => {
                console.log(result);
            });
        });
    }

    render(){
        return (
            <div className="postForm d-block m-auto bg-primary p-fixed border-lg border-round-small" >
                <div className="d-flex space-between header"><h3 className="d-inline">Create Post:</h3><i onClick={this.state.closeForm} className="text-secondary cursor-pointer d-inline fas fa-times"></i></div>
                <hr />
                <form onSubmit={this.createPost}>
                    <label>Title:</label><br />
                    <input className="d-block border-round-small border-lg w-100" id="postform_title"></input>
                    <label>Type Of Post:</label>
                    <DropDownMenu items={["Video","Image","Text"]} label="Text" handle={this.changeType}/><br/>
                    <label>Tag:</label>
                    <input className="d-block border-round-small border-lg w-100" placeholder="Ex. Computer Science"></input>
                    {this.getType()}
                    <div className="text-right"><button className="btn-primary" type="submit">Post</button></div>
                </form>
            </div>
        );
    }
}

export default PostForm;



// WEBPACK FOOTER //
// src/Dashboard/PostForm.js