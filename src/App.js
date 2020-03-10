import React, { Component } from 'react';
import Profile from './Profile/Profile';
import MainPage from './Login/MainPage';
import DashBoard from './Dashboard/Dashboard';
import SendResetEmail from './Login/SendReset';
import ResetPassword from './Login/ResetPassword';
import ProfileCompany from './Profile/profileCompany';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/login' strict render={() => <MainPage />}></Route>
        <Route path='/' exact strict render={() => <DashBoard />} />
        <Route path='/profile' strict render={() => <Profile></Profile>} />
        <Route
          path='/profileCompany'
          strict
          render={() => <ProfileCompany></ProfileCompany>}
        />
        <Route path='/SendReset' exact component={SendResetEmail} />
        <Route path='/ResetPassword' strict component={ResetPassword} />
      </Router>
    );
  }
}

export default App;
