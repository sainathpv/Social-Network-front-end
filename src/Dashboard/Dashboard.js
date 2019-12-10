import React from 'react';
import ProfilePanel from './ProfilePanel';
import PostPanel from './Post/PostPanel';
import ChatPanel from './Chat/ChatPanel';
import EventPanel from './Event/EventPanel';
import NetworkPanel from './NetworkPanel';
import Helmet from 'react-helmet';
import './../css/dashboard/dashboard.css';
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showEventForm: false,
            showChatForm: false,
            showPostForm: false,
            panel: "home",
            profile: null
        };
        this.showPostForm = this.showPostForm.bind(this);
        this.showChatForm = this.showChatForm.bind(this);
        this.showMiniProfilePage = this.showMiniProfilePage.bind(this);
        this.changePanel = this.changePanel.bind(this);
    }

    showPostForm(){
        this.setState({showPostForm: !this.state.showPostForm}); 
    }
    isPostFormHidden(){
        return this.state.showPostForm;
    }

    showChatForm(){
        console.log(this.state.showChatForm);
        this.setState({showChatForm: !this.state.showChatForm}); 
    }

    isChatFormHidden(){
        return this.state.showChatForm;
    }

    showMiniProfilePage(){
        this.setState({showMiniProfilePage: !this.state.showMiniProfilePage}); 
    }

    changePanel(panel){
        this.setState({panel: panel});
    }

    isMiniProfileHidden(){
        return this.state.showMiniProfilePage
    }

    render(){
        
        if(this.state.panel === "home"){
            return (
                <div id="dashboard" className="d-grid text-primary">
                    <Helmet>
                        <title>Hoosier Connection</title>
                    </Helmet>
                    <ProfilePanel key={this.state.panel} panel={this.state.panel} showPostForm={this.showPostForm} />
                    <PostPanel
                        
                        changePanel={this.changePanel}
                        showPostForm={this.showPostForm}
                        showMiniProfilePage={this.showMiniProfilePage}
                        isPostFormHidden={this.isPostFormHidden.bind(this)}
                        isMiniProfileHidden={this.isMiniProfileHidden.bind(this)}
                    />
                    <NetworkPanel />
                </div>
            );
        }else if(this.state.panel === "chats"){
            return (
                <div id="dashboard" className="d-grid text-primary">
                    <Helmet>
                        <title>Hoosier Connection</title> 
                    </Helmet>
                    <ProfilePanel key={this.state.panel} panel={this.state.panel}  showChatForm={this.showChatForm}  />
                    <ChatPanel showChatForm={this.showChatForm} isChatFormHidden={this.isChatFormHidden.bind(this)} changePanel={this.changePanel} />
                    <NetworkPanel />
                </div>
            );
        } else {
            return (
                <div id="dashboard" className="d-grid text-primary">
                    <Helmet>
                        <title>Hoosier Connection</title>
                    </Helmet>
                    <ProfilePanel key={this.state.panel} panel={this.state.panel}  showEventForm={this.showEventForm} />
                    <EventPanel showChatForm={this.showEventForm} isChatFormHidden={this.isEventFormHidden.bind(this)}  changePanel={this.changePanel} />
                    <NetworkPanel />
                </div>
            );
        }
    }
}
export default Dashboard;
