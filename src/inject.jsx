import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import _ from 'underscore';

import WebAppMessenger from './inject/WebAppMessenger.jsx';

class OhSnapApp {
  constructor(options) {
    this.name = options.name;
    this.app = options.app;
    this.inject();
  }

  inject() {
    var el = $('<div id="OhSnapWrapper"></div>');
    $('body').append(el);
    render(<this.app/>, document.getElementById('OhSnapWrapper'));
  }
}

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

class AppMonitor {
  constructor(callback) {
    console.log('AppMonitor');
    this.pollingInternval = 2000;
    this.callback = callback;
    this.startMonitor();
  }

  // Poll every 2 seconds until we find
  startMonitor() {
    var intervalId = setInterval(function() {
      if (document.readyState === "complete") {
        if (this.isPrismLoaded()) {
          new OhSnapApp({name: 'Prism', app: PrismApp});
          clearInterval(intervalId);
          return;
        }
      }
    }.bind(this), this.pollingInternval);
  }

  // Return true if the webpage is a Prism page is loaded.
  isPrismLoaded() {
    // TODO: need a better way to check for this.
    // For now we just check to see if the Setting Menu dom is there.
    return !! $('.n-settings-menu .n-nav-col.col1').length;
  }
}

var app = new AppMonitor(function(app) {
  console.log(app);
});

// class AppMonitor extends React.Component {
//   render () {
//     return (
//       <div>
//         <p> Helloo WdfdodGoodr!</p>
//         <AwesomeComponent />
//       </div>
//     );
//   }
// }


console.log($);
//render(<AppMonitor/>, document.body);

