import React from 'react';
import ProfilePanel from './ProfilePanel';
import PostPanel from './PostPanel';
import ChatPanel from './ChatPanel';
import EventPanel from './EventPanel';
import NetworkPanel from './NetworkPanel';
import Helmet from 'react-helmet';
import './../css/dashboard/dashboard.css';
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {showPostForm: false, panel: "home"};
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

        if(this.state.panel === "home"){
            return (
                <div id="dashboard" className="d-grid text-primary">
                    <Helmet>
                        <title>Hoosier Connection</title>
                    </Helmet>
                    <ProfilePanel showPostForm={this.showPostForm} />
                    <PostPanel changePanel={this.changePanel} showPostForm={this.showPostForm} isPostFormHidden={this.isPostFormHidden.bind(this)} />
                    <NetworkPanel />
                </div>
            );
        }else if(this.state.panel === "chats"){
            return (
                <div id="dashboard" className="d-grid text-primary">
                    <Helmet>
                        <title>Hoosier Connection</title>
                    </Helmet>
                    <ProfilePanel showPostForm={this.showPostForm} />
                    <ChatPanel changePanel={this.changePanel} />
                    <NetworkPanel />
                </div>
            );
        }else{
            return (
                <div id="dashboard" className="d-grid text-primary">
                    <Helmet>
                        <title>Hoosier Connection</title>
                    </Helmet>
                    <ProfilePanel showPostForm={this.showPostForm} />
                    <EventPanel changePanel={this.changePanel} />
                    <NetworkPanel />
                </div>
            );
        }
    }
}
export default Dashboard;
