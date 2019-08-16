import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.scss';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = ({ addIngredients }) => ( 
    <div className={classes.BuildControls}>
        { controls.map(control => 
            <BuildControl 
                key={control.type} 
                label={control.label} 
                type={control.type}
                add={()=> addIngredients(control.type)}
                />
        )}
    </div>
);
 
export default buildControls;