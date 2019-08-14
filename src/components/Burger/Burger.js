import React from 'react';
import Ingredient from './Ingredient/Ingredient';
import classes from './Burger.module.scss';

const burger = (props) => {
    return (
        <div className={classes.Burger}>
            <Ingredient type={'bread-top'} />
            <Ingredient type={'salad'} />
            <Ingredient type={'cheese'} />
            <Ingredient type={'meat'} />
            <Ingredient type={'meat'} />
            <Ingredient type={'bread-bottom'} />
        </div>  
    );
}
 
export default burger;