import React from 'react';

import classes from './Input.module.scss';

const input = (props) => {

    let inputElement = null;

    switch(props.config.elementTag){
        case 'input':
            inputElement = <input 
                className={classes.InputElement} 
                {...props.config.elementConfig}
                id={props.name}
                onChange={props.changed}
                value={props.value} />;
            break;
        case 'textarea':
            inputElement = <textarea 
                className={classes.InputElement} 
                {...props.config.elementConfig} 
                id={props.name}
                onChange={props.changed}
                value={props.value} />;
            break;
        default:
            inputElement = <input 
                className={classes.InputElement} 
                {...props.config.elementConfig} 
                id={props.name}
                onChange={props.changed}
                value={props.value}  />
    }

    return (  
        <div className={classes.Input}>
            <label htmlFor={props.name} className={classes.Label}>{props.config.label}</label>
            {inputElement}
        </div>
    );
}
 
export default input;