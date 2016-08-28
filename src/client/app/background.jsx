import React from 'react';
import {render} from 'react-dom';
import {Layer, Rect, Stage, Circle} from 'react-konva';
import AwesomeComponent from './AwesomeComponent.jsx';

class MyCanvas extends React.Component {
  componentDidMount() {
    console.log(this.refs.stage);
  }

  render () {
    return (
      <Stage width={700} height={700}>
        <Layer>
          <Circle ref="circle" radius={50}
                  x={100} y={100} fill="black"/>
        </Layer>
      </Stage>
    );
  }
}

class App extends React.Component {
  componentDidMount() {
    console.log(this.refs.stage)
  }
  render () {
    return (
      <div>
        <p> Helloo WorldO!</p>
        <AwesomeComponent />
        <MyCanvas/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
