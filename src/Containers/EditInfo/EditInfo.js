import { Component } from "react";

class EditInfo extends Component {

    state = {
        showModal: false
    }

    handleEdit = (event, userIndex, eduIndex) => {
        let localUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        let user = localUserInfo[userIndex];
        let edu = user.Reg2[eduIndex];
        this.setState({ edu });
        this.setState({ showModal: true, userIndex: userIndex, eduIndex: eduIndex });

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
        let mymodal = (
            <Modal
                isOpen={this.state.showModal}
                contentLabel="Modal"
            >
                <form onSubmit={this.submitChanges} >
                    <table style={{ width: '90%', border: 'none', boxShadow: 'none' }}>
                        <tr>
                            <th>Institute:</th>
                            <td><input type="text" name='institute' value={this.state.edu ? this.state.edu.institute : ''} onChange={(event) => this.handleModalChange(event)} required /></td>
                        </tr>
                        <tr>
                            <th>Course:</th>
                            <td><input type="text" name='course' value={this.state.edu ? this.state.edu.course : ''} onChange={(event) => this.handleModalChange(event)} required /></td>
                        </tr>
                        <tr>
                            <th>Percentage/CGPA:</th>
                            <td><input type="text" name='percentage' value={this.state.edu ? this.state.edu.percentage : ''} onChange={(event) => this.handleModalChange(event)} required /></td>
                        </tr>
                        <tr>
                            <th>Start Date:</th>
                            <td><input type="date" name='startDate' value={this.state.edu ? this.state.edu.startDate : ''} onChange={(event) => this.handleModalChange(event)} required /></td>
                        </tr>
                        <tr>
                            <th>End Date:</th>
                            <td><input type="date" name='endDate' value={this.state.edu ? this.state.edu.endDate : ''} onChange={(event) => this.handleModalChange(event)} required /></td>
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
        

    }
}

export default EditInfo; 