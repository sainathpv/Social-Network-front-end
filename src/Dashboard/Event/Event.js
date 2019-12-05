import React from 'react';
//import Cookie from './../Utility/Cookie';
import './../../css/dashboard/event.css';
class Event extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           event: props.event
        }
        this.getPostMetaData = this.getPostMetaData.bind(this);
        this.getContent = this.getContent.bind(this);
        this.getContent();
    }

    getPostMetaData(){
        return (
            <div className="d-flex postMetaData">
                <div className="d-flex">
                    <i className="fas fa-calendar-plus"></i>
                    <h5>Going: {this.state.event.going}</h5>
                </div>
                <div className="d-flex">
                    <i className="fas fa-map-marked-alt"></i>
                    <h5>Location: {this.state.event.location}</h5>
                </div>
                <div className="d-flex">
                    <i className="fas fa-calendar"></i>
                    <h5>Date: {this.state.event.date + " at " + this.state.event.time}</h5>
                </div>
            </div>
        );

    }

    getContent(){
                    
        var s = {
            position: "relative",
            width: "100%",
            height: "0",
            paddingBottom: "51%",
            margin: "10px 0"
        };
        switch(this.state.event.type){
            case "text":
                return <p>{this.state.event.content}</p>;
            case "video":
                return (
                    <div className="vidcontainer" style={s}>
                        <iframe src={this.state.content}  frameBorder="0" allowFullScreen/>
                    </div>
                );
            case "advert":
                return <img src={"http://" + process.env.REACT_APP_API_HOST + this.state.content} alt=""></img>;
            case "image":
                return <img className="m-auto" src={"http://" + process.env.REACT_APP_API_HOST + this.state.content} alt=""></img>;   
            case "article":
                return  <a href={this.state.content}></a>;
            default:
        }
    }

    render(){
        return (
        <div className="event bg-primary border-lg border-round-small">
            <h2>{this.state.event.eventName}</h2>
            <h5>{this.state.event.company}</h5>
            <hr />
            {this.getContent()}
            <hr />
            {this.getPostMetaData()}
        </div>
        );
    }
}
export default Event;