import React from 'react';
import ProfilePanel from './ProfilePanel';
import PostPanel from './PostPanel';
import NetworkPanel from './NetworkPanel';
import './../css/dashboard/dashboard.css';
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {showPostForm: false};
        this.showPostForm = this.showPostForm.bind(this);
    }

    showPostForm(){
        this.setState({showPostForm: !this.state.showPostForm}); 
    }

    isPostFormHidden(){
        return this.state.showPostForm;
    }

    render(){
        return (
            <div id="dashboard" className="d-grid text-primary">
                <ProfilePanel showPostForm={this.showPostForm} />
                <PostPanel showPostForm={this.showPostForm} isPostFormHidden={this.isPostFormHidden.bind(this)} />
                <NetworkPanel />
            </div>
        );
    }
}
export default Dashboard;


// WEBPACK FOOTER //
// src/Dashboard/Dashboard.js