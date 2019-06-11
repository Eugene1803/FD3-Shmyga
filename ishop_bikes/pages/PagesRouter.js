import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Page_Start from './Page_Start'
import Page_Bikes from './Page_Bikes';
/*
import Page_Brands from './Page_Brands';
import Page_Aksess from './Page_Aksess';
import Page_Repair from './Page_Repair';

        
        <Route path="/velobrendy" component={Page_Brands} >ВЕЛОБРЕНДЫ</Route>
        <Route path="/veloaksessuary" component={Page_Aksess} >ВЕЛОАКСЕССУАРЫ</Route>
        <Route path="/velozapchasti" component={Page_Repair} >ВЕЛОЗАПЧАСТИ</Route>
*/
class PagesRouter extends React.Component {
          
  render() {
    console.log('PagesRouter render');
    return (
      <div>
        <Route path="/" exact component={Page_Start} />
        <Route path="/catalog_velosipedov/:page" component={Page_Bikes} />
      </div>
    );
    
  }

}
    
export default PagesRouter;
    