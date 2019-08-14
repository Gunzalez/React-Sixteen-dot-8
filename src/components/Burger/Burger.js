import React from 'react';
import Ingredient from './Ingredient/Ingredient';
import classes from './Burger.module.scss';

const burger = ({ ingredients }) => {
    let transformedIngredients = Object.keys(ingredients).map(ingredientKey => {
        return [...Array(ingredients[ingredientKey])].map((_, i) => {
            return <Ingredient key={ingredientKey + i} type={ingredientKey} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if(!transformedIngredients.length){
        transformedIngredients = ( <p>Please add some ingredients!</p> );
    }
    return (
        <div className={classes.Burger}>
            <Ingredient type={'bread-top'} />
            { transformedIngredients }
            <Ingredient type={'bread-bottom'} />
        </div>  
    );
}
 
export default burger;