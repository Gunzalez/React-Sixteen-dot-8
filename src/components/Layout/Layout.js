import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SiderDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    closeSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    render(){

        const { showSideDrawer } = this.state;

        return (
            <Aux>
                <Toolbar />
                <SiderDrawer
                    show={showSideDrawer}
                    closeDrawer={this.closeSideDrawerHandler} />
                <main className={classes.Content}>
                    { this.props.children }
                </main>
            </Aux>
        )
    }
}

export default Layout;