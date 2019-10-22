import React from 'react';
import ProfilePanel from './ProfilePanel';
import PostPanel from './PostPanel';
import NetworkPanel from './NetworkPanel';
import './../css/dashboard/dashboard.css';
class Dashboard extends React.Component{

    render(){
        return (
            <div id="dashboard" className="d-grid">
                <ProfilePanel />
                <PostPanel />
                <NetworkPanel />
            </div>
        );
    }
}
export default Dashboard;