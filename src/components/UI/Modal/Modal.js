import React from 'react';

import classes from './Modal.module.scss'

import Aux from '../../../hoc/Aux';

import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    const { ordering, cancelModal } = props;
    return (
        <Aux>
            <Backdrop show={ ordering } cancelModal={cancelModal} />
            <div 
                style={
                    {
                    transform: ordering ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: ordering ? 1 : 0
                    }
                }
                className={classes.Modal}
            >{props.children}</div>
        </Aux>
    );
}
 
export default modal;