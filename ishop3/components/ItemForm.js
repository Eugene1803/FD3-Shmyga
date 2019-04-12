import React from 'react';
import PropTypes from 'prop-types';

import './ItemForm.css';


class ItemForm extends React.Component {
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
    item: this.props.item,
    name: {value: this.props.item?this.props.item.name:'', validString: ''},
    url: {value:this.props.item?this.props.item.url:'', validString: ''},
    price: {value: this.props.item?this.props.item.price:'', validString: ''},
    quantity: {value: this.props.item?this.props.item.quantity:'', validString: ''},
    formIsValid: this.props.item?true: false,
    validState: this.props.item?{name: true, url:true, price: true, quantity: true}:{name: false, url:false, price: false, quantity: false}
  }

  itemSelected = (EO) => {
    this.props.cbItemSelected(this.props.item.code);
  }
  validate = (EO) => {
    if(this.state.item !== this.props.item){
      this.setState(
        {
          item: this.props.item,
          name: {value: this.props.item?this.props.item.name:'', validString: ''},
          url: {value:this.props.item?this.props.item.url:'', validString: ''},
          price: {value: this.props.item?this.props.item.price:'', validString: ''},
          quantity: {value: this.props.item?this.props.item.quantity:'', validString: ''},
          formIsValid: this.props.item?true: false,
          validState: this.props.item?{name: true, url:true, price: true, quantity: true}:{name: false, url:false, price: false, quantity: false}
        }
      )
      }
    if(EO.target.getAttribute('data') === 'submit'){
      if(!this.props.isEditedNow){
          return;
      }
    }
    var validState = this.state.validState; 
    var formIsValid = this.state.formIsValid; 
    if(EO.target.getAttribute('data') === 'name' || EO.target.getAttribute('data') === 'submit'){
    var name = this.state.name;
    name.value = (EO.target.getAttribute('data') === 'submit')?name.value:EO.target.value;
    if(!name.value.length){
      validState.name = false;
      name.validString = 'Please fill the field';
    } else {
      validState.name = true;
      name.validString = '';
    }
    this.setState({name: name})
    }

    if(EO.target.getAttribute('data') === 'url' || EO.target.getAttribute('data') === 'submit'){
      var url = this.state.url;
      url.value = (EO.target.getAttribute('data') === 'submit')?url.value:EO.target.value;
      if(!url.value.length){
        validState.url = false;
        url.validString = 'Please fill the field';
      } else {
        validState.url = true;
        url.validString = '';
      }
      this.setState({url: url})
      }

      if(EO.target.getAttribute('data') === 'price' || EO.target.getAttribute('data') === 'submit'){
        var price = this.state.price;
        price.value = (EO.target.getAttribute('data') === 'submit')?price.value:EO.target.value;
        if(!price.value.length){
          validState.price = false;
          price.validString = 'Please fill the field';
        } else {
          validState.price = true;
          price.validString = '';
        }
        this.setState({price: price})
        }

        if(EO.target.getAttribute('data') === 'quantity' || EO.target.getAttribute('data') === 'submit'){
          var quantity = this.state.quantity;
          quantity.value = (EO.target.getAttribute('data') === 'submit')?quantity.value:EO.target.value;
          if(!quantity.value.length){
            validState.quantity = false;
            quantity.validString = 'Please fill the field';
            
          } else {
            validState.quantity = true;
            quantity.validString = '';
          }
          this.setState({quantity: quantity})
          }
          if((EO.target.getAttribute('data') !== 'submit')){
            this.props.cbIsEditedNow();
          }
          function getValidStatus(){
            for(var key in validState){
              if(!validState[key]){
                return false;
              }
            }
            return true;
          }

          formIsValid = getValidStatus();
          this.setState({formIsValid:formIsValid })
          if(EO.target.getAttribute('data') === 'submit'){
            if(!formIsValid ){
              return;
            }
            else {
              var item = {code:(this.props.workMode === 2)?this.props.item.code:(this.props.newItemCode+1),
              'name': this.state.name.value,'url': this.state.url.value,'price': this.state.price.value,
              'quantity': this.state.quantity.value };
              this.props.cbAddEditItem(item);
              this.cancelEdit();
            }
          }
          
  }
  
  cancelEdit = () => {
    this.setState(
      {
        item: this.props.item,
        name: {value: this.props.item?this.props.item.name:'', validString: ''},
        url: {value:this.props.item?this.props.item.url:'', validString: ''},
        price: {value: this.props.item?this.props.item.price:'', validString: ''},
        quantity: {value: this.props.item?this.props.item.quantity:'', validString: ''},
        formIsValid: false,
        validState: this.props.item?{name: true, url:true, price: true, quantity: true}:{name: false, url:false, price: false, quantity: false}
      }
    )
    this.props.cbCancelEdit();
  }
  
  render() {
    
    if(!this.props.item && this.props.workMode !== 3){
      return (
        <div></div>
      )
    }
    else if(this.props.workMode === 1){
    return (
      <div>
      <h2>{'ID: ' + this.props.item.code}</h2>
      <div>{'name: ' + this.props.item.name}</div>
      <div>{'url: ' + this.props.item.url}</div>
      <div>{'price: ' + this.props.item.price}</div>
      <div>{'quantity: ' + this.props.item.quantity}</div>
      </div>
    )
    }
    else if(this.props.workMode === 2){
      return (
        <div>
        <h2>{'Editing ID: ' + this.props.item.code}</h2>
        <label>{'name'}<input data={'name'} type={'text'} value={(this.state.item !== this.props.item)?this.props.item.name:this.state.name.value} onChange={this.validate}/></label><span>{this.state.name.validString}</span><br/>
        <label>{'url'}<input data={'url'} type={'text'} value={(this.state.item !== this.props.item)?this.props.item.url:this.state.url.value} onChange={this.validate}/></label><span>{this.state.url.validString}</span><br/>
        <label>{'price'} <input data={'price'} type='text' value={(this.state.item !== this.props.item)?this.props.item.price:this.state.price.value} onChange={this.validate}/></label><span>{this.state.price.validString}</span><br/>
        <label>{'quantity'}<input data={'quantity'} type={'text'} value={(this.state.item !== this.props.item)?this.props.item.quantity:this.state.quantity.value} onChange={this.validate}/></label><span>{this.state.quantity.validString}</span><br/>
        <button onClick={this.validate} data={'submit'} className={this.state.formIsValid?null:'AddEditButtonDisabled'}>{this.props.workMode === 2 && 'edit' || this.props.workMode === 3 && 'add'}</button><button onClick={this.cancelEdit}>{'cancel'}</button>
        </div>
      )
    }
    
    else if(this.props.workMode === 3){
      return(
        <div>
        <h2>{'Adding ID: ' + (this.props.newItemCode+1)}</h2>
        <label>{'name'}<input data={'name'} type={'text'} value={this.props.isEditedNow?this.state.name.value:''} onChange={this.validate}/></label><span>{this.state.name.validString}</span><br/>
        <label>{'url'}<input data={'url'} type={'text'} value={this.props.isEditedNow?this.state.url.value:''} onChange={this.validate}/></label><span>{this.state.url.validString}</span><br/>
        <label>{'price'} <input data={'price'} type='text' value={this.props.isEditedNow?this.state.price.value:''} onChange={this.validate}/></label><span>{this.state.price.validString}</span><br/>
        <label>{'quantity'}<input data={'quantity'} type={'text'} value={this.props.isEditedNow?this.state.quantity.value:''} onChange={this.validate}/></label><span>{this.state.quantity.validString}</span><br/>
        <button onClick={this.validate} data={'submit'} className={this.state.formIsValid?null:'AddEditButtonDisabled'}>{this.props.workMode === 2 && 'edit' || this.props.workMode === 3 && 'add'}</button><button onClick={this.cancelEdit}>{'cancel'}</button>
        </div>
      )
    }
    
    ;

  }

}

export default ItemForm;
