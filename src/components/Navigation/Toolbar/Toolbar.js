import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './Toolbar.module.scss';

const toolbar = (props) => (
    <div className={classes.Toolbar}>
        <div>MENU</div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </div>
)
 
export default toolbar;