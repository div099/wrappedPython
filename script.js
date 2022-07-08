const worker = new Worker('worker.js');

addButton.addEventListener("click", (event) => {
  let one = document.getElementById("firstInput").value;
  let two = document.getElementById("secondInput").value;

  worker.postMessage([one, two]);
});

worker.onmessage = function(message) {
  document.getElementById("printSum").innerHTML = message.data;
}
