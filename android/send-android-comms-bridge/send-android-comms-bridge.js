/* global window, document, browser */

(function() {
  let first = true;

  document.body.style.border = '5px solid red';
  window.addEventListener('message', function(event) {
    console.log('bridge', JSON.stringify(event.data));
    if (event.source === window && event.data) {
      console.error(
        'Content script received message: "' + JSON.stringify(event.data) + '"'
      );
      port.postMessage(event.data);
    }
  });

  console.error('hellooooooOOOOOOOO', window.location);
  const port = browser.runtime.connectBrowser();
  port.onMessage.addListener(response => {
    if (first) {
      port.postMessage('we got the first message');
      first = false;
    }
    if (response.cmd === 'incomingShare') {
      window.postMessage(response, '*');
    }
    if (response.cmd === 'finishLogin') {
      window.postMessage(response, '*');
    }
    console.error(`Received: ${JSON.stringify(response)}`);
  });
})();
