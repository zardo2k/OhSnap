class BaseMessenger {
  constructor() {
    this.CONSTANTS = {
      ACTION: {
        START_EXTENSIONS: 'startExtensions',
        CAPTURE_SCREENSHOT: 'captureScreenShot',
      }
    };

    this.sendMessage = chrome.runtime.sendMessage;
  }
}

export default BaseMessenger;
