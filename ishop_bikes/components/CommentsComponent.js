import React from 'react';
import isoFetch from 'isomorphic-fetch';
import './ItemPhoto.css';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';

class CommentsComponent extends React.Component {
    state = {
        textAreaValue: ''
    }

    componentWillReceiveProps(newProps){
        if(newProps.item.comments !== this.props.item.comments){
            this.setState({
                textAreaValue: ''
            })
        }
    }
    setTextAreaValue = (e) => {
        let textAreaValue = e.target.value;
        this.setState({
            textAreaValue: textAreaValue
        })
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
    sendComment = () => {
        let updatedComments = [...this.props.item.comments];
        if(!this.state.textAreaValue.length){
            return;
        }
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth() + 1;
        currentMonth = (currentMonth < 10)?("0"+currentMonth):currentMonth;
        let dateString = currentDate.getDate() + "."+ currentMonth +"."+ currentDate.getFullYear();
        let currentHour = (currentDate.getHours() < 10)?("0"+currentDate.getHours()):currentDate.getHours();
        let currentMinutes = (currentDate.getMinutes() < 10)?("0"+currentDate.getMinutes()):currentDate.getMinutes();
        let timeString = currentHour+":"+currentMinutes;
        let user = (this.props.userData.user)?this.props.userData.user.name:"unnamed"
        let newComment = {date: dateString, time: timeString, user: user, content: this.state.textAreaValue};
        updatedComments.push(newComment);
        let updatedItem = {...this.props.item,comments: updatedComments};
        this.sendData(updatedItem, this.props.item.id);
    }
    render(){
        console.log('CommentsComponent render')
        let commentsList = [];
        commentsList = this.props.item.comments.map((v,i) =>
            <div key={i} className="CommentContainer">
                <div>
                    {v.user} {v.date} {v.time}
                </div>
                <div>
                    {v.content}
                </div>
            </div> 
        )    
        return(
          <div className="CommentsComponentContainer">
                   <div>{(!commentsList.length && 'Комментариев нет') ||
                   commentsList.reverse()}
                    </div>
                    <div>
                        <textarea value={this.state.textAreaValue} onChange={this.setTextAreaValue}>

                        </textarea>
                        <button onClick={this.sendComment}>Отправить комментарий</button>
                    </div>
          </div>
        )
    }
}
const mapStateToProps = function(state){
    return {
        userData: state.userData
    }
}
export default connect(mapStateToProps)(CommentsComponent);