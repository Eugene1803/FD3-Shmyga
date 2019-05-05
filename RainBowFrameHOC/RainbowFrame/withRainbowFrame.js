import React from 'react';

function withRainbowFrame(colors) {
    return function(Component) {
      return props => {
        console.log(props.children);
        let result = <Component>{props.children}</Component>;
        colors.forEach( v => {
           result = <div style={{borderColor: v, borderWidth: '2px', padding: '2px', borderStyle: 'solid', display: 'inline-block'}}>{result}</div>
         } 
        );
        return result;

      }
    };
}



export { withRainbowFrame };