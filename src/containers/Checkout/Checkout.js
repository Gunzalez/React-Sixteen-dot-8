import React, { Component } from 'react';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import ContactData from './ContactData/ContactData';

import { Route } from 'react-router-dom';

class Checkout extends Component {
    
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() { 
        const { props: { ingredients }, 
            checkoutCancelHandler, 
            checkoutContinueHandler 
        } = this;

        return ( 
            <div>
                <CheckoutSummary 
                    ingredients={ingredients}
                    checkoutCancel={checkoutCancelHandler}
                    checkoutContinue={checkoutContinueHandler} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);
