import { handleStatus } from "../utils/promise-helpers.js";
import { partialize, pipe } from "../utils/operators.js";

const API = "http://localhost:3000/notas";

const getItemsFromNota = (notas) => notas.$flatMap((nota) => nota.itens);
const filterItemsByCode = (code, items) =>
  items.filter((item) => item.codigo == code);
const sumItemsValue = (items) =>
  items.reduce((total, item) => total + item.valor, 0);

export const notasService = {
  listAll() {
    return fetch(API)
      .then(handleStatus)
      .catch((err) => {
        console.log(err);
        return Promise.reject("Não foi possível obter as notas fiscais.");
      });
  },
  sumItems(code) {
    const filterItems = partialize(filterItemsByCode, code);
    const sumItems = pipe(getItemsFromNota, filterItems, sumItemsValue);
    return this.listAll().then(sumItems);
  },
};
