import React from 'react';
import {render} from 'react-dom';
import {Layer, Rect, Stage, Text, Circle} from 'react-konva';
import AwesomeComponent from './AwesomeComponent.jsx';

class MyCanvas extends React.Component {
  onDrag () {
    console.log('drag');
  }


  componentDidMount() {
    console.log(this.refs.stage);
    console.log("hi");
  }

  onContentClick() {
    console.log('Click');
  }

  render () {
    return (
      <Stage width={700} height={700} onContentClick={this.onContentClick}>
        <Layer>
          <Circle ref="circle" radius={50}
                  x={100} y={100} fill="black"
                  draggable='true'
                  onDragStart={this.onDrag}/>
          <Text fontSize={30} fill={'green'} text="Hello"
                draggable="true"></Text>
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
        <p> Helloo Me!</p>
        <AwesomeComponent />
        <MyCanvas/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
