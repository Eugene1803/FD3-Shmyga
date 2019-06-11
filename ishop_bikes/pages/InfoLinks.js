import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

//import './PagesLinks.css';

class InfoLinks extends React.Component {
          
  render() {

    return (
      <div>
        <NavLink to="/otzyvy_clientov" className="PageLink" activeClassName="ActivePageLink">Отзывы клиентов</NavLink>
        <NavLink to="/dostavka" className="PageLink" activeClassName="ActivePageLink">Доставка</NavLink>
        <NavLink to="/oplata" className="PageLink" activeClassName="ActivePageLink">Оплата</NavLink>
        <NavLink to="/skidki_i_podarki" className="PageLink" activeClassName="ActivePageLink">Скидки и подарки</NavLink>
        <NavLink to="/rassrochka" className="PageLink" activeClassName="ActivePageLink">Рассрочка</NavLink>
        <NavLink to="/garantiya" className="PageLink" activeClassName="ActivePageLink">Гарантия</NavLink>
      </div>
    );
    
  }

}
    
export default InfoLinks;
    