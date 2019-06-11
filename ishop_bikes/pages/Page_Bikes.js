import React from 'react';
import {connect} from 'react-redux';
import isoFetch from 'isomorphic-fetch';
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
//import Logo from './pages/Logo.js';
//import Basket from './pages/Basket.js';
class Page_Bikes extends React.PureComponent {
    componentDidMount(){
        if(this.props.bikes.status === 0){
        this.loadData();
        }
        else if(this.props.bikes.status === 3){
            let minPrice = this.props.bikes.data[0].price;
            let maxPrice = 0;
            this.props.bikes.data.forEach((v,i) => {
                if(v.price < minPrice){
                    minPrice = v.price
                }
                if(v.price > maxPrice){
                    maxPrice = v.price;
                }

            })
            this.setState({
                minPrice: minPrice,
                maxPrice: maxPrice,
                bikesFilter: {
                    ...this.state.bikesFilter,price: {min: minPrice, max: maxPrice}
                }
            })
        }
    }

    state = {
        minPrice: null,
        maxPrice: null,
        bikesFilter: {
            price: {min: null, max: null},
            producer: {'Aist':true, 'Stream':true, 'Cronus':true, "Challenger": true, "Aspect": true},
            yearProd: {'2017': true, '2018': true, '2019':true},
            bikeClass:  {'mountain': true, 'city': true, 'highway': true},
            speedQuantity: {'16':true, '24': true, '32': true},
            ageGroup: {'baby': true, 'adolescent': true, 'mature': true}
        },
        bikesSort: {price: true, salesQuant: false, buyersScore: false},
        quantShownOnPage: '2'
        
    }
    
    componentWillReceiveProps(nextProps){
       if(nextProps.bikes.status === 3){
        let minPrice = nextProps.bikes.data[0].price;
        let maxPrice = 0;
        nextProps.bikes.data.forEach((v,i) => {
            if(v.price < minPrice){
                minPrice = v.price
            }
            if(v.price > maxPrice){
                maxPrice = v.price;
            }

        })
        this.setState({
            minPrice: minPrice,
            maxPrice: maxPrice,
            bikesFilter: {
                ...this.state.bikesFilter,price: {min: minPrice, max: maxPrice}
            }
        })
       }
    }
    
    fetchError = (errorMessage) => {
        console.error(errorMessage);
    };
    
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
     setPriceDiap = (e) => {
         let price = e.target.value.trim();
         if(price === '') {
             if(e.target.getAttribute('data') === 'minPrice'){
                this.setState({
                   bikesFilter: {...this.state.bikesFilter, price: {...this.state.bikesFilter.price,min:this.state.minPrice}}, 
                })
             }
             else if(e.target.getAttribute('data') === 'maxPrice'){
                this.setState({
                    bikesFilter: {...this.state.bikesFilter, price: {...this.state.bikesFilter.price,max:this.state.maxPrice}}, 
                 })
             }
         }
         price = parseFloat(e.target.value);
         let minPrice = this.state.bikesFilter.price.min;
         let maxPrice = this.state.bikesFilter.price.max;
         if(!price){
             return;
         }
         if(e.target.getAttribute('data') === 'minPrice'){
           if(price <= maxPrice){
            minPrice = price;
           }
           if(price < this.state.minPrice){
            minPrice = this.state.minPrice;
           }    
         }
         if(e.target.getAttribute('data') === 'maxPrice'){
             if(price >= minPrice){
            maxPrice = price;
            }
            if(price > this.state.maxPrice){
                maxPrice = this.state.maxPrice;
               }   
         }
         this.setState({
             bikesFilter: {...this.state.bikesFilter,price: {min: minPrice, max: maxPrice} }
         })

         
     }

     setFilterProducer = (e) => {
        let producerTrueStatus = 0;
        let producerFalseStatus = 0;
        let producersQuantity = 0;
        let producer = e.target.value;
        let bikesFilterProducer = {...this.state.bikesFilter.producer};
        for (var key in bikesFilterProducer){
            producersQuantity++;
            if(bikesFilterProducer[key] === true){
                producerTrueStatus++;
            }
            else {
                producerFalseStatus++;
            }
        }
        if(producersQuantity === producerTrueStatus && e.target.checked){
            for (var key in bikesFilterProducer){
                if(key === producer){
                    bikesFilterProducer[key] = true;
                }
                else {
                    bikesFilterProducer[key] = false; 
                } 
            }
        }
        else if(producersQuantity === (producerFalseStatus + 1) && !e.target.checked){
            for (var key in bikesFilterProducer){
                bikesFilterProducer[key] = true; 
            }
        }
        else if (bikesFilterProducer[producer] !== e.target.checked){
            if(bikesFilterProducer[producer] === true){
                bikesFilterProducer[producer] = false;
            } else {
                bikesFilterProducer[producer] = true;
            }
        }
        this.setState({
            bikesFilter: {...this.state.bikesFilter, producer: bikesFilterProducer}
        })
     }

     setFilterYearProd = (e) => {
        let yearProdTrueStatus = 0;
        let yearProdFalseStatus = 0;
        let yearProdQuantity = 0;
        let yearProd = e.target.value;
        let bikesFilterYearProd = {...this.state.bikesFilter.yearProd};
        for (var key in bikesFilterYearProd){
            yearProdQuantity++;
            if(bikesFilterYearProd[key] === true){
                yearProdTrueStatus++;
            }
            else {
                yearProdFalseStatus++;
            }
        }
        if(yearProdQuantity === yearProdTrueStatus && e.target.checked){
            for (var key in bikesFilterYearProd){
                if(key === yearProd){
                    bikesFilterYearProd[key] = true;
                }
                else {
                    bikesFilterYearProd[key] = false; 
                } 
            }
        }
        else if(yearProdQuantity === (yearProdFalseStatus + 1) && !e.target.checked){
            for (var key in bikesFilterYearProd){
                bikesFilterYearProd[key] = true; 
            }
        }
        else if (bikesFilterYearProd[yearProd] !== e.target.checked){
            if(bikesFilterYearProd[yearProd] === true){
                bikesFilterYearProd[yearProd] = false;
            } else {
                bikesFilterYearProd[yearProd] = true;
            }
        }
        this.setState({
            bikesFilter: {...this.state.bikesFilter, yearProd: bikesFilterYearProd}
        })
     }
     setFilterSpeedQuantity = (e) => {
        let speedQuantityTrueStatus = 0;
        let speedQuantityFalseStatus = 0;
        let speedQuantityQuantity = 0;
        let speedQuantity = e.target.value;
        let bikesFilterSpeedQuantity = {...this.state.bikesFilter.speedQuantity};
        for (var key in bikesFilterSpeedQuantity){
            speedQuantityQuantity++;
            if(bikesFilterSpeedQuantity[key] === true){
                speedQuantityTrueStatus++;
            }
            else {
                speedQuantityFalseStatus++;
            }
        }
        if(speedQuantityQuantity === speedQuantityTrueStatus && e.target.checked){
            for (var key in bikesFilterSpeedQuantity){
                if(key === speedQuantity){
                    bikesFilterSpeedQuantity[key] = true;
                }
                else {
                    bikesFilterSpeedQuantity[key] = false; 
                } 
            }
        }
        else if(speedQuantityQuantity === (speedQuantityFalseStatus + 1) && !e.target.checked){
            for (var key in bikesFilterSpeedQuantity){
                bikesFilterSpeedQuantity[key] = true; 
            }
        }
        else if (bikesFilterSpeedQuantity[speedQuantity] !== e.target.checked){
            if(bikesFilterSpeedQuantity[speedQuantity] === true){
                bikesFilterSpeedQuantity[speedQuantity] = false;
            } else {
                bikesFilterSpeedQuantity[speedQuantity] = true;
            }
        }
        this.setState({
            bikesFilter: {...this.state.bikesFilter, speedQuantity: bikesFilterSpeedQuantity}
        })
     }
     setFilterAgeGroup = (e) => {
        let ageGroupTrueStatus = 0;
        let ageGroupFalseStatus = 0;
        let ageGroupQuantity = 0;
        let ageGroup = e.target.value;
        let bikesFilterAgeGroup = {...this.state.bikesFilter.ageGroup};
        for (var key in bikesFilterAgeGroup){
            ageGroupQuantity++;
            if(bikesFilterAgeGroup[key] === true){
                ageGroupTrueStatus++;
            }
            else {
                ageGroupFalseStatus++;
            }
        }
        if(ageGroupQuantity === ageGroupTrueStatus && e.target.checked){
            for (var key in bikesFilterAgeGroup){
                if(key === ageGroup){
                    bikesFilterAgeGroup[key] = true;
                }
                else {
                    bikesFilterAgeGroup[key] = false; 
                } 
            }
        }
        else if(ageGroupQuantity === (ageGroupFalseStatus + 1) && !e.target.checked){
            for (var key in bikesFilterAgeGroup){
                bikesFilterAgeGroup[key] = true; 
            }
        }
        else if (bikesFilterAgeGroup[ageGroup] !== e.target.checked){
            if(bikesFilterAgeGroup[ageGroup] === true){
                bikesFilterAgeGroup[ageGroup] = false;
            } else {
                bikesFilterAgeGroup[ageGroup] = true;
            }
        }
        this.setState({
            bikesFilter: {...this.state.bikesFilter, ageGroup: bikesFilterAgeGroup}
        })
     }

     setFilterBikeClass = (e) => {
        let bikeClassTrueStatus = 0;
        let bikeClassFalseStatus = 0;
        let bikeClassQuantity = 0;
        let bikeClass = e.target.value;
        let bikesFilterBikeClass = {...this.state.bikesFilter.bikeClass};
        for (var key in bikesFilterBikeClass){
            bikeClassQuantity++;
            if(bikesFilterBikeClass[key] === true){
                bikeClassTrueStatus++;
            }
            else {
                bikeClassFalseStatus++;
            }
        }
        if(bikeClassQuantity === bikeClassTrueStatus && e.target.checked){
            for (var key in bikesFilterBikeClass){
                if(key === bikeClass){
                    bikesFilterBikeClass[key] = true;
                }
                else {
                    bikesFilterBikeClass[key] = false; 
                } 
            }
        }
        else if(bikeClassQuantity === (bikeClassFalseStatus + 1) && !e.target.checked){
            for (var key in bikesFilterBikeClass){
                bikesFilterBikeClass[key] = true; 
            }
        }
        else if (bikesFilterBikeClass[bikeClass] !== e.target.checked){
            if(bikesFilterBikeClass[bikeClass] === true){
                bikesFilterBikeClass[bikeClass] = false;
            } else {
                bikesFilterBikeClass[bikeClass] = true;
            }
        }
        this.setState({
            bikesFilter: {...this.state.bikesFilter, bikeClass: bikesFilterBikeClass}
        })
     }

     setQuantOnPage = (e) => {
         this.setState({
             quantShownOnPage: e.target.value
         })
     }
    render() {
       let pages = [];
       if(this.props.bikes.status === 3) {
        for(let i = 1; i <= ((this.props.bikes.data.length-1) / parseFloat(this.state.quantShownOnPage)); i++){
            let pageLink = <NavLink to={'/catalog_velosipedov/'+i} key={i}>{i}</NavLink>;
            pages.push(pageLink); 
        }
       var bikesList =  this.props.bikes.data.filter((v) => (
        (v.price <= this.state.bikesFilter.price.max &&
        v.price >= this.state.bikesFilter.price.min) &&
        (this.state.bikesFilter.ageGroup[v.ageGroup])&& 
        (this.state.bikesFilter.bikeClass[v.bikeClass])&& 
        (this.state.bikesFilter.producer[v.producer]) &&
        (this.state.bikesFilter.yearProd[v.yearProd]) &&
        (this.state.bikesFilter.speedQuantity[v.speedQuantity])
        )
       );
       
       }
      console.log('Page_Bikes render');
      return (
          (this.props.bikes.status <= 1 && <div>Идет загрузка...</div>) ||
          (this.props.bikes.status == 2 && <div>ОШИБКА ЗАГРУЗКИ</div>)||
        ( this.props.bikes.status == 3 &&
        <div>
            <div>Показывать товаров на странице
                <select defaultValue={this.state.quantShownOnPage} onChange={this.setQuantOnPage}>
                    <option value='2'>2</option>
                    <option value='4'>4</option>
                    <option value='6'>6</option>
                </select>
            </div>
            <div>
            
            Цена от:<input type='text' placeholder={this.state.minPrice} data='minPrice' defaultValue='' onBlur={this.setPriceDiap}></input>
            до <input type='text'placeholder={this.state.maxPrice} defaultValue='' data='maxPrice' onBlur={this.setPriceDiap}></input>
            </div>
           <div>Возрастная группа
           <div><input type='checkbox' onClick={this.setFilterAgeGroup} value='baby'/>Детские</div>
           <div><input type='checkbox' onClick={this.setFilterAgeGroup} value='adolescent'/>Подростковые</div>
           <div><input type='checkbox' onClick={this.setFilterAgeGroup} value='mature'/>Взрослые</div>
            </div>
            <div>Класс велосипеда
            <div><input type='checkbox' onClick={this.setFilterBikeClass} value='mountain'/>Горные хартдейлы</div>
            <div><input type='checkbox' onClick={this.setFilterBikeClass} value='city'/>Городские</div>
            <div><input type='checkbox' onClick={this.setFilterBikeClass} value='highway'/>Шоссейные</div> 
            </div>    
            <div>Производители
                <div><input type='checkbox' onClick={this.setFilterProducer} value='Aist'/>Aist</div>
                <div><input type='checkbox' onClick={this.setFilterProducer} value='Stream'/>Stream</div>
                <div><input type='checkbox' onClick={this.setFilterProducer} value='Cronus'/>Cronus</div>
                <div><input type='checkbox' onClick={this.setFilterProducer} value='Challenger'/>Challenger</div>
                <div><input type='checkbox' onClick={this.setFilterProducer} value='Aspect'/>Aspect</div>
            </div>
            <div>
                Год выпуска
                <div><input type='checkbox' onClick={this.setFilterYearProd} value='2017'/>2017</div>
                <div><input type='checkbox' onClick={this.setFilterYearProd} value='2018'/>2018</div>
                <div><input type='checkbox' onClick={this.setFilterYearProd} value='2019'/>2019</div>
            </div>
            <div>
                Количество скоростей
                <div><input type='checkbox' onClick={this.setFilterSpeedQuantity} value='16'/>16</div>
                <div><input type='checkbox' onClick={this.setFilterSpeedQuantity} value='24'/>24</div>
                <div><input type='checkbox' onClick={this.setFilterSpeedQuantity} value='32'/>32</div>
            </div>

            <div>{JSON.stringify(bikesList)}</div>
            <div>{pages}</div>
        </div>
        )
      );
      
    }
  
  }
  
  const mapStateToProps = function (state) {
    return {
      // из раздела Redux с именем counter свойство cnt будет доступно
      // данному компоненту как this.props.cnt
      bikes: state.bikes,
    };
  };
  
  // присоединяем (connect) компонент к хранилищу Redux
  const PageBikes = connect(mapStateToProps)(Page_Bikes);
  export default PageBikes;
      