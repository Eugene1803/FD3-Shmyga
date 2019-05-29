"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import Client from '../components/Client';
import Mobile from '../components/Mobile';

test('работа Mobile', () => {
  let clientsArr=[ 
    {id:101, surname:"Иванов",name:'Иван',secName: 'Иванович', balance:200}, 
    {id:105, surname:"Петров",name:'Петр',secName: 'Петрович', balance:250}, 
    {id:110, surname:"Сидоров",name:'Сидор',secName: 'Сидорович', balance:180},
    {id:120, surname:"Суворов",name:'Герасим',secName: 'Филиппович', balance:-220},
  ];
  // создаём тестовую версию компонента
  const component = renderer.create(
    <Mobile clients={clientsArr}/>
  );

  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента саму кнопку
  const buttonElemAll = component.root.find( el => el.type=='button' && el.props.children == 'ВСЕ'); 
  // и "нажмём" на неё
  buttonElemAll.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // "нажмём" кнопку ещё раз
  const buttonElemActive = component.root.find( el => el.type=='button' && el.props.children == 'Активные'); 
  buttonElemActive.props.onClick();
  
  // и получаем окончательный снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
  
  const buttonElemBlocked = component.root.find( el => el.type=='button' && el.props.children == 'Заблокированные'); 
  buttonElemBlocked.props.onClick();
  
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
  const buttonElemAdd = component.root.find( el => el.type=='button' && el.props.children == 'Добавить клиента'); 
  buttonElemAdd.props.onClick();
  
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  let buttonElemSave = component.root.find( el => el.type=='button' && el.props.children == 'Сохранить'); 
  buttonElemSave.props.onClick();
  
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const client = component.root.find('Client');
  console.log(client);
 
  const buttonElemDelete = component.root.find( el => el.type=='button' && el.props.children == 'Удалить'); 
  expect(buttonElemDelete).toBeUndefined()
  /*
  // можно эмулировать события, передавая в качестве объекта события то что нам нужно:
  wrapper.find('select').simulate('change', {
    target: { value: "hello" },
  });
  */

});
