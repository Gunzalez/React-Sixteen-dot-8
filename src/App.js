import React from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, Redirect } from "react-router-dom";

import styles from './burgerbuilder.module.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <div>
        <Layout>
          <Switch>
            <Route path={'/checkout'} component={Checkout} />
            <Route path={'/'} component={BurgerBuilder} />
            <Redirect to='/' />
          </Switch>
        </Layout>
    </div>
  );
}

export default App;
