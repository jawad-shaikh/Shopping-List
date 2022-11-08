const { ipcRenderer } = require("electron");

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const item = document.querySelector(".item").value;
  ipcRenderer.send("add-item", item);
});

ipcRenderer.on("add-item", (event, item) => {
  console.log(item);
});
