if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then(function() {
    console.log("Service Worker Registered");
  });
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", function(e) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;

  console.log(e.platforms); // e.g., ["web", "android", "windows"]
  e.userChoice.then(
    function(choiceResult) {
      console.log(choiceResult.outcome); // either "accepted" or "dismissed"
    },
    function(err) {
      console.log(err);
    }
  );
});

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
    var reloadButton = document.querySelector("footer a");
    reloadButton.className = "";
    reloadButton.addEventListener("click", function(e) {
      window.location.reload();
    });

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
