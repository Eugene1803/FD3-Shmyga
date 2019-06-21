import React from 'react';
import './Registration.css';
import {connect} from 'react-redux';
import isoFetch from 'isomorphic-fetch';
import './Basket.css';
import PopUpMessage from './PopUpMessage';
class Basket extends React.PureComponent{
    componentDidMount(){
          let basket = JSON.parse(localStorage.bikesLocalStorage).basket;
         if(Object.keys(basket).length){
             this.loadData();
         }
          this.props.dispatch({
              type:"CHANGE_BASKET",
              basket:basket
          })
    }
    state = {
        deletedItemId: null
    }
    componentWillReceiveProps(nextProps){
            let basket = {...nextProps.userData.basket};
            let storage = {...JSON.parse(localStorage.bikesLocalStorage)};
            storage.basket = basket;
            localStorage.bikesLocalStorage = JSON.stringify(storage);
            this.setState({
                deletedItemId: null
            })
    }
    fetchError = (errorMessage) => {
        console.error(errorMessage);
    };
    
    fetchSuccess = (loadedData) => {
        this.props.dispatch({
            type: 'ALL_USERS_INFO_LOADED',
            allUsers: loadedData
        })
      };
    loadUsersInfo = () => {
        isoFetch("http://localhost:3000/users", {
        method: 'GET',
        headers: {
          "Accept": "application/json",
      }
    })

        .then( response => { // response - HTTP-ответ
            if (!response.ok){
                throw new Error("fetch error " + response.status); // дальше по цепочке пойдёт отвергнутый промис
            }
                else{
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
    }
    
    fetchSuccess = (loadedData) => {
        this.props.dispatch({
            type:'BIKES_SET',
            status: 3,
            data: loadedData
        })
      };
    loadData = () => {
        isoFetch("http://localhost:3000/bikes", {
        method: 'GET',
        headers: {
          "Accept": "application/json",
      }
    })

        .then( response => { // response - HTTP-ответ
            if (!response.ok){
                throw new Error("fetch error " + response.status); // дальше по цепочке пойдёт отвергнутый промис
            }
                else{
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

    }    
    openBasket = () => {
        this.props.dispatch({
            type: 'POP_UP',
            popUpState: {registration: false, logIn: false, basket: true}
        })
    }

    closeAllForms = (e) => {
        if(e.target.getAttribute('data') === 'BasketPopUpContainer'){
            this.props.dispatch({
                type: 'POP_UP',
                popUpState: {registration: false, logIn: false, basket: false}
            }) 
        }
    }
    closeBasket = () => {
        this.props.dispatch({
            type: 'POP_UP',
            popUpState: {registration: false, logIn: false, basket: false}
        }) 
    }
    deleteItemFromBasket = (e) => {
        let itemId = ""+ e.target.getAttribute('data');
        let newBasket  = {...this.props.userData.basket};
        delete newBasket[itemId];
        function dispatch(){
            console.log('dispatch');
            this.props.dispatch({
                type:'CHANGE_BASKET',
                basket: newBasket
            })
        }
        setTimeout(dispatch.bind(this),900);
        this.setState({
            deletedItemId: itemId
        })
    }
    fetchSuccessSendBikes = (updatedItem) => {
        let updatedBikes = this.props.items.map(v => {
            if(v.id == updatedItem.id){
                return updatedItem;
            }
            else {
                return v;
            }
        })
        this.props.dispatch({
            type: 'BIKES_SET',
            status:3,
            data: updatedBikes
        })
      };
    sendBikes = (updatedItem, itemId) => {
        isoFetch(("http://localhost:3000/bikes/"+itemId), {
        method: 'PATCH',
        headers: {
          "Content-type": "application/json",
      },
        body: JSON.stringify(updatedItem)
    })

        .then( response => { // response - HTTP-ответ
            if (!response.ok){
                throw new Error("fetch error " + response.status); // дальше по цепочке пойдёт отвергнутый промис
            }
                else{
                return response.json(); // дальше по цепочке пойдёт промис с пришедшими по сети данными
                }
              })
        .then( data => {
            console.log('Велик обновился')
            this.fetchSuccessSendBikes(data); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
        })
        .catch( error => {
            this.fetchError(error.message);
        })
    ;
    }
    makeOrder = () => {
        if(this.props.userData.user){
            let userPurchase = [...this.props.userData.user.purchase];
            let currentDate = new Date();
            let currentMonth = currentDate.getMonth() + 1;
            currentMonth = (currentMonth < 10)?("0"+currentMonth):currentMonth;
            let dateString = currentDate.getDate() + "."+ currentMonth +"."+ currentDate.getFullYear();
            let currentHour = (currentDate.getHours() < 10)?("0"+currentDate.getHours()):currentDate.getHours();
            let currentMinutes = (currentDate.getMinutes() < 10)?("0"+currentDate.getMinutes()):currentDate.getMinutes();
            let timeString = currentHour+":"+currentMinutes;
            let currentOrder = [];
            let totalSum = 0;
            for(var key in this.props.userData.basket){
                let name = this.props.userData.basket[key].item.producer;
                let model = this.props.userData.basket[key].item.model;
                let price = this.props.userData.basket[key].item.price;
                let quantity = this.props.userData.basket[key].quantity;
                totalSum += quantity*price;
                let item = {name: name, model: model, price: price, quantity: quantity};
                currentOrder.push(item);
            }
            let newOrder = {date: dateString, time:timeString, order: currentOrder,totalSum: totalSum};
            userPurchase.push(newOrder);
            let updatedUser = {...this.props.userData.user,purchase: userPurchase};
            this.sendData(updatedUser, updatedUser.id);
        }
        this.props.items.forEach((v,i) => {
            let itemId = ""+v.id;
            if(itemId in this.props.userData.basket){
                let updatedItem = {...this.props.items[i],quantity:(this.props.items[i].quantity-this.props.userData.basket[itemId].quantity) };
                this.sendBikes(updatedItem, itemId); 
            }
        }) 
        this.props.dispatch({
            type:'ORDER_MADE'
        })
    }
    fetchSuccessSend = (updatedUser) => {
        this.props.dispatch({
            type:"UPDATE_USER",
            updatedUser: updatedUser
        })
      };
    sendData = (updatedUser, id) => {
        isoFetch(("http://localhost:3000/users/"+id), {
        method: 'PATCH',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedUser)
    })

        .then( response => { // response - HTTP-ответ
            if (!response.ok){
                throw new Error("fetch error " + response.status); // дальше по цепочке пойдёт отвергнутый промис
            }
                else{
                return response.json(); // дальше по цепочке пойдёт промис с пришедшими по сети данными
                }
              })
        .then( updatedUser => {
            this.fetchSuccessSend(updatedUser); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
        })
        .catch( error => {
            this.fetchError(error.message);
        })
    ;
    }
    incQuant = (e) =>{
        let itemId = ""+ e.target.getAttribute('data');
        console.log('increase');
        if(this.props.userData.basket[itemId].quantity == this.props.userData.basket[itemId].item.quantity){
                console.log('alert')
            return this.props.dispatch({
                type: 'ALERT',
                text: 'В вашей корзине находится все доступное количество товара'
            })
        }
        else {
            this.props.dispatch({
                type: 'ADD_TO_BASKET',
                item: this.props.userData.basket[itemId].item
            })
        }
    }

    decQuantity = (e) => {
        let itemId = ""+ e.target.getAttribute('data');
        if(this.props.userData.basket[itemId].quantity ==1) {
            return;
        }
        else {
            let newBasket = {...this.props.userData.basket};
            newBasket[itemId] = {...this.props.userData.basket[itemId], quantity: (this.props.userData.basket[itemId].quantity-1) }
        
            this.props.dispatch({
                type:"CHANGE_BASKET",
                basket: newBasket
            })
        }
    }
    render(){
        console.log('basket render');
        
        let count = 0;
        let totalSum = 0;
        let totalQuantity = 0;
        let basket = this.props.userData.basket;
        console.log(basket);
            for(var key in basket){
                count++;
                totalSum += basket[key].quantity*basket[key].item.price;
                totalQuantity += basket[key].quantity;
            }
        if(this.props.userData.popUpState.basket === false){
            return <div className="BasketMainPageContainer">
                     <button className="CartImageContainer" onClick={this.openBasket} ><img src="../pictures/cart.png"/> ({totalQuantity}) {totalSum} Br</button>
                   </div>
        }
        else {
            
            if(!count){
                return <div className='BasketPopUpContainer' data='BasketPopUpContainer'  onClick={this.closeAllForms}>
                   <div className="Basket">
                   <div className="CancelButton"><img src="../pictures/cancel.png"onClick={this.closeBasket}/></div>
                     <h1>Корзина</h1>
                     <div style={{textAlign:"center"}}>Ваша корзина пуста</div>
                    </div>
                </div>
            }
            else{
                let popUpBasketInner = [];
                for (var key in basket){
                    
                   popUpBasketInner.push(
                   <div key={key} className={(key == this.state.deletedItemId)?"BasketDeletedItem":"BasketItem"}>
                        <div className="ItemName">{basket[key].item.producer + ' ' + basket[key].item.model}</div>
                        <div className="ItemQuantity"><button data={key} onClick={this.decQuantity}>-</button>{basket[key].quantity}<button data={key} onClick={this.incQuant}>+</button></div>
                        <div className="ItemSum">{basket[key].quantity*basket[key].item.price} Br</div>
                        <div className="ItemAction" onClick={this.deleteItemFromBasket} data={key}>Удалить</div>
                    </div>);
                }
                let popUpBasket = 
                    
                    <div className='BasketPopUpContainer' data='BasketPopUpContainer'  onClick={this.closeAllForms}>
                        <div className="Basket">
                            <h1>Корзина</h1>
                            <div className="CancelButton"><img src="../pictures/cancel.png"onClick={this.closeBasket}/></div>
                                 <div className='BasketTableHead'>   
                                    <div className="ItemName">Название товара</div>
                                    <div className="ItemQuantity">Количество</div>
                                    <div className="ItemSum">Сумма</div>
                                    <div className="ItemAction">Действие</div>
                                    </div>
                                    <div>
                                        {popUpBasketInner}
                                     
                                 </div>    
                            <div className="Total">Общая сумма: {totalSum} Br</div>
                            <div className="BasketMakeOrderButton"><button onClick={this.makeOrder}>Заказать</button></div>
                        </div>
                    </div>
                return popUpBasket    
            }   
        }
    }
}
const mapStateToProps = function (state) {
    return {
      // из раздела Redux с именем counter свойство cnt будет доступно
      // данному компоненту как this.props.cnt
      userData: state.userData,
      items: state.bikes.data
    };
  };
  
  // присоединяем (connect) компонент к хранилищу Redux
  const UserBasket = connect(mapStateToProps)(Basket);
      
export default UserBasket;