import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import combinedReducer from '../redux/reducers.js';


import PagesRouter from './PagesRouter';
import { BrowserRouter } from 'react-router-dom'
let store=createStore(combinedReducer);
import Header from '../components/Header'
import Footer from '../components/Footer'
import './MainPage.css'
class MainPage extends React.PureComponent {
  componentDidMount(){
    if(!('bikesLocalStorage' in localStorage)){
    localStorage.bikesLocalStorage = JSON.stringify({basket:{}, user:null})
    }
  }        
  render() {
    console.log('MainPage render');
    return (
      <BrowserRouter>  
        <Provider store={store}>
        <div>
          <Header/>
          <PagesRouter/>
          <Footer/>
          </div>
         </Provider>
      </BrowserRouter>
    );
    
  }

}
    
export default MainPage;
    