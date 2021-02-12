
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
// class LogedInNavItems extends Component {
//     render() {

//     let navButtons;
//         let infoViewerButtons;
//         let changePasswordButtons;

//         navButtons = <LogOut logout={this.props.logOut}/>
//         infoViewerButtons = 
//             <>
//                 <NavigationItem link="/Login">Personal Details</NavigationItem>
//                 <NavigationItem link="/Reg1">Educational Details</NavigationItem>
//             </>

//             changePasswordButtons=
//             <NavigationItem link="/changePassword1">Change Password</NavigationItem>
//         }

//         return (
//             <nav className={classes.NavigationItems}>
//                 <div>

//                     {navButtons}
//                     {infoViewerButtons}
//                 </div>
//                <span>{changePasswordLink}</span>
//                <span className="loggedInAs">{this.props.loginMessage}</span>
//             </nav>
//         )
//         }
// }
