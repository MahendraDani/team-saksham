import Webcam from "webcam-easy";
console.log("isl-to-audio.js loaded");
const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
// const snapSoundElement = document.getElementById('snapSound');
// const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const webcam = new Webcam(webcamElement, "user", canvasElement);
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
  const dropdown = document.querySelector(".dropdown");
  const select = document.querySelector(".dropdown-select");

  select.addEventListener("focus", () => {
    dropdown.classList.add("open");
  });

  select.addEventListener("change", () => {
    dropdown.classList.remove("open");
  });

  select.addEventListener("blur", () => {
    dropdown.classList.remove("open");
  });
});
