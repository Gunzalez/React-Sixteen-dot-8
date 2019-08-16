import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.scss';

const add = () => {
    console.log('Jim got shot');
}

const buildControls = () => ( 
    <div className={classes.BuildControls}>
        <BuildControl label={'Meat'} add={add} />
        <BuildControl label={'Cheese'} add={add} />
    </div>
);
 
export default buildControls;