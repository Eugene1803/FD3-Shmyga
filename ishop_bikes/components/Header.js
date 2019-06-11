import React from 'react';
import InfoLinks from '../pages/InfoLinks.js';
import CatalogLinks from '../pages/CatalogLinks';
import UserRegistration from './Registration'
//import Logo from './pages/Logo.js';
//import Basket from './pages/Basket.js';
class Header extends React.PureComponent {
          
    render() {
      console.log('Header render');
      return (
        <div>
            <UserRegistration/>
            <InfoLinks/>
            <CatalogLinks/>
        </div>
      );
      
    }
  
  }
      
  export default Header;
      