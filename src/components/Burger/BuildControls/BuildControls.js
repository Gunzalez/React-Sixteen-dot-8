import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.scss';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = ({ addIngredients, removeIngredients, disabled }) => ( 
    <div className={classes.BuildControls}>
        { controls.map(control => 
            <BuildControl 
                key={control.type} 
                label={control.label} 
                add={()=> addIngredients(control.type)}
                remove={()=> removeIngredients(control.type)}
                disabled={disabled[control.type]}
                />
        )}
    </div>
);
 
export default buildControls;