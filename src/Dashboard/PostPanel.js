import React from 'react';
import Post from './Post';
import person from './../images/person-generic.jpg'
class PostPanel extends React.Component{
    constructor(props){
        super(props);
        //TODO: fetch posts
        this.state = {posts: []};
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
                profile: "adsodoj345fa",

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
                <div className="p-fixed">
                    <ul className="d-flex">
                        <li className="active">Home</li>
                        <li>Chats</li>
                        <li>Events</li>
                    </ul>
                </div>
            </nav>
            <ul className="posts" >
                <Post title="Computer science is cool!" tags={tags} dislikes={4} likes={19} comments={comments} type="text" content="This is a sample paragraph for this text post. I am thinking of types listed in the state. I don't know how we are going to implement a like dislike system."
                    user={user}
                />
                <Post title="Computer science is cool!" tags={tags} dislikes={4} likes={19} comments={comments} type="video" content="https://www.youtube.com/embed/am6xD677SyA"
                    user={user}
                />
                <Post title="Computer science is cool!" tags={tags} dislikes={4} likes={19} comments={comments} type="advert" content="https://i.imgur.com/9QpTmxm.jpg"
                    user={user}
                />
                <Post title="Computer science is cool!" tags={tags} dislikes={4} likes={19} comments={comments} type="image" content="https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2019/02/Landscapes-04-jeremy-flint.jpg?resize=1500%2C1000&ssl=1"
                    user={user}
                />
            </ul>
        </div>
        );
    }
}
export default PostPanel;