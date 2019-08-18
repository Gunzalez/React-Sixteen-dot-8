import React from 'react';

import Aux from '../../../hoc/Aux/Aux';

import Button from '../../UI/Button/Button';

const orderSummary = ({ ingredients, orderCancel, orderContinue, totalPrice }) => {

    return (
        <Aux>
            <h3>Order Summary</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                { Object.keys(ingredients)
                    .map(key => 
                        <li key={key}>
                            <span
                            style={{ textTransform: 'capitalize'}}>{key}: </span>
                            { ingredients[key] }
                        </li>
                    ) 
                }
            </ul>
            <p><strong>£{totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={orderCancel} btnType={'Danger'}>CANCEL</Button>
            <Button clicked={orderContinue} btnType={'Success'}>CONTINUE</Button>
        </Aux>
    );
}
 
export default orderSummary;