import React from 'react';
import PropTypes from 'prop-types';

import './IshopComponent.css';

import ItemComponent from './ItemComponent';
import ItemForm from './ItemForm';

class IshopComponent extends React.Component {
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
    workMode: 1, //1 - отображение, 2 - редактирование, 3 - добавление
    allItems: this.props.items.slice(0),
    lastItemCode: this.props.items[this.props.items.length-1].code,
    deleteAnable: true,
    editAnable: true,
    usedItem:null,
    isEditedNow: false,
    addAnable: true
  }

  itemSelected = (item) => {
    if(this.state.workMode === 3 || this.state.workMode === 2 && this.state.isEditedNow){
      return
    }
    this.setState({workMode: 1, deleteAnable: true,editAnable: true, usedItem:item,addAnable: true})
  }
  
  deleteItem = (item) => {
    if(!this.state.deleteAnable){
      return;
    }
    var confirmation = confirm('Вы уверены, что хотите удалить товар?');
      if(confirmation){
      var allItems = this.state.allItems.filter(v => (v !== item));
      this.setState({allItems: allItems});
      if(item === this.state.usedItem){
        this.setState({usedItem:null});
      }
      }
  }
  addItem = () => {
    if(!this.state.addAnable){
      return;
    }
    this.setState({workMode:3, editAnable:false, deleteAnable:false, addAnable:false,usedItem:null})
  }
  editAddItem = (item) => {
    var allItems = this.state.allItems.slice(0);
    for(let i of allItems){
      if(item.code === i.code){
        allItems[allItems.indexOf(i)] = item; 
        this.setState({allItems: allItems});
        return;
      }
    }
    allItems.push(item);
    var lastItemCode = this.state.lastItemCode+1;
    this.setState({allItems:allItems,lastItemCode:lastItemCode});
  }
  isEditedNow = () => {
    this.setState({isEditedNow: true, editAnable:false})
  }
  editItem = (item) => {
    if(!this.state.editAnable){
      return;
    }
    this.setState({workMode: 2, addAnable:false, deleteAnable: false, usedItem: item})
  }

  cancelEdit = () => {
    this.setState({workMode: 1, addAnable:true, deleteAnable: true, editAnable:true,isEditedNow:false});
  }
  render() {

    var displayedItems=this.state.allItems.map(v =>
      <ItemComponent item={v} key={v.code} cbItemSelected={this.itemSelected} 
      selected={(this.state.usedItem === v)?true:false}  cbDeleteItem = {this.deleteItem} 
      deleteAnable={this.state.deleteAnable} editAnable={this.state.editAnable} cbEditItem = {this.editItem}/>
    )

    return (
      <div>
      <table className='IshopComponent'>
        <thead>
          <tr>
          <th>{this.props.tableHead.name}</th>
          <th>{this.props.tableHead.url}</th>
          <th>{this.props.tableHead.price}</th>
          <th>{this.props.tableHead.quantity}</th>
          <th colSpan={2}>{this.props.tableHead.control}</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems}
        </tbody> 
        
      </table>
      <button onClick = {this.addItem} className={this.state.addAnable?null:'AddButtonDisabled'}>{'New product'}</button>
      <ItemForm workMode={this.state.workMode} item={this.state.usedItem} newItemCode={this.state.lastItemCode}
      cbCancelEdit={this.cancelEdit} cbIsEditedNow={this.isEditedNow} cbAddEditItem={this.editAddItem}
      isEditedNow={this.state.isEditedNow}/>
      </div>
      
    )
    ;

  }

}

export default IshopComponent;
