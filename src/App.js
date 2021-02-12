import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import LoginForm from './Containers/LoginForm/LoginForm';
import Reg1 from './Containers/RegForm/Reg1/Reg1';
import Reg2 from './Containers/RegForm/Reg2/Reg2';
import PerDetails from './Components/LogedIn/PerDetails/PerDetails';
import EduDetails from './Components/LogedIn/EduDetails/EduDetails';
import Home from './Containers/Home/Home';


class App extends Component {
  

  render() {
    

    return (
      <div >
        <BrowserRouter>
          <Layout>

            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/Login" exact component={LoginForm} />
              <Route path="/Reg1" exact component={Reg1} />
              <Route path="/Reg2" component={Reg2} />
              <Route path='/personalDetails' component={PerDetails}/>
            <Route path='/educationalDetails' component={EduDetails}/>
            </Switch>

          </Layout>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
