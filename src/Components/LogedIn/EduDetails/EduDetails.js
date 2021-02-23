import classes from './EduDetails.module.css';
import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Modal from 'react-modal';



class  EduDetails extends Component {

    state = {
        showModal: false
    }

    handleEdit = (event, userIndex, eduIndex) => {
        console.log('vdfv')
        let localUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        let user = localUserInfo[userIndex];
        let edu = user.Reg2[eduIndex];
        this.setState({ edu });
        this.setState({ showModal: true, userIndex: userIndex, eduIndex: eduIndex });
        console.log(this.state.showModal)

    }
    handleDelete = (event, userIndex, eduIndex) => {
        let isConfirm = window.confirm('Delete this eduction record?');
        if (isConfirm) {
            let values = JSON.parse(localStorage.getItem('userInfo'));
            let user = values[userIndex];

            user.Reg2.splice(eduIndex, 1);
            values[userIndex] = user;
            localStorage.setItem('userInfo', JSON.stringify(values))
            this.props.history.push('/educationalDetails')
        }
    }
    submitChanges = () => {
        let values = JSON.parse(localStorage.getItem('userInfo'));
        let user = values[this.state.userIndex];
        user.Reg2[this.state.eduIndex] = this.state.edu;
        values[this.state.userIndex] = user;
        localStorage.setItem('userInfo', JSON.stringify(values));
        this.setState({ showModal: false })
        alert('successfully changed..');
        this.props.history.push('/educationalDetails');
    }
    handleModalChange = (event) => {
        let edu = this.state.edu;
        edu[event.target.name] = event.target.value;
        this.setState({ edu: edu })

    }

    render() {
    let localUserInfo = JSON.parse(localStorage.getItem('userInfo'));

    let mymodal=(
        <Modal 
                    isOpen={this.state.showModal}
                    contentLabel="Modal"
                >
                    <form onSubmit={this.submitChanges} >
                    <table style={{width:'90%',border:'none',boxShadow:'none'}}>
                        <tr>
                            <th>Institute:</th> 
                            <td><input type="text" name='institute' value={this.state.edu?this.state.edu.Institute:''} onChange={(event)=>this.handleModalChange(event)} required /></td>
                        </tr>
                        <tr>
                            <th>Course:</th> 
                            <td><input type="text" name='course' value={this.state.edu?this.state.edu.course:''} onChange={(event)=>this.handleModalChange(event)} required/></td>
                        </tr>
                        <tr>
                            <th>Percentage/CGPA:</th> 
                            <td><input type="text" name='percentage' value={this.state.edu?this.state.edu.percentage:''} onChange={(event)=>this.handleModalChange(event)} required /></td>
                        </tr>
                        <tr>
                            <th>Start Date:</th> 
                            <td><input type="date" name='startDate' value={this.state.edu?this.state.edu.startDate:''} onChange={(event)=>this.handleModalChange(event)} required/></td>
                        </tr>
                        <tr>
                            <th>End Date:</th> 
                            <td><input type="date" name='endDate' value={this.state.edu?this.state.edu.endDate:''} onChange={(event)=>this.handleModalChange(event)} required /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                            <button type="submit">submit</button>
                            </td>
                        </tr>
                    </table>
                    
                    </form>
                    
                </Modal>

    );
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
                
                    <Button btnType="Success" clicked={(event) => this.handleEdit(event, localUserInfo.indexOf(user), user.Reg2.indexOf(education))}>Edit</Button>
                    <Button btnType="Danger" clicked={(event) => this.handleDelete(event, localUserInfo.indexOf(user), user.Reg2.indexOf(education))}>Delete</Button>
                </td>
            </tr>

        </Aux>
    )
    )))
    return (
        <div>
            {mymodal} 
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
}

export default EduDetails; 