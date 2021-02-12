import React, { Component } from 'react';
import LogedInNavItems from '../NavigationItems/LogedInNavItems';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';


class Toolbar extends Component {
    render() {
        let navItems;
        if(this.props.login === true){
            
            navItems = <LogedInNavItems logout={this.props.logOut}/>
        } 
        else {
            navItems = <NavigationItems />
        }
        
        return (
            <header className={classes.Toolbar}>
                <h2>Logo</h2>
                <h1>Admin Panel</h1>
                <nav>
                    {navItems}
                </nav>

            </header>
        )
    }

}

export default Toolbar;

