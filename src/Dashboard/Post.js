import React from 'react';

import './../css/dashboard/post.css';
class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: props.title,
            type: props.type,
            name: props.name,
            content: props.content, //text, img, video url, etc
            user: props.user, //user id
            comments: props.comments,
            likes: props.likes,
            dislikes: props.dislikes,
            tags: props.tags,
            showComments: false
        }
        this.showComments = this.showComments.bind(this);
    }
    getContent(){
        var s = {
            position: "relative",
            width: "100%",
            height: "0",
            paddingBottom: "51%",
            margin: "10px 0"
        };
        switch(this.state.type){
            case "text":
                return (<p>{this.state.content}</p>);
            case "video":
                return (
                <div className="vidcontainer" style={s}>
                    <iframe src={this.state.content}  frameBorder="0" allowFullScreen/>
                </div>);
            case "advert":
                return (<img src={this.state.content} alt=""></img>);
            case "image":
                return (<img src={this.state.content} alt=""></img>);
            case "article":
                return (<a href={this.state.content}></a>);
            default:
                break;
        }
    }
    
    showComments(event){
        this.setState({showComments: !this.state.showComments});
    }

    votePost(vote){

    }

    getPostMetaData(){
        if(this.state.type === "advert"){
            return;
        }else{
            return (
                <div>
                    <hr />
                    <div className="d-flex postMetaData">
                        <div className="label" onClick={this.showComments} >
                            <i className="fas fa-comments"></i>
                            <h5 className="d-inline">Comments: {this.state.comments.length}</h5>
                        </div>
                        <div className="label" onClick={this.votePost(1)}>
                            <i style={{color: "#45c450"}} className="fas fa-thumbs-up"></i>
                            <h5 className="d-inline">Likes: {this.state.likes}</h5>
                        </div>
                        <div className="label" onClick={this.votePost(-1)}>
                            <i style={{color: "#c44545"}} className="fas fa-thumbs-down"></i>
                            <h5 className="d-inline">Dislikes: {this.state.dislikes}</h5>
                        </div>
                        <div>
                            <i className="fas fa-tags"></i>
                            <ul className="d-inline">
                                {this.state.tags.map((tag, i) =>
                                    <li className="d-inline" key={i.toString()}>{tag}</li>
                                    )}
                            </ul>
                        </div>
                    </div>
                    {
                        this.state.showComments ?
                        <ul className="comments">
                            <li>
                                <h3>Create A Comment</h3>
                                <form className="text-right" onSubmit={this.postComment}>
                                    <textarea className="d-block m-auto border-round-small border-lg" required></textarea><br />
                                    <button className="btn-primary" type="submit">Submit</button>
                                </form> 
                            </li>
                            {
                            this.state.comments.map((comment, i) =>
                            <li key={i.toString()} className="comment bg-secondary">
                                <h5>{comment.user}</h5>
                                <hr />
                                <p>{comment.comment}</p>
                            </li>)
                        }</ul>
                        : ""
                    }
                </div>
            );
        }
    }
    render(){
        return (
        <div className="post bg-primary border-lg border-round-small">
            <h2>{this.state.title}</h2>
            <h5>{this.state.name}</h5>
            <hr />
            {this.getContent()}
            {this.getPostMetaData()}
        </div>
        );
    }
}
export default Post;


// WEBPACK FOOTER //
// src/Dashboard/Post.js