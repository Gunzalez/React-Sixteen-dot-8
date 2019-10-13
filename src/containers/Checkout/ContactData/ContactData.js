import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.module.scss';

import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = { 
        orderForm: {
            name: {
                elementTag: 'input',
                label: 'Name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please provide a name'
                },
                value: ''
            },
            email: {
                elementTag: 'input',
                label: 'Email address',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address'
                },
                value: ''
            },
            street: {
                elementTag: 'input',
                label: 'Street name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            country: {
                elementTag: 'input',
                label: 'Country',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            postcode: {
                elementTag: 'input',
                label: 'Postcode',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postcode'
                },
                value: ''
            },
            delivery: {
                elementTag: 'select',
                label: 'Delivery otpion',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            label: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            label: 'Cheapest'
                        }
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    onChangeHandler = (e) => {
        const value = e.target.value;
        const fieldName = e.target.getAttribute('id');
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedInputDetails = {
            ...updatedOrderForm[fieldName]
        }
        updatedInputDetails.value = value;
        updatedOrderForm[fieldName] = updatedInputDetails;
        this.setState({ orderForm: updatedOrderForm });
    }

    orderHandler = () => {
        this.setState({ loading: true });
        const customer = {};
        for(let input in this.state.orderForm){
            customer[input] = this.state.orderForm[input].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: customer          
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                console.log(response)
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({ loading: false });
                console.log('Something went wrong', err);
            });
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
    }

    render() { 

        const { state: { loading, orderForm }, 
            orderHandler, 
            onChangeHandler,
            formSubmitHandler } = this;

        const orderFormElements = [];
        for (let key in orderForm){
            orderFormElements.push({
                id: key,
                config: orderForm[key]
            })
        }

        let form = (
            <form onSubmit={formSubmitHandler} className={classes.ContactData}>
                <h2>Enter your contact details</h2>
                { orderFormElements.map(input => 
                    <Input
                        key={input.id}
                        name={input.id}
                        config={input.config}
                        changed={onChangeHandler}
                        value={input.config.value} />
                )}
                <Button btnType={'Success'} clicked={orderHandler}>BUY NOW</Button>
            </form>
        );
        if(loading){
            form = <Spinner />
        }

        return ( 
            <div>
                { form }
            </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.price
    }
}

export default connect(mapStateToProps)(ContactData);