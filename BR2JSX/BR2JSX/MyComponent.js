import React from 'react';
import PropTypes from 'prop-types';

import BR2JSX from './BR2JSX'

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
    let text="первый<br>второй<br/>третий<br / >последний";
    return <BR2JSX text={text}/>;
  }

}

export default MyComponent;
