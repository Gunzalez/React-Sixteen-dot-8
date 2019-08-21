import React, { Component } from 'react';

import classes from './Modal.module.scss'

import Aux from '../../../hoc/Aux/Aux';

import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    
    shouldComponentUpdate(props, state){
        return props.ordering !== this.props.ordering || props.children !== this.props.children;
    }

    componentDidUpdate(){
        //console.log('Updated');
    }

    render(){
        const { ordering, cancelModal } = this.props;
        return (
            <Aux>
                <Backdrop show={ ordering } cancelModal={cancelModal} />
                <div 
                    style={{
                            transform: ordering ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity: ordering ? 1 : 0
                        }}
                    className={classes.Modal}
                >{this.props.children}</div>
            </Aux>
        );
    }
}
 
export default Modal;