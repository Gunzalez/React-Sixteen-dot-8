import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    bacon: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        ordering: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-5dedd.firebaseio.com/orders/ingredients.json')
            .then( respone => {
                const ingredients = respone.data;
                this.setState({ ingredients })
            })
            .catch(error => {
                this.setState({ error: true })
                console.log(error)
            })
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
        const { ingredients, totalPrice, purchasable, ordering, loading, error } = this.state;
        const disabledInfo = {
            ...ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null;
        const errorStyles = {
            textAlign: "center", 
            margin: '20px',
            fontSize: '1.3em'
        }
        let burger = error ? (<p style={errorStyles}>Computer says no burgers today, sorry.</p>) : <Spinner />

        if(ingredients){

            burger = (
                <Aux>
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

            orderSummary = <OrderSummary 
                totalPrice={totalPrice}
                orderCancel={this.orderingCancelHandler}
                orderContinue={this.orderingContinueHandler}
                ingredients={ingredients} />
        }
        
        if(loading){
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={ordering} cancelModal={this.orderingCancelHandler}>
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);