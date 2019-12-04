import React from 'react';
import Cookie from './../Utility/Cookie';
import Poll from './Poll';
import './../css/dashboard/post.css';
class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            vote: 0,
            type: props.type,
            name: props.name,
            content: props.content, //text, img, video url, etc
            user: props.user, //user id
            comments: props.comments,
            likes: props.likes,
            dislikes: props.dislikes,
            tags: props.tags,
            showComments: false,
            post: "",
            shareable: props.shareable,
            showShareForm: props.showShareForm          
        }
        this.votePost = this.votePost.bind(this);
        this.getVote = this.getVote.bind(this);
        this.share = this.share.bind(this);
        this.showComments = this.showComments.bind(this);
        this.getSharedPost = this.getSharedPost.bind(this);
        this.postComment = this.postComment.bind(this);
        this.getVote();
    }

    getSharedPost(){
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        fetch("http://"+ process.env.REACT_APP_API_HOST +"/posts/postByID/" + this.state.content, options).then( result => {
            return result.json();
        }).then(result => {

            this.setState({post: 
                <Post id={result._id} title={result.title} tags={result.tags}
                dislikes={result.numDislikes} likes={result.numLikes}
                comments={result.comments} type={result.type}
                user={result.user} name={result.name} shareable={false} content={result.content} />
            });
        });
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
                this.setState({post: (<p>{this.state.content}</p>) });
                break;
            case "video":
                this.setState({post: 
                    <div className="vidcontainer" style={s}>
                        <iframe src={this.state.content}  frameBorder="0" allowFullScreen/>
                    </div>
                });
                break;
            case "advert":
                this.setState({post: <img src={"http://" + process.env.REACT_APP_API_HOST + this.state.content} alt=""></img>});
                break;
            case "image":
                this.setState({post: <img className="m-auto" src={"http://" + process.env.REACT_APP_API_HOST + this.state.content} alt=""></img>})
                break;    
            case "article":
                this.setState({post: <a href={this.state.content}></a>});
                break;
            case "post":
                this.getSharedPost();
                break;
            case "poll":
                this.setState({post: <Poll data={this.state.content} />})
                break;
            default:

            
        }
    }
    componentDidMount(){
        this.getContent();
    }
    showComments(event){
        this.setState({showComments: !this.state.showComments});
    }

    postComment(event){
        event.preventDefault();
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            }
        };
        try{
            fetch("http://"+ process.env.REACT_APP_API_HOST +"/profiles/profile", options).then( result => {
                return result.json();
            }).then( result => {
                
                var options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        comment: document.getElementById("postComment").value,
                        user: result.name,
                        profile: result._id,
                        postID: this.state.id
                    })
                };
                fetch("http://"+ process.env.REACT_APP_API_HOST +"/posts/postComment", options).then( result => {
                    return result.json();
                }).then(result => {
                    location.reload();
                });
            });
        }catch(err){
            console.log(err);
        }

    }
    
    getVote(){
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            }
        };

        fetch("http://"+ process.env.REACT_APP_API_HOST +"/posts/getvote/" + this.state.id, options).then(result => {
            return result.json();
        }).then(result => {
            this.setState({
                vote: result.vote
             });
        });
    }

    votePost(vote){
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            },
            body: JSON.stringify({
                postID: this.state.id,
                vote: this.state.vote !== vote ? vote : 0
            })
        }

        fetch("http://"+ process.env.REACT_APP_API_HOST +"/posts/postvote", options).then(result => {
            return result.json();
        }).then(result => {
            this.setState({
                vote: this.state.vote !== vote ? vote : 0,
                dislikes: result.numDislikes,
                likes: result.numLikes
            });
        });
    }

    share(event){
        event.preventDefault();
        console.log(this.state.id);
        this.state.showShareForm(this.state.id);
    }
    
    getPostMetaData(){
        if(this.state.type === "advert"){
            return;
        }else{
            return (
                <div>
                    { this.state.shareable ? <hr /> : "" }
                    { this.state.shareable ?
                    <div className="d-flex postMetaData">
                        <div className="label" onClick={this.showComments} >
                            <i className="fas fa-comments"></i>
                            <h5 className="d-inline"> {this.state.comments.length}</h5>
                        </div>
                        <div className="label" onClick={() => this.votePost(1)}>
                            <i style={this.state.vote === 1 ? {color: "#45c450"} : {color: "lightgrey"} } className="fas fa-thumbs-up"></i>
                            <h5 className="d-inline">{this.state.likes}</h5>
                        </div>
                        <div className="label" onClick={() => this.votePost(-1)}>
                            <i style={this.state.vote === -1 ? {color: "#c44545"} : {color: "lightgrey"} }  className="fas fa-thumbs-down"></i>
                            <h5 className="d-inline">{this.state.dislikes}</h5>
                        </div>
                        <div className="label">
                            <i className="fas fa-share" onClick={this.share}></i>
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
                    : ""
                    }
                    {
                        this.state.showComments && this.state.shareable ?
                        <ul className="comments">
                            <li>
                                <h3>Create A Comment</h3>
                                <form className="text-right" onSubmit={this.postComment}>
                                    <textarea id="postComment" className="d-block m-auto border-round-small border-lg" required></textarea><br />
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
            {this.state.post}
            {this.getPostMetaData()}
        </div>
        );
    }
}
export default Post;