import React from 'react';
import logo from './../images/HC.svg';
import person from './../images/person-generic.jpg';
import Cookie from './../Utility/Cookie';
class ProfilePanel extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            showPostForm: props.showPostForm,
            tabOpened: false,
            
            name: "",
            profileIMG: "",
            major: "",
            studentType: "",
            year: "",

            interests: [],
            posts: [],
            events: [],
            friends: [],
            chats: []
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.expandPanel = this.expandPanel.bind(this);
        this.closePanel = this.closePanel.bind(this);
        this.getProfileData = this.getProfileData.bind(this);
        if(!this.getProfileData()){
            window.location.href = "/login";
        }
    }

    getProfileData(){
        
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            }
        }
        try{
            fetch("http://localhost:8080/profiles/profile", options).then( result => {
                return result.json();
            }).then( result => {

                var friends = [
                    {name: "John Smith", profileImageURL: "/assets/images/profiles/person1.jpg", accepted: true},
                    {name: "Sally Sue", profileImageURL: "/assets/images/profiles/person2.png", accepted: true},
                    {name: "Tex Mex", profileImageURL: "/assets/images/profiles/person3.png", accepted: true},
                    {name: "Frank Ocean", profileImageURL: "/assets/images/profiles/person4.jpg", accepted: true},
                    {name: "Davis Lee", profileImageURL: "/assets/images/profiles/person5.jpg", accepted: true},
                    {name: "Alan Jons", profileImageURL: "/assets/images/profiles/person1.jpg", accepted: true},
                    {name: "Michelle Zimmer", profileImageURL: "/assets/images/profiles/person2.png", accepted: true},
                    {name: "Quinn Joy", profileImageURL: "/assets/images/profiles/person1.jpg", accepted: true},
                    {name: "James Smith", profileImageURL: "/assets/images/profiles/person1.jpg", accepted: false},
                    {name: "Hal Lee", profileImageURL: "/assets/images/profiles/person1.jpg", accepted: false}
                ]

                this.setState({
                    name: result.name,
                    profileIMG: result.profileImageUrl,
                    major: result.major,
                    studentType: result.studentType,
                    year: result.year,
                    
                    interests: result.interests,
                    posts: result.posts,
                    events: result.events,
                    friends: friends, 
                    chats: result.chats
                });
            });
        }catch(err){
            console.log(err);
        }

        return true;
    }

    updateWindowDimensions() {
        if(this.state.tabOpened && window.innerWidth <= 1600){
            this.closePanel()
        }
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    expandPanel(){
        this.setState({tabOpened: true});
        var tab = document.getElementById("tab_profilePanel");
        var panel = document.getElementById("dash_profilePanel");

        var post = document.getElementById("dash_postPanel");
        var network = document.getElementById("dash_networkPanel");
        var icon = document.getElementById("dash_profilePanelCloseIcon");
        var child  = panel.getElementsByClassName("p-fixed")[0];
        child.style.width = "100%";
        icon.style.display = "block";
        tab.style.display = "none";
        panel.style.display = "inherit";
        post.style.display = "none";
        network.style.display = "none";
        panel.style.width = "100vw";
    }

    closePanel(){
        this.setState({tabOpened: false});
        var tab = document.getElementById("tab_profilePanel");
        var panel = document.getElementById("dash_profilePanel");

        var post = document.getElementById("dash_postPanel");
        var network = document.getElementById("dash_networkPanel");
        var icon = document.getElementById("dash_profilePanelCloseIcon");
        var child  = panel.getElementsByClassName("p-fixed")[0];
        child.style.width = "";
        icon.style.display = "";
        tab.style.display = "";
        panel.style.display = "";
        post.style.display = "";
        network.style.display = "";
        panel.style.width = "";
    }

    goToProfile(){
        window.location.href = "profile";
    }
    render(){
        return (
            <div>
                <div id="dash_profilePanel">
                    <div className="p-fixed h-100vh bg-primary">
                        <div className="d-flex logobox">
                            <img src={logo} alt=""></img>
                            <h1 className="text-nunito">Hoosier Connection</h1>
                            <i onClick={this.closePanel} id="dash_profilePanelCloseIcon" className="p-absolute d-none fas fa-times"></i>
                        </div>
                        <hr />
                        <div className="profile d-flex">
                            <img onClick={this.goToProfile} className="cursor-pointer border-lg border-round" src={ "http://localhost:8080" + this.state.profileIMG} alt=""/>
                            <div className="color-grey description">
                                <h3 className="text-nunito">{this.state.name}</h3>
                                <div className="text-roboto ">
                                    <h4>{this.state.studentType}</h4>
                                    <h5>{this.state.major}</h5>
                                    <h5>{this.state.year}</h5>
                                </div>
                                <i onClick={this.goToProfile} id="dash_profilePanelEditIcon"  className="cursor-pointer text-secondary fas fa-pen"></i>
                            </div>
                        </div>
                        <ul className="activity text-roboto">
                            <li className="space-between"><a className="description">Posts</a><a className="color-red">{this.state.posts.length}</a></li>
                            <li className="space-between"><a className="description">Events</a><a className="color-red">{this.state.events.length}</a></li>
                            <li className="space-between"><a className="description">Friends</a><a className="color-red">{this.state.friends.filter(friend => friend.accepted).length}</a></li>
                            <li className="space-between"><a className="description">Messages</a><a className="color-red">{this.state.chats.length}</a></li>
                        </ul>
                        <button id="dash_createPost" className="btn-primary d-block" onClick={this.state.showPostForm}>Create A Post</button>
                        <hr />
                        <form className="findFriend">
                            {/* TODO: Find Friend Component */}
                            <h4>Find Friend</h4>
                            <input className="d-block m-auto border-lg border-round-small bg-secondary" placeholder="Username"></input>
                            <div className="text-right"><button className="btn-primary" id="btn_findFriend">Send</button></div>
                        </form>
                        <form className="activeFriendRequests">
                            <h4>Current Friend Requests</h4>
                            <ul>
                                {
                                    this.state.friends.filter(friend => !friend.accepted).map((friend, i) => {
                                        return(
                                            <li key={i} className="d-flex space-between">
                                                <div>
                                                    <img className="border-round border-lg d-inline" src={"http://localhost:8080" + friend.profileImageURL} alt={person}/>
                                                    <h5 className="d-inline">{friend.name}</h5>
                                                </div>
                                                <span> <button className="btn-primary">Accept</button> <i className="cursor-pointer text-secondary  fas fa-times"></i></span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </form>
                    </div>
                </div>
                <div id="tab_profilePanel" onClick={this.expandPanel}>
                    <h2>Profile</h2>
                </div>
            </div>
        );  
    }
}
export default ProfilePanel;