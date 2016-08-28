import _ from 'underscore';
import jquery from 'jquery';

class App {
  constructor() {
    console.log('Hi');
    _.bindAll(this, 'onMessage');
    chrome.extension.onMessage.addListener(this.onMessage);
  }

  // Callback for chrome.extension.onMessage
  // onMessage is message exchanger between the inject.js content script.
  onMessage(request, sender, sendResponse) {
    switch(request.action) {
      case 'start':
        chrome.pageAction.show(sender.tab.id);
        sendResponse({action: request.action, result: {
          status: 'success'
        }});
        break;
      case 'takeSnapShot':
        chrome.tabs.captureVisibleTab(function(screenshotUrl) {
          sendResponse({action: request.action, result: {
            status: 'success',
            image: screenshotUrl
          }});
        });
        return true;
        break;

    }
  }
}

if (chrome.extension) {
  console.log(chrome)
  console.log(_.size(chrome));
  var app = new App();
}
