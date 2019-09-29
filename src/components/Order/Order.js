import React from 'react';

import classes from './Order.module.scss';

const order = () => {
    return (
        <div className={classes.Order}>
            <p>Ingredients Lettuce (1)</p>
            <p>Price <strong>£5.00</strong></p>
        </div>
    );
}
 

export default order;