import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Toolbar from './Components/Navigation/Toolbar/Toolbar'
import Reg1 from './Containers/RegForm/Reg1/Reg1';
import Reg2 from './Containers/RegForm/Reg2/Reg2';
import PerDetails from './Components/LogedIn/PerDetails/PerDetails';
import EduDetails from './Components/LogedIn/EduDetails/EduDetails';
import Home from './Containers/Home/Home';
import LoginForm from './Containers/LoginForm/LoginForm'
import LoggedInUser from './Components/LoggedInUsers/LoggedInUser';
import ChangePassword from './Containers/ChangePassword/ChangePassword';


class App extends Component {

  state = {
    login: false
  }

  loginHandler = () => {

    // const checkLogin = this.props.isLoggedIn;
    // //this.setState({ login: checkLogin }); 
    // console.log('isLoggedIn = ', checkLogin);
    // return checkLogin;
    this.setState({ login: true })
  }

  logoutHandler = () => {

    localStorage.removeItem('activeuser')
    this.setState({ login: false })

    //alert('Successfully logged out..');
    return this.state.login;
  }


  render() {


    return (
      <div >
        <BrowserRouter>
          <Toolbar login={this.state.login} logout={this.logoutHandler} />
          <Switch>
            {/* <Route path="/" exact component={Home} /> */}

            <Route path="/Login" render={() => <LoginForm loggedInNavItems={this.loginHandler} />} />
            <Route path="/Reg1" component={Reg1} />
            <Route path="/Reg2" component={Reg2} />
            <Route path="/loggedIn" exact component={LoggedInUser} />
            <Route path='/personalDetails' component={PerDetails} />
            <Route path='/educationalDetails' component={EduDetails} />
            <Route path='/changePassword' component={ChangePassword} />
            <Route path="/" exact render={() => <Home logout={this.logoutHandler} />} />
          </Switch>

        </BrowserRouter>

      </div>
    );
  }
}

export default App;
