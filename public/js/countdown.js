let launchDate = new Date("Jan 08, 2022 00:00:00").getTime();
let now = new Date().getTime();
if (launchDate - now <= 0) window.location.href = "http://localhost:3000";

setInterval(tick, 1000);

function tick() {
  let now = new Date().getTime();

  let t = launchDate - now;

  if (t > 0) {
    if (launchDate - now <= 0) window.location.href = "http://localhost:3000";

    let days = Math.floor(t / (1000 * 60 * 60 * 24));

    if (days < 10) {
      days = "0" + days;
    }

    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (hours < 10) {
      hours = "0" + hours;
    }

    let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    if (mins < 10) {
      mins = "0" + mins;
    }

    let secs = Math.floor((t % (1000 * 60)) / 1000);
    if (secs < 10) {
      secs = "0" + secs;
    }

    // let time = `${days} : ${hours} : ${mins} : ${secs}`;
    document.querySelector(".hours").innerText = hours;
    document.querySelector(".minutes").innerText = mins;
    document.querySelector(".seconds").innerText = secs;

  }
}
