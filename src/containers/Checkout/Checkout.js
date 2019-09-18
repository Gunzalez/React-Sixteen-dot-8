import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import ContactData from './ContactData/ContactData';

import { Route } from 'react-router-dom';

class Checkout extends Component {
    state = { 
        ingredients: null,
        price: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()){
            if(param[0] === 'price'){
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients, price });
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() { 
        const { state: { ingredients, price }, 
            checkoutCancelHandler, 
            checkoutContinueHandler 
        } = this;

        return ( 
            <div>
                <CheckoutSummary 
                    ingredients={ingredients}
                    checkoutCancel={checkoutCancelHandler}
                    checkoutContinue={checkoutContinueHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={ingredients} price={price} {...props} />)}
                    />
            </div>
         );
    }
}
 
export default Checkout;