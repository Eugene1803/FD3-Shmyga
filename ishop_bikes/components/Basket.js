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
    }
    componentWillReceiveProps(nextProps){
            let basket = {...nextProps.userData.basket};
            let storage = {...JSON.parse(localStorage.bikesLocalStorage)};
            storage.basket = basket;
            localStorage.bikesLocalStorage = JSON.stringify(storage);
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

    deleteItemFromBasket = (e) => {
        let itemId = ""+ e.target.getAttribute('data');
        let newBasket  = {...this.props.userData.basket};
        delete newBasket[itemId];
        this.props.dispatch({
            type:'CHANGE_BASKET',
            basket: newBasket
        })
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
    render(){
        console.log('basket render');
        
        let count = 0;
        let totalSum = 0;
        let totalQuantity = 0;
        let basket = this.props.userData.basket;
            for(var key in basket){
                count++;
                totalSum += basket[key].quantity*basket[key].item.price;
                totalQuantity += basket[key].quantity;
            }
        if(this.props.userData.popUpState.basket === false){
            return <div onClick={this.openBasket}>Корзина ({totalQuantity}) на сумму {totalSum} Br</div>
        }
        else {
            
            if(!count){
                return <div className='BasketPopUpContainer' data='BasketPopUpContainer'  onClick={this.closeAllForms}>
                    <h1>Корзина</h1>
                    <div>Ваша корзина пуста</div>
                </div>
            }
            else{
                let popUpBasketInner = [];
                for (var key in basket){
                    popUpBasketInner.push(<tr key={key}>
                        <td>{basket[key].item.producer + ' ' + basket[key].item.model}</td>
                        <td>{basket[key].quantity}</td>
                        <td>{basket[key].quantity*basket[key].item.price}</td>
                        <td onClick={this.deleteItemFromBasket} data={key}>Удалить</td>
                    </tr>);
                }
                let popUpBasket = 
                    
                    <div className='BasketPopUpContainer' data='BasketPopUpContainer'  onClick={this.closeAllForms}>
                        <div className="Basket">
                            <h1>Корзина</h1>
                            <table>
                                <thead>
                                 <tr>   
                                 <th>Название товара</th>
                                 <th>Количество</th>
                                 <th>Сумма</th>
                                 <th>Действие</th>
                                 </tr>
                                </thead>
                                <tbody>
                                    {popUpBasketInner}
                                </tbody>

                            </table>
                            <div>Общая сумма {totalSum}</div>
                            <button onClick={this.makeOrder}>Заказать</button>
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