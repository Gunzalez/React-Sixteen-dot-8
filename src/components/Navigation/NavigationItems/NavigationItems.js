import React from 'react';

import classes from './NavigationItems.module.scss';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link={'/builder'} active>Burger Builder</NavigationItem>
        <NavigationItem link={'/checkout'}>Checkout</NavigationItem>
    </ul>
)
 
export default navigationItems;