import React from 'react';
import person from './../images/person-generic.jpg';
import EventsSection from './EventsSection';
import Cookie from './../Utility/Cookie';
class NetworkPanel extends React.Component{
    constructor(props){
        super(props);
        
        var events = [
            {name: "Guy Fawkes Night", location: "232 Walnut Str.", company: "The English Pub", date: "November 5th"},
            {name: "Thanksgiving Dinner", location: "243 Walnut Str.", company: "Turkey Eaters", date: "November 28th"}
        ]

        this.state = {tabOpened: false, events: events, interests: [], friends: []};
        this.closePanel = this.closePanel.bind(this);
        this.expandPanel = this.expandPanel.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.getProfileData = this.getProfileData.bind(this);
        if(!this.getProfileData()){
            window.location.href = "/login";
        }
    }

    getProfileData(){
        try{
            var options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
                }
            }
            fetch("http://" + process.env.REACT_APP_API_HOST  + "/profiles/profile", options).then( result => {
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
                    {name: "Quinn Joy", profileImageURL: "/assets/images/profiles/person1.jpg", accepted: true}
                ];
        
                var events = [
                    {name: "Guy Fawkes Night", location: "232 Walnut Str.", company: "The English Pub", date: "November 5th"},
                    {name: "Thanksgiving Dinner", location: "243 Walnut Str.", company: "Turkey Eaters", date: "November 28th"}
                ]

                this.setState({
                    interests: result.interests,
                    events: events,
                    friends: friends
                });
            });
        }catch(err){
            console.log(err);
            return false;
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
      
    closePanel(){
        this.setState({tabOpened: false});

        var tab = document.getElementById("tab_networkPanel");
        var panel = document.getElementById("dash_networkPanel");
        var profile = document.getElementById("dash_profilePanel");
        var post = document.getElementById("dash_postPanel");
        var closeIcon = document.getElementById("dash_networkPanelCloseIcon");
        
        tab.style.display = "";
        panel.style.display = "";
        panel.style.width = "";

        var child = panel.getElementsByClassName("p-fixed")[0];
        child.style.width = "";
        profile.style.display = "";
        post.style.display = "";

        closeIcon.style.display = "";
    }

    expandPanel(){
        this.setState({tabOpened: true});

        var tab = document.getElementById("tab_networkPanel");
        var panel = document.getElementById("dash_networkPanel");
        var profile = document.getElementById("dash_profilePanel");
        var post = document.getElementById("dash_postPanel");
        var closeIcon = document.getElementById("dash_networkPanelCloseIcon");

        tab.style.display = "none";
        panel.style.display = "inherit";
        panel.style.width = "100vw";

        var child  = panel.getElementsByClassName("p-fixed")[0];
        child.style.width = "100%";
        profile.style.display = "none";
        post.style.display = "none";

        closeIcon.style.display = "block";
    }

    render(){

        return (
            <div>
                <div id="dash_networkPanel" className="bg-primary">
                    <div className="p-fixed">
                        <div className="panel-header">
                            <h2 className="text-center">Your Network</h2>
                            <i onClick={this.closePanel} id="dash_networkPanelCloseIcon" className="d-none p-absolute cursor-pointer fas fa-times"></i>
                        </div>
                        <div className="network-panel bg-primary w-100">
                            <div className="friends">
                                <h3>Friends</h3>
                                <ul className="d-grid">
                                    {
                                        this.state.friends.map((friend, i) => {
                                            if(i < 9 && friend.accepted){
                                                return(
                                                <li key={i}>
                                                    <img height="50px" width="50px" className="d-block border-lg border-round m-auto" src={"http://" + process.env.REACT_APP_API_HOST + friend.profileImageURL} alt={person}  />
                                                    <h5 className="text-center">{friend.name}</h5>
                                                </li>
                                                )
                                            }else{
                                                return("")
                                            }
                                        })
                                    }
                                </ul>

                            </div>
                            <hr />
                            <div className="interests">
                                <h3>Interests</h3>
                                <ul>
                                {this.state.interests.map((interest, i) => { 
                                    if(i < 9){
                                        return(<li key={i.toString()} className="color-red">{interest}</li>);
                                    }else{
                                        return("");
                                    }
                                    
                                })}
                                </ul>
                                
                            </div>
                            <hr />
                            <EventsSection events={this.state.events} />
                        </div>
                    </div>
                </div>
                <div id="tab_networkPanel" className="border-lg bg-primary" onClick={this.expandPanel}>
                    <h2>Network</h2>
                </div>
            </div>
        );
    }
}
export default NetworkPanel;