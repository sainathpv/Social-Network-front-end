import React, { Component } from 'react';
import DropDownMenu from '../../Utility/DropDown';
import Cookie from '../../Utility/Cookie';

class ChatForm extends Component {
    constructor(props) {
        super(props);
        this.state = { type: "text", title: "", tag: "", content: "", closeForm: props.closeForm };
        this.changeType = this.changeType.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.createChat = this.createChat.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    changeType(type) {
        event.preventDefault();
        this.setState({ type: type });
    }

    fileSelectedHandler(event) {
        console.log(event.target.files[0]);
        this.setState({ content: event.target.files[0] });
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ content: document.getElementById("postFormContent").value });
    }

    addItem(event){
        event.preventDefault();
        var ul = event.target;
        var input = event.target;
        while(!input.classList.contains("itemInput")){
            input = input.previousElementSibling;
        }
        while(!ul.classList.contains("itemList")){
            ul = ul.previousElementSibling;
        }
        if(input.value === "") return;
        const li = document.createElement("li");
        li.textContent = input.value;
        ul.appendChild(li);
    }

    createChat(event) {
        
    }

    render() {
        return (
            <div className="chatForm d-block m-auto bg-primary p-fixed border-lg border-round-small" >
                <div className="d-flex space-between header">
                    <h3 className="d-inline">Create Chat:</h3>
                    <i onClick={this.state.closeForm} className="text-secondary cursor-pointer d-inline fas fa-times"></i>
                </div>
                <hr />
                <form className="form" onSubmit={this.createPost}>
                    <label>Title:</label><br />
                    <input id="ChatFormTitle" className="d-block text-primary border-round-small bg-secondary border-lg w-100"></input>

                    <div className="text-right"><button className="btn-primary" type="submit">Submit</button></div>
                </form>
            </div>
        );
    }
}

export default ChatForm;