import React, { Component } from 'react';
import Chat from './Chat';
import ChatRoom from './ChatRoom';
class App extends Component {
    constructor(props){
        super(props);

        const chats = [
            {
                chatName: "Chat One",
                users: ["bsiefers", "bsiefers1", "bsiefers2"]
            },
            {
                chatName: "Chat Two",
                users: ["bsiefers", "bsiefers1", "bsiefers2"]

            },
            {
                chatName: "Chat Three",
                users: ["bsiefers", "bsiefers1", "bsiefers2"]
            }
        ];

        this.state = {changePanel: props.changePanel, chats: chats, openChatRoom: null};
        this.changePanel = this.changePanel.bind(this);
        this.openChatRoom = this.openChatRoom.bind(this);
    }

    changePanel(event){
        this.setState({panel: event.target.textContent.toLowerCase()});
        var panel = event.target.textContent.toLowerCase();
        if(panel === "home" || panel === "events"){
            this.state.changePanel(panel);
        }
    }

    openChatRoom(chat){
        this.setState({openChatRoom: chat});
    }

    render() {
        if(this.state.openChatRoom != null){
            return (
                <ChatRoom changePanel={this.state.changePanel} openChatRoom={this.openChatRoom} chat={this.state.openChatRoom} />
            );
        }else{
            return (
                <div id="dash_chatPanel">
                    <nav>
                        <div className="p-fixed bg-primary border-lg w-100">
                            <ul className="d-flex">
                                <li className="cursor-pointer" onClick={this.changePanel}>Home</li>
                                <li className="cursor-pointer active">Chats</li>
                                <li className="cursor-pointer" onClick={this.changePanel}>Events</li>
                            </ul>
                        </div>
                    </nav>
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

export default App;
