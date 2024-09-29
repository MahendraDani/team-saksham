document.addEventListener("DOMContentLoaded", (event) => {
  const dropdownWrapper = document.querySelector(".dropdown");
  const select = document.querySelector(".dropdown-select");

  select.addEventListener("focus", () => {
    dropdownWrapper.classList.add("open");
  });

  select.addEventListener("change", () => {
    dropdownWrapper.classList.remove("open");
  });

  select.addEventListener("blur", () => {
    dropdownWrapper.classList.remove("open");
  });

  const start = document.getElementById("start");
  start.addEventListener("click", () => {
    const outputISL = document.getElementById("output-isl");
    outputISL.classList.remove("output-hidden");
    const img = document.querySelector("img");
    img.style.display = "block";
    const status = outputISL.querySelector("h2");
    status.innerHTML = "Translating...";

    const langSection = document.querySelector("#languages");
    const lang = document.querySelector(".dropdown-select");
    // When user clicks on start then stops and then starts again then lang would be null so we need to check if lang is null or not.
    const chosenLang = lang?.options[lang.selectedIndex].text;
    if (lang) {
      langSection.innerHTML = `
            <h3>Detected Language: <span> ${chosenLang} </span></h3>
        `;
    }
    const outputText = document.getElementById("output-text");
    outputText.classList.remove("output-hidden");

    // Starting Audio Capture
    chrome.runtime.sendMessage({ action: "startCapture" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Runtime error:", chrome.runtime.lastError.message);
      } else if (response && response.success) {
        console.log("Audio capture started successfully.");
      } else {
        console.error("Failed to capture audio.");
      }
    });
  });

  const stop = document.getElementById("stop");
  stop.addEventListener("click", () => {
    const outputISL = document.getElementById("output-isl");
    const img = outputISL.querySelector("img");
    img.style.display = "none";
    const status = outputISL.querySelector("h2");
    status.innerHTML = "Translation stopped";
  });

  //
});
