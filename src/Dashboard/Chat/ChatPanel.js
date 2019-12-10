import React, { Component, useState } from 'react';
import Chat from './Chat';
import ChatRoom from './ChatRoom';
import ChatForm from './ChatForm';
import Cookie from './../../Utility/Cookie';
class ChatPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            showChatForm: props.showChatForm,
            isChatFormHidden: props.isChatFormHidden,
            changePanel: props.changePanel,
            chats: [],
            openChatRoom: null,
            profile: props.profile,
            chatUser: null,
            rooms: null
        };
        this.changePanel = this.changePanel.bind(this);
        this.openChatRoom = this.openChatRoom.bind(this);
    }

    changePanel(event){
        var panel = event.target.textContent.toLowerCase();
        if(panel === "home" || panel === "chats" || panel === "events"){
            this.state.changePanel(panel);
        }
    }
    componentDidMount(){
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookie.getCookie('HC_JWT')
            }
        };

        fetch("http://"+ process.env.REACT_APP_API_HOST +"/profiles/profile", options).then( result => {
            return result.json();
        }).then( profile => {
            fetch("http://"+ process.env.REACT_APP_API_HOST +"/chats", options).then( result => {
                return result.json();
            }).then( result => {
                this.setState({chats: result.chats, profile: profile});
            });
        });
    }
    
    openChatRoom(chat){
        this.setState({openChatRoom: chat});
    }
    
    renderChatForm() {
        console.log(this.state.isChatFormHidden());
        if (this.state.isChatFormHidden()) {
            return <ChatForm closeForm={this.state.showChatForm} />;
        } else {
            return;
        }
    }

      
    render() {
        if(this.state.openChatRoom != null){
            return (
                <ChatRoom profile={this.state.profile} changePanel={this.state.changePanel} openChatRoom={this.openChatRoom} chat={this.state.openChatRoom} />
            );
        }else{
            return (
                <div id="dash_chatPanel">
                    <nav>
                        <div className="p-fixed bg-navbar w-100">
                            <ul className="d-flex">
                                <li className="cursor-pointer" onClick={this.changePanel}>Home</li>
                                <li className="cursor-pointer active">Chats</li>
                                <li className="cursor-pointer" onClick={this.changePanel}>Events</li>
                            </ul>
                        </div>
                    </nav>
                    {this.renderChatForm()}
                    <ul className="chats">
                        {this.state.chats.map((chat, i) => {
                            return <Chat openChatRoom={this.openChatRoom} key={i} chat={chat} />;
                        })
                        }
                    </ul>
                </div>
            );
        }
        
    }
}

export default ChatPanel;
