import React, { Component } from 'react';

import classes from './Modal.module.scss'

import Aux from '../../../hoc/Aux/Aux';

import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(props, state){
        return props.show !== this.props.show || props.children !== this.props.children;
    }

    componentDidUpdate(){
        //console.log('Updated');
    }

    render(){
        const { show, cancelModal } = this.props;
        return (
            <Aux>
                <Backdrop show={ show } cancelModal={cancelModal} />
                <div 
                    style={{
                            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity: show ? 1 : 0
                        }}
                    className={classes.Modal}
                >{this.props.children}</div>
            </Aux>
        );
    }
}
 
export default Modal;