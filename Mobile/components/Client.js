import React from 'react';
import PropTypes from 'prop-types';
import {delEditEvents} from './events';
import './Client.css';

class Client extends React.PureComponent {
/*
  static propTypes = {
    info:PropTypes.shape({
      id: PropTypes.number.isRequired,
      fio: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
  };
*/
  state = {
    info: this.props.info,
  };

  deleteMe = () => {
    delEditEvents.emit('deleteClient',this.state.info.id);
  } 

  editMe = () => {
    delEditEvents.emit('editClient',this.state.info)
  }
  
  componentWillReceiveProps = (newProps) => {
    this.setState({info:newProps.info});
  };

  render() {

    console.log("MobileClient id="+this.state.info.id+" render");
    
    return (
      <tr>
        <td>{this.state.info.surname}</td>
        <td>{this.state.info.name}</td>
        <td>{this.state.info.secName}</td>
        <td>{this.state.info.balance}</td>
        <td className={(this.state.info.balance > 0)?'ClientActive':'ClientBlocked'}>{(this.state.info.balance > 0)?'Активен':'Заблокирован'}</td>
        <td><button onClick={this.editMe}>Редактировть</button></td>
        <td><button onClick={this.deleteMe}>Удалить</button></td>
      </tr>
    );

  }

}

export default Client;
