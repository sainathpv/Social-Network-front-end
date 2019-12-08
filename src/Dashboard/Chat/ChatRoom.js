import React, { useEffect } from 'react';
//import Cookie from './../Utility/Cookie';
import './../../css/dashboard/chat.css';
import io from 'socket.io-client';
import Message from './Message';
import Cookie from './../../Utility/Cookie';
let socket;
class ChatRoom extends React.Component{
    constructor(props){
        super(props);

        this.state = {
           profile: props.profile,
           changePanel: props.changePanel,
           openChatRoom: props.openChatRoom,
           message: "",
           chat: props.chat
        }
        this.changePanel = this.changePanel.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
    }

    sendMessage(event){
        event.preventDefault();
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            },
            body: JSON.stringify({
                chatID: this.state.chat._id,
                message: this.state.message
            })
        };

        if(this.state.message){
            socket.emit('sendMessage', {message: this.state.message,chat: this.state.chat}, () => console.log("finished sending message"));
            fetch("http://"+ process.env.REACT_APP_API_HOST + "/chats/sendMessage", options).then( result => {
                return result.json();
            }).then( result => {
                this.setState({chat: result.chat});
                this.setScrollToBottom();
            });
        }
    }

    setScrollToBottom(){
        var messagebox = document.getElementById("chat_messages");
        messagebox.scrollTop = messagebox.scrollHeight;
    }

    componentDidMount(){
        socket = io(process.env.REACT_APP_API_HOST);
        var token = 'Bearer ' + Cookie.getCookie('HC_JWT');
        socket.emit('join', {chat: this.state.chat, profile: this.state.profile, jwt: token}, () => {

        });

        socket.on('message', (message) => {
            console.log("getting messages");
            var options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
                }
            };
            fetch("http://"+ process.env.REACT_APP_API_HOST + "/chats", options).then( result => {
                return result.json();
            }).then( result => {
                console.log(result);
                this.setState({chat: result.chats[0]});
            });
        });
    }

    componentWillUnmount() {
        var token = 'Bearer ' + Cookie.getCookie('HC_JWT');
        socket.emit('disconnect', {chat: this.state.chat, profile: this.state.profile, jwt: token }, () => {
            
        });
        socket.disconnect();
    }

    changePanel(event){
        this.setState({panel: event.target.textContent.toLowerCase()});
        var panel = event.target.textContent.toLowerCase();
        if(panel === "home" || panel === "chats" || panel === "events"){
            this.state.changePanel(panel);
        }
    }

    onChangeMessage(event){
        this.setState({message: event.target.value});
    }

    render(){

        return (
        <div id="dash_chatRoom" >
            <nav>
                <div className="p-fixed bg-primary border-lg w-100">
                    <ul className="d-flex">
                        <li className="cursor-pointer" onClick={this.changePanel}>Home</li>
                        <li className="cursor-pointer active">Chats</li>
                        <li className="cursor-pointer" onClick={this.changePanel}>Events</li>
                    </ul>
                </div>
            </nav>
            <div className="chatRoom">
                <div className="chatBox bg-primary border-lg border-round-small">
                    <div className="d-flex space-between header">
                    <h3>{this.state.chat.chatName}</h3> <h4 className="cursor-pointer" onClick={() => this.state.openChatRoom(null)}>
                        <i className="fas fa-arrow-left"></i> Go Back</h4>
                    </div>
                    <hr />
                    <ul id="chat_messages" className="messages">
                        {this.state.chat.messages.map((message, i) => {
                            return (
                                <Message key={i} message={message} profile={this.state.profile} />
                            );
                        })}
                    </ul>
                    <form onSubmit={this.sendMessage}>
                        <hr />
                        <div className="d-flex">
                            <input type="text" className="border-lg border-round-small" placeholder="Enter A Message"
                                onChange={this.onChangeMessage}
                                onKeyPress={(event) => event.key === 'Enter' ? this.sendMessage : null}
                            ></input>
                            <button className="btn-primary">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}
export default ChatRoom;