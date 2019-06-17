import React from 'react';
import isoFetch from 'isomorphic-fetch';
import './ItemPhoto.css';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
class ItemPhoto extends React.PureComponent {
    state = {
        currentPhoto: this.props.images[0]
    }
    setCurrentPhoto = (e) => {
        let image = e.target.getAttribute('src');
        if(this.state.currentPhoto !== image){
            this.setState({
                currentPhoto: image
            })
        }
    }
    render(){
        console.log('ItemPhoto render');
        let picturesRow = [];
        picturesRow = this.props.images.map((v,i) => 
            <div className={(v === this.state.currentPhoto)?"ImageExample Chosen":'ImageExample'} key={i}  onClick={this.setCurrentPhoto}>
                <img src={v} onClick={this.setCurrentPhoto}/>
            </div>    
        )
        return (
            <div className="ItemPhotoContainer">
                <div className='MainPhoto'>
                    <img src={this.state.currentPhoto}/>
                </div>
                <div className="PicturesContainer">
                    {picturesRow}
                </div>
            </div>
        )
    }
}

export default ItemPhoto;