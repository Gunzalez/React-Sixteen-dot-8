import React, { Component } from 'react';

import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.module.scss';

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

    componentDidMount(){
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

        const { orderHandler, formSubmitHandler } = this;

        return ( 
            <div>
                <form  onSubmit={formSubmitHandler} className={classes.ContactData}>
                    <h2>Enter your contact details</h2>
                    <div className={classes.row}>
                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' className={classes.formControl} placeholder='Enter your name' />
                    </div>
                    <div className={classes.row}>
                        <label htmlFor='email' className={classes.label}>Email address</label>
                        <input type='email' id='email' className={classes.formControl} placeholder='Enter your email address' />
                    </div>
                    <div className={classes.row}>
                        <label htmlFor='street' className={classes.label}>Street</label>
                        <input type='text' id='street' className={classes.formControl} placeholder='Enter your street' />
                    </div>
                    <div className={classes.row}>
                        <label htmlFor='postcode' className={classes.label}>Post code</label>
                        <input type='text' id='postcode' className={classes.formControl} placeholder='Enter your post code' />
                    </div>
                    <Button btnType={'Success'} clicked={orderHandler}>BUY NOW</Button>
                </form>
            </div> 
        );
    }
}
 
export default ContactData;