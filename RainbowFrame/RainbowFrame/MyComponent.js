import React from 'react';
import PropTypes from 'prop-types';

import RainbowFrame from './RainbowFrame'

class MyComponent extends React.Component {
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
    let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
  return (
    <RainbowFrame colors={colors}>
      Hello!
    </RainbowFrame>
  );

  }

}

export default MyComponent;
