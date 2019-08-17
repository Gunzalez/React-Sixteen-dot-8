import React from 'react';

import classes from './Modal.module.scss'

const modal = (props) => {
    const { ordering } = props;
    return (
        <div 
            style={
                {
                   transform: ordering ? 'translateY(0)' : 'translateY(-100vh)',
                   opacity: ordering ? 1 : 0
                }
            }
            className={classes.Modal}
        >{props.children}</div>
    );
}
 
export default modal;