import React from 'react';
import classes from './BuildControl.module.scss';

const buildControl = ({ label, remove, add, disabled }) => (
    <div className={classes.BuildControl}>
        <p>{ label }</p>
        <button className={'remove'} onClick={remove} disabled={disabled}>Remove</button>
        <button className={'add'} onClick={add}>Add</button>
    </div>
)

export default buildControl;