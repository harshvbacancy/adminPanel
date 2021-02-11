import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import LoginForm from './Containers/LoginForm/LoginForm';
import Reg1 from './Containers/RegForm/Reg1/Reg1';
import Reg2 from './Containers/RegForm/Reg2/Reg2';
import PerDetails from './Components/LogedIn/PerDetails/PerDetails';
import EduDetails from './Components/LogedIn/EduDetails/EduDetails';


class App extends Component {
  render() {
    return (
      <div >
        <Layout>
          <Reg2 />
        </Layout>
      </div>
    );
  }
}

export default App;
