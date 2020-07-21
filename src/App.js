import React from 'react';
import Story from "./component/Story";

/**
 * App
 *
 * Simple react js fetch example
 */
class App extends React.Component {
  state = {
    visible: true
  };

   
    render() {
      return (
        <div className="App">
          <Story />
        </div>
      );
    }
  }



export default App;