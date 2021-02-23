import React, { Component } from 'react';

import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button'
import classes from './ChangePassword.module.css';

class ChangePassword extends Component {
    state = {
        ChangePassForm: {

            Email: {
                label: 'Email',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',
                },
                value: '',
                validation: {
                    required: true,
                    regex: /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]){2,7}$/,
                    uniqueCheck: true
                },
                valid: false,
                reqLength: true,
                touched: false
            },

            Oldpassword: {
                label: 'Old Password',
                elementType: 'Input',
                elementConfig: {
                    type: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                reqLength: false,
                touched: false
            },
            Newpassword: {
                label: 'New Password',
                elementType: 'Input',
                elementConfig: {
                    type: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                reqLength: false,
                touched: false
            },
            confirmPassword: {
                label: 'Confirm Password',
                elementType: 'Password',
                elementConfig: {
                    type: 'Password',
                },
                value: '',
                validation: {
                    passwordCheck: true,
                    required: true
                },
                valid: false,
                reqLength: true,
                touched: false
            }

        },

        formIsValid: false
    }


    checkLength(value, rules) {
        let isReqMinLength = true;
        if (rules.minLength) {
            isReqMinLength = value.length >= rules.minLength;
        }
        return isReqMinLength;
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.regex) {
            isValid = rules.regex.test(value) && isValid;
        }
        if (rules.passwordCheck) {
            let confirmPassword = value;
            let password = this.state.ChangePassForm['Newpassword'].value;
            if (confirmPassword.trim() === '' || password !== confirmPassword) {
                isValid = false;
            }
        }
        return isValid;

    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedChangePassForm = {
            ...this.state.ChangePassForm
        }
        const updatedFormElement = {
            ...updatedChangePassForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.reqLength = this.checkLength(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedChangePassForm[inputIdentifier] = updatedFormElement;

        let updatedFormIsValid = true;
        for (let inputIdentifier in updatedChangePassForm) {
            updatedFormIsValid = updatedChangePassForm[inputIdentifier].valid && updatedFormIsValid
        }

        this.setState({ ChangePassForm: updatedChangePassForm, formIsValid: updatedFormIsValid })
    }

    cancelHandler = () => {
        let access = window.confirm('are you sure?');
        if(access){
            this.props.history.push('/loggedIn')
        }
    }

    submitDataHandler = (event) => {
        let access = window.confirm('are you sure?');
        if(access){
            event.preventDefault()
            let emailIn = false
            const email = this.state.ChangePassForm['Email'].value;
            const password = this.state.ChangePassForm['Oldpassword'].value;
            let verified = false
            let stored_users = JSON.parse(localStorage.getItem('user'))
            if (stored_users) {
                for (let u = 0; u < stored_users.length; u++) {
                    if (email === stored_users[u].email){
                        emailIn = true
                        if(password === stored_users[u].password) {
                        verified = true;
                        stored_users[u].password = this.state.ChangePassForm.Newpassword.value
                        localStorage.setItem('user',JSON.stringify(stored_users))
                        break;
                        }
                    }
                }
                if (verified) {
                    this.props.history.push('/loggedIn')    
                }
                else if(emailIn){
                    alert('Enter valid old password')
                }
                else{
                    alert('Enter Valid Email')
                }
        
            }
        }    
    }


    render() {
        const formElementsArray = [];
        for (let key in this.state.ChangePassForm) {
            formElementsArray.push({
                id: key,
                config: this.state.ChangePassForm[key]
            });
        }
        let form = (
            <form  >
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        label={formElement.config.label}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        valueType={formElement.config.label}
                        length={formElement.config.validation.minLength}
                        inValid={!formElement.config.valid}
                        isReqMinLength={!formElement.config.reqLength}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}

                <Button
                    btnType="Danger"
                    clicked={this.cancelHandler}
                >Cancel
                    </Button>
                <Button
                    btnType="Success"
                    disabled={!this.state.formIsValid}
                    clicked={this.submitDataHandler}   >
                    SUBMIT
                    </Button>

            </form>
        );
        return (
            <div className={classes.ChangePassForm}>
                <h2>Change Password</h2>
                {form}
            </div>
        )
    }

}

export default ChangePassword;