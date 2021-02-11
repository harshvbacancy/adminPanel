import React, { Component } from 'react';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import classes from './LoginForm.module.css';

class LoginForm extends Component {
    state = {
        LogForm: {

            EmailId: {
                label: 'Email',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',
                },
                value: '',
                validation: {
                    required: true,
                    regex: /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]){2,7}$/,
                },
                valid: false,
                touched: false
            },

            password: {
                label: 'Password',
                elementType: 'Input',
                elementConfig: {
                    type: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },

        },
        formIsValid: false
    }

    loginDataHandler = (event) => {
        event.preventDefault()

        const email = this.state.LogForm['EmailId'].value;
        const password = this.state.LogForm['password'].value;
        let bothValid = false;
        let wrongEmail = true;
        let wrongPassword = false;
        let userdata = JSON.parse(localStorage.getItem('users'));
        if (userdata) {
            for (let u = 0; u < userdata.length; u++) {
                //is it stored in local storage
                if (email === userdata[u].email) {
                    wrongEmail = false;
                    if (password === userdata[u].password) {
                        bothValid = true;
                        break;
                    }
                    else {
                        wrongPassword = true;
                        break;
                    }

                }

            }
        }
        if (bothValid) {
            // this.props.login()

            localStorage.setItem('activeuser', email);
            this.setState({ message: null });
            alert('Successfully Logged In...');
            // this.props.history.push('/');
        }
        else {
            if (wrongEmail) {
                this.setState({ message: "Email not registered.." });

            }
            if (wrongPassword) {
                this.setState({ message: "wrong password.." });
            }
        }
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
            let password = this.state.RegForm['password'].value;
            if (confirmPassword.trim() === '' || password !== confirmPassword) {
                isValid = false;
            }
        }
        return isValid;

    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedLogForm = {
            ...this.state.LogForm
        }
        const updatedFormElement = {
            ...updatedLogForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedLogForm[inputIdentifier] = updatedFormElement;

        let updatedFormIsValid = true;
        for (let inputIdentifier in updatedLogForm) {
            updatedFormIsValid = updatedLogForm[inputIdentifier].valid && updatedFormIsValid
        }

        this.setState({ LogForm: updatedLogForm, formIsValid: updatedFormIsValid })
    }
    render() {

        const formElementsArray = [];
        for (let key in this.state.LogForm) {
            formElementsArray.push({
                id: key,
                config: this.state.LogForm[key]
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
                        inValid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}

                <div className={classes.Container}>
                    <Button
                        btnType="Danger"
                        disabled={!this.state.formIsValid}
                        clicked={this.loginDataHandler} >
                        LOGIN
                    </Button> 

                    <div style={{ color: 'red' }}>{this.state.message}</div>

                    <Button
                        btnType="Primary" >
                        Do not have an account? Create one
                    </Button>
                </div>

            </form>
        );

        return (
            <div className={classes.LoginForm}>
                <h2>LOGIN</h2>
                {form}
            </div>
        )
    }
}
export default LoginForm;