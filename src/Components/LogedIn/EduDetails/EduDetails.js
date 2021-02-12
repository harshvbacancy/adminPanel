import classes from './EduDetails.module.css';
import React from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Auxiliary/Auxiliary';


const EduDetails = () => {
    let localUserInfo = JSON.parse(localStorage.getItem('userInfo'));

    let names = localUserInfo.map(
        (person => (person.Reg1['firstName'] + ' ' + person.Reg1['lastName']))
    )
    let Eduinfo = localUserInfo.map(user =>
    (user.Reg2.map((education, i) =>

    (
        <Aux key={i}>
            <tr>
                <td>{(user.Reg2.indexOf(education) === 0) ? names[localUserInfo.indexOf(user)] : ''}</td>
                <td>{education.Insititue}</td>
                <td>{education.course}</td>
                <td>{education.percentage}</td>
                <td>{education.startDate}</td>
                <td>{education.EndDate}</td>
                <td >
                
                    <Button btnType="Success">Edit</Button>
                    <Button btnType="Danger">Delete</Button>
                </td>
            </tr>

        </Aux>
    )
    )))
    return (
        <div>
            {/* {mymodal}  */}
            <h2 className={classes.EduTitle}>Users Educational Information</h2>
            <table className={classes.EduDetails} key={new Date()}>
                <tr>
                    <th>Name</th><th>Institute</th><th>Course</th><th>Percentage</th><th>Start Date</th><th>End Date</th><th>Actions</th>
                </tr>
                {Eduinfo}
            </table>
        </div>
    );
}

export default EduDetails; 