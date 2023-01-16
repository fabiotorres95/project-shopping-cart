import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

const computers = await fetchProductsList('computador');
const sectionEl = document.querySelector('.products');

computers.forEach((element) => {
  sectionEl.appendChild(createProductElement(element));
});

document.querySelector('.cep-button').addEventListener('click', searchCep);
