import React from 'react';
import PropTypes from 'prop-types';
import { Fragment} from 'react'

import { withRainbowFrame } from './withRainbowFrame'
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
    
    let colors=['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
    let FramedFragment=withRainbowFrame(colors)(Fragment);
  return (
    <FramedFragment>
       Hello
    </FramedFragment>
  );
  }

}

export default RainbowFrame;
