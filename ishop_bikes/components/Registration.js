import React from 'react';
import './Registration.css';
import {connect} from 'react-redux';
import isoFetch from 'isomorphic-fetch';
class Registration extends React.PureComponent {
    componentDidMount(){
        let user = JSON.parse(localStorage.bikesLocalStorage).user;
        if(user){
            this.props.dispatch({
                type: 'LOG_IN',
                user: user,
            })
        }
    }
    state = {
        logInEMailField:{inner: '',valid: false, validString:'',user: null},
        logInPasswordField: {inner:'',valid:true, validString:''},
        regFormNameField: {inner: '', validString: '', valid: false},
        regFormEMailField: {inner: '', validString: '', valid: false},
        regFormNumberField: {inner: '',validString: '', valid: false},
        regFormPasswordField: {valid: false, inner: '', validString: ''},
        regFormPasswordConfField: {valid: false, inner: '', validString: ''},
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.userData.user !== this.props.userData.user){
            let user = {...nextProps.userData.user};
            let storage = {...JSON.parse(localStorage.bikesLocalStorage)};
            storage.user = user;
            localStorage.bikesLocalStorage = JSON.stringify(storage);
        }
        this.setState({
            logInEMailField:{inner: '',valid: false, validString:'',user: null},
        logInPasswordField: {inner:'',valid:true, validString:''},
        regFormNameField: {inner: '', validString: '', valid: false},
        regFormEMailField: {inner: '', validString: '', valid: false},
        regFormNumberField: {inner: '',validString: '', valid: false},
        regFormPasswordField: {valid: false, inner: '', validString: ''},
        regFormPasswordConfField: {valid: false, inner: '', validString: ''},
        })
    }
    openLogInForm = () => {
        this.props.dispatch({
            type: 'POP_UP',
            popUpState: {registration: false, logIn: true, basket: false,cabinet: false}
        })
        if(this.props.userData.allUsers === null){
        this.loadUsersInfo();
        }
    }  
    closeLogInForm = () => {
        this.props.dispatch({
            type: 'POP_UP',
            popUpState: {registration: false, logIn: false, basket: false,cabinet: false}
        })
    }  
    openRegistrationForm = () => {
        this.props.dispatch({
            type: 'POP_UP',
            popUpState: {registration: true, logIn: false, basket: false,cabinet: false}
        })
        if(this.props.userData.allUsers === null){
            this.loadUsersInfo();
        }
    }  
    closeRegistrationForm = () => {
        this.props.dispatch({
            type: 'POP_UP',
            popUpState: {registration: false, logIn: false, basket: false,cabinet: false}
        })
    } 
    closeAllForms = (e) => {
        if(e.target.getAttribute('data') === 'LogInRegFormContainer'){
            this.props.dispatch({
                type: 'POP_UP',
                popUpState: {registration: false, logIn: false, basket: false,cabinet: false}
            }) 
        }
    }
    openCabinet = () => {
        this.props.dispatch({
            type: 'POP_UP',
            popUpState: {registration: false, logIn: false, basket: false,cabinet: true}
        })
    }

    closeCabinet = () => {
        
            this.props.dispatch({
                type: 'POP_UP',
                popUpState: {registration: false, logIn: false, basket: false,cabinet: false}
            }) 
    }
    //                            ЗАГРУЗКА ДАННЫХ
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

    ///                        КОНЕЦ ЗАГРУЗКИ
    ///                        ОТПРАВКА ДАННЫХ
    fetchSuccessSend = (newUser) => {
        console.log(newUser);
        this.props.dispatch({
            type: 'NEW_USER_REGISTERED',
            user: newUser
        })
      };
    sendData = (newUser) => {
        isoFetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newUser)
    })

        .then( response => { // response - HTTP-ответ
            if (!response.ok){
                throw new Error("fetch error " + response.status); // дальше по цепочке пойдёт отвергнутый промис
            }
                else{
                return response.json(); // дальше по цепочке пойдёт промис с пришедшими по сети данными
                }
              })
        .then( newUser => {
            this.fetchSuccessSend(newUser); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
        })
        .catch( error => {
            this.fetchError(error.message);
        })
    ;
    }
    ////                       КОНЕЦ ОТПРАВКИ
    validateLogInEMail = (e) => {
        let fieldText = e.target.value.trim();
        let regExp = /^\S+?@[A-Za-z]+?\.[A-Za-z]+?$/;
        if(!fieldText.match(regExp)){
            this.setState({
                logInEMailField: {...this.state.logInEMailField,valid:false,user:null,inner:fieldText, validString: 'Введите ваш e-mail в формате mymail@mail.com'},
                logInPasswordField: {...this.state.logInPasswordField,valid:false, validString: '',inner:''}
            })
        }
        else{
            let registeredUser = false;
            let user = null;
            for(var i = 0; i < this.props.userData.allUsers.length; i++){
                if(fieldText == this.props.userData.allUsers[i].eMail){
                    registeredUser = true;
                    user = this.props.userData.allUsers[i];
                    break;
                }
            }

            if(registeredUser){
                this.setState({
                    logInEMailField:{...this.state.logInEMailField,valid:true,inner:fieldText, validString: 'Зарегестрированный пользователь',user: user}
                })
            }
            else {
                this.setState({
                    logInEMailField:{...this.state.logInEMailField,valid: false, user:null,inner:fieldText, validString: 'Пользователь с данным e-mail не зарегестрирован'},
                    logInPasswordField: {...this.state.logInPasswordField,valid:false, validString: '',inner:''}
                })
            }
        }  
        
    }
    checkPassword = (e) => {
        let fieldText = e.target.value;
        if(!this.state.logInEMailField.valid){
            this.setState({
                logInPasswordField: {...this.state.logInPasswordField, validString: 'Проверьте ваш e-mail'}
            })
        }
        else {
            let passwordValid = false;
            for(var i = 0; i < this.props.userData.allUsers.length; i++){
                if(this.state.logInEMailField.user && fieldText == this.state.logInEMailField.user.passWord){
                    passwordValid = true;
                    break;
                }
          }
          if(passwordValid){
              this.setState({
                  logInPasswordField: {...this.logInPasswordField,valid:true,validString:'Пароль введен верно',inner: fieldText}
              })
          }
          else {
            this.setState({
                logInPasswordField: {...this.logInPasswordField,validString:'Неверный пароль',inner: fieldText}
            })
          }
        }
    }
    validateRegFormName =(e) => {
        let fieldText = e.target.value.trim();
        if(fieldText.length < 3){
            this.setState({
                regFormNameField: {...this.state.regFormNameField, valid: false,inner: fieldText,validString: 'Введите имя не короче 3 символов'}
            })
            
        }
        else {
            this.setState({
                regFormNameField: {...this.state.regFormNameField, valid: true,inner: fieldText,validString: 'Верно'}
            })
        }
    }
    validateRegFormEMail = (e) => {
        let fieldText = e.target.value.trim();
        let regExp = /^\S+?@[A-Za-z]+?\.[A-Za-z]+?$/;
        if(fieldText.match(regExp)){
            this.setState({
                regFormEMailField: {...this.state.regFormEMailField,valid: true, inner: fieldText, validString: 'Верно'}
            })
        }
        else {
            this.setState({
                regFormEMailField: {...this.state.regFormEMailField,valid: false, inner: fieldText, validString: 'Введите e-mail в формате myemail@mail.com'}
            })
        }
    }
    validateRegFormNumber = (e) => {
       let fieldText = e.target.value.trim();
       let regExp = /^\+375(29|44|33|25)\d\d\d\d\d\d\d$/;
       if(fieldText.match(regExp)){
           this.setState({
               regFormNumberField: {...this.state.regFormNumberField,valid:true, inner: fieldText,validString: 'Верно' }
           })
       }
       else {
        this.setState({
            regFormNumberField: {...this.state.regFormNumberField,valid:false, inner: fieldText,validString: 'Введите номер в формате +375XXXXXXXXX' }
        })
       }
    }
    regFormSetPassword = (e) => {
        let fieldText = e.target.value.trim();
        let regExp = /^\S{5,}$/;
        if(fieldText.match(regExp)){
            this.setState({
                regFormPasswordField: {...this.state.regFormPasswordField,valid: true, inner: fieldText, validString: 'Подходящий пароль'},
                regFormPasswordConfField: {...this.state.regFormConfPasswordField, valid: false, inner: '', validString:''}
            })
        }
        else {
            this.setState({
                regFormPasswordField: {...this.state.regFormPasswordField,valid: false, inner: fieldText, validString: 'Пароль должен содержать не менее 5 любых (кроме пробелов) символов'},
                regFormPasswordConfField: {...this.state.regFormConfPasswordField, valid: false, inner: '', validString:''}
            })
        }
    }
    regFormConfPassword = (e) => {
        let fieldText = e.target.value.trim();
        let regExp = /^\S{5,}$/;
        if(fieldText.match(regExp) && fieldText == this.state.regFormPasswordField.inner){
            this.setState({
                regFormPasswordConfField: {...this.state.regFormPasswordConfField,valid: true, inner: fieldText, validString: 'Введенные пароли совпадают'}
            })
        }
        else {
            this.setState({
                regFormPasswordConfField: {...this.state.regFormPasswordConfField,valid: false, inner: fieldText, validString: 'Введенные пароли не совпадают'}
            })
        }
    }

    registerUser = (e) => {
        let newUser = {name: this.state.regFormNameField.inner, eMail: this.state.regFormEMailField.inner, passWord: this.state.regFormPasswordField.inner,phone: this.state.regFormNumberField.inner, basket:[],purchase:[] };
        this.sendData(newUser);
    }
    logInUser = () => {
        let storage = JSON.parse(localStorage.bikesLocalStorage);
        storage.user = this.state.logInEMailField.user;
        localStorage.bikesLocalStorage = JSON.stringify(storage);
        this.props.dispatch({
            type: 'LOG_IN',
            user: this.state.logInEMailField.user,
        })
    }
    logOut = () => {
        let storage = JSON.parse(localStorage.bikesLocalStorage);
        storage.user = null;
        localStorage.bikesLocalStorage = JSON.stringify(storage);
        this.props.dispatch({
            type: 'LOG_OUT'
        })
    }
    render() {
      console.log('Registration render');
      let mainPageRegButtons = '';
      let popUpForm = '';
        if(this.props.userData.user === null){
        mainPageRegButtons = <div><span onClick={this.openLogInForm}>Вход</span><span onClick={this.openRegistrationForm}>Регистрация</span></div>    
        }
        else {
            mainPageRegButtons = <div>Пользователь: {this.props.userData.user.name} <button onClick={this.openCabinet}>Личный кабинет</button><button onClick={this.logOut}>Выйти</button></div> 
        }
      if(this.props.userData.popUpState.logIn === true){
          popUpForm = 
              
              <div className='LogInRegFormContainer' data='LogInRegFormContainer'  onClick={this.closeAllForms}>
              {(this.props.userData.allUsers === null && <div className='LogInRegFormLoading'>Идет загрузка</div>)||
                <div className='LogInRegForm'>
                <div><button onClick={this.closeLogInForm}>Закрыть</button></div>
                <div>Авторизуйтесь, указав свои контактные данные.</div>
                <div><div>E-MAIL</div><input type='email' placeholder="myemail@mail.com" value={this.state.logInEMailField.inner} onChange={this.validateLogInEMail}></input><span>{this.state.logInEMailField.validString}</span></div>
                <div><div>Пароль</div><input type='password' placeholder="password" value={this.state.logInPasswordField.inner} onChange={this.checkPassword}></input><span>{this.state.logInPasswordField.validString}</span></div>
                <div>
                {((this.state.logInEMailField.valid && this.state.logInPasswordField.valid) &&
              <button onClick={this.logInUser} className='ButtonValid'>Войти</button> ) || 
              (<button className="ButtonNotValid">Войти</button>)}
                </div>
                <div>Впервые у нас? <span onClick={this.openRegistrationForm} className="Link">Зарегистрироваться</span></div>
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
          <div>Зарегестрируйтесь, указав свои контактные данные.</div>
          <div><div>Имя</div><input type='text' value={this.state.regFormNameField.inner} placeholder='Введите имя' onChange={this.validateRegFormName}></input><span>{this.state.regFormNameField.validString}</span></div>
          <div><div>E-MAIL</div><input type='email' value={this.state.regFormEMailField.inner} placeholder='myemail@mail.com' onChange={this.validateRegFormEMail}></input><span>{this.state.regFormEMailField.validString}</span></div>
          <div><div>Телефон</div><input type='text' placeholder='+375XXXXXXXXX' value={this.state.regFormNumberField.inner} onChange={this.validateRegFormNumber}></input><span>{this.state.regFormNumberField.validString}</span></div>
          <div><div>Придумайте пароль</div><input type='password' value={this.state.regFormPasswordField.inner} onChange={this.regFormSetPassword}></input><span>{this.state.regFormPasswordField.validString}</span></div>
          <div><div>Подтвердите пароль</div><input type='password' value={this.state.regFormPasswordConfField.inner} onChange={this.regFormConfPassword}></input><span>{this.state.regFormPasswordConfField.validString}</span></div>
          <div>
            {((this.state.regFormNameField.valid && this.state.regFormEMailField.valid && this.state.regFormNumberField.valid && this.state.regFormPasswordConfField.valid && this.state.regFormPasswordField.valid) &&
              <button onClick={this.registerUser} className='ButtonValid'>Зарегистрироваться</button> ) || 
              (<button className="ButtonNotValid">Зарегистрироваться</button>)}
          </div>
          <div>Уже регистрировались? <span onClick={this.openLogInForm} className="Link">Войти</span></div>
          </div> 
        } 
        </div>
      }
      else if (this.props.userData.popUpState.cabinet === true){
        let userOrders = [];
        userOrders = this.props.userData.user.purchase.map((v,i) => {
            let currentOrder = v.order.map((v,i) => <li key={i}>{v.producer} {v.model}</li>);
            return (
                <div className='CabinetOrderCotainer' key={i}>
                    <div className='Date'>{v.date}</div>
                    <div className="Time">{v.time}</div>
                    <div className="Items">{currentOrder}</div>
                    <div className="Total">{v.totalSum}</div>
                </div>
            )
        }
          
        )
        console.log(userOrders);  
        popUpForm = 
        <div className='LogInRegFormContainer' data='LogInRegFormContainer'  onClick={this.closeAllForms}>
            <div className='Cabinet'>
                <button onClick={this.closeCabinet}>Закрыть кабинет</button>
                <h2>Ваши заказы</h2>
                <div className='CabinetOrderCotainer'>
                    <div className='Date'>Дата заказа</div>
                    <div className="Time">Время заказа</div>
                    <div className="Items">Товары</div>
                    <div className="Total">Общая сумма</div>
                </div>
                {userOrders}
            </div>
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
      