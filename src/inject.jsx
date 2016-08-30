import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';


import PrismApp from './inject/PrismApp.jsx';

require("./main.less");

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

class AppMonitor {
  constructor(callback) {
    console.log('AppMonitor');
    this.pollingInternval = 2000;
    this.callback = callback;
    this.startMonitorPrismLoad();
    this.startMonitorSupportCasePopup();
  }

  // This monitor the loading of Prism.  Once Prism is loaded
  // We inject our logo to display.
  startMonitorPrismLoad() {
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

  // This monitor the Prism Support Case popup and inject
  startMonitorSupportCasePopup() {
    var intervalId = setInterval(function() {
      if ($('#popupSupportCase').length &&
        $('.preview-wrapper').length === 0) {
        var el = $('<div id="PrismApp" class="preview-wrapper">');
        $('.n-modal-body').prepend(el);
        $('#popupSupportCase').addClass('ohSnap');
        render(<PrismApp/>, document.getElementsByClassName('preview-wrapper')[0]);
      }
    }, 2000);
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

