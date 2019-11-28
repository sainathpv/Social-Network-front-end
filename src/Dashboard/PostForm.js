import React, { Component } from 'react';
import DropDownMenu from './../Utility/DropDown';
import Cookie from './../Utility/Cookie';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = { type: "text", title: "", tag: "", content: "", closeForm: props.closeForm };
        this.changeType = this.changeType.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.createPost = this.createPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    changeType(type) {
        event.preventDefault();
        this.setState({ type: type });
    }

    fileSelectedHandler(event) {
        console.log(event.target.files[0]);
        this.setState({ content: event.target.files[0] });
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ content: document.getElementById("postFormContent").value });
    }

    addItem(event){
        event.preventDefault();
        var ul = event.target;
        var input = event.target;
        while(!input.classList.contains("itemInput")){
            input = input.previousElementSibling;
        }
        while(!ul.classList.contains("itemList")){
            ul = ul.previousElementSibling;
        }
        if(input.value === "") return;
        const li = document.createElement("li");
        li.textContent = input.value;
        ul.appendChild(li);
    }

    createPost(event) {
        event.preventDefault();
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            }
        };

        fetch("http://" + process.env.REACT_APP_API_HOST + "/profiles/profile", options).then(result => {
            return result.json();
        }).then(result => {
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
            };
            if(this.state.type === "poll"){
                var categories = Array.from(document.getElementById("postFormCategories").childNodes)
                    .map((category, i) => category.textContent);
                console.log(categories);
                body.categories = categories;
                console.log(body.categories);
            }

            if (this.state.type === "image") {
                var acceptedimages = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
                if(!acceptedimages.includes(this.state.content.type)){
                    return;
                }
                const formdata = new FormData();
                formdata.append('image', this.state.content, this.state.content.name);
                var reader = new FileReader();
                reader.readAsDataURL(this.state.content);
                reader.onload = (e) => {
                    options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
                        },
                        body: JSON.stringify({image: e.target.result})
                    };
    
                    fetch("http://" + process.env.REACT_APP_API_HOST + "/images/imageUpload", options).then(result => {
                        return result.json();
                    }).then(result => {
                        body.content = result.url;
                        
                        options.body = JSON.stringify(body);

                        fetch("http://" + process.env.REACT_APP_API_HOST + "/posts/postPosts", options).then(result => {
                            result.json()
                        }).then(result => {
                            location.reload();
                        });
                    });
                }
            }else{

                options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
                    },
                    body: JSON.stringify(body)
                };

                fetch("http://" + process.env.REACT_APP_API_HOST + "/posts/postPosts", options).then(result => {
                    result.json()
                }).then(result => {
                    location.reload();
                });
            }

        });
    }

    getType() {
        if (this.state.type === "text") {
            var style = {
                padding: "5px",
                minHeight: "150px",
                height: "auto"
            }
            return (
                <div>
                    <label>Text Content:</label>
                    <textarea onChange={this.handleChange} style={style} id="postFormContent" className="w-100 text-primary border-round-small bg-secondary border-lg"></textarea>
                </div>
            );
        } else if (this.state.type === "video") {

            return (
                <div>
                    <label>Youtube URL: </label>
                    <input onChange={this.handleChange} id="postFormContent" className="w-100 text-primary border-round-small bg-secondary border-lg d-block" type="text" placeholder="Ex. https://www.youtube.com/watch?v=Tzl0ELY_TiM"></input>
                </div>
            );
        }else if(this.state.type === "poll"){
            return (
                <div>
                    <label>Categories:</label>
                    <ul id="postFormCategories" className="itemList">                          
                    </ul>
                    <br />
                    <label>Category:</label>
                    <input className="itemInput w-100 text-primary border-round-small bg-secondary border-lg d-block" type="text"></input>
                    <button onClick={this.addItem} className="btn-primary">Add Category</button>
                </div>
            );
        }else{

            return (
                <div className="p-relative">
                    <input type="file" onChange={this.fileSelectedHandler} />
                </div>
            );
        }
    }

    render() {
        return (
            <div className="postForm d-block m-auto bg-primary p-fixed border-lg border-round-small" >
                <div className="d-flex space-between header"><h3 className="d-inline">Create Post:</h3><i onClick={this.state.closeForm} className="text-secondary cursor-pointer d-inline fas fa-times"></i></div>
                <hr />
                <form className="form" onSubmit={this.createPost}>
                    <label>Title:</label><br />
                    <input id="postFormTitle" className="d-block text-primary border-round-small bg-secondary border-lg w-100"></input>
                    <label>Type Of Post:</label>
                    <DropDownMenu items={["Video", "Image", "Text", "Poll"]} label="Text" handle={this.changeType} /><br />
                    <label>Tag:</label>
                    <input id="postFormTag" className="d-block text-primary border-round-small bg-secondary border-lg w-100" placeholder="Ex. Computer Science"></input>
                    {this.getType()}
                    <div className="text-right"><button className="btn-primary" type="submit">Post</button></div>
                </form>
            </div>
        );
    }
}

export default PostForm;