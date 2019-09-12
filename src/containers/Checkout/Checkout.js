import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import ContactData from './ContactData/ContactData';

import { Route } from 'react-router-dom';

class Checkout extends Component {
    state = { 
        ingredients: {
            lettuce: 1,
            meat: 2,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        for (let param of query.entries()){
            ingredients[param[0]] = +param[1];
        }
        this.setState({ ingredients });
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() { 
        const { state: { ingredients }, 
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
                    render={() => (<ContactData ingredients={ingredients} />)}
                    />
            </div>
         );
    }
}
 
export default Checkout;