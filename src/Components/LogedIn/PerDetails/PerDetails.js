import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './PerDetails.module.css';


const PerDetails = () => {
    let localUserInfo = JSON.parse(localStorage.getItem('userInfo'));

    let Allusers=localUserInfo.map((user,id) => 
        (
            <Aux key={id}>
                <tr> 
                    <td>{user.Reg1.firstName+" "+user.Reg1.lastName}</td>                
                    <td>{user.Reg1.Gender}</td>
                    <td>{user.Reg1.Email}</td>                  
                    <td>{user.Reg1.phoneNumber}</td>
                </tr>
            </Aux>
        ))
            return(
                <div>
                    <h2 className={classes.PerTitle}>Users Personal Information</h2>
                    <table className={classes.PerDetails}>
                        <tr>
                            <th>Name</th><th>Gender</th><th>Email</th><th>Phone</th>
                        </tr>
                        {Allusers}
                    </table>
                </div>
            )

}


export default PerDetails;