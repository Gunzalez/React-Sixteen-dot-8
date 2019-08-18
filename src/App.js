import React from 'react';
import Layout from './hoc/Layout/Layout';

import styles from './burgerbuilder.module.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout> 
    </div>
  );
}

export default App;
