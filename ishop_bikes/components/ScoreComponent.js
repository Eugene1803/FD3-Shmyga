import React from 'react';
import isoFetch from 'isomorphic-fetch';
import './ItemComponent.css';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import "./ScoreComponent.css";
class ScoreComponent extends React.PureComponent {
    state = {
        currentScore: 0,
    }
    componentWillReceiveProps(){
        this.setState({
            currentScore: 0,
        })
    }
    
    setScore = (e) => {
        let starNumber = parseFloat(e.target.getAttribute('data'));
        if(starNumber == 1){
            if(this.state.currentScore != 1){
                this.setState({
                    currentScore: 1,
                })
                
            }
            else{
                this.setState({
                    currentScore: 0,
                })
            }
        }
        else{
            if(starNumber != this.state.currentScore){
                this.setState({
                    currentScore: starNumber,
                })
            }
        }
    }
    sendScore = () => {
        let itemId = this.props.item.id;
        let newVotesQuant = this.props.item.votesQuant+1;
        let oldScore = this.props.item.score;
        let oldVotesQuant = this.props.item.votesQuant;
        let currentScore = this.state.currentScore;
        let newScore = ((oldScore * oldVotesQuant) + currentScore) / newVotesQuant;
        newScore = Math.round(newScore/0.1)*0.1;
        console.log(newScore);
        let updatedItem = {...this.props.item, score: newScore,votesQuant: newVotesQuant};
        this.sendData(updatedItem, itemId);

    }
    fetchSuccessSend = (updatedItem) => {
        this.props.dispatch({
            type:"COMMENT_SENT",
            updatedItem: updatedItem
        })
      };
    sendData = (updatedItem, id) => {
        isoFetch(("http://localhost:3000/bikes/"+id), {
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
        .then( updatedItem => {
            this.fetchSuccessSend(updatedItem); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
        })
        .catch( error => {
            this.fetchError(error.message);
        })
    ;
    }
    fetchError = (errorMessage) => {
        console.error(errorMessage);
    };
    render(){
        
        let stars = [];
        for(var i = 1; i <= 5; i++){
            let image = <img onClick={this.setScore} src={(i <= this.state.currentScore)?'../pictures/scores/yellowStar.png':"../pictures/scores/whiteStar.png"} data={i} key={i}/>;
            stars.push(image);
        }
        return(
            <div className="ScoreComponent">
                <div>
                    <span className="Stars">{stars}</span><button onClick={this.sendScore}>Оценить</button>
                </div>
            </div>
        )
    }
}

export default connect()(ScoreComponent);