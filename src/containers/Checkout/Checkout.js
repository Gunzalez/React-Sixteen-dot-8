import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = { 
        ingredients: {
            lettuce: 1,
            meat: 2,
            cheese: 1,
            bacon: 1
        }
     }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/data-form');
    }
    
    render() { 
        const { state: { ingredients }, 
            checkoutCancelHandler, 
            checkoutContinueHandler 
        } = this;

        return ( 
            <div>
                <CheckoutSummary 
                    checkoutCancel={checkoutCancelHandler}
                    checkoutContinue={checkoutContinueHandler}
                    ingredients={ingredients} />
            </div>
         );
    }
}
 
export default Checkout;