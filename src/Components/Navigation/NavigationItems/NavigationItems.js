import React from 'react';

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) =>  (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact >Home</NavigationItem>
        <NavigationItem link="/Login">Login</NavigationItem>
        <NavigationItem link="/Reg1">Register</NavigationItem>
    </ul>
);

export default NavigationItems;