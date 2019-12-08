import React from 'react';
import ProfilePanel from './ProfilePanel';
import PostPanel from './Post/PostPanel';
import ChatPanel from './Chat/ChatPanel';
import EventPanel from './Event/EventPanel';
import NetworkPanel from './NetworkPanel';
import Helmet from 'react-helmet';
import Cookie from './../Utility/Cookie';
import './../css/dashboard/dashboard.css';
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showPostForm: false,
            panel: "home",
            profile: null
        };
        this.showPostForm = this.showPostForm.bind(this);
        this.changePanel = this.changePanel.bind(this);
    }

    showPostForm(){
        this.setState({showPostForm: !this.state.showPostForm}); 
    }

    changePanel(panel){
        this.setState({panel: panel});
    }

    isPostFormHidden(){
        return this.state.showPostForm;
    }

    render(){

        if(this.state.panel === "home" && this.state.profile !== undefined){
            return (
                <div id="dashboard" className="d-grid text-primary">
                    <Helmet>
                        <title>Hoosier Connection</title>
                    </Helmet>
                    <ProfilePanel  showPostForm={this.showPostForm} />
                    <PostPanel changePanel={this.changePanel} showPostForm={this.showPostForm} isPostFormHidden={this.isPostFormHidden.bind(this)} />
                    <NetworkPanel />
                </div>
            );
        }else if(this.state.panel === "chats"  && this.state.profile !== undefined){
            return (
                <div id="dashboard" className="d-grid text-primary">
                    <Helmet>
                        <title>Hoosier Connection</title>
                    </Helmet>
                    <ProfilePanel  showPostForm={this.showPostForm} />
                    <ChatPanel changePanel={this.changePanel} />
                    <NetworkPanel />
                </div>
            );
        }else if(this.state.profile !== undefined){
            return (
                <div id="dashboard" className="d-grid text-primary">
                    <Helmet>
                        <title>Hoosier Connection</title>
                    </Helmet>
                    <ProfilePanel  showPostForm={this.showPostForm} />
                    <EventPanel changePanel={this.changePanel} />
                    <NetworkPanel />
                </div>
            );
        }else{
            return (<div>test</div>)
        }
    }
}
export default Dashboard;
