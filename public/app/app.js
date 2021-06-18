import { handleStatus, log } from "./utils/promise-helpers.js";
import "./utils/array-helpers.js";

const sumItems = (code) => (notas) =>
  notas
    .$flatMap((nota) => nota.itens)
    .filter((item) => item.codigo == code)
    .reduce((total, item) => total + item.valor, 0);

document.querySelector("#myButton").onclick = () =>
  fetch("http://localhost:3000/notas")
    .then(handleStatus)
    .then(sumItems("2143"))
    .then(console.log)
    .catch(console.log);
