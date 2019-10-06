import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Logo from "./Logo.jpeg";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export default class SignIpForm extends Component{
    render() {
        return(
<div className="container col-4 row-7 shadow-lg p-3 mt-5 mr-5" style={{marginLeft:"60%",backgroundColor:"white",borderRadius:"25px"}}>      
    <Form style={{marginLeft:"auto", marginRight:"auto"}}>

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

    

    <Form.Group controlId="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  />
        </Form.Group>

        

    
        <div className="row"><div className="col-1"></div><Button className='bg-danger text-light' variant="submit">Sign In</Button><Link to="/SignUpForm" className="col-5"> New Member?</Link>
        </div>
    </Form>
</div>

        )
    }
}