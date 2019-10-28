import React from 'react';
import './../css/dashboard/post.css';
class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: props.title,
            type: props.type,
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
                    <iframe src={this.state.content}  frameborder="0" allowFullScreen/>
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
                            <i class="fas fa-comments"></i>
                            <h5 className="d-inline">Comments: {this.state.comments.length}</h5>
                        </div>
                        <div className="label" onClick={this.votePost(1)}>
                            <i style={{color: "#45c450"}} class="fas fa-thumbs-up"></i>
                            <h5 className="d-inline">Likes: {this.state.likes}</h5>
                        </div>
                        <div className="label" onClick={this.votePost(-1)}>
                            <i style={{color: "#c44545"}} class="fas fa-thumbs-down"></i>
                            <h5 className="d-inline">Dislikes: {this.state.dislikes}</h5>
                        </div>
                        <div>
                            <i class="fas fa-tags"></i>
                            <ul className="d-inline">
                                {this.state.tags.map((tag, i) =>
                                    <li className="d-inline">{tag}</li>
                                    )}
                            </ul>
                        </div>
                    </div>
                    {
                            this.state.showComments ?
                            <ul className="comments">{
                            this.state.comments.map((comment, i) =>
                            <li className="comment">
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
        <div className="post">
            <h3>{this.state.title}</h3>
            <h5>{this.state.user.name}</h5>
            <hr />
            {this.getContent()}
            {this.getPostMetaData()}
        </div>
        );
    }
}
export default Post;