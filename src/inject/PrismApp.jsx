import React from 'react';
import {render} from 'react-dom';
import WebAppMessenger from './WebAppMessenger.jsx';
import _ from 'underscore';
import $ from 'jquery';

require('./PrismApp.less');

class PrismApp extends React.Component {
  constructor() {
    super();
    this.chromeMessage = new WebAppMessenger();
    this.chromeMessage.startExtensions();

    _.bindAll(this, 'onKeyPress');
  }

  componentWillMount() {
    console.log('Install Global Event Handler');
    $('body').on('keypress', this.onKeyPress);
  }

  componentWillUnmount() {
    console.log('Uninstall Global Event Handler');
    $('body').off('keypress', this.onKeyPress);
  }

  onKeyPress(event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'S') {
      console.log('Capture');
      this.chromeMessage.captureScreenShot(function() {
        console.log('Capture Done');
      });
    }
  }

  render() {
    return (<div className="Prism"></div>);
  }
}

export default PrismApp;
