import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.scss';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = ({ addIngredients, removeIngredients, disabled, totalPrice, purchasable }) => ( 
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>£{totalPrice.toFixed(2)}</strong></p>
        { controls.map(control => 
            <BuildControl 
                key={control.type} 
                label={control.label} 
                add={()=> addIngredients(control.type)}
                remove={()=> removeIngredients(control.type)}
                disabled={disabled[control.type]}
                />
        )}
        <button
        disabled={!purchasable}
        className={classes.orderButton}>ORDER NOW</button>
    </div>
);
 
export default buildControls;