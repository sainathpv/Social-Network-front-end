import React from 'react';
import logo from './../images/HC.svg';
import person from './../images/person-generic.jpg';
class ProfilePanel extends React.Component{

    render(){
        return (
            <div id="dash_profilePanel">
                <div className="p-fixed">
                    <div className="d-flex logobox">
                        <img src={logo} alt=""></img>
                        <h1 className="text-nunito">Hoosier Connection</h1>
                    </div>
                    <hr />
                    <div className="profile d-flex">
                        <img src={person} alt=""/>
                        <div className="description">
                            <h3 className="text-nunito">Sally McSal</h3>
                            <div className="text-roboto ">
                                <h4>Undergraduate Student</h4>
                                <h5>Computer Science Major</h5>
                                <h5>Junior</h5>
                            </div>
                        </div>
                    </div>
                    <ul className="activity text-roboto">
                        <li><a className="description">Posts</a><a className="amount">10</a></li>
                        <li><a className="description">Events</a><a className="amount">1</a></li>
                        <li><a className="description">Friends</a><a className="amount">2</a></li>
                        <li><a className="description">Messages</a><a className="amount">0</a></li>
                    </ul>
                    {/* TODO: Create Post Component */}
                    <button id="dash_createPost">Create A Post</button>
                    <hr />
                    <form className="findFriend">
                        {/* TODO: Find Friend Component */}
                        <h4>Find Friend</h4>
                        <input placeholder="Username"></input>
                        <div className="text-right"><button id="btn_findFriend">Send</button></div>
                    </form>
                    <form className="activeFriendRequests">
                        <h4>Current Friend Requests</h4>
                        {/* TODO: Friend Request Component */}
                        <ul>
                            <li className="d-flex">
                                <img src={person} alt=""/>
                                <h5>James Cameron</h5>
                                <button>Accept</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        );  
    }
}
export default ProfilePanel;