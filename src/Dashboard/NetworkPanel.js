import React from 'react';
import person from './../images/person-generic.jpg';
class NetworkPanel extends React.Component{


    render(){
        return (
            <div id="dash_networkpanel">
                <div className="panel-header">
                    <h2>Your Network</h2>
                </div>
                <div className="network-panel">
                    <div className="friends">
                        {/*TODO: Friends Section Component*/}
                        <h3>Friends</h3>
                        <ul className="d-grid">
                            <li>
                                <img src={person} alt={person}  />
                                <h5>James Cannon</h5>
                            </li>
                            <li>
                                <img src={person} alt={person}  />
                                <h5>James Cannon</h5>
                            </li>
                            <li>
                                <img src={person} alt={person}  />
                                <h5>James Cannon</h5>
                            </li>
                            <li>
                                <img src={person} alt={person}  />
                                <h5>James Cannon</h5>
                            </li>
                            <li>
                                <img src={person} alt={person}  />
                                <h5>James Cannon</h5>
                            </li>
                            <li>
                                <img src={person} alt={person}  />
                                <h5>James Cannon</h5>
                            </li>
                            <li>
                                <img src={person} alt={person}  />
                                <h5>James Cannon</h5>
                            </li>
                            <li>
                                <img src={person} alt={person}  />
                                <h5>James Cannon</h5>
                            </li>
                        </ul>
                        <div className="text-right"><a>See More</a></div>
                    </div>
                    <hr />
                    <div className="interests">
                        {/*TODO: Interests Section Component*/}
                        <h3>Interests</h3>
                        
                        <ul>
                            <li>Programming</li>
                            <li>Web Development</li>
                            <li>Crime</li>
                            <li>Indiana</li>
                            <li>Art</li>
                            <li>Database Management</li>
                            <li>Dutch</li>
                            <li>Music</li>
                        </ul>
                        <div className="text-right"><a>See More</a></div>
                    </div>
                    <hr />
                    <div className="events">
                    <h3>Your Events</h3>
                   
                    <ul>
                        <li className="d-flex">
                            <div>
                                <h4>Pumpkin Patch Raid</h4>
                                <h5>4th & Walnut</h5>
                            </div>
                            <div className="text-right">
                                <h5>Pumpkin Company</h5>
                                <h5>10/26/19</h5>
                            </div>
                        </li>
                        <li className="d-flex">
                            <div>
                                <h4>Pumpkin Patch Raid</h4>
                                <h5>4th & Walnut</h5>
                            </div>
                            <div className="text-right">
                                <h5>Pumpkin Company</h5>
                                <h5>10/26/19</h5>
                            </div>
                        </li>
                        <li className="d-flex">
                            <div>
                                <h4>Pumpkin Patch Raid</h4>
                                <h5>4th & Walnut</h5>
                            </div>
                            <div className="text-right">
                                <h5>Pumpkin Company</h5>
                                <h5>10/26/19</h5>
                            </div>
                        </li>
                        <li className="d-flex">
                            <div>
                                <h4>Pumpkin Patch Raid</h4>
                                <h5>4th & Walnut</h5>
                            </div>
                            <div className="text-right">
                                <h5>Pumpkin Company</h5>
                                <h5>10/26/19</h5>
                            </div>
                        </li>
                        <li className="d-flex">
                            <div>
                                <h4>Pumpkin Patch Raid</h4>
                                <h5>4th & Walnut</h5>
                            </div>
                            <div className="text-right">
                                <h5>Pumpkin Company</h5>
                                <h5>10/26/19</h5>
                            </div>
                        </li>
                        <div className="text-right"><a>See More</a></div>
                    </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default NetworkPanel;