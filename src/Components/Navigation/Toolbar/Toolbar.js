import React, { Component } from 'react';
import LogedInNavItems from '../NavigationItems/LogedInNavItems';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';



class Toolbar extends Component {
    // state = {
    //     logged: this.props.login
    // }
    // componentDidUpdate(){
    //     if(this.state.logged !== this.props.login){
        
    // }
    // }
    // componentDidUpdate() {
    //     let navItems;
    //     if(this.props.login === true){
    //         console.log('if condition toolbar');
    //         navItems = <LogedInNavItems logout={this.props.logOut}/>
    //     } 
    //     else {
    //         console.log('else condition toolbar');
            
    //         navItems = <NavigationItems />
    //     }
    // }

    render() {
        let navItems;
        console.log('login:',this.props.login)
        if(this.props.login === true){
           // console.log('checkk if condition toolbar' + this.props.logOut);
            // <h1>true</h1>
            navItems = <LogedInNavItems/>
        } 
        else {
            console.log('else condition toolbar');
            // <h1>false </h1>
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


