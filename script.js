// Standard Rebound → Strength Data
const reboundData = [20,22,25,28,30,32,35,38,40];
const strengthData = [14,16,20,24,28,32,38,45,50];

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btn").addEventListener("click", calculate);
});

function calculate() {

  let input = document.getElementById("values").value;

  if (!input) {
    alert("Please enter rebound values!");
    return;
  }

  let arr = input.split(",").map(Number);

  if (arr.some(isNaN)) {
    alert("Enter valid numbers separated by commas!");
    return;
  }

  let sum = arr.reduce((a,b) => a+b, 0);
  let avg = sum / arr.length;

  document.getElementById("avg").innerText =
    "Average Rebound Number = " + avg.toFixed(2);

  let strength = interpolate(avg);

  document.getElementById("strength").innerText =
    "Estimated Strength = " + strength.toFixed(2) + " MPa";

  drawGraph(avg, strength);
}

function interpolate(x) {
  for (let i = 0; i < reboundData.length-1; i++) {
    if (x >= reboundData[i] && x <= reboundData[i+1]) {
      let x1 = reboundData[i];
      let x2 = reboundData[i+1];
      let y1 = strengthData[i];
      let y2 = strengthData[i+1];

      return y1 + ((x - x1)/(x2 - x1)) * (y2 - y1);
    }
  }
  return 0;
}

function drawGraph(userX, userY) {

  const ctx = document.getElementById('myChart');

  if (window.chart) window.chart.destroy();

  window.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: reboundData,
      datasets: [
        {
          label: "Standard Curve",
          data: strengthData,
          borderColor: "#4a90e2",
          fill: false
        },
        {
          label: "Test Result",
          data: [{x:userX, y:userY}],
          borderColor: "red",
          backgroundColor: "red",
          pointRadius: 6,
          type: 'scatter'
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Rebound Number"
          }
        },
        y: {
          title: {
            display: true,
            text: "Strength (MPa)"
          }
        }
      }
    }
  });
}