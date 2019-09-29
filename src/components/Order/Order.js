import React from 'react';

import classes from './Order.module.scss';

const order = ({ ingredients, price }) => {
    
    const localIngredientsArray = [];
    for(let ingredientName in ingredients){
        localIngredientsArray.push({
            name: ingredientName,
            amount: ingredients[ingredientName]
        })
    }

    const ingredientsList = localIngredientsArray.map( ig => {
        return (
            <span 
                key={ig.name}
                className={classes.Ingredient}>
                    {ig.name} ({ig.amount})
                </span>
        )
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: { ingredientsList }</p>
            <p>Price: <strong>£{price}</strong></p>
        </div>
    );
}
 

export default order;