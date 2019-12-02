import React, { Component } from 'react';
import PostPanel from './PostPanel';
import ChatPanel from './ChatPanel';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {changePanel: props.changePanel, chats: []};
        this.changePanel = this.changePanel.bind(this);
    }

    changePanel(event){
        this.setState({panel: event.target.textContent.toLowerCase()});
        var panel = event.target.textContent.toLowerCase();
        if(panel === "chats" || panel === "home"){
            this.state.changePanel(panel);
        }
    }

    render() {

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
    }
}

export default App;
