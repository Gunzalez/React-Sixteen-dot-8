import React from 'react';
import Ingredient from './Ingredient/Ingredient';
import classes from './Burger.module.scss';

const burger = ({ingredients}) => {
    const transformedIngredients = Object.keys(ingredients).map(ingredientKey => {
        return [...Array(ingredients[ingredientKey])].map((_, i) => {
            return <Ingredient key={ingredientKey + i} type={ingredientKey} />
        })
    });
    return (
        <div className={classes.Burger}>
            <Ingredient type={'bread-top'} />
            { transformedIngredients }
            <Ingredient type={'bread-bottom'} />
        </div>  
    );
}
 
export default burger;