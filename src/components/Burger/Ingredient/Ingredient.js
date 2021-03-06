import React, { Component } from 'react';
import classes from './Ingredient.module.scss';
import PropTypes from 'prop-types';

class Ingredient extends Component  {

    render(){
        let ingredient = null;
        switch(this.props.type){
            case 'bread-bottom':
                ingredient = <div className={classes.breadBottom}></div>;
                break;
            case 'bread-top':
                ingredient = (
                    <div className={classes.breadTop}>
                        <div className={classes.seeds}></div>
                        <div className={classes.seeds2}></div>
                    </div>
                );
                break;
            case 'lettuce':
                ingredient = <div className={classes.lettuce}></div>;
                break;        
            case 'cheese':
                ingredient = <div className={classes.cheese}></div>;
                break;
            case 'meat':
                ingredient = <div className={classes.meat}></div>;
                break;
            case 'bacon':
                ingredient = <div className={classes.bacon}></div>;
                break;
            default:
                ingredient = null;
        }
        return ingredient;        
    }
}

Ingredient.propTypes = {
    type: PropTypes.string.isRequired
}
 
export default Ingredient;