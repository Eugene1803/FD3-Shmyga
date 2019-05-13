"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import Mobile from './components/Mobile';

let companyName='Velcom';
let clientsArr=[ 
  {id:101, surname:"Иванов",name:'Иван',secName: 'Иванович', balance:200}, 
  {id:105, surname:"Петров",name:'Петр',secName: 'Петрович', balance:250}, 
  {id:110, surname:"Сидоров",name:'Сидор',secName: 'Сидорович', balance:180},
  {id:120, surname:"Суворов",name:'Герасим',secName: 'Филиппович', balance:-220},
];

ReactDOM.render(
  <Mobile 
    name={companyName}
    clients={clientsArr}
  />
  , document.getElementById('container') 
);

