import React from 'react';

import classes from './SideDrawerToggle.module.scss';

const sideDrawerToggle = (props) => (

    <div onClick={props.toggle} 
        className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
 
export default sideDrawerToggle;