import React, { Component } from 'react';

import Order from '../../components/Order/Order';

import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = { 
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                fetchedOrders.reverse();
                this.setState({ loading: false, orders: fetchedOrders })
            })
            .catch( err => {
                console.log('Something went wrong', err);
                this.setState({ loading: false })
            })
    }

    render() { 

        const { orders, loading } = this.state

        let orderList = (
            <div>
                { orders.map(order => {
                    const { id, ingredients, price } = order;
                    return (
                        <Order 
                            key={id}
                            ingredients={ingredients}
                            price={price}/>
                        )
                    }
                )}
            </div>
        );
        if(loading){
            orderList = <Spinner />
        }

        return (
            <div>
                { orderList }
            </div>
        );
    }
}
 
export default withErrorHandler(Orders, axios);