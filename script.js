if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then(function() {
    console.log("Service Worker Registered");
  });
}

function documentReady(fn) {
  if (document.readyState != "loading") {
    return fn();
  }

  return document.addEventListener("DOMContentLoaded", fn);
}

const container = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 15000;
const breathIn = 3000;
const holdBreathTime = 6000;

function breathAnimation() {
  text.innerText = "Breathe In!";
  container.className = "container breatheIn";

  setTimeout(() => {
    text.innerText = "Hold";
    container.className = "container beating";

    setTimeout(() => {
      text.innerText = "Breathe Out!";
      container.className = "container breatheOut";
    }, holdBreathTime);
  }, breathIn);
}

function startTimer() {
  var presentTime = document.getElementById("timer").innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond(timeArray[1] - 1);
  if (s == 59) {
    m = m - 1;
  }
  if (m < 0) {
    return false;
  }

  document.getElementById("timer").innerHTML = m + ":" + s;
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec;
  } // add zero in front of numbers < 10
  if (sec < 0) {
    sec = "59";
  }
  return sec;
}

documentReady(function() {
  document.getElementById("timer").innerHTML = 005 + ":" + 01;
  startTimer();

  breathAnimation();
  setInterval(breathAnimation, totalTime);
});
