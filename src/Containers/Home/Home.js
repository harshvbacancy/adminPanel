import React, { Component } from 'react';
import classes from './Home.module.css';

class Home extends Component {
    render() {
        return(
            <div className={classes.Home}>
               <h1> Welcome to HomePage</h1>
            </div>
        )
    }
}

export default Home;