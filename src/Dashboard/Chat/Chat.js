import React from 'react';
//import Cookie from './../Utility/Cookie';
import './../../css/dashboard/chat.css';
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            openChatRoom: props.openChatRoom,
            chat: props.chat
        }
        this.openChatRoom = this.openChatRoom.bind(this);
    }

    openChatRoom(){
        this.state.openChatRoom(this.state.chat);
    }

    render(){
        return (
            <div className="chat bg-primary border-lg border-round-small">
                <h2 onClick={this.openChatRoom} className="cursor-pointer">{this.state.chat.chatName}</h2>
                <hr />
                <p>Users: {this.state.chat.users.map((user, i) => {
                    if(i+1 === this.state.chat.users.length){
                        return user;
                    }else if(i > 5){
                        if(i === 6){
                            return user + "...";
                        }else{
                            return "";
                        }
                    }else{
                        return user + ", ";
                    }
                })}</p>
            </div>
        );
    }
}
export default Chat;