
import React, { Component } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css'

class LogedInNavItems extends Component  {
    render() {
    //  let logedOut
    // if (this.props.logout) {
    //     logedOut = <NavigationItem Link="/">Log Out</NavigationItem>
    // }
    
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/personalDetails">Personal Details</NavigationItem>
            <NavigationItem link="/educationalDetails">Educational Details</NavigationItem>
             {/* {logedOut}  */}
        </ul>
    );
    }
};

export default LogedInNavItems;
