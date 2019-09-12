import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.module.scss';

class ContactData extends Component {
    state = { 
        name: '',
        email: '',
        address: {
            street: '',
            postcode: ''
        }
     }
    render() { 
        return ( 
            <div>
                <form className={classes.ContactData}>
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
                    <Button btnType={'Success'}>BUY NOW</Button>
                </form>
            </div> 
        );
    }
}
 
export default ContactData;