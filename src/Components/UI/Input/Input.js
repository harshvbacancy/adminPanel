import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {

    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];

    if (props.inValid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.valueType}!</p>;
    } else if (props.isReqMinLength && props.touched) {
        inputClasses.push(classes.Invalid)
        validationError = <p className={classes.ValidationError}>minimum {props.length} characters required!</p>;
    }



    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;

        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>

                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;

        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            <div className={classes.Container}>
                {inputElement}
                {validationError}
            </div>

        </div>
    );

};

export default Input;