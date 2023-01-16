import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const computers = await fetchProductsList('computador');
// console.log(computers);
const sectionEl = document.querySelector('.products');
computers.forEach((element) => {
  sectionEl.appendChild(createProductElement(element));
});
