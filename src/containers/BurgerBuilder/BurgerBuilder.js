import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    bacon: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchasable: false,
        ordering: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-5dedd.firebaseio.com/ingredients.json')
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
        const queryParams = [];
        for(let i in this.props.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice.toFixed(2));
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        });
    }

    addIngredientsHandler = (type) => {
        const currentIngredientCnt = this.props.ingredients[type];
        const updatedIngredientCnt = currentIngredientCnt + 1;
        const updatedIngredients = {
            ...this.props.ingredients
        }
        updatedIngredients[type] = updatedIngredientCnt;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients : updatedIngredients,
            totalPrice: updatedPrice
        }, () => {
            this.isPurchaseble(this.props.ingredients);
        });
    }

    removeIngredientsHandler = (type) => {
        const currentIngredientCnt = this.props.ingredients[type];
        const updatedIngredientCnt = currentIngredientCnt - 1;
        const updatedIngredients = {
            ...this.props.ingredients
        }
        updatedIngredients[type] = updatedIngredientCnt;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients : updatedIngredients,
            totalPrice: updatedPrice
        }, () => {
            this.isPurchaseble(this.props.ingredients);
        });
    }

    render (){
        const { totalPrice, purchasable, ordering, loading, error } = this.state;
        const { ingredients } = this.props;
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
                        addIngredients={this.props.onIngredientAdded}
                        removeIngredients={this.props.onIngredientRemoved}
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));