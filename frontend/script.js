async function predict() {
  let days = document.getElementById("days").value;

  let res = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ days: days })
  });

  let data = await res.json();

  document.getElementById("output").innerText = "$" + data.prediction;
  document.getElementById("predictedPrice").innerText = "$" + data.prediction;
  document.getElementById("rmse").innerText = data.rmse;
  document.getElementById("r2").innerText = data.r2;
}

async function openPopup(title){
  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup").style.display = "flex";

  let res = await fetch("http://127.0.0.1:5000/graphs");
  let data = await res.json();

  let canvas = document.createElement("canvas");
  document.querySelector(".popup-content").appendChild(canvas);

  new Chart(canvas, {
    type: "line",
    data: {
      labels: ["1","2","3","4"],
      datasets: [{
        label: title,
        data: data.trend
      }]
    }
  });
}

function closePopup(){
  document.getElementById("popup").style.display = "none";
}
