import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';



class Layout extends Component {
    state = {
        login: false
    }

    loginHandler = () => {
        this.setState({ login: this.props.logedInInfo })
    }

    logoutHandler = () => {
        
        localStorage.removeItem('activeuser')
        this.setState({ login: false })
        alert('Successfully logged out..')
    }

    componentDidMount() {
        //set user and userInfo arrays if not there
        if (!localStorage.getItem('user')) {
            localStorage.setItem('user', '[]')
        }
        if (!localStorage.getItem('userInfo')) {
            localStorage.setItem('userInfo', '[]')
        }
    }

    render() {

        let message
        if (this.state.login === true) {
            message = <h3>Logged in as {localStorage.getItem('activeuser')}</h3>
        }
        else {
            message = null
        }
        return (
            <Aux>
                <Toolbar login={this.state.login} logOut={this.logoutHandler} loginMessage={message} />
                <main>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

};

export default Layout;