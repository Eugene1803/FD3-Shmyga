import React from 'react';
import InfoLinks from '../pages/InfoLinks.js';
import CatalogLinks from '../pages/CatalogLinks';
import UserRegistration from './Registration';
import Basket from './Basket';
import PopUpMessage from './PopUpMessage.js';
import "./Header.css";
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
          
    render() {
      console.log('Header render');
      return (
        <div className="Header">
          <NavLink className="HeaderLogo" to=""><img src="../pictures/velikby.png"/></NavLink>
            <UserRegistration/>
            <Basket/>
            <PopUpMessage/>
            <CatalogLinks/>
        </div>
      );
      
    }
  
  }
      
  export default Header;
      