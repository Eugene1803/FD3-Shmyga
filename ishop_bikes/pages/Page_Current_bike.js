import React from 'react';
import {connect} from 'react-redux';
import isoFetch from 'isomorphic-fetch';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import {comparePrice, compareSales, compareScore} from './../compareProp.js';
import ItemComponent from "../components/ItemComponent";
class Page_Current_bike extends React.PureComponent {

    componentDidMount(){
        if(this.props.bikes.status === 0){
        this.loadData();
        }
        
    }

    state = {
        
    }
    
    componentWillReceiveProps(nextProps){
       if(nextProps.bikes.status === 3){
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
    
    render(){
        console.log('Page_Current-Bike render');
        if(this.props.bikes.status === 0){
            return <div>Идет загрузка...</div>
        }
        else if(this.props.bikes.status === 3){
            let currentBike = this.props.bikes.data.filter(v =>
                v.id == this.props.match.params.id
            )
            return <ItemComponent key={currentBike.id} displayMode={2} item={currentBike[0]}/>
        }
    }

}

const mapStateToProps = function (state) {
    return {
      
      bikes: state.bikes,
    };
  };
  
 
  const PageCurrentBike = connect(mapStateToProps)(Page_Current_bike);
  export default withRouter(PageCurrentBike);
      