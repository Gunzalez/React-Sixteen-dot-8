import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SiderDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    return (
        <Aux>
            <Toolbar />
            <SiderDrawer />
            <main className={classes.Content}>
                { props.children }
            </main>
        </Aux>
    )
}

export default Layout;