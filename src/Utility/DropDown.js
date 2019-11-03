import React, { Component } from 'react';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {items: props.items, showMenu: false, label: this.props.label + "  ▾", handle: props.handle };
        this.changeLabel = this.changeLabel.bind(this);
    }

    changeLabel(label){
        this.setState({label: label +  "  ▾"});
    }

    getMenu(event){
        if(this.state.showMenu){
            return(
                <ul>
                    {this.state.items.map((item, i) => <li key={i.toString()} onClick={() => {
                        this.state.handle(item.toLowerCase());
                        this.changeLabel(item);
                        this.showMenu();
                    }}>{item}</li>)}
                </ul>
            );
        }else{
            return("");
        }
    }

    showMenu(){
        event.preventDefault();
        this.setState({showMenu: !this.state.showMenu});
    }
    
    render() {    
        return (
            <div className="dropdown">
                <button onClick={this.showMenu.bind(this)}>{this.state.label}</button>
                {this.getMenu()}
            </div>
        );
  }
}

export default App;


// WEBPACK FOOTER //
// src/Utility/DropDown.js