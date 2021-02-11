import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import Input from '../../../Components/UI/Input/Input';
import classes from './Reg2.module.css';

class Reg2 extends Component {
    state = {
        RegForm: {
            Insititue: {
                label: 'Institute',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4

                },
                valid: false,
                reqLength: false,
                touched: false
            },
            course: {
                label: 'Course',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',

                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4
                },
                valid: false,
                reqLength: false,

                touched: false
            },

            percentage: {
                label: 'Percentage',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',
                },
                value: '',
                validation: {
                    required: true,
                    regex: /^([0-9]){1,2}(\.[0-9]{1,2})?$/,
                },
                valid: false,
                touched: false
            },
            startDate: {
                label: 'Start Date',
                elementType: 'Input',
                elementConfig: {
                    type: 'Date',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            EndDate: {
                label: 'End Date',
                elementType: 'Input',
                elementConfig: {
                    type: 'Date',
                },
                value: '',
                validation: {
                    required: true,
                    checkDate: true
                },
                valid: false,
                touched: false
            },

        },
        Reg2Data: [],
        isFormValid: false
    }

    eduDataHandler = () => {

        let formData = {}
        for (let formElement in this.state.RegForm) {
            formData[formElement] = this.state.RegForm[formElement].value;
        }
        const updatedRegForm = {
            ...this.state.RegForm
        }
        const updatedReg2Data = [
            ...this.state.Reg2Data
        ]
        updatedReg2Data.push(formData)
        console.log(updatedReg2Data)
        localStorage.setItem('EduInfo', JSON.stringify(updatedReg2Data))

        for (let inputId in updatedRegForm) {
            updatedRegForm[inputId].value = '';
            updatedRegForm[inputId].valid = false;
            updatedRegForm[inputId].touched = false;
        }
        this.setState({ RegForm: updatedRegForm, Reg2Data: updatedReg2Data, isFormValid: false })
    }

    registerHandler = () => {
        this.edudataHandler()
        alert('Registered Successfully...')
        const Reg1 = JSON.parse(localStorage.getItem('PerInfo'))
        const Reg2 = JSON.parse(localStorage.getItem('EduInfo'))
        var email = Reg1['email'];
        var password = Reg1['password'];
        
        let localUser = JSON.parse(localStorage.getItem('user'));
        if (localUser) {
            localUser.push({ email: email, password: password });
            localStorage.setItem('user', JSON.stringify(localUser));
        } else {
            localStorage.setItem('user', JSON.stringify([{ email: email, password: password }]));
        }

        let localUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (localUserInfo) {
            localUserInfo.push({ Reg1: Reg1, Reg2: Reg2 });
            localStorage.setItem('userInfo', JSON.stringify(localUserInfo));
        } else {
            localStorage.setItem('userInfo', JSON.stringify([{ Reg1: Reg1, Reg2: Reg2 }]));
        }

        localStorage.removeItem('PerInfo')
        localStorage.removeItem('EduInfo')
        // this.props.history.push('/')
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

        if (rules.checkDate) {
            if (value && this.state.RegForm.startDate) {
                if (value <= this.state.RegForm.startDate.value) {
                    this.setState({ message: 'End date should be greater than start date..' })
                    isValid = false;
                }
                else {
                    this.setState({ message: '' })
                }

            }
        }

        if (rules.regex) {
            isValid = rules.regex.test(value) && isValid;
        }

        return isValid

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
                >Previous
                </Button>
                <Button
                    btnType="Primary"
                    disabled={!this.state.formIsValid}
                    clicked={this.eduDataHandler} >
                    Add More
                </Button>
                <Button
                    btnType="Danger"
                    disabled={!this.state.formIsValid}
                    clicked={this.registerHandler}>
                    Register
                </Button>
                <p style={{ color: 'red' }}>{this.state.message}</p>
            </form>
        );

        return (
            <div className={classes.Reg2}>
                <h2>Educational Information</h2>
                {form}
            </div>
        )
    }
}
export default Reg2;