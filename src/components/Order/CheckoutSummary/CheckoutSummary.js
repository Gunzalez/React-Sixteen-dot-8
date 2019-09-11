import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.scss';

const checkoutSummary = ({ ingredients, checkoutCancel, checkoutContinue }) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>This is going to taste awesome!</h1>
            <div className={classes.Burger}>
                <Burger ingredients={ingredients} />
            </div>
            <Button clicked={checkoutCancel} btnType={'Danger'}>CANCEL</Button>
            <Button clicked={checkoutContinue} btnType={'Success'}>CONTINUE</Button>
        </div>
     );
}
 
export default checkoutSummary;