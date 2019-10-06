import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Logo from "./Logo.jpeg";
import SignInForm from './SignInForm.js';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export default class SignUpForm extends Component{
    render() {
        return(  
            <React.Fragment>
            

<div className="container col-4 row-7 shadow-lg p-3 mt-5" style={{marginLeft:"50%",backgroundColor:"white",borderRadius:"25px"}}>  
    
    <Form style={{marginTop:'auto',marginLeft:"auto", marginRight:"auto"}}>

        <div className="row">
            <div className="col-3 mt-1 ">
                <img src={Logo} thumbnail style={{width:"80px",height:"80px"}}></img>
                </div>
            <div className="col-9 mt-4 font-weight-bold " style={{fontSize:"19px"}} >
                <span>HOOSIER CONNECTION</span>
                    
            </div>
       
        </div>
        
    
    <Form.Group controlId="Email">
        <Form.Label>Email</Form.Label>
        <Form.Control  type="email"  />
    </Form.Group>

    <Form.Group controlId="FirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" />
    </Form.Group>

    <Form.Group controlId="LastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" />
    </Form.Group>

    <Form.Group controlId="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  />
        </Form.Group>

        <Form.Group controlId="PasswordAgain">
        <Form.Label>Re-enter Password</Form.Label>
        <Form.Control type="password"  />
        </Form.Group>

    
       <div className="row"><div className="col-5"> <Button className='bg-danger text-light' variant="submit">Sign Up</Button></div> <Link to="/SignInForm" className="col-"> Login?</Link>
       </div>
    
    </Form>
</div>
  </React.Fragment>


        )
    }
}