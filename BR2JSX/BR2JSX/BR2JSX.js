import React from 'react';
import PropTypes from 'prop-types';




class BR2JSX extends React.Component {
/*
  static propTypes = {
    startWorkMode: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answers:PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        freeanswer: PropTypes.bool,
      })
    ),
    deffreeanswertext: PropTypes.string.isRequired,
  };
*/
  state = {
    string: this.props.text
  }


  render() {
    let result = [];
    this.state.string.split(/< *br *\/? *>/m).forEach((v,i,a) => {
       if(i !== a.length-1){
         result.push(v);
         result.push(<br key={i}/>);
       }else {
         result.push(v);
       } 
    }
    )
    return (
      <div>{result}</div>
    )
    ;

  }

}

export default BR2JSX;
