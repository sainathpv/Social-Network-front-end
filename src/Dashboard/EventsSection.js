import React, { Component } from 'react';

class EventsSection extends Component {

    constructor(props){
        super(props);
        this.state = {events: props.events};
    }

    render() {
        return (
        <div className="events">
            <h3>Your Events</h3>
            <ul>
                {this.state.events.map((event, i) => {
                    if(i < 4){
                        return(
                            <li key={i.toString()} className="d-flex">
                                <div>
                                    <h4>{event.name}</h4>
                                    <h5>{event.location}</h5>
                                </div>
                                <div>
                                    <h4 className="text-right">{event.company}</h4>
                                    <h5 className="text-right">{event.date}</h5>
                                </div>
                            </li>
                        );
                    }else{
                        return ("");
                    }
                })}

                { 
                    this.state.events.length > 3 ?
                    <div className="text-right color-red"><a>See More</a></div> 
                    : ""
                }
            </ul>
        </div>
        );
    }
}

export default EventsSection;
