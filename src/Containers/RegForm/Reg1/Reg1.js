import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import Input from '../../../Components/UI/Input/Input';
import classes from './Reg1.module.css';




class Reg1 extends Component {
    state = {
        RegForm: {
            firstName: {
                label: 'First Name',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3

                },
                valid: false,
                reqLength: false,
                touched: false
            },
            lastName: {
                label: 'Last Name',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',

                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                reqLength: false,

                touched: false
            },
            Gender: {
                label: 'Gender',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'male', displayValue: 'Male' },
                        { value: 'female', displayValue: 'female' },
                        { value: 'other', displayValue: 'other' },
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                reqLength: true,
                touched: false
            },
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
            phoneNumber: {
                label: 'Phone Number',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',
                },
                value: '',
                validation: {
                    required: true,
                    regex: /^([0-9]){7,12}$/,
                    minLength: 10
                },
                valid: false,
                reqLength: false,
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


    perDataHandler = (event) => {
        event.preventDefault()
        const formData = {};
        
        for (let formElement in this.state.RegForm) {
            formData[formElement] = this.state.RegForm[formElement].value;
        }
        console.log(formData)
        let usersArray= JSON.parse(localStorage.getItem('user'));
      
        if(usersArray){
            for(let user in usersArray){
                console.log('formData:0',formData.Email)
                console.log('userArray:',usersArray[user].email)
                if(formData.Email === usersArray[user].email){
                    alert("Already Registered!!!!");
                    return;
                }
            }
        }
        sessionStorage.setItem('PerInfo', JSON.stringify(formData))
         this.props.history.push('/Reg2');

    }

    componentDidMount() {
        let oldReg1 = JSON.parse(sessionStorage.getItem('PerInfo'))
        if (oldReg1) {

            const updatedReg1 = {
                ...this.state.RegForm
            }
            for (let inputId in updatedReg1) {
                updatedReg1[inputId].value = oldReg1[inputId]
                updatedReg1[inputId].touched = true
                updatedReg1[inputId].valid = true
                updatedReg1[inputId].reqLength = true
                

            }
            console.log(updatedReg1)

            this.setState({ RegForm: updatedReg1, formIsValid: true})
        }
       

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
            let password = this.state.RegForm['password'].value;
            if (confirmPassword.trim() === '' || password !== confirmPassword) {
                isValid = false;
            }
        }
        return isValid;

    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedRegForm = {
            ...this.state.RegForm
        }
        const updatedFormElement = {
            ...updatedRegForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.reqLength = this.checkLength(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedRegForm[inputIdentifier] = updatedFormElement;

        let updatedFormIsValid = true;
        for (let inputIdentifier in updatedRegForm) {
            updatedFormIsValid = updatedRegForm[inputIdentifier].valid && updatedFormIsValid
        }

        this.setState({ RegForm: updatedRegForm, formIsValid: updatedFormIsValid })
    }
    render() {

        const formElementsArray = [];
        for (let key in this.state.RegForm) {
            formElementsArray.push({
                id: key,
                config: this.state.RegForm[key]
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
                    btnType="Success"
                    disabled={!this.state.formIsValid}
                    clicked={this.perDataHandler}  >
                    NEXT
                </Button>

            </form>
        );

        return (
            <div className={classes.Reg1}>
                <h2>Personal Information</h2>
                {form}
            </div>
        )
    }
}
export default Reg1;