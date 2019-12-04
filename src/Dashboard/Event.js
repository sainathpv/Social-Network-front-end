import React from 'react';
import Cookie from './../Utility/Cookie';
import './../css/dashboard/post.css';
class Event extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           event: props.event,
           eventDisplay: <div></div>
        }
    }

    getPostMetaData(){
        return (
            <div>
                <div>
                    <i class="fas fa-calendar-plus"></i>
                    <h5>Going: {this.state.event.going}</h5>
                </div>
                <div>
                    <i class="fas fa-map-marked-alt"></i>
                    <h5>Location: {this.state.location}</h5>
                </div>
                <div>
                    <i class="fas fa-calendar"></i>
                    <h5>Date: {this.state.event.date}</h5>
                </div>
            </div>
        );

    }

    render(){
        return (
        <div className="event bg-primary border-lg border-round-small">
            <h2>{this.state.event.eventName}</h2>
            <h5>{this.state.event.company}</h5>
            <hr />
            {this.state.eventDisplay}
            {this.getPostMetaData()}
        </div>
        );
    }
}
export default Event;