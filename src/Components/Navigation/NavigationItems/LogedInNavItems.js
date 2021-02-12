
import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css'

const LogedInNavItems = (props) => {
    let logedOut
    if (props.logout) {
        logedOut = <NavigationItem Link='/'>Log Out</NavigationItem>
    }
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/personalDetails">Personal Details</NavigationItem>
        <NavigationItem link="/educationalDetails">Educational Details</NavigationItem>
        {logedOut}
    </ul>
};

export default LogedInNavItems;
