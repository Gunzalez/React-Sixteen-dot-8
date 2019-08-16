import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 4
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
        });
    }

    render (){
        const { ingredients, totalPrice } = this.state;
        const disabledInfo = {
            ...ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Burger ingredients={ingredients} price={totalPrice} />
                <BuildControls
                    addIngredients={this.addIngredientsHandler}
                    removeIngredients={this.removeIngredientsHandler}
                    disabled={disabledInfo}
                    totalPrice={totalPrice}
                    />
            </Aux>
        )
    }
}

export default BurgerBuilder;