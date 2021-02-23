import React, { Component } from 'react';
import classes from '../../Containers/Home/Home.module.css'


class LoggedInUser extends Component {
    render() {
     let email = localStorage.getItem('activeuser');
     let users = JSON.parse(localStorage.getItem("userInfo"));
     let user = users.find(u => {
         return u.Reg1.Email === email
     });
     let name = user.Reg1.firstName + " " + user.Reg1.lastName;
     console.log(email)
        return (
            <div className={classes.Home}>
                <h1>you are the logged in as {name}</h1>
            </div>
        )
    }
}

export default LoggedInUser