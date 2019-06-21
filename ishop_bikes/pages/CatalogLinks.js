import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './CatalogLinks.css';

class CatalogLinks extends React.Component {

  state = {
    showMobileMenu: false
  }   
  closeMenu = () => {
    this.setState({
      showMobileMenu: false
    })
  }   
  openMenu = () => {
    console.log('open');
    this.setState({
      showMobileMenu: true
    })
  }  
  render() {

    return (
    <div>
      <div className="CatalogLinks">
      <div>
        <NavLink to="/catalog_velosipedov/1" className="PageLink" activeClassName="ActivePageLink">КАТАЛОГ ВЕЛОСИПЕДОВ</NavLink></div>
        <div><NavLink to="/dostavka" className="PageLink" activeClassName="ActivePageLink">Доставка</NavLink></div>
        <div><NavLink to="/oplata" className="PageLink" activeClassName="ActivePageLink">ОПЛАТА</NavLink></div>
        
        <div><NavLink to="/garantiya" className="PageLink" activeClassName="ActivePageLink">ГАРАНТИЯ</NavLink></div>
      </div>
      <div className={(!this.state.showMobileMenu)?"MobileMenuButton":"MobileMenuButtonHide"}><img src="../pictures/menu.png" onClick={this.openMenu}/></div>
      <div className={(this.state.showMobileMenu)?"CatalogLinksMobile":"CatalogLinksMobileHide"}>
      <div className="CancelButton"><img src="../pictures/cancel.png"onClick={this.closeMenu}/></div>
      <div><NavLink to="/catalog_velosipedov/1" className="PageLinkMobile" activeClassName="ActivePageLinkMobile">КАТАЛОГ ВЕЛОСИПЕДОВ</NavLink></div>
        <div><NavLink to="/dostavka" className="PageLinkMobile" activeClassName="ActivePageLinkMobile">Доставка</NavLink></div>
        <div><NavLink to="/oplata" className="PageLinkMobile" activeClassName="ActivePageLinkMobile">ОПЛАТА</NavLink></div>
        
        <div><NavLink to="/garantiya" className="PageLinkMobile" activeClassName="ActivePageLinkMobile">ГАРАНТИЯ</NavLink></div>
      </div> 
      </div>
    );
    
  }

}
    
export default CatalogLinks;
    