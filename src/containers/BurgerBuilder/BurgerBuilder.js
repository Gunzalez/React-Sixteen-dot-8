import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        ordering: false,
        loading: false
    }

    isPurchaseble = (ingredients) => {
        const sum = Object.keys(ingredients).map(key => {
            return ingredients[key];
        })
        .reduce((sum, el)=>{
            return sum + el
        }, 0);
        this.setState({
            purchasable: sum > 0
        })
    }

    orderingHandler = () => {
        this.setState({ ordering: true })
    }

    orderingCancelHandler = () => {
        this.setState({ ordering: false })
    }

    orderingContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
            custtomer: {
                name: 'Segun Konibire',
                address: {
                    street: '33B Park Lane Road',
                    flat: '99'
                }
            },
            delivery: 'fastest'            
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, ordering: false });
                console.log(response)
            })
            .catch(err => {
                this.setState({ loading: false, order: false });
                console.log('Something went wrong', err);
            });
    }

    addIngredientsHandler = (type) => {
        const currentIngredientCnt = this.state.ingredients[type];
        const updatedIngredientCnt = currentIngredientCnt + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedIngredientCnt;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients : updatedIngredients,
            totalPrice: updatedPrice
        }, () => {
            this.isPurchaseble(this.state.ingredients);
        });
    }

    removeIngredientsHandler = (type) => {
        const currentIngredientCnt = this.state.ingredients[type];
        const updatedIngredientCnt = currentIngredientCnt - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedIngredientCnt;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients : updatedIngredients,
            totalPrice: updatedPrice
        }, () => {
            this.isPurchaseble(this.state.ingredients);
        });
    }

    render (){
        const { ingredients, totalPrice, purchasable, ordering, loading } = this.state;
        const disabledInfo = {
            ...ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = <OrderSummary 
            totalPrice={totalPrice}
            orderCancel={this.orderingCancelHandler}
            orderContinue={this.orderingContinueHandler}
            ingredients={ingredients} />
        if(loading){
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal ordering={ordering} cancelModal={this.orderingCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={ingredients} price={totalPrice} />
                <BuildControls
                    addIngredients={this.addIngredientsHandler}
                    removeIngredients={this.removeIngredientsHandler}
                    disabled={disabledInfo}
                    totalPrice={totalPrice}
                    purchasable={purchasable}
                    ordering={this.orderingHandler}
                    />
            </Aux>
        )
    }
}

export default BurgerBuilder;