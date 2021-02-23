
import React, { Component } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css'

class LogedInNavItems extends Component  {
    render() {
    //  let logedOutnjhfvhnhjfg
    // if (this.props.logout) {
    //     logedOut = <NavigationItem Link="/">Log Out</NavigationItem>
    // }
    
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/personalDetails">Personal Details</NavigationItem>
            <NavigationItem link="/educationalDetails">Educational Details</NavigationItem>
            <NavigationItem link="/changePassword">Change Password</NavigationItem>
            <NavigationItem link="/">Logout</NavigationItem>
        </ul>
    );
    }
};

export default LogedInNavItems;
