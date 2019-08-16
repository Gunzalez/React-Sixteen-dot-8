import React from 'react';
import classes from './BuildControl.module.scss';

const buildControl = ({ label, remove, add }) => (
    <div className={classes.BuildControl}>
        <p>{ label }</p>
        <button className={'remove'} onClick={remove}>Remove</button>
        <button className={'add'} onClick={add}>Add</button>
    </div>
)

export default buildControl;