import React from 'react';
import './Registration.css';
import {connect} from 'react-redux';
import isoFetch from 'isomorphic-fetch';
class Registration extends React.PureComponent {
    state = {
    }
    openLogInForm = () => {
        this.props.dispatch({
            type: 'POP_UP',
            popUpState: {registration: false, logIn: true, basket: false}
        })
        if(this.props.userData.allUsers === null){
        this.loadUsersInfo();
        }
    }  
    closeLogInForm = () => {
        this.props.dispatch({
            type: 'POP_UP',
            popUpState: {registration: false, logIn: false, basket: false}
        })
    }  
    openRegistrationForm = () => {
        this.props.dispatch({
            type: 'POP_UP',
            popUpState: {registration: true, logIn: false, basket: false}
        })
        if(this.props.userData.allUsers === null){
            this.loadUsersInfo();
        }
    }  
    closeRegistrationForm = () => {
        this.props.dispatch({
            type: 'POP_UP',
            popUpState: {registration: false, logIn: false, basket: false}
        })
    } 
    closeAllForms = (e) => {
        if(e.target.getAttribute('data') === 'LogInRegFormContainer'){
            this.props.dispatch({
                type: 'POP_UP',
                popUpState: {registration: false, logIn: false, basket: false}
            }) 
        }
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
    render() {
      console.log('Registration render');
      let mainPageRegButtons = '';
      let popUpForm = '';
        if(this.props.userData.user === null){
        mainPageRegButtons = <div><span onClick={this.openLogInForm}>Вход</span><span onClick={this.openRegistrationForm}>Регистрация</span></div>    
        }
      if(this.props.userData.popUpState.logIn === true){
          popUpForm = 
              
              <div className='LogInRegFormContainer' data='LogInRegFormContainer'  onClick={this.closeAllForms}>
              {(this.props.userData.allUsers === null && <div className='LogInRegFormLoading'>Идет загрузка</div>)||
                <div className='LogInRegForm'>
                <div><button onClick={this.closeLogInForm}>Закрыть</button></div>
                <div>Авторизуйтесь, указав свои контактные данные.</div>
                <div><div>E-MAIL</div><input type='email'></input></div>
                <div><div>Пароль</div><input type='password'></input></div>
                <div>ВОЙТИ</div>
                <div>Впервые у нас? <span onClick={this.openRegistrationForm}>Зарегистрироваться</span></div>
                </div>
              } 
              </div>
          
      }
      else if(this.props.userData.popUpState.registration === true){
        popUpForm = 
        <div className='LogInRegFormContainer' data='LogInRegFormContainer'  onClick={this.closeAllForms}>
        {(this.props.userData.allUsers === null && <div className='LogInRegFormLoading'>Идет загрузка</div>)||
          <div className='LogInRegForm'>
          <div><button onClick={this.closeRegistrationForm}>Закрыть</button></div>
          <div>Авторизуйтесь, указав свои контактные данные.</div>
          <div><div>Имя</div><input type='text'></input></div>
          <div><div>E-MAIL</div><input type='email'></input></div>
          <div><div>Телефон</div><input type='text'></input></div>
          <div><div>Придумайте пароль</div><input type='password'></input></div>
          <div><div>Подтвердите пароль</div><input type='password'></input></div>
          <div>Зарегистрироваться</div>
          <div>Уже регистрировались? <span onClick={this.openLogInForm}>Войти</span></div>
          </div> 
        } 
        </div>
      }
      return (
          <div>
              {popUpForm}{mainPageRegButtons}
          </div>
      )
    }
  
  }
  const mapStateToProps = function (state) {
    return {
      // из раздела Redux с именем counter свойство cnt будет доступно
      // данному компоненту как this.props.cnt
      userData: state.userData,
    };
  };
  
  // присоединяем (connect) компонент к хранилищу Redux
  const UserRegistration = connect(mapStateToProps)(Registration);
  export default UserRegistration;
      