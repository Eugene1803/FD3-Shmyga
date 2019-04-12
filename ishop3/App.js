"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import IshopComponent from './components/IshopComponent';

let items = [{"code":1,"name":"notebook ASUS","url":"https://www.asus.com","price":"450$","quantity":"28"},{"code":2,"name":"notebook Lenovo","url":"https://www.lenovo.com","price":"500$","quantity":"19"},{"code":3,"name":"notebook Sumsung","url":"https://www.sumsung.com","price":"450$","quantity":"28"},{"code":4,"name":"notebook LG","url":"https://www.lg.com","price":"490$","quantity":"9"}]
let tableHead = {"name": "name", "url": "URL", "price": "price", "quantity": "quantity","control": "control"};
ReactDOM.render(
  <IshopComponent 
    items={items}
    tableHead={tableHead}
  />
  , document.getElementById('container') 
);

