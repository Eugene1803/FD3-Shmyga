import React from 'react';
import './PopUpMessage.css';
import {connect} from 'react-redux';
import isoFetch from 'isomorphic-fetch';
import './Basket.css';
class PopUpMessage extends React.Component {
    state = {

    }

    render () {
        console.log('PopUpMessage render')
        return(
            <div className="PopUpMessage" key={this.props.message.key}>
                <div>{this.props.message.text}</div>
            </div>
        )
    }
}
const mapStateToProps= function(state){
    return {
        message: state.popUpMessage
    }
}
export default connect(mapStateToProps)(PopUpMessage);