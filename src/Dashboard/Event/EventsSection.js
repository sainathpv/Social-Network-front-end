import React, { Component } from 'react';
import Cookie from '../../Utility/Cookie';
class EventsSection extends Component {

    constructor(props){
        super(props);
        this.state = {eventsID: props.events, events: []};
        this.getEvents = this.getEvents.bind(this);
        this.getEvents();
    }


    getEvents(){
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            }
        };
        fetch("http://" + process.env.REACT_APP_API_HOST  + "/events?eventIDs=" + JSON.stringify(this.state.events), options).then(result =>{
            return result.json();
        }).then(result => {
            this.setState({events: result.events});
        });
    }

    render() {
        return (
        <div id="dash_eventPanel" className="events">
            <h3>Your Events</h3>
            <ul>
                {this.state.events.map((event, i) => {
                    if(i < 4){
                        return(
                            <li key={i.toString()} className="d-flex border-lg border-round-small">
                                <div>
                                    <div>
                                        <h4 className="color-red text-bold">{event.eventName}</h4>
                                    </div>
                                    <div>
                                        <h4>Location:</h4>
                                        <h5>{event.location}</h5>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h4 className="color-red text-bold">{event.company}</h4>
                                    </div>
                                    <div>
                                        <h4>Date:</h4>
                                        <h5>{event.date} @ {event.time}</h5>
                                    </div>
                                </div>
                            </li>
                        );
                    }else{
                        return ("");
                    }
                })}

                { 
                    this.state.events.length > 3 ?
                    <div className="text-right color-red">See More</div> 
                    : ""
                }
            </ul>
        </div>
        );
    }
}

export default EventsSection;
