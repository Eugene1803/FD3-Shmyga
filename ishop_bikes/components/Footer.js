import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import combinedReducer from '../redux/reducers.js';
import "./Footer.css";

//import PagesRouter from './PagesRouter';
import { BrowserRouter } from 'react-router-dom'

class Footer extends React.PureComponent {
          
  render() {
    console.log('Footer render');
    return (
     
      <div className="Footer">
          <div className="FooterImagePay"><img src="../pictures/pay.png"/></div>
          <div className="FooterCompInfo">
        ИП Шмыга Евгений Сергеевич. Регистрационный номер: 10101011 от 17.10.2017 выдан Минским горисполкомом. Адрес для почтовых отправлений: Республика Беларусь, Минск, 220116, ул. Мирошниченко 1/1.
Интернет-магазин велосипедов Velik.by зарегистрирован в торговом реестре с 25.11.2016 под номером 254654. Варианты оплаты: наличный и безналичный расчет, банковские платежные карты, система «Расчет» (ЕРИП), WebMoney.
      </div>
      <div className="FooterImageSoc">
        <img src="../pictures/social.png" />
      </div>
      </div>
      )
    
  }

}
    
export default Footer;
    