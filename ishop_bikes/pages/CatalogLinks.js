import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

//import './PagesLinks.css';

class CatalogLinks extends React.Component {
          
  render() {

    return (
      <div>
        <NavLink to="/catalog_velosipedov/1" className="PageLink" activeClassName="ActivePageLink">КАТАЛОГ ВЕЛОСИПЕДОВ</NavLink>
        <NavLink to="/velobrendy" className="PageLink" activeClassName="ActivePageLink">ВЕЛОБРЕНДЫ</NavLink>
        <NavLink to="/veloaksessuary" className="PageLink" activeClassName="ActivePageLink">ВЕЛОАКСЕССУАРЫ</NavLink>
        <NavLink to="/velozapchasti" className="PageLink" activeClassName="ActivePageLink">ВЕЛОЗАПЧАСТИ</NavLink>
      </div>
    );
    
  }

}
    
export default CatalogLinks;
    