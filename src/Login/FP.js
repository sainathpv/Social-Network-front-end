import React, { Component } from 'react';
import bg from './../images/FP.jpg';
import './../css/main.css';
import './../css/login.css';

class FP extends React.Component{

    render(){
        return(
            <div>
            
                <div id="FP">
                <div id="formBox">
                <form id="FP">
                   
                   <div className="label"><label> Enter your Email ID:</label></div>
                    <input type="text" id="login_email"></input>
                    <span><input type="submit" className="button"></input></span><br/>
                </form>
                </div>
            </div>
            </div>
            );

        }
}
export default FP;