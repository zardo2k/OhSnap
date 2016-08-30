import _ from 'underscore';
import BaseMessenger from './common/BaseMessenger.jsx';

class BackgroundApp extends BaseMessenger {
  constructor() {
    super();
    _.bindAll(this, 'onMessage');
    chrome.extension.onMessage.addListener(this.onMessage);
  }

  // Message listener for any message coming from the webapp.
  onMessage(request, sender, sendResponse) {
    switch(request.action) {
      case this.CONSTANTS.ACTION.START_EXTENSIONS:
        chrome.pageAction.show(sender.tab.id);
        sendResponse({action: request.action, result: {
          status: 'success'
        }});
        break;
      case this.CONSTANTS.ACTION.CAPTURE_SCREENSHOT:
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

new BackgroundApp();
