import React, { Component } from 'react';
import Event from './Event';
class EventPanel extends Component {
    constructor(props){
        super(props);
        this.state = {changePanel: props.changePanel, events: []};
        this.changePanel = this.changePanel.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.getEvents();
    }

    getEvents(){
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch("http://"+ process.env.REACT_APP_API_HOST +"/events", options).then( result => {
            return result.json();
        }).then( result => {
            this.setState({events: result.events});
        });
    }

    changePanel(event){
        this.setState({panel: event.target.textContent.toLowerCase()});
        var panel = event.target.textContent.toLowerCase();
        if(panel === "chats" || panel === "home"){
            this.state.changePanel(panel);
        }
    }

    render() {
        return (
            <div id="dash_eventPanel">
                <nav>
                    <div className="p-fixed bg-primary border-lg w-100">
                        <ul className="d-flex">
                            <li className="cursor-pointer" onClick={this.changePanel}>Home</li>
                            <li className="cursor-pointer" onClick={this.changePanel}>Chats</li>
                            <li className="cursor-pointer active">Events</li>
                        </ul>
                    </div>
                </nav>
                <ul className="events">
                    {
                        this.state.events.map((event, i) => {
                            return <Event key={i} event={event} />
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default EventPanel;
