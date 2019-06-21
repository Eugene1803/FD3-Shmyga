import React from 'react';
import InfoLinks from '../pages/InfoLinks.js';
import CatalogLinks from '../pages/CatalogLinks';
import UserRegistration from './Registration';
import Basket from './Basket';
import PopUpMessage from './PopUpMessage.js';
import "./Header.css";
//import Logo from './pages/Logo.js';
//import Basket from './pages/Basket.js';
class Header extends React.Component {
          
    render() {
      console.log('Header render');
      return (
        <div className="Header">
            <UserRegistration/>
            <Basket/>
            <PopUpMessage/>
            <CatalogLinks/>
        </div>
      );
      
    }
  
  }
      
  export default Header;
      