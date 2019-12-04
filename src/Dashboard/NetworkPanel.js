import React from 'react';
import person from './../images/person-generic.jpg';
import EventsSection from './EventsSection';
import Cookie from './../Utility/Cookie';
class NetworkPanel extends React.Component{
    constructor(props){
        super(props);

        this.state = {tabOpened: false, events: null, interests: [], friends: null};
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
        
                this.setState({
                    interests: result.interests,
                    events: result.events
                });

                fetch("http://" + process.env.REACT_APP_API_HOST  + "/friends", options).then( result => {
                    return result.json();
                }).then( result => {
                    this.setState({
                        friends: result.friends
                    });
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
                                    {//this.state.friends !== null prevents it from attempting to view profiles prior to fetching the friends object
                                    }
                                    { this.state.friends !== null && this.state.friends.profiles ? 
                                        this.state.friends.profiles.map((friend, i) => {
                                            if(i < 9 && friend.status === "accepted"){
                                                return(
                                                    <li key={i}>
                                                        <img height="50px" width="50px" className="d-block border-lg border-round m-auto" 
                                                        src={"http://" + process.env.REACT_APP_API_HOST + friend.profileIMG} alt={person}  />
                                                        <h5 className="text-center">{friend.name}</h5>
                                                    </li>
                                                );
                                            }else{
                                                return("");
                                            }
                                        })
                                        : ""
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
                            { this.state.events ? <EventsSection events={this.state.events} /> : <h3>Events</h3>}
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