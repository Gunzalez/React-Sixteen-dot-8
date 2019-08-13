import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.scss';

const Layout = (props) => {
    return (
        <Aux>
            <div>Toolbar, Sider Drawer, Backdrop</div>
            <main className={classes.Content}>
                { props.children }
            </main>
        </Aux>
    )
}

export default Layout;