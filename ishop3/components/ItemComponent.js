import React from 'react';
import PropTypes from 'prop-types';

import './ItemComponent.css';


class ItemComponent extends React.Component {
/*
  static propTypes = {
    startWorkMode: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answers:PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        freeanswer: PropTypes.bool,
      })
    ),
    deffreeanswertext: PropTypes.string.isRequired,
  };
*/
  state = {
  }

  itemSelected = (EO) => {
    this.props.cbItemSelected(this.props.item);
  }
  
  deleteMe = (EO) => {
    EO.stopPropagation();
    this.props.cbDeleteItem(this.props.item)
  }

  editMe = (EO) => {
    EO.stopPropagation();
    this.props.cbEditItem(this.props.item)
  }
  render() {
    return (
        <tr onClick={this.itemSelected} className={(this.props.selected)?'ItemComponentSelected':null}>
            <td>{this.props.item.name}</td>
            <td>{this.props.item.url}</td>
            <td>{this.props.item.price}</td>
            <td>{this.props.item.quantity}</td>
            <td>
              <button className={this.props.editAnable?null:'EditButtonDisabled'} onClick={this.editMe}>{'edit'}</button>
            </td>
            <td>
              <button onClick={this.deleteMe} className={this.props.deleteAnable?null:'DeleteButtonDisabled'}>{'delete'}</button>
            </td>
        </tr>
    )
    ;

  }

}

export default ItemComponent;
