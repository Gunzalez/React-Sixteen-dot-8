import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.module.scss';

const sideDrawer = (props) => {

    const attachedClasses = [classes.SideDrawer];
    
    if(props.show){
        attachedClasses.push(classes.Open);
    } else {
        attachedClasses.push(classes.Close);
    }

    return (
        <Aux>
            <Backdrop show={props.show} cancelModal={props.closeDrawer} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}
 
export default sideDrawer;