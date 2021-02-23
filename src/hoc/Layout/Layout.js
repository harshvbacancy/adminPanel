import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
    state = {
        login: false
    }

    loginHandler = () => {

        const checkLogin = this.props.isLoggedIn;
        //this.setState({ login: checkLogin }); 
        console.log('isLoggedIn = ', checkLogin);
        return checkLogin;
    }

    logoutHandler = () => {
        
        localStorage.removeItem('activeuser')
        //this.setState({ login: false })
        //alert('Successfully logged out..');
        return this.state.login;
    }

    componentDidMount() {
        // this.loginHandler();
         console.log('props.logged = ', this.props.isLoggedIn);
        
        if (!localStorage.getItem('user')) {
            localStorage.setItem('user', '[]')
        }
        if (!localStorage.getItem('userInfo')) {
            localStorage.setItem('userInfo', '[]')
        }
    }

    render() {

        let message
        if (this.props.isLoggedIn === true) {

            message = <h3>Logged in as {localStorage.getItem('activeuser')}</h3>
        }
        else {
            message = null
        }
        return (
            <Aux>
                {/* <Toolbar login={this.props.isLoggedIn} loginMessage={message} /> */}
                <main>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

};

export default Layout;