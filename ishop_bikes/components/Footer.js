import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import combinedReducer from '../redux/reducers.js';


//import PagesRouter from './PagesRouter';
import { BrowserRouter } from 'react-router-dom'

class Footer extends React.PureComponent {
          
  render() {
    console.log('Footer render');
    return (
      <div></div>
    );
    
  }

}
    
export default Footer;
    