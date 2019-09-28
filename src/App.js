import React from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, Redirect } from "react-router-dom";

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <div>
        <Layout>
          <Switch>
            <Route path={'/checkout'} component={Checkout} />
            <Route path={'/orders'} component={Orders} />
            <Route path={'/'} exact component={BurgerBuilder} />
            <Redirect to='/' />
          </Switch>
        </Layout>
    </div>
  );
}

export default App;
