import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Page_Start from './Page_Start'
import Page_Bikes from './Page_Bikes';
import Page_Current_bike from './Page_Current_bike';
import Page_Garanty from './Page_Garanty'
import Page_Pay from './Page_Pay'
import Page_Delivery from './Page_Delivery'

class PagesRouter extends React.Component {
          
  render() {
    console.log('PagesRouter render');
    return (
      <div>
        <Route path="/" exact component={Page_Start} />
        <Route path="/catalog_velosipedov/:page" component={Page_Bikes} />
        <Route path='/bikes/:id' component={Page_Current_bike}/>
        <Route path="/dostavka" component={Page_Delivery}/>
        <Route path="/oplata" component={Page_Pay}/>
        <Route path="/garantiya" component={Page_Garanty}/>
      </div>
    );
    
  }

}
    
export default PagesRouter;
    