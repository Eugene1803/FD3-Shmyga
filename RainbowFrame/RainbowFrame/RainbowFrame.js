import React from 'react';
import PropTypes from 'prop-types';




class RainbowFrame extends React.Component {
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
  }


  render() {
    let start = this.props.children;
    let frame = this.props.colors.reduce( (r,v) => {
      return <div style={{borderColor: v, borderWidth: '0.2em', borderStyle: 'solid', padding: '0.2em', display: 'inline-block'}}>
        {r}</div>
    }, start
      )
    return (
       frame
    )
    ;

  }

}

export default RainbowFrame;
