import React, { Component } from 'react';

import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.module.scss';

import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = { 
        name: '',
        email: '',
        address: {
            street: '',
            postcode: ''
        },
        loading: false
    }

    orderHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'New Office Konibire',
                address: {
                    street: 'Hatton Gardens',
                    flat: '39'
                },
                email: 'test@email.com'
            },
            delivery: 'fastest'            
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

        const { state: { loading }, orderHandler, formSubmitHandler } = this;

        let form = (
            <form onSubmit={formSubmitHandler} className={classes.ContactData}>
                <h2>Enter your contact details</h2>
                <Input inputtype={'input'} type='text' label='Name' id="name" placeholder='Enter your name' />
                <Input inputtype={'input'} type='email' label='Email address' id="email" placeholder='Enter your email address' />
                <Input inputtype={'input'} type='text' label='Street' id="street" placeholder='Enter your street' />
                <Input inputtype={'input'} type='text' label='Postcode' id="postcode" placeholder='Enter you post code' />
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
 
export default ContactData;