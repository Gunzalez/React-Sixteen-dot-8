import React from 'react';
import { NavLink } from "react-router-dom";

import classes from './NavigationItem.module.scss';

const NavigationItem = ({ link, children }) => (
    <li className={classes.NavigationItem}>
        <NavLink to={link} exact activeClassName={classes.active}>{children}</NavLink>
    </li>
)
 
export default NavigationItem;