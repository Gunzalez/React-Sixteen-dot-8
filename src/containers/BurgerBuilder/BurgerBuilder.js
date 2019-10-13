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


class BurgerBuilder extends Component {
    state = {
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
        return sum > 0
    }

    orderingHandler = () => {
        this.setState({ ordering: true })
    }

    orderingCancelHandler = () => {
        this.setState({ ordering: false })
    }

    orderingContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render (){
        const { state: { ordering, loading, error },
                props: { ingredients, totalPrice, onIngredientAdded, onIngredientRemoved },
                orderingHandler,
                isPurchaseble,
                orderingCancelHandler,
                orderingContinueHandler
            } = this

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
                        addIngredients={onIngredientAdded}
                        removeIngredients={onIngredientRemoved}
                        disabled={disabledInfo}
                        totalPrice={totalPrice}
                        purchasable={isPurchaseble(ingredients)}
                        ordering={orderingHandler}
                        />
                </Aux>
            )

            orderSummary = <OrderSummary 
                totalPrice={totalPrice}
                orderCancel={orderingCancelHandler}
                orderContinue={orderingContinueHandler}
                ingredients={ingredients} />
        }
        
        if(loading){
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={ordering} cancelModal={orderingCancelHandler}>
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.price
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));