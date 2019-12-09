import React from 'react';
import './../css/login/main.css';
import SignUpForm from './SignUpForm';
import indiana from './../images/Indiana.png';
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: false };
  }

  render() {
    return (
      <div id='MainPage' className='d-flex space-between'>
        <div className='background'></div>
        <div className='formBox'>
          <SignUpForm />
        </div>
        <div className='titleBox'>
          <div className='title'>
            <h1>
              Hoosier <br /> Connection
            </h1>
          </div>
          <div className='brand d-flex space-between'>
            <h2 className='brand-left '>For The Students</h2>
            <div className='border-round'>
              <img src={indiana} alt='' height='100px'></img>
            </div>
            <h2 className='brand-right'>By The Students</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
