import React from 'react';
import isoFetch from 'isomorphic-fetch';
import './ItemComponent.css';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import ItemPhoto from './ItemPhoto';
import CommentsComponent from './CommentsComponent';
class ItemComponent extends React.PureComponent {

    state={
        itemImageMode1: this.props.item.pictures[0],
        itemImageIndexMode1: null
    }
     
    setImageMode1 = (e) => { 
        let index = e.target.getAttribute('data');
            this.setState({
                itemImageMode1: this.props.item.pictures[index],
                itemImageIndexMode1: index
            })
     }
     addToBasket = () => {
        if(!this.props.item.quantity){
            return alert('Данного товара нет в наличии');
        }

        this.props.dispatch({
            type: 'ADD_TO_BASKET',
            item: this.props.item
        })
     }

    setInitImageMode1 = () => {
            this.setState({
                itemImageMode1: this.props.item.pictures[0],
                itemImageIndexMode1: null
            })
            
    }
    
    render() {
        console.log('ItemComponent '+ this.props.item.id + ' render');
        if(this.props.displayMode === 1){
            var onImageBlocks = [];
            var underImageBlocks = [];
            for(var i = 0; i < this.props.item.pictures.length; i++){
                onImageBlocks.push(<div key={i} data={i} onMouseOver={this.setImageMode1}></div>);
                underImageBlocks.push(<div key={i} className={(i == this.state.itemImageIndexMode1)?"UnderImageBlockHover":"UnderImageBlockInit"}></div>)
            }
        }
        
      return(
          (this.props.displayMode === 1 && 
          <div >
                <div className="ItemComponentMode1">
                    <div className='ImageContainer'>
                    <div className='OnImageBlock' onMouseLeave={this.setInitImageMode1} >
                            {onImageBlocks}
                        </div>
                        <img src={this.state.itemImageMode1} />
                        <div className="UnderImageBlocksContainer">
                            {underImageBlocks}
                        </div>
                    </div>
                    <div className='ItemDescriptionContainer'>
                        <h2>{this.props.item.producer} {this.props.item.model}</h2>
                        <div className='ItemDescription'><span>Рейтинг</span><span>{this.props.item.score}
                            <div style={{width: '80%', height: '80%', display: 'inline-block'}}>
                            <div style={{width:(this.props.item.score/5*100)+'%', height: '100%', backgroundColor:'green',display: 'inline-block'}}></div>
                            <div style={{width:(100-this.props.item.score/5*100)+'%', height: '100%', backgroundColor:'red',display: 'inline-block'}}></div>
                            </div>
                            </span>
                        </div>
                        <div className='ItemDescription'><span>Класс</span><span>{this.props.item.bikeClass}</span></div>
                        <div className='ItemDescription'><span>Возрастная группа</span><span>{this.props.item.ageGroup}</span></div>
                        <div className='ItemDescription'><span>Количество скоростей</span><span>{this.props.item.speedQuantity}</span></div>
                        <div className='ItemDescription'><span>Год выпуска</span><span>{this.props.item.yearProd}</span></div>
                    </div>
                    <div className="OrderContainer">
                        <div>{this.props.item.price}</div>
                        <div className={this.props.item.quantity?'ItemQuantYes':"ItemQuantNo"}>{this.props.item.quantity?'В наличии':'Нет в наличии'}</div>
                        <div><button className={this.props.item.quantity?'BasketButtonYes':"BasketButtonNo"} onClick={this.addToBasket} data={this.props.item}>В корзину</button></div>
                        <div><NavLink to={'/bikes/'+this.props.item.id}>Просмотреть полную информацию о товаре</NavLink></div>
                    </div>    
                </div>


          </div>
          ) || 
          (this.props.displayMode === 2 && 
            <div className='ItemComponentContainerMode2'>
                <h2>{this.props.item.producer} {this.props.item.model}</h2>
                <div className='ItemInfoContainer'>
                    <ItemPhoto images={this.props.item.pictures}/>
                    <div>
                    <div className='ItemDescription'><span>Класс</span><span>{this.props.item.bikeClass}</span></div>
                        <div className='ItemDescription'><span>Возрастная группа</span><span>{this.props.item.ageGroup}</span></div>
                        <div className='ItemDescription'><span>Количество скоростей</span><span>{this.props.item.speedQuantity}</span></div>
                        <div className='ItemDescription'><span>Год выпуска</span><span>{this.props.item.yearProd}</span></div>
                    </div>
                    <div className="CommentsContainer">
                        <CommentsComponent item={this.props.item}/>
                    </div>
                </div>
            </div>
        )
      );
      
    }
  
  }
  
  export default connect()(ItemComponent);
      