import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        cheese: 0,
        lettuce: 0,
        bacon: 0,
        meat: 0
    },
    price: 4
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            console.log(state);
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }
            }
        default: 
            return state;
    }
}

export default reducer;