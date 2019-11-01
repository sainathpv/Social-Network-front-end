import React, { Component } from 'react';
import DropDownMenu from './../Utility/DropDown';
import sample from '../images/sample.jpg';

class PostForm extends Component {
    constructor(props){
        super(props);
        this.state = {type: "text", closeForm: props.closeForm};
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
                <textarea></textarea>
            </div>
            );
        }else if(this.state.type === "video"){
            var vid = {
                display: "none"
            };

            return(
                <div>
                    <iframe style={vid} src="" frameBorder="0"  allowFullScreen></iframe>
                    <input type="text" placeholder="Enter an Youtube URL."></input>
                </div>
            );
        }else{
            var img = {
                margin: "10px auto",
                display: "block"
            }

            var button = {
                bottom: "10px",
                left: "0"
            }
            return(
                <div className="p-relative">
                    <img style={img} width="100%" src={sample} alt=""></img>
                    <button style={button} className="p-absolute">Upload</button>
                </div>
            );
        }
    }

    createPost(){

    }

    render(){
        return (
            <div className="postForm" >
                <div className="d-flex space-between header"><h3 className="d-inline">Create Post:</h3><i onClick={this.state.closeForm} className="d-inline fas fa-times"></i></div>
                <hr />
                <form onSubmit={this.createPost}>
                    <label>Type Of Post:</label>
                    <DropDownMenu items={["Video","Image","Text"]} label="Text" handle={this.changeType}/>
                    {this.getType()}
                    <div className="text-right"><button type="submit">Post</button></div>
                </form>
            </div>
        );
    }
}

export default PostForm;
