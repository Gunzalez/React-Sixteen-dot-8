import React from 'react';

import Aux from '../../../hoc/Aux';

const orderSummary = ({ ingredients }) => {

    return (
        <Aux>
            <h3>Order Summary</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                { Object.keys(ingredients)
                    .map(key => {
                        return (
                            <li key={key}>
                                <span
                                style={{ textTransform: 'capitalize'}}>{key}: </span>
                                { ingredients[key] }
                            </li>
                        )
                    }) 
                }
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    );
}
 
export default orderSummary;