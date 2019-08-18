import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SiderDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    }
    
    sideDrawerToggleHandler = () => {
        this.setState((previousState) => {
            return { showSideDrawer: !previousState.showSideDrawer }
        })
    }

    render(){

        const { showSideDrawer } = this.state;

        return (
            <Aux>
                <Toolbar toggleDrawer={this.sideDrawerToggleHandler} />
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