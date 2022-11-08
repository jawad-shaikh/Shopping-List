const { ipcRenderer } = require("electron");

const ul = document.querySelector("ul");

ipcRenderer.on("add-item", (event, item) => {
  let r = Math.floor(Math.random() * 255) + 1;
  let g = Math.floor(Math.random() * 255) + 1;
  let b = Math.floor(Math.random() * 255) + 1;

  const li = document.createElement("li");
  li.classList.add("list-group-item");
  li.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  li.style.color = "black";
  li.innerText = item;

  ul.appendChild(li);
});

ipcRenderer.on("clear-all-items", (event, item) => {
  ul.innerHTML = "";
});

ul.addEventListener("dblclick", (e) => {
  e.target.innerHTML = `<del>${e.target.innerHTML}</del>`;
});
