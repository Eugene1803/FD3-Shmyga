"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import IshopComponent from './components/IshopComponent';
function testLoadData() {
  $.ajax('items.json',
      { type:'GET', dataType:'json', success:dataLoaded, error:errorHandler }
  );
}

function dataLoaded(data) {
  let items = data;
  let tableHead = {"name": "name", "url": "URL", "price": "price", "quantity": "quantity","control": "control"};
  ReactDOM.render(
  <IshopComponent 
    items={items}
    tableHead={tableHead}
  />
  , document.getElementById('container') 
);

}

function errorHandler(){
console.log('error');
}
testLoadData();

