import React from 'react';
import Layout from './hoc/Layout/Layout';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import styles from './burgerbuilder.module.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path={'/checkout'} component={Checkout} />
            <Route path={'/builder'} component={BurgerBuilder} />
            <Redirect to='/builder' />
          </Switch>
        </Layout> 
      </BrowserRouter>
    </div>
  );
}

export default App;
