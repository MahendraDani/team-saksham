import Webcam from "webcam-easy";
console.log("isl-to-audio.js loaded");
const webcamElement = document.getElementById("webcam");

async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const webcam = new Webcam(webcamElement, "user");
    webcam
      .start()
      .then((result) => {
        console.log("webcam started");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.error("Error accessing webcam: ", err);
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  startWebcam();
});

document.addEventListener("DOMContentLoaded", (event) => {
  const start = document.getElementById("start");
  start.addEventListener("click", () => {
    const outputText = document.getElementById("output-text");
    outputText.classList.remove("output-hidden");

    const cam = document.getElementById("webcam");
    cam.classList.add("active");
  });

  const stop = document.getElementById("stop");
  stop.addEventListener("click", () => {
    const cam = document.getElementById("webcam");
    cam.classList.remove("active");
  });

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


});
