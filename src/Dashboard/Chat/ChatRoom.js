import React from 'react';
//import Cookie from './../Utility/Cookie';
import './../../css/dashboard/chat.css';
import Chatkit from 'pusher-chatkit-client';
import Message from './Message';
class ChatRoom extends React.Component{
    constructor(props){
        super(props);
        const data = [
            {
                userName: "bsiefers",
                text: "Hi"
            },
            {
                userName: "bsiefers1",
                text: "Hi"
            },
            {
                userName: "bsiefers",
                text: "Whats are ya doing?"
            },
            {
                userName: "bsiefers1",
                text: "nothing.."
            },
            {
                userName: "bsiefers2",
                text: "hi..."
            }
        ]
        this.state = {
           messages: data,
           profile: {
               name: "bsiefers"
           },
           changePanel: props.changePanel
        }
        this.changePanel = this.changePanel.bind(this);
    }
    componentDidMount(){

    }
    changePanel(event){
        this.setState({panel: event.target.textContent.toLowerCase()});
        var panel = event.target.textContent.toLowerCase();
        if(panel === "home" || panel === "events"){
            this.state.changePanel(panel);
        }
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
                    <div className="d-flex space-between header"><h3 >ChatRoom One</h3> <h4><i className="fas fa-arrow-left"></i> Go Back</h4></div>
                    <hr />
                    <ul className="messages  ">
                        {this.state.messages.map((message, i) => {
                            return (
                                <Message key={i} message={message} profile={this.state.profile} />
                            );
                        })}
                    </ul>
                    <form>
                        <hr />
                        <div className="d-flex">
                            <input className="border-lg border-round-small" placeholder="Enter A Message"></input>
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