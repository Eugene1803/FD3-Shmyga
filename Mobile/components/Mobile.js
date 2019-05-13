import React from 'react';
import PropTypes from 'prop-types';
import {delEditEvents} from './events';
import Client from './Client';

import './Mobile.css';

class Mobile extends React.PureComponent {
/*
  static propTypes = {
    name: PropTypes.string.isRequired,
    clients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fio: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
  };
*/
  state = {
    name: this.props.name,
    clients: this.props.clients,
    showClients: 'all',
    workMode: 1, //1-отображение, 2 - редактирование, 3 - удаление
    editingClient: null
  };

  componentDidMount = () => {
    delEditEvents.addListener('deleteClient',this.deleteClient);
    delEditEvents.addListener('editClient',this.editClient);
  };

  deleteClient = (clientID) => {
    if(this.state.workMode === 2 || this.state.workMode === 3) {
      return;
    }
    let newClients = this.state.clients.filter(client => 
      client.id !== clientID  
    );
    this.setState({clients: newClients});
  }

  componentWillUnmount = () => {
    delEditEvents.removeListener('deleteClient',this.deleteClient);
    delEditEvents.removeListener('editClient',this.editClient);
  };

  setName1 = () => { 
    this.setState({name:'МТС'});
  };

  setName2 = () => {
    this.setState({name:'Velcom'});
  };
  
  showClientsAll = () => {
    this.setState({showClients: 'all'});
  }

  showClientsActive = () => {
    this.setState({showClients: 'active'});
  }

  showClientsBlocked = () => {
    this.setState({showClients: 'blocked'});
  }

  addClient = () => {
    let newId;
    outer: for(var i = 100;;i++){
      for(var j = 0; j < this.state.clients.length; j++){
        if(i == this.state.clients[j].id){
          continue outer;
        }
        if(j == this.state.clients.length-1){
          newId = i;
          break outer;
        } 
      }
    }
    
    let addingClient = {
      surname: '',
      name: '',
      secName: '',
      balance: '',
      id: newId
    };
    this.setState({workMode: 3,editingClient: addingClient})
  }

  editClient = (client) => {
    if(this.state.workMode === 3 || this.state.workMode === 2) {
      return;
    }
    this.setState({workMode: 2, editingClient: client});
  }
   cancelEditAdd = () => {
     this.setState({workMode: 1, editingClient: null})
   }

   changeClient = (EO) => {
     let changedClient = {...this.state.editingClient};
     if(EO.target.getAttribute('data') === 'surname'){
       changedClient.surname = EO.target.value;
     }
     else if(EO.target.getAttribute('data') === 'name'){
      changedClient.name = EO.target.value;
    }
    else if(EO.target.getAttribute('data') === 'secName'){
      changedClient.secName = EO.target.value;
    }
    else if(EO.target.getAttribute('data') === 'balance'){
      changedClient.balance = EO.target.value;
    }
     this.setState({editingClient: changedClient})
   }
  
  saveChanges = () => {
    let updatedClients = [];
    if(this.state.workMode === 2) {
      updatedClients = this.state.clients.map( client => {
        if(client.id !== this.state.editingClient.id){
          return client;
        }
        else {
          return this.state.editingClient;
        }
      }

      )
    }
    else if(this.state.workMode === 3){
      updatedClients = [...this.state.clients];
      updatedClients.push(this.state.editingClient);
    } 
    this.setState({workMode: 1, editingClient: null, clients: updatedClients})
  }

  render() {

    console.log("Mobile render");

    var clientsCode = [];
    
     this.state.clients.forEach( client => {
        if(this.state.showClients == 'all'){
          clientsCode.push(<Client key={client.id} info={client}/>);
        }
        else if (this.state.showClients == 'active') {
          if(client.balance > 0){
            clientsCode.push(<Client key={client.id} info={client}/>);
          }
        }
        else if(this.state.showClients == 'blocked'){
          if(client.balance <= 0) {
          clientsCode.push(<Client key={client.id} info={client}/>);
          }
        }
     }
    );

    return (
    <div>  
      <div> 
        <button onClick={this.setName1}>МТС</button><button onClick={this.setName2}>Velcom</button>
      </div>
    <hr></hr>  
    <div>Компания: {this.state.name}</div>
    <hr></hr>
    <button onClick={this.showClientsAll}>ВСЕ</button>
    <button onClick={this.showClientsActive}>Активные</button>
    <button onClick={this.showClientsBlocked}>Заблокированные</button>
    <hr></hr>
    <table>
      <thead>
        <tr>
        <th>Фамилия</th><th>Имя</th><th>Отчество</th><th>Баланс</th><th>Статус</th><th>Редактировать</th><th>Удалить</th>
        </tr>
      
      </thead>
      <tbody>
        {clientsCode}
 
      </tbody>
    </table>
    <hr></hr>
    {(this.state.workMode === 1 && <button onClick={this.addClient}>Добавить клиента</button>) ||
    ((this.state.workMode === 2 || this.state.workMode === 3) && 
      <div>
        <h3>{(this.state.workMode === 2)?"Редактирование клиента: "+this.state.editingClient.id:"Добавление нового клиента"}</h3>
        <div>Фамилия: <input value={this.state.editingClient.surname}  data='surname' onChange={this.changeClient}></input></div>
        <div>Имя: <input value={this.state.editingClient.name} data='name' onChange={this.changeClient}></input></div>
        <div>Отчество: <input value={this.state.editingClient.secName} data='secName' onChange={this.changeClient}></input></div>
        <div>Баланс: <input value={this.state.editingClient.balance} data='balance' onChange={this.changeClient}></input></div>
        <button onClick={this.saveChanges}>Сохранить</button>
        <button onClick={this.cancelEditAdd}>Отмена</button>
       </div>    
    ) 
    }
    </div>  
    )
    ;

  }

}

export default Mobile;
