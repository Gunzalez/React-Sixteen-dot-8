import React from 'react';
import Layout from './hoc/Layout/Layout';

import styles from './burgerbuilder.module.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
        <Checkout />
      </Layout> 
    </div>
  );
}

export default App;
