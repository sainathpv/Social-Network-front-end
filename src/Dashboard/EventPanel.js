import React, { Component } from 'react';
import PostPanel from './PostPanel';
import ChatPanel from './ChatPanel';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {panel: "events", chats: []};
        this.changePanel = this.changePanel.bind(this);
    }
    changePanel(event){
        console.log(event.target.textContent.toLowerCase());
        this.setState({panel: event.target.textContent.toLowerCase()});
    }
    render() {
        if(this.state.panel === "events"){
            return (
                <div id="dash_eventPanel">
                    <nav>
                        <div className="p-fixed bg-primary border-lg w-100">
                            <ul className="d-flex">
                                <li className="cursor-pointer" onClick={this.changePanel}>Home</li>
                                <li className="cursor-pointer" onClick={this.changePanel}>Chats</li>
                                <li className="cursor-pointer active">Events</li>
                            </ul>
                        </div>
                    </nav>
                    <ul className="event">

                    </ul>
                </div>
            );
        }else if(this.state.panel === "chats"){
            return (<ChatPanel />);
        }else{
            return (<PostPanel />);
        }
    }
}

export default App;
