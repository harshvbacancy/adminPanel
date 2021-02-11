import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';



const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <h2>Logo</h2>
        <h1>Admin Panel</h1>
        <nav>
            <NavigationItems />
        </nav>
        
    </header>
);

export default Toolbar;

