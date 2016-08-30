import BaseMessenger from '../common/BaseMessenger.jsx';

// WebAppMessenger provide the injected web application the ability
// to send message to the chrome extensions background app.
class WebAppMessenger extends BaseMessenger {

  // Ask the extensions to take a screenshot.
  // @param callback: function callback
  captureScreenShot(callback) {
    this.sendMessage({
      action: this.CONSTANTS.ACTION.CAPTURE_SCREENSHOT
    }, callback);
  }

  // Ask the extensions to show the extensions icon.
  // At start the extensions is not enable(icon is grayed out).
  startExtensions(callback) {
    this.sendMessage({
      action: this.CONSTANTS.ACTION.START_EXTENSIONS
    }, callback);
  }
}

export default WebAppMessenger;
