import React from 'react';
//import Cookie from './../Utility/Cookie';
import './../../css/dashboard/chat.css';
class Message extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            profile: props.profile,
            message: props.message
        };
    }

    render(){
        if(this.state.message.userName === this.state.profile.name){
            return (
                <li className="message msg-user text-right">
                    <h5>{this.state.message.userName}</h5><br />
                    <p>{this.state.message.text}</p>
                </li>
            );
        }else{
            return (
                <li className="messsage msg-other">
                    <h5>{this.state.message.userName}</h5><br />
                    <p>{this.state.message.text}</p>
                </li>
            );
        }
    }
}
export default Message;