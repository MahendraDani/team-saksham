console.log("I am awake!");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("A message was received!");

  if (message.action === "startCapture") {
    console.log("Got the message to startCapture");

    // Check for tabCapture permission and API
    if (chrome.tabCapture) {
      // Starting to capture audio from the active tab
      chrome.tabCapture.capture({ audio: true}, (stream) => {
        if (chrome.runtime.lastError || !stream) {
          console.error(
            "Error Capturing Audio: " + chrome.runtime.lastError.message
          );
          sendResponse({
            success: false,
            error: chrome.runtime.lastError.message,
          });
          return;
        }

        // If audio stream captured successfully, then process the stream
        processAudioStream(stream);
        sendResponse({ success: true });
      });

      return true; // Inform Chrome this will be an async response
    } else {
      console.error("chrome.tabCapture is not available in this context.");
      sendResponse({ success: false, error: "tabCapture API not available." });
    }
  }
});

function processAudioStream(stream) {
  const audioContext = new AudioContext();
  const mediaStreamSource = audioContext.createMediaStreamSource(stream);
  mediaStreamSource.connect(audioContext.destination);
  
  console.log("Audio Stream Captured");
}
