import React from 'react';
import isoFetch from 'isomorphic-fetch';

import MobileClient from './MobileClient';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

  constructor(props) {
    super(props);
    // this.loadData();
    // не надо запускать асинхронные или долгие операции из конструктора
    // конструктор инициализирует только КЛАСС, это ещё не React-компонент
    // конструктор должен быть лёгким и быстрым
  }

  componentDidMount() {
    this.loadData();
  }

  state = {
    dataReady: false,
    name: "???",
    clients: [],
  };

  fetchError = (errorMessage) => {
    console.error(errorMessage);
  };

  fetchSuccess = (loadedData) => {
    console.log(loadedData instanceof Object)
    this.setState({
      dataReady:true,
      loadedData: JSON.stringify(loadedData)
    });
  };

  loadData = () => {
    let newData = {
      "name": "хуй",
      "location": "хуй"
  }

    isoFetch("http://localhost:3000/users/1", {
        method: 'PATCH',
        headers: {
          "Content-type": "application/json",
      },
        body: JSON.stringify(newData)
    })
        .then( response => { // response - HTTP-ответ
            if (!response.ok){
                console.log(response);
                throw new Error("fetch error " + response.status); // дальше по цепочке пойдёт отвергнутый промис
            }
                else{
                console.log(response);
                return response.json(); // дальше по цепочке пойдёт промис с пришедшими по сети данными
                }
              })
        .then( data => {
            this.fetchSuccess(data); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
        })
        .catch( error => {
            this.fetchError(error.message);
        })
    ;

  };

  render() {

    if ( !this.state.dataReady )
      return <div>загрузка данных...</div>;
      var loadedData = this.state.loadedData;
    
    return (
      <div className='MobileCompany'>
        {loadedData}
      </div>
    )
    ;

  }

}

export default MobileCompany;
